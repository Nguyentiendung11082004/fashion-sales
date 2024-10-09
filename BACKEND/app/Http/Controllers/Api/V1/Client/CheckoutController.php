<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        try {
            $user_id = Auth::id();
            $cart = Cart::query()->where('user_id', $user_id)->with([
                "cartitems",

                "cartitems.product",
                "cartitems.productvariant.attributes"
            ])->first()->toArray();

            $sub_total = 0;
            foreach ($cart["cartitems"] as  $key =>  $cartitem) {
                $quantity = $cartitem["quantity"];

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
                "cart" => $cart,
                "sub_total" => $sub_total
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json(
                ["message" => $ex->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
