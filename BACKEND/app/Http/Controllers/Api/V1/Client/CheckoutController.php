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
                            "cartitems.productvariant.attributes"
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
                    $product = Product::with('variants.attributes')->findOrFail($data['product_id']);
                    // dd($product);
                    $quantity = $data['quantity'];
                    $total_items += 1;

                    if ($product->type == 1) {
                        // Sản phẩm có biến thể
                        if (!isset($data['product_variant_id'])) {
                            return response()->json(['message' => 'Sản phẩm này có biến thể. Vui lòng chọn biến thể.'], Response::HTTP_BAD_REQUEST);
                        }
                        $variant = $product->variants()->with('attributes')->findOrFail($data['product_variant_id']);
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
                    $product = Product::query()->findOrFail($data['product_id']);
                    $quantity = $data['quantity'];
                    $total_items += 1;

                    if ($product->type == 1) {
                        // Sản phẩm có biến thể
                        if (!isset($data['product_variant_id'])) {
                            return response()->json(['message' => 'Sản phẩm này có biến thể. Vui lòng chọn biến thể.'], Response::HTTP_BAD_REQUEST);
                        }
                        $variant = $product->variants()
                            ->with('attributes') // Gọi thêm attributes
                            ->findOrFail($data['product_variant_id']);
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

    public function getProvinces()
    {
        try {

            $api_key = '18f28540-8fbc-11ef-839a-16ebf09470c6';

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, "https://online-gateway.ghn.vn/shiip/public-api/master-data/province");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Token: ' . $api_key,
                'Content-Type: application/json'
            ]);

            $response = curl_exec($ch);
            curl_close($ch);

            $provinces = json_decode($response, true)['data'];

            return response()->json([
                "message" => "Lấy dữ liệu thành công",
                "provinces" => $provinces
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function getDistricts(Request $request)
    {
        try {

            $request->validate([
                "province_id" => "required|integer",
            ]);
            $province_id = $request->province_id;
            $api_key = '18f28540-8fbc-11ef-839a-16ebf09470c6';

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, "https://online-gateway.ghn.vn/shiip/public-api/master-data/district");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['province_id' => $province_id]));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Token: ' . $api_key,
                'Content-Type: application/json'
            ]);

            $response = curl_exec($ch);
            curl_close($ch);

            $districts = json_decode($response, true)['data'];

            return response()->json([
                "message" => "Lấy dữ liệu thành công",
                "districts" => $districts
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function getWards(Request $request)
    {
        try {

            $request->validate([
                "district_id" => "required|integer"
            ]);

            $district_id = $request->district_id;
            $api_key = '18f28540-8fbc-11ef-839a-16ebf09470c6';


            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['district_id' => $district_id]));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Token: ' . $api_key,
                'Content-Type: application/json'
            ]);

            $response = curl_exec($ch);
            curl_close($ch);

            $wards = json_decode($response, true)['data'];

            return response()->json([
                "message" => "Lấy dữ liệu thành công",
                "wards" => $wards
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ]);
        }
    }
    // lấy ra các dịch vụ vận chuyển
    public function getAvailableServices(Request $request)
    {
        try {

            $request->validate([
                "from_district_id" => "required",
                "to_district_id" => "required",
                // "weight"=>"required",
            ]);
            $from_district_id = $request->from_district_id;
            $to_district_id = $request->to_district_id;
            // $weight = $request->weight;
            $api_key = '18f28540-8fbc-11ef-839a-16ebf09470c6';


            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
                'shop_id' => 5404595,  // Thay YOUR_SHOP_ID bằng mã shop GHN của bạn
                'from_district' => $from_district_id,
                'to_district' => $to_district_id,
                // 'weight' => $weight
            ]));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Token: ' . $api_key,
                'Content-Type: application/json'
            ]);

            $response = curl_exec($ch);
            curl_close($ch);

            $services = json_decode($response, true)['data'];

            return response()->json([
                "services" => $services
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function calculateShippingFee(Request $request)
    {
        try {
            $request->validate([
                "from_district_id" => "required",
                "to_district_id" => "required",
                "weight" => "required", //đơn vị tính g
                "service_id" => "required",
                "insurance_value" => "nullable",
                "coupon" => "nullable",
            ]);
            $from_district_id = $request->from_district_id;
            $to_district_id = $request->to_district_id;
            $weight = $request->weight;
            $service_id = $request->service_id; // Dịch vụ vận chuyển mà bạn chọn
            $insurance_value = $request->insurance_value; // Giá trị bảo hiểm hàng hóa (nếu có)
            $coupon = $request->coupon; // Mã giảm giá (nếu có)
            $api_key = '18f28540-8fbc-11ef-839a-16ebf09470c6';
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
                'service_id' => $service_id,
                'insurance_value' => $insurance_value,
                'coupon' => $coupon,
                'from_district_id' => $from_district_id,
                'to_district_id' => $to_district_id,
                'weight' => $weight,
                // 'length' => $request->length, // chiều dài (nếu có)
                // 'width' => $request->width,   // chiều rộng (nếu có)
                // 'height' => $request->height  // chiều cao (nếu có)
            ]));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Token: ' . $api_key,
                'Content-Type: application/json'
            ]);

            $response = curl_exec($ch);
            curl_close($ch);

            $fee = json_decode($response, true)['data'];

            return response()->json([
                "fee" => $fee
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
