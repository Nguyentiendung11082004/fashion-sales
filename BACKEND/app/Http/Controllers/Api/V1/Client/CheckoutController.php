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
                    $cart = Cart::query()
                        ->where('user_id', $user['id'])
                        ->with([
                            "cartitems" => function ($query) use ($data) {
                                $query->whereIn('id', $data['cart_item_ids']);
                            },
                            "cartitems.product",
                            "cartitems.productvariant"
                        ])
                        ->first();
    
                    if (!$cart || $cart->cartitems->isEmpty()) {
                        return response()->json(['message' => 'Sản phẩm không tồn tại trong giỏ hàng'], 400);
                    }
    
                    // Kiểm tra nếu có sản phẩm nào không tồn tại trong giỏ hàng
                    $invalid_items = array_diff($data['cart_item_ids'], $cart->cartitems->pluck('id')->toArray());
    
                    if (!empty($invalid_items)) {
                        return response()->json([
                            'message' => 'Sản phẩm không tồn tại trong giỏ hàng',
                            'invalid_items' => $invalid_items // Gửi danh sách sản phẩm không hợp lệ để người dùng biết
                        ], 400);
                    }
    
                    foreach ($cart->cartitems as $cart_item) {
                        $quantity = $cart_item->quantity;
                        $total_items += 1;
    
                        if ($cart_item->productvariant) {
                            $variant_price = $cart_item->productvariant->price_sale;
                            $total_price = $variant_price * $quantity;
                        } else {
                            $product_price = $cart_item->product->price_sale;
                            $total_price = $product_price * $quantity;
                        }
    
                        $sub_total += $total_price;
                        $order_items[] = [
                            'quantity' => $quantity,
                            'total_price' => $total_price,
                            'product' => $cart_item->product,
                            'variant' => $cart_item->productvariant ?? null
                        ];
                    }
                } elseif ($isImmediatePurchase) {
                    // Handle immediate purchase
                    $product = Product::with('variants')->findOrFail($data['product_id']);
                    $quantity = $data['quantity'];
                    $total_items += 1;
    
                    if ($product->type == 1) {
                        // Sản phẩm có biến thể
                        if (!isset($data['product_variant_id'])) {
                            return response()->json(['message' => 'Sản phẩm này có biến thể. Vui lòng chọn biến thể.'], Response::HTTP_BAD_REQUEST);
                        }
                        $variant = $product->variants()->findOrFail($data['product_variant_id']);
                        $total_price = $variant->price_sale * $quantity;
                    } else {
                        // Sản phẩm đơn
                        $total_price = $product->price_sale * $quantity;
                    }
    
                    $sub_total = $total_price;
                    $order_items[] = [
                        'quantity' => $quantity,
                        'total_price' => $total_price,
                        'product' => $product,
                        'variant' => $variant ?? null
                    ];
                }
            } else {
                // Người dùng chưa đăng nhập
                if ($isImmediatePurchase) {
                    $product = Product::with('variants')->findOrFail($data['product_id']);
                    $quantity = $data['quantity'];
                    $total_items += 1;
    
                    if ($product->type == 1) {
                        // Sản phẩm có biến thể
                        if (!isset($data['product_variant_id'])) {
                            return response()->json(['message' => 'Sản phẩm này có biến thể. Vui lòng chọn biến thể.'], Response::HTTP_BAD_REQUEST);
                        }
                        $variant = $product->variants()->findOrFail($data['product_variant_id']);
                        $total_price = $variant->price_sale * $quantity;
                    } else {
                        // Sản phẩm đơn
                        $total_price = $product->price_sale * $quantity;
                    }
    
                    $sub_total = $total_price;
                    $order_items[] = [
                        'quantity' => $quantity,
                        'total_price' => $total_price,
                        'product' => $product,
                        'variant' => $variant ?? null
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
    
}
