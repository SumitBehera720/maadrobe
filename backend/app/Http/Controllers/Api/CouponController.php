<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\AuditLog;

class CouponController extends Controller
{
    // Public Validation endpoint
    public function validateCoupon(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string',
            'amount' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $coupon = Coupon::where('code', $request->code)
            ->where('is_active', true)
            ->where(function($q) {
                $q->whereNull('expiry_date')
                  ->orWhere('expiry_date', '>=', now()->toDateString());
            })
            ->first();

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'This coupon code is invalid or has expired. Please check for typos or try a different active code.'
            ], 404);
        }

        if ($coupon->usage_limit && $coupon->used_count >= $coupon->usage_limit) {
            return response()->json([
                'success' => false,
                'message' => 'This coupon has reached its maximum usage limit and is no longer available. Please try a different code.'
            ], 400);
        }

        if ($request->amount < $coupon->min_order_amount) {
            return response()->json([
                'success' => false,
                'message' => "Your cart total is below the minimum order amount of ₹{$coupon->min_order_amount} required for this coupon. Please add more items to your bag to unlock this discount."
            ], 400);
        }

        // Calculate discount
        $discount = 0.00;
        if ($coupon->type === 'percentage') {
            $discount = $request->amount * ($coupon->value / 100);
            if ($coupon->max_discount) {
                $discount = min($discount, $coupon->max_discount);
            }
        } else {
            $discount = $coupon->value;
        }

        return response()->json([
            'success' => true,
            'message' => 'Coupon validated successfully',
            'data' => [
                'code' => $coupon->code,
                'type' => $coupon->type,
                'value' => $coupon->value,
                'discount_amount' => $discount
            ]
        ]);
    }

    // Admin CRUD
    public function index()
    {
        $coupons = Coupon::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $coupons
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|unique:coupons,code|max:50',
            'type' => 'required|in:fixed,percentage',
            'value' => 'required|numeric|min:0',
            'min_order_amount' => 'numeric|min:0',
            'max_discount' => 'nullable|numeric|min:0',
            'expiry_date' => 'nullable|date',
            'usage_limit' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $coupon = Coupon::create([
            'code' => strtoupper($request->code),
            'type' => $request->type,
            'value' => $request->value,
            'min_order_amount' => $request->input('min_order_amount', 0.00),
            'max_discount' => $request->max_discount,
            'expiry_date' => $request->expiry_date,
            'usage_limit' => $request->usage_limit,
            'is_active' => $request->input('is_active', true),
        ]);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'create_coupon',
            'entity_type' => Coupon::class,
            'entity_id' => $coupon->id,
            'metadata' => json_encode(['code' => $coupon->code])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Coupon created successfully',
            'data' => $coupon
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'code' => 'sometimes|required|string|max:50|unique:coupons,code,' . $id,
            'type' => 'sometimes|required|in:fixed,percentage',
            'value' => 'sometimes|required|numeric|min:0',
            'min_order_amount' => 'numeric|min:0',
            'max_discount' => 'nullable|numeric|min:0',
            'expiry_date' => 'nullable|date',
            'usage_limit' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only([
            'code', 'type', 'value', 'min_order_amount',
            'max_discount', 'expiry_date', 'usage_limit', 'is_active'
        ]);

        if ($request->has('code')) {
            $data['code'] = strtoupper($request->code);
        }

        $coupon->update($data);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'update_coupon',
            'entity_type' => Coupon::class,
            'entity_id' => $coupon->id,
            'metadata' => json_encode($data)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Coupon updated successfully',
            'data' => $coupon
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon not found'
            ], 404);
        }

        $code = $coupon->code;
        $coupon->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'delete_coupon',
            'entity_type' => Coupon::class,
            'entity_id' => $id,
            'metadata' => json_encode(['code' => $code])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Coupon deleted successfully'
        ]);
    }
}
