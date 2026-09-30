<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\HomepageCmsController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\NewsletterController;

// API Version 1 Group
Route::prefix('v1')->group(function () {
    Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);

    // ==========================================
    // Public Storefront Endpoints
    // ==========================================
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
    
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);
    
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{slug}', [CategoryController::class, 'show']);
    
    Route::get('/banners', [BannerController::class, 'index']);
    Route::get('/homepage', [HomepageCmsController::class, 'index']);
    Route::get('/settings', [SettingController::class, 'index']);
    
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/track/{order_number}', [OrderController::class, 'track']);
    Route::post('/coupons/validate', [CouponController::class, 'validateCoupon']);

    // ==========================================
    // Authenticated Customer Endpoints
    // ==========================================
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/profile', [AuthController::class, 'profile']);
        Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
        Route::get('/auth/orders', [OrderController::class, 'customerOrders']);
    });

    // ==========================================
    // Public Admin Auth Endpoint
    // ==========================================
    Route::post('/admin/auth/login', [AuthController::class, 'adminLogin']);

    // ==========================================
    // Authenticated Admin Dashboard/CRUD Endpoints
    // ==========================================
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        // Dashboard Stats
        Route::get('/dashboard', [OrderController::class, 'dashboardStats']);

        // Media Library Upload
        Route::post('/media/upload', [MediaController::class, 'upload']);

        // CMS & Settings
        Route::put('/homepage', [HomepageCmsController::class, 'update']);
        Route::put('/settings', [SettingController::class, 'update']);

        // Products CRUD
        Route::get('/products', [ProductController::class, 'adminIndex']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{id}', [ProductController::class, 'update']);
        Route::delete('/products/{id}', [ProductController::class, 'destroy']);

        // Categories CRUD
        Route::get('/categories', [CategoryController::class, 'adminIndex']);
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

        // Banners CRUD
        Route::get('/banners', [BannerController::class, 'adminIndex']);
        Route::post('/banners', [BannerController::class, 'store']);
        Route::put('/banners/{id}', [BannerController::class, 'update']);
        Route::delete('/banners/{id}', [BannerController::class, 'destroy']);

        // Orders Management
        Route::get('/orders', [OrderController::class, 'adminIndex']);
        Route::get('/orders/{id}', [OrderController::class, 'show']);
        Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);

        // Coupons CRUD
        Route::get('/coupons', [CouponController::class, 'index']);
        Route::post('/coupons', [CouponController::class, 'store']);
        Route::put('/coupons/{id}', [CouponController::class, 'update']);
        Route::delete('/coupons/{id}', [CouponController::class, 'destroy']);

        // Users Management
        Route::get('/users', [AuthController::class, 'adminUsers']);
        Route::delete('/users/{id}', [AuthController::class, 'adminDeleteUser']);
    });
});
