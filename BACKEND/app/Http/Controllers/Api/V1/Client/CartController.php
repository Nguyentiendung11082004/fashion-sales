<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        dd(Auth::user()->id);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {


            $respone = DB::transaction(function () use ($request) {
                // dd($request->all());
                $user = Auth::user();
                $variant = ProductVariant::find($request->input('product_variant_id'));
               
                // Lấy hoặc tạo giỏ hàng của người dùng
                $cart = Cart::firstOrCreate([
                    'user_id' => $user->id
                ]);
                // Tìm biến thể sản phẩm
                if (!$variant) {
                    return response()->json(['error' => 'Variant not found'], 404);
                }


                // Kiểm tra xem sản phẩm này đã có trong giỏ hàng chưa
                $cartItem = CartItem::where([
                    ['cart_id', $cart->id],
                    ['product_variant_id', $variant->id]
                ])->first();

                if ($cartItem) {
                    // Nếu đã có thì tăng số lượng
                    $cartItem->quantity += $request->input('quantity', 1);
                    $cartItem->save();
                } else {
                    // Nếu chưa có thì thêm mới
                    CartItem::create([
                        'cart_id' => $cart->id,
                        'product_variant_id' => $variant->id,
                        'quantity' => $request->input('quantity', 1),
                    ]);
                }

                return ['message' => 'Thêm dữ liệu vào giỏ hàng thành công',Response::HTTP_OK];
            });
            return response()->json($respone);
        } catch (\Exception $ex) {
            return response()->json(
                [
                    "message" => $ex->getMessage()
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
