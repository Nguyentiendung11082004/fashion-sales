<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Models\Cart;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\Voucher;
use App\Models\CartItem;
use App\Models\VoucherLog;
use App\Models\OrderDetail;
use App\Models\VoucherMeta;
use App\Models\VoucherUser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Requests\Order\UpdateOrderRequest;
use App\Http\Controllers\API\V1\Service\PaymentController;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            if (Auth::check()) {
                $user_id = Auth::id();

                // Get all orders for the authenticated user, including order details
                $orders = Order::query()
                    ->where('user_id', $user_id)
                    ->get();

                return response()->json($orders, 200);
            } else {
                return response()->json(['message' => 'User not authenticated'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function store(StoreOrderRequest $request)
    {
        try {
            $data = $request->validated(); // Lấy dữ liệu đã xác thực
            // dd($data);
            // Kiểm tra xem người dùng có muốn mua ngay hay không
            $isImmediatePurchase = isset($data['id_product']) && isset($data['quantity']);
            $isCartPurchase = isset($data['cart_item_ids']) && is_array($data['cart_item_ids']) && count($data['cart_item_ids']) > 0;
            // Nếu cả hai trường hợp đều không đúng thì trả về lỗi
            if (!$isImmediatePurchase && !$isCartPurchase) {
                return response()->json(['message' => 'Phải chọn mua ngay hoặc mua từ giỏ hàng.'], Response::HTTP_BAD_REQUEST);
            } elseif ($isImmediatePurchase && $isCartPurchase) {
                return response()->json(['message' => 'Phải chọn mua ngay hoặc mua từ giỏ hàng.'], Response::HTTP_BAD_REQUEST);
            }

            if (auth('sanctum')->check()) {
                $user_id = auth('sanctum')->id();
            } else {
                if (!isset($data['ship_user_email'])) {
                    return response()->json(['message' => 'Vui lòng cung cấp email giao hàng'], Response::HTTP_BAD_REQUEST);
                }
                $existingUser = User::where('email', $data['ship_user_email'])->first();

                if ($existingUser) {
                    return response()->json(['message' => 'Email đã tồn tại'], Response::HTTP_BAD_REQUEST);
                } else {
                    $user = User::create([
                        'name' => $data['ship_user_name'],
                        'email' => $data['ship_user_email'],
                        'password' => bcrypt('12345678'), // Mã hóa mật khẩu
                        'address' => $data['ship_user_address'],
                        'phone_number' => $data['ship_user_phonenumber'],
                        'role_id' => 1,
                        'is_active' => 0,
                    ]);
                    $user_id = $user->id;
                }
            }

            $user = User::findOrFail($user_id)->only(['id', 'name', 'email', 'address', 'phone_number']);
            $response = DB::transaction(function () use ($data, $user, $isImmediatePurchase, $isCartPurchase) {
                // Tạo đơn hàng
                $order = Order::create([
                    'user_id' => $user['id'],
                    'payment_method_id' => $data['payment_method_id'],
                    // 'order_status' => "Đang chờ xác nhận đơn hàng",
                    // 'payment_status' => $data['payment_status'],
                    'total_quantity' => 0,
                    'total' => 0.00,
                    'user_name' => $user['name'],
                    'user_email' => $user['email'],
                    'user_phonenumber' => $user['phone_number'],
                    'user_address' => $user['address'],
                    'user_note' => $data['user_note'],
                    'ship_user_name' => $data['ship_user_name'],
                    'ship_user_phonenumber' => $data['ship_user_phonenumber'],
                    'ship_user_address' => $data['ship_user_address'],
                    'shipping_method' => $data['shipping_method'],
                    'voucher_id' => null,
                    'voucher_discount' => 0,
                ]);
                $totalQuantity = 0;
                $totalPrice = 0.00;

                // Mua ngay sản phẩm
                if ($isImmediatePurchase) {
                    $product = Product::findOrFail($data['id_product']);
                    $quantity = $data['quantity'];

                    // Kiểm tra nếu sản phẩm có biến thể
                    if ($product->type == 1) {
                        if (!isset($data['product_variant_id'])) {
                            return response()->json(['message' => 'Sản phẩm này có biến thể. Vui lòng chọn biến thể.'], Response::HTTP_BAD_REQUEST);
                        }
                        $variant = ProductVariant::with('attributes')->findOrFail($data['product_variant_id']);
                        $variantPrice = $variant->price_sale > 0 ? $variant->price_sale : $variant->price_regular;

                        // Lưu thông tin chi tiết đơn hàng cho sản phẩm biến thể
                        $attributes = [];
                        foreach ($variant->attributes as $attribute) {
                            $attributes[$attribute->name] = $attribute->pivot->value;
                        }
                        OrderDetail::create([
                            'order_id' => $order->id,
                            'product_id' => $product->id,
                            'product_variant_id' => $variant->id,
                            'product_name' => $product->name,
                            'product_img' => $product->img_thumbnail,
                            'attributes' => $attributes,
                            'quantity' => $quantity,
                            'price' => $variantPrice,
                            'total_price' => $variantPrice * $quantity,
                            'discount' => 0,
                        ]);
                        $totalQuantity += $quantity;
                        $totalPrice += $variantPrice * $quantity;
                        $variant->decrement('quantity', $data['quantity']);
                    } else {
                        // Nếu không có biến thể
                        $productPrice = $product->price_sale > 0 ? $product->price_sale : $product->price_regular;
                        OrderDetail::create([
                            'order_id' => $order->id,
                            'product_id' => $product->id,
                            'product_variant_id' => null,
                            'product_name' => $product->name,
                            'product_img' => $product->img_thumbnail,
                            'attributes' => null,
                            'quantity' => $quantity,
                            'price' => $productPrice,
                            'total_price' => $productPrice * $quantity,
                            'discount' => 0,
                        ]);
                        $totalQuantity += $quantity;
                        $totalPrice += $productPrice * $quantity;
                        $product->decrement('quantity', $data['quantity']);
                    }
                }

                // Mua từ giỏ hàng
                if ($isCartPurchase) {
                    $cartItemIds = $data['cart_item_ids'];
                    $quantities = $data['quantityOfCart'];

                    $cart = Cart::query()
                        ->where('user_id', $user['id'])
                        ->with('cartitems.product', 'cartitems.productvariant.attributes')
                        ->first();
                    if (!$cart || $cart->cartitems->isEmpty()) {
                        DB::rollBack(); // Rollback nếu có lỗi
                        return response()->json(['message' => 'Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.'], 400);
                    }
                    $validCartItemFound = false;
                    foreach ($cart->cartitems as $cartItem) {
                        if (in_array($cartItem->id, $cartItemIds)) {
                            $product = $cartItem->product;
                            $variant = $cartItem->productvariant;
                            $validCartItemFound = true;
                            // Lấy số lượng từ request hoặc số lượng trong giỏ hàng
                            $quantity = isset($quantities[$cartItem->id]) ? $quantities[$cartItem->id] : $cartItem->quantity;

                            if ($variant) {
                                $variantPrice = $variant->price_sale > 0 ? $variant->price_sale : $variant->price_regular;
                                $totalQuantity += $quantity;
                                $totalPrice += $variantPrice * $quantity;

                                $attributes = [];
                                foreach ($variant->attributes as $attribute) {
                                    $attributes[$attribute->name] = $attribute->pivot->value;
                                }
                                OrderDetail::create([
                                    'order_id' => $order->id,
                                    'product_id' => $product->id,
                                    'product_variant_id' => $variant->id,
                                    'product_name' => $product->name,
                                    'product_img' => $product->img_thumbnail,
                                    'attributes' => $attributes,
                                    'quantity' => $quantity,
                                    'price' => $variantPrice,
                                    'total_price' => $variantPrice * $quantity,
                                    'discount' => 0,
                                ]);
                                $variant->decrement('quantity', $quantity);
                            } else {
                                $productPrice = $product->price_sale > 0 ? $product->price_sale : $product->price_regular;
                                $totalQuantity += $quantity;
                                $totalPrice += $productPrice * $quantity;

                                OrderDetail::create([
                                    'order_id' => $order->id,
                                    'product_id' => $product->id,
                                    'product_variant_id' => null,
                                    'product_name' => $product->name,
                                    'product_img' => $product->img_thumbnail,
                                    'attributes' => null,
                                    'quantity' => $quantity,
                                    'price' => $productPrice,
                                    'total_price' => $productPrice * $quantity,
                                    'discount' => 0,
                                ]);
                                $product->decrement('quantity', $quantity);
                            }
                        }
                    }
                    // If no valid cart items were found in cartItemIds
                    if (!$validCartItemFound) {
                        DB::rollBack(); // Rollback nếu có lỗi
                        return response()->json([
                            'message' => 'Không có sản phẩm nào trong giỏ hàng phù hợp với yêu cầu của bạn.',
                        ], 400);
                    }
                    // Xóa các sản phẩm đã mua trong giỏ hàng
                    CartItem::whereIn('id', $cartItemIds)->delete();
                }

                // Áp dụng voucher nếu có
                if (isset($data['voucher_code']) && auth('sanctum')->check()) {
                    $voucher_result = $this->applyVoucher($data['voucher_code'], $order->orderDetails, $order->id);
                    if (isset($voucher_result['error'])) {
                        return response()->json(['message' => $voucher_result['error']], Response::HTTP_BAD_REQUEST);
                    }
                    $totalPrice -= $voucher_result['total_discount'];
                    $voucher = $voucher_result['voucher'];
                    // Cập nhật voucher_id và voucher_discount cho order
                    // dd($voucher_result['voucher_discount']);
                    $order->update([
                        'voucher_id' => $voucher->id,
                        'voucher_discount' => $voucher_result['voucher_discount'],
                    ]);
                    // Cập nhật discount cho từng order detail
                    foreach ($voucher_result['eligible_products'] as $product) {
                        // Giả sử bạn có thể xác định variant_id từ sản phẩm
                        $variantId = isset($product['product_variant_id']) ? $product['product_variant_id'] : null;
                        // Tìm kiếm orderDetail dựa trên product_id và variant_id (nếu có)
                        $orderDetail = $order->orderDetails()
                            ->where('product_id', $product['product_id'])
                            ->where('product_variant_id', $variantId)
                            ->first();
                        // dd($orderDetail);
                        if ($orderDetail) {
                            // Cập nhật discount
                            $orderDetail->update([
                                'discount' => $product['voucher_discount'],
                            ]);
                        }
                    }
                    $voucher->increment('used_count', 1);
                }
                // Cập nhật tổng số lượng và tổng tiền cho đơn hàng
                $order->update([
                    'total_quantity' => $order->orderDetails()->count(),
                    'total' => $totalPrice,
                ]);
                // Thực hiện thanh toán nếu chọn phương thức online (VNPay)
                if ($data['payment_method_id'] == 2) {
                    $payment = new PaymentController();
                    $response = $payment->createPayment($order);

                    // Chuyển hướng người dùng đến trang thanh toán
                    return response()->json(['payment_url' => $response['payment_url']], Response::HTTP_OK);
                }
                return response()->json($order->load('orderDetails')->toArray(), Response::HTTP_CREATED);
            });
            return $response;
        } catch (\Exception $ex) {
            return response()->json(['message' => $ex->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    // Hàm applyVoucher
    protected function applyVoucher($voucher_code, $order_items, $order_id)
    {
        $user_id = auth('sanctum')->id();
        $voucher = Voucher::where('code', $voucher_code)
            ->where('is_active', true)
            ->whereDate('start_date', '<=', now())
            ->whereDate('end_date', '>=', now())
            ->first();

        if (!$voucher) {
            return ['error' => 'Voucher không hợp lệ hoặc đã hết hạn.'];
        }

        $voucher_metas = VoucherMeta::where('voucher_id', $voucher->id)->pluck('meta_value', 'meta_key')->toArray();
        $eligible_products = [];
        $ineligible_products = [];
        $sub_total = 0;

        foreach ($order_items as $item) {
            $is_eligible = $this->checkEligibility($item, $voucher_metas);

            if ($is_eligible['status']) {
                $eligible_products[] = $item;
                $sub_total += $item['total_price'];
            } else {
                $item['reason'] = $is_eligible['reason'];
                $ineligible_products[] = $item;
            }
        }

        // Kiểm tra giá trị tối thiểu của đơn hàng
        if (isset($voucher_metas['_voucher_min_order_value']) && $sub_total < $voucher_metas['_voucher_min_order_value']) {
            return [
                'error' => "Tổng giá trị đơn hàng phải lớn hơn " . $voucher_metas['_voucher_min_order_value'] . " để áp dụng voucher này.",
                'ineligible_products' => $ineligible_products,
            ];
        }

        $voucher_discount = $this->calculateDiscount($voucher, $sub_total, $voucher_metas, $eligible_products);

        // Lưu thông tin vào `voucher_log`
        VoucherLog::create([
            'voucher_id' => $voucher->id,
            'user_id' => $user_id,
            'order_id' => $order_id,
            'action' => 'used'
        ]);

        // Lưu vào `voucher_user` hoặc cập nhật số lần sử dụng
        $voucherUser = VoucherUser::where('user_id', $user_id)
            ->where('voucher_id', $voucher->id)
            ->first();

        if ($voucherUser) {
            $voucherUser->increment('usage_count');
        } else {
            VoucherUser::create([
                'user_id' => $user_id,
                'voucher_id' => $voucher->id,
                'usage_count' => 1,
            ]);
        }

        return [
            'voucher' => $voucher,
            'voucher_discount' => $voucher_discount['total_discount'],
            'voucher_description' => $voucher_discount['voucher_description'],
            'eligible_products' => $eligible_products,
            'ineligible_products' => $ineligible_products,
            'total_discount' => $voucher_discount['total_discount'],
            'sub_total_after_discount' => $sub_total - $voucher_discount['total_discount'],
        ];
    }

    // Hàm kiểm tra điều kiện sản phẩm
    protected function checkEligibility($item, $voucher_metas)
    {
        $product_id = $item['product']->id;
        $category_id = $item['product']->category_id;
        $is_eligible = true;
        $reasons = [];

        $allowed_category_ids = isset($voucher_metas['_voucher_category_ids']) ? json_decode($voucher_metas['_voucher_category_ids'], true) : [];
        $excluded_category_ids = isset($voucher_metas['_voucher_exclude_category_ids']) ? json_decode($voucher_metas['_voucher_exclude_category_ids'], true) : [];
        $allowed_product_ids = isset($voucher_metas['_voucher_product_ids']) ? json_decode($voucher_metas['_voucher_product_ids'], true) : [];
        $excluded_product_ids = isset($voucher_metas['_voucher_exclude_product_ids']) ? json_decode($voucher_metas['_voucher_exclude_product_ids'], true) : [];

        if (!empty($allowed_category_ids) && !in_array($category_id, $allowed_category_ids)) {
            $is_eligible = false;
            $reasons[] = 'Sản phẩm này không nằm trong danh mục được áp dụng voucher.';
        }

        if (!empty($excluded_category_ids) && in_array($category_id, $excluded_category_ids)) {
            $is_eligible = false;
            $reasons[] = 'Sản phẩm này thuộc danh mục bị loại trừ khỏi voucher.';
        }

        if (!empty($allowed_product_ids) && !in_array($product_id, $allowed_product_ids)) {
            $is_eligible = false;
            $reasons[] = 'Sản phẩm này không nằm trong danh sách sản phẩm được áp dụng voucher.';
        }

        if (!empty($excluded_product_ids) && in_array($product_id, $excluded_product_ids)) {
            $is_eligible = false;
            $reasons[] = 'Sản phẩm này nằm trong danh sách sản phẩm bị loại trừ khỏi voucher.';
        }

        return [
            'status' => $is_eligible,
            'reason' => implode(' ', $reasons),
        ];
    }

    // Hàm tính toán giảm giá
    protected function calculateDiscount($voucher, $sub_total, $voucher_metas, &$eligible_products)
    {
        $voucher_discount = 0;
        $voucher_description = '';

        if (isset($voucher_metas['_voucher_applies_to_total']) && $voucher_metas['_voucher_applies_to_total']) {
            if ($voucher->discount_type == 'percent') {
                $voucher_discount = ($voucher->discount_value / 100) * $sub_total;
                $voucher_description = "{$voucher->discount_value} percent";
            } elseif ($voucher->discount_type == 'fixed') {
                $voucher_discount = min($voucher->discount_value, $sub_total);
                $voucher_description = "{$voucher->discount_value} fixed";
            }
            return ['total_discount' => $voucher_discount, 'voucher_description' => $voucher_description];
        }

        foreach ($eligible_products as &$item) {
            $item_discount = $voucher->discount_type == 'percent'
                ? ($voucher->discount_value / 100) * $item['total_price']
                : min($voucher->discount_value, $item['total_price']);
            $voucher_discount += $item_discount;
            $item['voucher_discount'] = $item_discount;
            $item['price_after_discount'] = $item['total_price'] - $item_discount;
        }

        return ['total_discount' => $voucher_discount, 'voucher_description' => "{$voucher->discount_value} " . $voucher->discount_type];
    }
    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        try {
            if (auth('sanctum')->check()) {
                $user_id = auth('sanctum')->id();

                // Kiểm tra xem đơn hàng có thuộc về người dùng đã xác thực không
                if ($order->user_id !== $user_id) {
                    return response()->json(['message' => 'Không có quyền truy cập'], 403);
                }

                // Tải thông tin chi tiết đơn hàng
                $order->load('orderDetails');

                // Trả về dữ liệu đơn hàng cùng với chi tiết dưới dạng JSON
                return response()->json($order->toArray(), 200);
            }

            return response()->json(['message' => 'Người dùng chưa được xác thực'], 401);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        try {
            if (auth('sanctum')->check()) {
                $user_id = auth('sanctum')->id();

                // Get all orders for the authenticated user, including order details
                $orders = Order::query()
                    ->where('user_id', $user_id)
                    ->get();

                return response()->json($orders, 200);
            } else {
                return response()->json(['message' => 'User not authenticated'], 401);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->id();
            if ($order->user_id !== $user_id) {
                return response()->json(['message' => 'Không có quyền truy cập'], 403);
            }

            // Kiểm tra trạng thái đơn hàng
            if ($order->order_status === 'Hủy') {
                return response()->json(['message' => 'Đơn hàng đã được hủy.'], 400);
            }

            // Lấy trạng thái mới và ghi chú từ request
            $order_status = $request->input('order_status');
            $user_note = $request->input('user_note');

            // Kiểm tra nếu yêu cầu hủy đơn hàng
            if ($order_status === 'Hủy') {
                if (empty($user_note)) {
                    return response()->json(['message' => 'Ghi chú là bắt buộc khi hủy đơn hàng.'], 400);
                }

                // Cập nhật lý do hủy
                $order->user_note = $user_note;

                // Trả lại số lượng sản phẩm về kho
                foreach ($order->orderDetails as $detail) {
                    // Kiểm tra nếu là sản phẩm có biến thể
                    if ($detail->product_variant_id) {
                        $variant = ProductVariant::find($detail->product_variant_id);
                        if ($variant) {
                            $variant->quantity += $detail->quantity; // Cộng lại số lượng vào biến thể
                            $variant->save();
                        }
                    } else {
                        // Nếu là sản phẩm đơn
                        $product = Product::find($detail->product_id);
                        if ($product) {
                            $product->quantity += $detail->quantity; // Cộng lại số lượng vào sản phẩm
                            $product->save();
                        }
                    }
                }
            } else {
                // Nếu không hủy, cho phép cập nhật ghi chú
                if (!empty($user_note)) {
                    $order->user_note = $user_note;
                }
            }

            // Cập nhật trạng thái đơn hàng
            $order->order_status = $order_status;
            $order->save();

            // Trả về thông báo cập nhật thành công
            return response()->json([
                'message' => 'Trạng thái đơn hàng đã được cập nhật thành công.',
                'order' => $order->load('orderDetails'),
            ]);
        }

        return response()->json(['message' => 'Không có quyền truy cập'], 403);
    }
}
