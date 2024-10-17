<?php

use App\Http\Controllers\Api\V1\Admin\BrandController;
use App\Http\Controllers\Api\V1\Admin\CommentsController;
use App\Http\Controllers\Api\V1\Admin\ProductController;
use App\Http\Controllers\Api\V1\Admin\TagController;
use App\Http\Controllers\Api\V1\Client\ProductDetailController;
use App\Http\Controllers\Api\V1\Admin\ClientController;
use App\Http\Controllers\Api\V1\Admin\EmployeeController;
use App\Http\Controllers\Api\V1\Client\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Admin\CategoryController;
use App\Http\Controllers\Api\V1\Admin\AttributeController;
use App\Http\Controllers\Api\V1\Admin\AttributeItemController;
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

    Route::middleware('auth:sanctum')->get('/user', [InforUserController::class, 'getInforUser']);
    Route::middleware('auth:sanctum')->put('/user/update', [InforUserController::class, 'updateInforUser']);

    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

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

   
    //  để tạm vậy rồi tôi sẽ chia các route admin và client ra sau.
    // client
    Route::get('product-detail/{product_id}', [ProductDetailController::class, "productdetail"]);
});




Route::middleware('auth:sanctum')->prefix('v1/')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    

});

