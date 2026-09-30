<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !in_array($request->user()->role, ['staff', 'admin', 'super_admin'])) {
            return response()->json([
                'success' => false,
                'message' => 'Access Denied: Administrative privileges required.'
            ], 403);
        }

        return $next($request);
    }
}
