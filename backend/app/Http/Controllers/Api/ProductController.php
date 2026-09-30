<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\ProductColor;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\AuditLog;

class ProductController extends Controller
{
    // Public Catalog Endpoints
    public function index(Request $request)
    {
        $query = Product::where('is_active', true)
            ->with(['category', 'sizes', 'images' => function($q) {
                $q->orderBy('ordering', 'asc');
            }]);

        // Filter by Category Slug
        if ($request->has('category')) {
            $catSlug = $request->query('category');
            $category = Category::where('slug', $catSlug)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            } else {
                // Return empty if category slug not found
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'meta' => [
                        'total' => 0,
                        'per_page' => 12,
                        'current_page' => 1
                    ]
                ]);
            }
        }

        // Filter by Custom Tag (e.g., BEST SELLER)
        if ($request->has('tag')) {
            $query->where('tag', $request->query('tag'));
        }

        // Search Query
        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Ordering
        $orderBy = $request->query('order_by', 'ordering');
        $orderDir = $request->query('order_dir', 'asc');
        $query->orderBy($orderBy, $orderDir);

        // Pagination
        $perPage = $request->query('per_page', 12);
        $products = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'meta' => [
                'total' => $products->total(),
                'per_page' => $products->perPage(),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage()
            ]
        ]);
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->with(['category', 'images', 'sizes', 'colors'])
            ->first();

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    // Admin CRUD Endpoints
    public function adminIndex()
    {
        $products = Product::with(['category', 'images', 'sizes', 'colors'])
            ->orderBy('ordering', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'tag' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'sku' => 'nullable|string|unique:products,sku',
            'stock' => 'integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'is_new_arrival' => 'boolean',
            'ordering' => 'integer',
            'sizes' => 'nullable|array',
            'sizes.*' => 'string',
            'colors' => 'nullable|array',
            'colors.*' => 'string',
            'images' => 'nullable|array',
            'images.*.path' => 'required|string',
            'images.*.is_thumbnail' => 'boolean',
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

            $sku = $request->sku ?: 'MD-' . str_pad(rand(1, 99999), 5, '0', STR_PAD_LEFT);

            $product = Product::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name) . '-' . rand(100, 999),
                'category_id' => $request->category_id,
                'price' => $request->price,
                'original_price' => $request->original_price,
                'tag' => $request->tag,
                'description' => $request->description,
                'short_description' => $request->short_description ?: substr($request->description ?? '', 0, 100),
                'sku' => $sku,
                'stock' => $request->input('stock', 0),
                'is_active' => $request->input('is_active', true),
                'is_featured' => $request->input('is_featured', false),
                'is_new_arrival' => $request->input('is_new_arrival', false),
                'ordering' => $request->input('ordering', 0),
                'fabric_details' => $request->input('fabric_details'),
                'shipping_details' => $request->input('shipping_details'),
                'exchange_details' => $request->input('exchange_details'),
                'enable_fabric_details' => $request->input('enable_fabric_details', true),
                'enable_shipping_details' => $request->input('enable_shipping_details', true),
                'enable_exchange_details' => $request->input('enable_exchange_details', true),
                'size_guide_image' => $request->input('size_guide_image'),
            ]);

            // Save Sizes
            if ($request->has('sizes')) {
                foreach ($request->sizes as $size) {
                    ProductSize::create([
                        'product_id' => $product->id,
                        'size' => $size
                    ]);
                }
            }

            // Save Colors
            if ($request->has('colors')) {
                foreach ($request->colors as $color) {
                    ProductColor::create([
                        'product_id' => $product->id,
                        'color' => $color
                    ]);
                }
            }

            // Save Images
            if ($request->has('images')) {
                foreach ($request->images as $idx => $img) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $img['path'],
                        'is_thumbnail' => $img['is_thumbnail'] ?? ($idx === 0),
                        'ordering' => $idx,
                    ]);
                }
            }

            // Log Action
            AuditLog::create([
                'user_id' => $request->user()?->id,
                'action' => 'create_product',
                'entity_type' => Product::class,
                'entity_id' => $product->id,
                'metadata' => json_encode(['sku' => $product->sku, 'name' => $product->name])
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Product created successfully',
                'data' => $product->load(['category', 'images', 'sizes', 'colors'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Database error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes|required|exists:categories,id',
            'price' => 'sometimes|required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'tag' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'sku' => 'sometimes|required|string|unique:products,sku,' . $id,
            'stock' => 'integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'is_new_arrival' => 'boolean',
            'ordering' => 'integer',
            'sizes' => 'nullable|array',
            'sizes.*' => 'string',
            'colors' => 'nullable|array',
            'colors.*' => 'string',
            'images' => 'nullable|array',
            'images.*.path' => 'required|string',
            'images.*.is_thumbnail' => 'boolean',
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

            $data = $request->only([
                'name', 'category_id', 'price', 'original_price', 'tag',
                'description', 'short_description', 'sku', 'stock',
                'is_active', 'is_featured', 'is_new_arrival', 'ordering',
                'fabric_details', 'shipping_details', 'exchange_details',
                'enable_fabric_details', 'enable_shipping_details', 'enable_exchange_details',
                'size_guide_image'
            ]);

            if ($request->has('name')) {
                $data['slug'] = Str::slug($request->name) . '-' . rand(100, 999);
            }

            $product->update($data);

            // Re-sync Sizes
            if ($request->has('sizes')) {
                ProductSize::where('product_id', $product->id)->delete();
                foreach ($request->sizes as $size) {
                    ProductSize::create([
                        'product_id' => $product->id,
                        'size' => $size
                    ]);
                }
            }

            // Re-sync Colors
            if ($request->has('colors')) {
                ProductColor::where('product_id', $product->id)->delete();
                foreach ($request->colors as $color) {
                    ProductColor::create([
                        'product_id' => $product->id,
                        'color' => $color
                    ]);
                }
            }

            // Re-sync Images
            if ($request->has('images')) {
                ProductImage::where('product_id', $product->id)->delete();
                foreach ($request->images as $idx => $img) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $img['path'],
                        'is_thumbnail' => $img['is_thumbnail'] ?? ($idx === 0),
                        'ordering' => $idx,
                    ]);
                }
            }

            // Log Action
            AuditLog::create([
                'user_id' => $request->user()?->id,
                'action' => 'update_product',
                'entity_type' => Product::class,
                'entity_id' => $product->id,
                'metadata' => json_encode(['sku' => $product->sku, 'changes' => $data])
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
                'data' => $product->load(['category', 'images', 'sizes', 'colors'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Database error occurred: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $sku = $product->sku;
        $name = $product->name;
        $product->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'delete_product',
            'entity_type' => Product::class,
            'entity_id' => $id,
            'metadata' => json_encode(['sku' => $sku, 'name' => $name])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }
}
