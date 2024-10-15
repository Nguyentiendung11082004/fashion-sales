<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Models\Cart;
use App\Models\User;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Helper\Product\GetUniqueAttribute;
use App\Http\Requests\Checkout\StoreCheckoutRequest;

class CheckoutController extends Controller
{
    public function store(StoreCheckoutRequest $request)
    {
        try {
            $data = $request->validated(); // Lấy dữ liệu đã xác thực
            // Kiểm tra xem người dùng có muốn mua ngay hay không
            $isImmediatePurchase = isset($data['product_id']) && isset($data['quantity']);
            // Kiểm tra xem người dùng có muốn mua từ giỏ hàng hay không
            $isCartPurchase = isset($data['cart_item_ids']) && is_array($data['cart_item_ids']) && count($data['cart_item_ids']) > 0;

            // Nếu cả hai trường hợp đều không đúng thì trả về lỗi
            if (!$isImmediatePurchase && !$isCartPurchase) {
                return response()->json(['message' => 'Phải chọn mua ngay hoặc mua từ giỏ hàng.'], Response::HTTP_BAD_REQUEST);
            } elseif ($isImmediatePurchase && $isCartPurchase) {
                return response()->json(['message' => 'Phải chọn mua ngay hoặc mua từ giỏ hàng.'], Response::HTTP_BAD_REQUEST);
            }

            // Initialize variables for sub_total and cart_items
            $sub_total = 0;
            $total_items = 0;
            $order_items = [];
            if (auth('sanctum')->check()) {
                $user_id = auth('sanctum')->id();
                $user = User::findOrFail($user_id)->only(['id', 'name', 'email', 'address', 'phone_number']);
                if ($isCartPurchase) {
                    // Handle cart purchase logic for logged-in users
                    $order_items = Cart::query()
                        ->where('user_id', $user['id'])
                        ->with([
                            "cartitems" => function ($query) use ($data) {
                                $query->whereIn('id', $data['cart_item_ids']);
                            },
                            "cartitems.product",
                            "cartitems.productvariant.attributes"
                        ])
                        ->first()
                        ->toArray();

                    foreach ($order_items["cartitems"] as $key => $order_item) {
                        $quantity = $order_item["quantity"];
                        $total_items += 1;

                        if ($order_item["productvariant"]) {
                            $variant_price = $order_item["productvariant"]["price_sale"];
                            $cart["cartitems"][$key]["total_price"] = $variant_price * $quantity;
                        } else {
                            $product_price = $order_item["product"]["price_sale"];
                            $cart["cartitems"][$key]["total_price"] = $product_price * $quantity;
                        }
                        $sub_total += $cart["cartitems"][$key]["total_price"];
                    }
                } elseif ($isImmediatePurchase) {
                    $product = Product::with('variants')->findOrFail($data['product_id']);
                    $quantity = $data['quantity'];
                    $total_items += 1;
                    if ($product->type == 1) {
                        if (!isset($data['product_variant_id'])) {
                            return response()->json(['message' => 'Sản phẩm này có biến thể. Vui lòng chọn biến thể. haha'], Response::HTTP_BAD_REQUEST);
                        }
                        $variant = $product->variants()->findOrFail($data['product_variant_id']);
                        $total_price = $variant->price_sale * $quantity;
                    } else {
                        $total_price = $product->price_sale * $quantity;
                    }

                    $sub_total = $total_price;
                    $order_items[] = [
                        'quantity' => $quantity,
                        'total_price' => $total_price,
                        'product' => $product,
                    ];
                }
            } else {
                // Người dùng chưa đăng nhập
                if ($isImmediatePurchase) {

                    $product = Product::with('variants')->findOrFail($data['product_id']);

                    $quantity = $data['quantity'];
                    $total_items += 1;

                    if ($product->type == 1) {
                        if (!isset($data['product_variant_id'])) {
                            return response()->json(['message' => 'Sản phẩm này có biến thể. Vui lòng chọn biến thể. haha'], Response::HTTP_BAD_REQUEST);
                        }
                        $variant = $product->variants()->findOrFail($data['product_variant_id']);
                        $total_price = $variant->price_sale * $quantity;
                    } else {
                        $total_price = $product->price_sale * $quantity;
                    }

                    $sub_total = $total_price;
                    $order_items[] = [
                        'quantity' => $quantity,
                        'total_price' => $total_price,
                        'product' => $product,
                    ];
                } else {
                    return response()->json(['message' => 'Bạn cần đăng nhập để mua từ giỏ hàng.'], Response::HTTP_BAD_REQUEST);
                }
            }
            return response()->json([
                "message" => "Dữ liệu thành công",
                "user" => $user ?? null, // return user only if logged in
                "sub_total" => $sub_total,
                "total_items" => $total_items,
                "order_items" => $order_items
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json(
                ["message" => $ex->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function update(Request $request, string $id)
    {
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
                    $request->validate([
                        "product_variant" => "required|array",
                        "product_variant.*"=>"integer|min:1"
                    ]);
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

}
