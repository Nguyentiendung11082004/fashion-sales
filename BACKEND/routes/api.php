<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Admin\TagController;
use App\Http\Controllers\Api\V1\Admin\BrandController;
use App\Http\Controllers\Api\V1\Client\AuthController;
use App\Http\Controllers\Api\V1\Client\CartController;
use App\Http\Controllers\Api\V1\Client\ConversationController;
use App\Http\Controllers\Api\V1\Client\MessageController;
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
use App\Http\Controllers\Api\V1\Client\ChatController;
use App\Http\Controllers\Api\V1\Client\ProductDetailController;
use App\Http\Controllers\Api\V1\Client\InforUserController;
use App\Http\Controllers\API\V1\Service\PaymentController;

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
    Route::apiResource('posts', PostController::class);
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
    
    Route::get("getprovinces",[CheckoutController::class,"getProvinces"]);
    Route::post("getdistricts",[CheckoutController::class,"getDistricts"]);
    Route::post("getwards",[CheckoutController::class,"getWards"]);
    Route::post("getavailableservices",[CheckoutController::class,"getAvailableServices"]);
    Route::post("calculateshippingfee",[CheckoutController::class,"calculateShippingFee"]);
    Route::post('/payment/vnpay', [PaymentController::class, 'createPayment']);
    Route::get('/payment/vnpay-return', [PaymentController::class, 'vnpayReturn']);


});

Route::get('comment', [CommentController::class, 'index']);
Route::middleware('auth:sanctum')->prefix('v1/')->group(function () {
    Route::apiResource('cart', CartController::class);
    Route::apiResource('wishlist', WishlistController::class);
    Route::get('/user', [InforUserController::class, 'getInforUser']);
    Route::put('/user/update', [InforUserController::class, 'updateInforUser']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Client routes cho bình luận (comments)
   
   


     // Tạo hoặc lấy cuộc trò chuyện giữa hai người dùng
     Route::post('conversations', [ConversationController::class, 'store']);

     // Lấy tất cả các cuộc trò chuyện của người dùng
     Route::get('conversations', [ConversationController::class, 'index']);
 
     // Lấy tin nhắn trong một cuộc trò chuyện
     Route::get('conversations/messages/{conversation}', [MessageController::class, 'index']);
 
     // Gửi tin nhắn trong một cuộc trò chuyện
     Route::post('conversations/messages/{conversation}', [MessageController::class, 'store']);
     Route::post('conversations/messages', [MessageController::class, 'store']);
     Route::resource("chat",ChatController::class);
     Route::delete('chat-message/{conversation}',[ChatController::class,"deleteMessage"]);

    Route::apiResource('comment', CommentController::class);
   
});
