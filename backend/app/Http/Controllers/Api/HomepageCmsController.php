<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomepageCms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\AuditLog;

class HomepageCmsController extends Controller
{
    public function index()
    {
        $cms = HomepageCms::pluck('value', 'key');

        return response()->json([
            'success' => true,
            'data' => $cms
        ]);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cms' => 'required|array',
            'cms.*' => 'nullable|string', // keys are array keys, values are string values
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $cmsData = $request->input('cms');

        foreach ($cmsData as $key => $value) {
            HomepageCms::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        AuditLog::create([
            'user_id' => $request->user()?->id,
            'action' => 'update_homepage_cms',
            'metadata' => json_encode($cmsData)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Homepage content updated successfully',
            'data' => HomepageCms::pluck('value', 'key')
        ]);
    }
}
