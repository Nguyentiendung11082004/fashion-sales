<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        // dd($request->all());
        try {
            $data = $request->all();
            // if (Auth::check()) {
            // Người dùng đã đăng nhập
            // $user_id = Auth::id();
            $user = User::findOrFail(1)->only(['id', 'name', 'email', 'address', 'phone_number']);
            // Xử lý logic thanh toán hoặc trả về dữ liệu người dùng
            if (isset($data['item_ids']) && is_array($data['item_ids'])) {
                $cart = Cart::query()
                    ->where('user_id', $user['id']) // Lọc theo user_id của người dùng
                    ->with([
                        "cartitems" => function ($query) use ($data) {
                            // Lọc theo các ID trong mảng item_ids
                            $query->whereIn('id', $data['item_ids']);
                        },
                        // Các mối quan hệ khác: product và productvariant.attributes
                        "cartitems.product",
                        "cartitems.productvariant.attributes"
                    ])
                    ->first()
                    ->toArray();
                $sub_total = 0;
                $total_items = 0;
                foreach ($cart["cartitems"] as  $key =>  $cartitem) {
                    $quantity = $cartitem["quantity"];
                    $total_items += 1;
                    if ($cartitem["productvariant"]) {
                        $variant_price = $cartitem["productvariant"]["price_sale"];

                        $cart["cartitems"][$key]["total_price"] = $variant_price * $quantity;
                    } else {

                        $product_price = $cartitem["product"]["price_sale"];

                        $cart["cartitems"][$key]["total_price"] = $product_price * $quantity;
                    }
                    $sub_total += $cart["cartitems"][$key]["total_price"];
                }
                return response()->json([
                    "message" => "lấy dữ liệu thành công",
                    "user" => $user,
                    "sub_total" => $sub_total,
                    "total_items" => $total_items,
                    "cart" => $cart,
                    // "sub_total" => $sub_total
                ], Response::HTTP_OK);
            }
        } catch (\Exception $ex) {
            return response()->json(
                ["message" => $ex->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
