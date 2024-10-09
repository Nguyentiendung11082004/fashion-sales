<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        if (Auth::check()) {
            // Người dùng đã đăng nhập
            $user_id = Auth::id();
            $user = User::findOrFail(1)->only(['id', 'name', 'email', 'address', 'phone_number']);
            // Xử lý logic thanh toán hoặc trả về dữ liệu người dùng
            
        } else {
          
        }
    }
}
