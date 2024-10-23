<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Admin\TagController;
use App\Http\Controllers\Api\V1\Admin\BrandController;
use App\Http\Controllers\Api\V1\Client\AuthController;
use App\Http\Controllers\Api\V1\Client\CartController;
use App\Http\Controllers\Api\V1\Admin\ClientController;
use App\Http\Controllers\Api\V1\Client\OrderController;
use App\Http\Controllers\Api\V1\Admin\ProductController;
use App\Http\Controllers\Api\V1\Admin\CategoryController;
use App\Http\Controllers\Api\V1\Admin\CommentsController;
use App\Http\Controllers\Api\V1\Admin\EmployeeController;
use App\Http\Controllers\Api\V1\Admin\AttributeController;
use App\Http\Controllers\Api\V1\Admin\AttributeItemController;
use App\Http\Controllers\Api\V1\Admin\BannerController;
use App\Http\Controllers\Api\V1\Admin\PostController;
use App\Http\Controllers\Api\V1\Client\CommentController;
use App\Http\Controllers\Api\V1\Client\CheckoutController;
use App\Http\Controllers\Api\V1\Client\WishlistController;
use App\Http\Controllers\Api\V1\Client\HomeProductController;
use App\Http\Controllers\Api\V1\Client\ProductShopController;
use App\Http\Controllers\Api\V1\Client\ProductDetailController;

use App\Http\Controllers\Api\V1\Client\InforUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix("v1/")->group(function () {
    Route::resource("products", ProductController::class);
    Route::resource("comments", CommentsController::class);
    Route::resource("brand", BrandController::class);
    Route::resource("tags", TagController::class);
    Route::resource('employees', EmployeeController::class);
    Route::resource('clients', ClientController::class);
    Route::apiResource('attribute', AttributeController::class);
    Route::apiResource('attributeItem', AttributeItemController::class);
    Route::apiResource('category', CategoryController::class);
    Route::apiResource('banners', BannerController::class);
    Route::get('check-banner-validity', [BannerController::class, 'checkBannerValidity']);
    Route::get('check-banner-validity/{id}', [BannerController::class, 'checkBannerValidity']);
    Route::get('/posts-by-category', [PostController::class, 'getPostsGroupedByCategory']);
    Route::get('product-home', [HomeProductController::class, "getHomeProducts"]);
    Route::get('product-detail/{product_id}', [ProductDetailController::class, "productdetail"]);
    Route::post('product-shop', [ProductShopController::class, "getAllProduct"]);
    Route::get('find-variant/{product_id}', [ProductDetailController::class, "findvariant"]);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::resource('order', OrderController::class);
    Route::resource('checkout', CheckoutController::class);
    //Gửi mail
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
        ->middleware(['signed'])->name('verification.verify');
    // Resend Mail
    Route::post('/email/verification-notification', [AuthController::class, 'resendVerifyEmail'])
        ->middleware(['throttle:6,1'])->name('verification.send');
    Route::post('password/forgot', [AuthController::class, 'sendResetPassWordMail']);
    Route::get('password/reset/{token}', [AuthController::class, 'showResetForm'])
        ->name('password.reset');
    Route::post('password/reset', [AuthController::class, 'reset']);
});


Route::middleware('auth:sanctum')->prefix('v1/')->group(function () {
    Route::apiResource('cart', CartController::class);
    Route::apiResource('wishlist', WishlistController::class);
    Route::get('/user', [InforUserController::class, 'getInforUser']);
    Route::put('/user/update', [InforUserController::class, 'updateInforUser']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Client routes cho bình luận (comments)
    // đức sửa lại
    Route::get('/posts', [PostController::class, 'index']);

    // Lấy danh sách bình luận
    Route::post('comment', [CommentController::class, 'store']); // Thêm bình luận mới
    Route::get('comment/{id}', [CommentController::class, 'show']); // Lấy chi tiết bình luận
    Route::put('comment/{id}', [CommentController::class, 'update']); // Cập nhật bình luận
    Route::delete('comment/{id}', [CommentController::class, 'destroy']); // Xóa bình luận
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
});
