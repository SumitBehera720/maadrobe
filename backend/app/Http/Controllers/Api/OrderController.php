<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\OrderConfirmationMail;
use App\Mail\OrderStatusMail;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\AuditLog;

class OrderController extends Controller
{
    // Public Storefront Endpoints
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'nullable|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'city' => 'required|string|max:100',
            'pincode' => 'required|string|max:10',
            'checkout_type' => 'required|in:whatsapp,online',
            'coupon_code' => 'nullable|string|exists:coupons,code',
            'custom_tailoring_details' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.size' => 'nullable|string',
            'items.*.color' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $totalAmount = 0.00;
            $itemsToCreate = [];

            // Calculate totals and validate stock server-side
            foreach ($request->items as $itemData) {
                $product = Product::find($itemData['product_id']);

                if (!$product->is_active) {
                    return response()->json([
                        'success' => false,
                        'message' => "Product '{$product->name}' is no longer active."
                    ], 400);
                }

                if ($product->stock < $itemData['quantity']) {
                    return response()->json([
                        'success' => false,
                        'message' => "Insufficient stock for '{$product->name}'. Available: {$product->stock}."
                    ], 400);
                }

                $subtotal = $product->price * $itemData['quantity'];
                $totalAmount += $subtotal;

                $itemsToCreate[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'quantity' => $itemData['quantity'],
                    'price' => $product->price,
                    'size' => $itemData['size'] ?? null,
                    'color' => $itemData['color'] ?? null,
                    'product_model' => $product,
                ];
            }

            // Apply Coupon if exists
            $discount = 0.00;
            $coupon = null;
            if ($request->filled('coupon_code')) {
                $coupon = Coupon::where('code', $request->coupon_code)
                    ->where('is_active', true)
                    ->where(function($q) {
                        $q->whereNull('expiry_date')
                          ->orWhere('expiry_date', '>=', now()->toDateString());
                    })
                    ->first();

                if ($coupon) {
                    if ($coupon->usage_limit && $coupon->used_count >= $coupon->usage_limit) {
                        return response()->json([
                            'success' => false,
                            'message' => 'This coupon has reached its maximum usage limit and is no longer available. Please try a different code.'
                        ], 400);
                    }

                    if ($totalAmount >= $coupon->min_order_amount) {
                        if ($coupon->type === 'percentage') {
                            $discount = $totalAmount * ($coupon->value / 100);
                            if ($coupon->max_discount) {
                                $discount = min($discount, $coupon->max_discount);
                            }
                        } else {
                            $discount = $coupon->value;
                        }

                        $totalAmount = max(0.00, $totalAmount - $discount);
                    } else {
                        return response()->json([
                            'success' => false,
                            'message' => "Your cart total is below the minimum order amount of ₹{$coupon->min_order_amount} required for this coupon. Please add more items to your bag to unlock this discount."
                        ], 400);
                    }
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'This coupon code is invalid or has expired. Please check for typos or try a different active code.'
                    ], 400);
                }
            }

            // Create Order
            $orderNumber = 'MD-ORD-' . strtoupper(Str::random(4)) . time();

            $order = Order::create([
                'order_number' => $orderNumber,
                'user_id' => $request->user()?->id,
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'shipping_address' => $request->shipping_address,
                'city' => $request->city,
                'pincode' => $request->pincode,
                'total_amount' => $totalAmount,
                'payment_status' => $request->checkout_type === 'online' ? 'pending' : 'pending_confirmation',
                'status' => 'pending',
                'checkout_type' => $request->checkout_type,
                'custom_tailoring_details' => $request->custom_tailoring_details,
            ]);

            // Save Items & Decrement Stock
            foreach ($itemsToCreate as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'product_name' => $item['product_name'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'size' => $item['size'],
                    'color' => $item['color'],
                ]);

                // Decrement stock
                $item['product_model']->decrement('stock', $item['quantity']);
            }

            // Mark coupon used
            if ($coupon) {
                $coupon->increment('used_count');
            }

            DB::commit();

            // Load items relation for email
            $order->load('items');

            // Send order confirmation email if customer email is provided
            if ($order->customer_email) {
                try {
                    Mail::to($order->customer_email)->send(new OrderConfirmationMail($order));
                } catch (\Exception $e) {
                    \Log::error('Order confirmation email failed: ' . $e->getMessage());
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully',
                'data' => $order
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create order: ' . $e->getMessage()
            ], 500);
        }
    }

    public function track($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)
            ->with(['items'])
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order
        ]);
    }

    // Admin Order Management Endpoints
    public function adminIndex(Request $request)
    {
        $query = Order::with(['items']);

        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }

        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('customer_name', 'like', "%{$search}%")
                  ->orWhere('customer_phone', 'like', "%{$search}%");
            });
        }

        $orders = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['items', 'user'])->find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,confirmed,processing,shipped,delivered,cancelled',
            'payment_status' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $oldStatus = $order->status;
        $order->status = $request->status;

        if ($request->filled('payment_status')) {
            $order->payment_status = $request->payment_status;
        }

        $order->save();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'update_order_status',
            'entity_type' => Order::class,
            'entity_id' => $order->id,
            'metadata' => json_encode(['old_status' => $oldStatus, 'new_status' => $order->status])
        ]);

        // Send status/cancellation email if customer email is available and status actually changed
        if ($order->customer_email && $oldStatus !== $order->status) {
            try {
                $order->load('items');
                Mail::to($order->customer_email)->send(new OrderStatusMail($order, $oldStatus));
            } catch (\Exception $e) {
                \Log::error('Order status email failed: ' . $e->getMessage());
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Order status updated successfully',
            'data' => $order
        ]);
    }

    // Admin Dashboard KPIs
    public function dashboardStats()
    {
        $totalSales = Order::where('payment_status', 'paid')
            ->orWhere('status', 'delivered')
            ->sum('total_amount');

        $ordersCount = Order::count();
        $pendingCount = Order::where('status', 'pending')->count();
        $deliveredCount = Order::where('status', 'delivered')->count();

        // Low stock products (under 10 items)
        $lowStockProducts = Product::where('stock', '<', 10)
            ->where('is_active', true)
            ->get();

        // Recent orders
        $recentOrders = Order::orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Best-selling products (top 5 by sum quantity sold)
        $bestSellers = OrderItem::select('product_id', 'product_name', DB::raw('SUM(quantity) as total_sold'))
            ->groupBy('product_id', 'product_name')
            ->orderBy('total_sold', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_sales' => $totalSales,
                'orders_count' => $ordersCount,
                'pending_count' => $pendingCount,
                'delivered_count' => $deliveredCount,
                'low_stock_products' => $lowStockProducts,
                'recent_orders' => $recentOrders,
                'best_sellers' => $bestSellers
            ]
        ]);
    }

    public function customerOrders(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with('items')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }
}
