<?php

use App\Http\Controllers\Api\V1\Admin\BrandController;
use App\Http\Controllers\Api\V1\Admin\CommentsController;
use App\Http\Controllers\Api\V1\Admin\ProductController;
use App\Http\Controllers\Api\V1\Admin\TagController;
use App\Http\Controllers\Api\V1\Client\ProductDetailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix("v1/")->group(function(){
    Route::resource("products",ProductController::class);
    Route::resource("comments",CommentsController::class);
    Route::resource("brand",BrandController::class);
    Route::resource("tags",TagController::class);


//  để tạm vậy rồi tôi sẽ chia các route admin và client ra sau.
    // client
    Route::get('product-detail/{product_id}',[ProductDetailController::class,"productdetail"]);


});

