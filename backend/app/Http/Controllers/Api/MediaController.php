<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\AuditLog;

class MediaController extends Controller
{
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|image|mimes:jpeg,png,jpg,webp|max:10240', // 10MB limit
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            
            // Generate clean, safe filename
            $filename = time() . '_' . strtolower(preg_replace('/[^a-zA-Z0-9._-]/', '', $file->getClientOriginalName()));
            
            // Store using public disk
            $path = $file->storeAs('media', $filename, 'public');
            
            // URL path relative to the domain root
            $relativePath = 'storage/' . $path;

            // Audit Log
            AuditLog::create([
                'user_id' => $request->user()?->id,
                'action' => 'media_upload',
                'metadata' => json_encode([
                    'filename' => $filename,
                    'path' => $relativePath,
                    'size' => $file->getSize(),
                ])
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'data' => [
                    'path' => $relativePath,
                    'url' => asset($relativePath)
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No file uploaded'
        ], 400);
    }
}
