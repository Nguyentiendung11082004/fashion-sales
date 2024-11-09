<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Events\CartEvent;
use App\Http\Controllers\Controller;
use App\Http\Helper\Product\GetUniqueAttribute;
use App\Http\Requests\Cart\StoreCart;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Console\Input\Input;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user_id = Auth::id();
            $cart = Cart::query()->where('user_id', $user_id)->with([
                "cartitems",
                "cartitems.product",
                "cartitems.productvariant.attributes",
            ])->first();
            if (!$cart) {
                return response()->json([
                    "message"=>"Chưa có sản phẩm nào trong giỏ hàng."
                ],Response::HTTP_OK);
            }else{
                $cart->toArray();
            }
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCart $request)
    {

        try {
            return DB::transaction(function () use ($request) {


                $user = Auth::user();
                if (!$user) {
                    return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
                }

                $cart = Cart::firstOrCreate(['user_id' => $user->id]);

                // Lấy thông tin sản phẩm
                $product = Product::findOrFail($request->product_id);

                $variant = null;

                if ($product->type) {
                    $variant = ProductVariant::findOrFail($request->product_variant_id);
                }

                // Kiểm tra xem sản phẩm (hoặc biến thể) đã có trong giỏ chưa
                $cartItemQuery = CartItem::where('cart_id', $cart->id)
                    ->where('product_id', $product->id);

                if ($variant) {
                    $cartItemQuery->where('product_variant_id', $variant->id);
                } else {
                    $cartItemQuery->whereNull('product_variant_id');
                }
                $cartItem = $cartItemQuery->first();
                // dd($cartItem->toArray());
                if ($cartItem) {
                    // Kiểm tra lại số lượng có sẵn trước khi cập nhật
                    if ($product->type) {
                        if (($cartItem->quantity + $request->quantity) > $variant->quantity) {
                            return response()->json(
                                ['message' => 'Số lượng sản phẩm bạn yêu cầu và số lượng sản phẩm trong giỏ hàng đã vượt quá số lượng có sẵn của biến thể sản phẩm.'],
                                422
                            );
                        }
                    } else {
                        if (($cartItem->quantity + $request->quantity) > $product->quantity) {
                            return response()->json(['message' => 'Số lượng yêu cầu và số lượng trong giỏ hàng của bạn đã vượt quá số lượng có sẵn của sản phẩm.'], 422);
                        }
                    }

                    // Cập nhật số lượng và giá
                    $cartItem->quantity += $request->quantity;

                    $cartItem->save();
                } else {
                    // Tạo mới mục giỏ hàng
                    $cartItem=CartItem::create([
                        'cart_id' => $cart->id,
                        'product_id' => $product->id,
                        'product_variant_id' => $variant ? $variant->id : null,
                        'quantity' => $request->quantity,

                    ]);
                }

                broadcast(new CartEvent($cart->id, $cartItem))->toOthers();

                return response()->json(['message' => 'Thêm vào giỏ hàng thành công'], Response::HTTP_OK);
            });
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

        try {
            return DB::transaction(function () use ($id) {
                // $user_id = Auth::id();
                $cart_item = CartItem::query()->findOrFail($id)->load(
                    [
                        "cart",
                        "productvariant.attributes",
                        "product.variants.attributes",
                    ]
                )->toArray();
                

                $product_variant = Product::query()->findOrFail($cart_item['product']['type'] ? $cart_item["productvariant"]["product_id"] : $cart_item['product']['id'])->load(["variants.attributes"])->toArray();
                $getUniqueAttributes = new GetUniqueAttribute();

                return response()->json([
                    "getuniqueattributes" => $getUniqueAttributes->getUniqueAttributes($product_variant["variants"]),
                    "cart_item" => $cart_item
                ], Response::HTTP_OK);
            });
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        try {

            return DB::transaction(function () use ($request, $id) {
                $request->validate([
                    "quantity" => "required|integer|min:1"
                ]);
                $cart_item = CartItem::query()->findOrFail($id);
                $product = Product::query()->findOrFail($cart_item->product_id);
                if ($product->quantity < $request->input('quantity') && !$cart_item->product_variant_id) {
                    return response()->json([
                        "message" => "Số lượng bạn cập nhật đã vượt quá số lượng sản phẩm tồn kho",

                    ], Response::HTTP_INTERNAL_SERVER_ERROR);
                }

                if ($cart_item->product_variant_id) {
                   
                    $getUniqueAttributes = new GetUniqueAttribute();
                    $product_variant = Product::query()->findOrFail($cart_item->product_id)->load(["variants", "variants.attributes"])->toArray();

                    $findVariant = $getUniqueAttributes->findVariantByAttributes($product_variant["variants"], $request->input('product_variant'));
                    if ($findVariant["quantity"] < $request->input('quantity')) {
                        return response()->json([
                            "message" => "Số lượng bạn cập nhật đã vượt quá số lượng sản phẩm tồn kho",
    
                        ], Response::HTTP_INTERNAL_SERVER_ERROR);
                    }
                    $cart_item->product_variant_id = $findVariant["id"];
                    $cart_item->quantity=$request->input("quantity");
                    

                } else {
                    $cart_item->quantity = $request->input("quantity");
                }
                $cart_item->save();
                
                return response()->json(["message" => "cập nhật giỏ hàng thành công."], Response::HTTP_OK);
            });
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

        try {

            return DB::transaction(function () use ($id) {
                $cart_item_ids = json_decode($id);
                foreach ($cart_item_ids as $item_id) {
                    CartItem::query()->findOrFail($item_id)->delete();
                }
                $cart = Cart::query()->with('cartitems')->first()->toArray();
                if (empty($cart["cartitems"])) {

                    Cart::query()->findOrFail($cart["id"])->delete();
                }

                return response()->json(
                    [
                        "message" => "xóa dữ liệu thành công"
                    ]
                );
            });
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
