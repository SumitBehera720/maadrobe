<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\AuditLog;

class CategoryController extends Controller
{
    // Public Front-end endpoints
    public function index()
    {
        $categories = Category::where('is_active', true)
            ->orderBy('ordering', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    // Admin CRUD endpoints
    public function adminIndex()
    {
        $categories = Category::orderBy('ordering', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_path' => 'nullable|string',
            'is_active' => 'boolean',
            'ordering' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'image_path' => $request->image_path,
            'is_active' => $request->input('is_active', true),
            'ordering' => $request->input('ordering', 0),
        ]);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'create_category',
            'entity_type' => Category::class,
            'entity_id' => $category->id,
            'metadata' => json_encode(['name' => $category->name])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image_path' => 'nullable|string',
            'is_active' => 'boolean',
            'ordering' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only(['name', 'description', 'image_path', 'is_active', 'ordering']);
        if ($request->has('name')) {
            $data['slug'] = Str::slug($request->name);
        }

        $category->update($data);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'update_category',
            'entity_type' => Category::class,
            'entity_id' => $category->id,
            'metadata' => json_encode($data)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        $categoryName = $category->name;
        $category->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'delete_category',
            'entity_type' => Category::class,
            'entity_id' => $id,
            'metadata' => json_encode(['name' => $categoryName])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ]);
    }
}
