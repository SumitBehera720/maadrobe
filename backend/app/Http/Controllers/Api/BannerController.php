<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\AuditLog;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::where('is_active', true)
            ->orderBy('ordering', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $banners
        ]);
    }

    // Admin CRUD
    public function adminIndex()
    {
        $banners = Banner::orderBy('ordering', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $banners
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'tag' => 'nullable|string|max:50',
            'image_path' => 'required|string',
            'cta_text' => 'nullable|string|max:50',
            'cta_link' => 'nullable|string|max:255',
            'view_path' => 'nullable|string|max:50',
            'ordering' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $banner = Banner::create([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'tag' => $request->tag,
            'image_path' => $request->image_path,
            'cta_text' => $request->cta_text,
            'cta_link' => $request->cta_link,
            'view_path' => $request->view_path,
            'ordering' => $request->input('ordering', 0),
            'is_active' => $request->input('is_active', true),
        ]);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'create_banner',
            'entity_type' => Banner::class,
            'entity_id' => $banner->id,
            'metadata' => json_encode(['title' => $banner->title])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Banner created successfully',
            'data' => $banner
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Banner not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'tag' => 'nullable|string|max:50',
            'image_path' => 'sometimes|required|string',
            'cta_text' => 'nullable|string|max:50',
            'cta_link' => 'nullable|string|max:255',
            'view_path' => 'nullable|string|max:50',
            'ordering' => 'integer',
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
            'title', 'subtitle', 'tag', 'image_path',
            'cta_text', 'cta_link', 'view_path', 'ordering', 'is_active'
        ]);

        $banner->update($data);

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'update_banner',
            'entity_type' => Banner::class,
            'entity_id' => $banner->id,
            'metadata' => json_encode($data)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Banner updated successfully',
            'data' => $banner
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json([
                'success' => false,
                'message' => 'Banner not found'
            ], 404);
        }

        $title = $banner->title;
        $banner->delete();

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'delete_banner',
            'entity_type' => Banner::class,
            'entity_id' => $id,
            'metadata' => json_encode(['title' => $title])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Banner deleted successfully'
        ]);
    }
}
