<?php

namespace App\Http\Controllers\Api\V1\Client;

use Exception;
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
use Illuminate\Support\Facades\Notification;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Requests\Order\UpdateOrderRequest;
use App\Notifications\OrderConfirmationNotification;
use App\Http\Controllers\API\V1\Service\PaymentController;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            if (auth('sanctum')->check()) {
                $user_id = auth('sanctum')->id();
                // Get all orders for the authenticated user, including order details
                $orders = Order::query()
                    ->where('user_id', $user_id)
                    ->with(
                        'orderDetails',
                        'paymentMethod'
                    )
                    ->latest('id')
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
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        try {
            $data = $request->validated(); // Lấy dữ liệu đã xác thực
            // Kiểm tra xem người dùng có muốn mua ngay hay không
            $isImmediatePurchase = isset($data['product_id']) && isset($data['quantity']);
            $isCartPurchase = isset($data['cart_item_ids']) && is_array($data['cart_item_ids']) && count($data['cart_item_ids']) > 0;
            // Nếu cả hai trường hợp đều không đúng thì trả về lỗi
            if (!$isImmediatePurchase && !$isCartPurchase || $isImmediatePurchase && $isCartPurchase) {
                return response()->json(['message' => 'Phải chọn mua ngay hoặc mua từ giỏ hàng.'], Response::HTTP_BAD_REQUEST);
            }
            $user = $this->getUser($data);
            $response = DB::transaction(function () use ($data, $user, $isImmediatePurchase, $isCartPurchase) {
                // Tạo đơn hàng
                $order = $this->createOrder($data, $user);
                $totalQuantity = 0;
                $totalPrice = 0.00;

                if ($isImmediatePurchase) {
                    list($quantity, $price) = $this->addImmediatePurchase($data, $order);
                    $totalQuantity += $quantity;
                    $totalPrice += $price;
                }

                if ($isCartPurchase) {
                    if (auth('sanctum')->check()) {
                        list($quantity, $price) = $this->addCartItemsToOrder($data, $user, $order);
                        $totalQuantity += $quantity;
                        $totalPrice += $price;
                    } else {
                        DB::rollBack();
                        return response()->json(['message' => 'Vui lòng đăng nhập để mua hàng từ giỏ hàng.'], Response::HTTP_UNAUTHORIZED);
                    }
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
                if (!auth('sanctum')->check()) {
                    // Gửi notification cho người dùng với email nhận thông báo
                    Notification::route('mail', $order->user_email)
                        ->notify(new OrderConfirmationNotification($order, $order->user_email, $order->orderDetails));
                          // Gửi email xác nhận đơn hàng cho khách hàng
                }
                // Thực hiện thanh toán nếu chọn phương thức online (VNPay)
                if ($data['payment_method_id'] == 2) {
                    $payment = new PaymentController();
                    $response = $payment->createPayment($order);

                    // Chuyển hướng người dùng đến trang thanh toán
                    return response()->json(['payment_url' => $response['payment_url']], Response::HTTP_OK);
                }

                // broadcast(new OrderCreated($order));
                return response()->json($order->load('orderDetails')->toArray(), Response::HTTP_CREATED);
            });
            return $response;
        } catch (\Exception $ex) {
            DB::rollBack();
            return response()->json(['message' => $ex->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    // Hàm lấy thông tin người dùng
    protected function getUser($data)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->id();
            $user = User::findOrFail($user_id)->only(['id', 'name', 'email', 'address', 'phone_number']);
        } else {
            $user = [
                'id' => null,
                'name' => $data['ship_user_name'],
                'email' => $data['ship_user_email'],
                'address' => $data['ship_user_address'],
                'phone_number' => $data['ship_user_phonenumber'],
            ];
        }
        return  $user;
    }

    // Hàm tạo đơn hàng
    protected function createOrder($data, $user)
    {
        return  Order::create([
            'user_id' => $user['id'],
            'payment_method_id' => $data['payment_method_id'],
            'total_quantity' => 0,
            'total' => 0.00,
            'user_name' => $user['name'],
            'user_email' => $user['email'],
            'user_phonenumber' => $user['phone_number'],
            'user_address' => $user['address'],
            'user_note' => $data['user_note'] ?? '',
            'ship_user_name' => $data['ship_user_name'],
            'ship_user_phonenumber' => $data['ship_user_phonenumber'],
            'ship_user_address' => $data['ship_user_address'] . ', ' .
                $data['xa'] . ', ' .
                $data['huyen'] . ', ' .
                $data['tinh'],
            'shipping_method' => $data['shipping_method'],
            'shipping_fee' => $data['shipping_fee'],
            'voucher_id' => null,
            'voucher_discount' => 0,
        ]);
    }

    // Hàm thêm sản phẩm mua ngay vào đơn hàng
    protected function addImmediatePurchase($data, $order)
    {
        $product = Product::findOrFail($data['product_id']);
        $productPrice = $product->price_sale > 0 ? $product->price_sale : $product->price_regular;
        $quantity = $data['quantity'];

        // Kiểm tra nếu sản phẩm có biến thể
        if ($product->type == 1) {
            // if (!isset($data['product_variant_id'])) {

            //     return response()->json(['message' => 'Sản phẩm này có biến thể. Vui lòng chọn biến thể.'], Response::HTTP_BAD_REQUEST);
            // }
            $variant = ProductVariant::with('attributes')->findOrFail($data['product_variant_id']);
            $variantPrice = $variant->price_sale > 0 ? $variant->price_sale : $variant->price_regular;
            $productPrice = $variantPrice;
            // Lưu thông tin chi tiết đơn hàng cho sản phẩm biến thể
            $attributes = [];
            foreach ($variant->attributes as $attribute) {
                $attributes[$attribute->name] = $attribute->pivot->value;
            }
            $variant->decrement('quantity', $data['quantity']);
        } else {
            // Nếu không có biến thể
            $attributes = null;
            $product->decrement('quantity', $data['quantity']);
        }
        $this->createOrderDetail($order, $product, $data['product_variant_id'] ?? null, $productPrice, $quantity, $attributes);
        return [$quantity, $productPrice * $quantity];
    }

    // Hàm thêm sản phẩm từ giỏ hàng vào đơn hàng
    protected function addCartItemsToOrder($data, $user, $order)
    {
        $cartItemIds = $data['cart_item_ids'];
        $quantities = $data['quantityOfCart'];

        $cart = Cart::query()
            ->where('user_id', $user['id'])
            ->with('cartitems.product', 'cartitems.productvariant.attributes')
            ->first();
        if (!$cart || $cart->cartitems->isEmpty()) {
            return response()->json(['message' => 'Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.'], 400);
        }
        $totalQuantity = 0;
        $totalPrice = 0.00;
        $validCartItemFound = false;
        foreach ($cart->cartitems as $cartItem) {
            if (in_array($cartItem->id, $cartItemIds)) {
                $product = $cartItem->product;
                $variant = $cartItem->productvariant;
                $validCartItemFound = true;
                // Lấy số lượng từ request hoặc số lượng trong giỏ hàng
                $quantity = isset($quantities[$cartItem->id]) ? $quantities[$cartItem->id] : $cartItem->quantity;
                $productPrice = $variant ? ($variant->price_sale > 0 ? $variant->price_sale : $variant->price_regular) : ($product->price_sale > 0 ? $product->price_sale : $product->price_regular);
                $attributes = $variant ? $variant->attributes->pluck('pivot.value', 'name')->toArray() : null;
                $this->createOrderDetail($order, $product, $variant->id ?? null, $productPrice, $quantity, $attributes);
                $totalQuantity += $quantity;
                $totalPrice += $productPrice * $quantity;
                if ($variant) {
                    $variant->decrement('quantity', $quantity);
                } else {
                    $product->decrement('quantity', $quantity);
                }
            }
        }
        // If no valid cart items were found in cartItemIds
        if (!$validCartItemFound) { // Rollback nếu có lỗi
            return response()->json([
                'message' => 'Không có sản phẩm nào trong giỏ hàng phù hợp với yêu cầu của bạn.',
            ], 400);
        }
        // Xóa các sản phẩm đã mua trong giỏ hàng
        CartItem::whereIn('id', $cartItemIds)->delete();
        return [$totalQuantity, $totalPrice];
    }

    // Hàm tạo chi tiết đơn hàng
    protected function createOrderDetail($order, $product, $variantId, $price, $quantity, $attributes)
    {
        OrderDetail::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'product_variant_id' => $variantId,
            'product_name' => $product->name,
            'product_img' => $product->img_thumbnail,
            'attributes' => $attributes,
            'quantity' => $quantity,
            'price' => $price,
            'total_price' => $price * $quantity,
            'discount' => 0,
        ]);
    }

    // Hàm áp dụng voucher
    protected function applyVoucher($voucher_code, $order_items, $order_id)
    {
        $user_id = auth('sanctum')->id();
        $voucher = Voucher::where('code', $voucher_code)
            ->where('is_active', true)
            ->whereDate('start_date', '<=', now())
            ->whereDate('end_date', '>=', now())
            ->first();
        $voucher->increment('used_count');
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

    // Hàm kiểm tra điều kiện sản phẩm để áp dụng voucher
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
    protected function calculateDiscount($voucher, $sub_total, $voucher_metas, $eligible_products)
    {
        $voucher_discount = 0;
        $voucher_description = '';

        if (isset($voucher_metas['_voucher_applies_to_total']) && $voucher_metas['_voucher_applies_to_total']) {
            if ($voucher->discount_type == 'percent') {
                $voucher_discount = ($voucher->discount_value / 100) * $sub_total;
                $voucher_description = "{$voucher->discount_value} percent";
                if (isset($voucher_metas['_voucher_max_discount_amount']) && $voucher_metas['_voucher_max_discount_amount']) {
                    if ($voucher_metas['_voucher_max_discount_amount'] < $voucher_discount) {
                        $voucher_discount = $voucher_metas['_voucher_max_discount_amount'];
                    }
                }
            } elseif ($voucher->discount_type == 'fixed') {
                $voucher_discount = min($voucher->discount_value, $sub_total);
                $voucher_description = "{$voucher->discount_value} fixed";
            }
            return ['total_discount' => $voucher_discount, 'voucher_description' => $voucher_description];
        }

        foreach ($eligible_products as $item) {
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
            if (!auth('sanctum')->check()) {
                return response()->json(['message' => 'Người dùng chưa được xác thực'], 401);
            }

            $user_id = auth('sanctum')->id();

            // Kiểm tra xem đơn hàng có thuộc về người dùng đã xác thực không
            if ($order->user_id !== $user_id) {
                return response()->json(['message' => 'Không có quyền truy cập'], 403);
            }
            // Thông tin chi tiết đơn hàng
            $order->load('orderDetails');

            // Trả về dữ liệu đơn hàng cùng với chi tiết dưới dạng JSON
            return response()->json([
                'order' => $order,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy thông tin đơn hàng', 'error' => $e->getMessage()], 500);
        }
    }
    /**
     * Update the specified resource in storage.
     */

    /**public function update(UpdateOrderRequest $request, Order $order)
    {
        if (!auth('sanctum')->check()) {
            return response()->json(['message' => 'Không có quyền truy cập'], 403);
        }

        $user_id = auth('sanctum')->id();

        // Kiểm tra xem đơn hàng có thuộc về người dùng đã xác thực không
        if ($order->user_id !== $user_id) {
            return response()->json(['message' => 'Không có quyền truy cập'], 403);
        }

        // Kiểm tra trạng thái đơn hàng
        if ($order->order_status === Order::STATUS_CANCELED) {
            return response()->json(['message' => 'Đơn hàng đã được hủy.'], 400);
        }
        // Kiểm tra trạng thái đơn hàng
        if ($order->order_status === Order::STATUS_COMPLETED) {
            return response()->json(['message' => 'Đơn hàng đã hoàn thành.'], 400);
        }

        // Lấy trạng thái mới từ request
        $order_status = $request->input('order_status');

        // Chỉ cho phép hủy đơn hàng khi trạng thái hiện tại là "Đang chờ xác nhận" hoặc "Đã xác nhận"
        if ($order_status === Order::STATUS_CANCELED) {
            if (!in_array($order->order_status, [Order::STATUS_PENDING, Order::STATUS_CONFIRMED])) {
                return response()->json([
                    'message' => 'Chỉ có thể hủy đơn hàng khi đơn hàng đang ở trạng thái Đang chờ xác nhận hoặc Đã xác nhận.'
                ], 400);
            }

            // Lấy lý do hủy từ request
            $user_note = $request->input('user_note');

            // Kiểm tra lý do hủy
            if (empty($user_note)) {
                return response()->json(['message' => 'Ghi chú là bắt buộc khi hủy đơn hàng.'], 400);
            }
            // Xử lý hủy đơn hàng và lưu lý do hủy
            $this->handleOrderCancellation($order, $user_note);
            // Kiểm tra nếu đơn hàng có sử dụng voucher
            $voucher_logs = VoucherLog::query()
                ->where('user_id', '=', $user_id)
                ->where('order_id', '=', $order->id)
                ->first();

            if ($voucher_logs) {
                // Cập nhật trạng thái hành động của voucher
                $voucher_logs->update([
                    'action' => 'reverted',
                ]);
            }
            $order->order_status = $order_status;
        }
        if ($order_status === Order::STATUS_COMPLETED) {
            if (!in_array($order->order_status, [Order::STATUS_SUCCESS])) {
                return response()->json([
                    'message' => 'Chỉ có thể hủy đơn hàng khi đơn hàng đang ở trạng thái giao hàng thành công.'
                ], 400);
            }
            $order->order_status = $order_status;
        }
        $order->save();
        // Trả về thông báo cập nhật thành công
        return response()->json([
            'message' => 'Trạng thái đơn hàng đã được cập nhật thành công.',
            'order' => $order->load('orderDetails'),
        ]);
    }
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        if (!auth('sanctum')->check()) {
            return response()->json(['message' => 'Không có quyền truy cập'], 403);
        }

        $user_id = auth('sanctum')->id();

        // Kiểm tra quyền sở hữu
        if ($order->user_id !== $user_id) {
            return response()->json(['message' => 'Không có quyền truy cập'], 403);
        }

        // Kiểm tra trạng thái không hợp lệ
        if (in_array($order->order_status, [Order::STATUS_CANCELED, Order::STATUS_COMPLETED])) {
            return response()->json(['message' => 'Đơn hàng không thể cập nhật vì đã hoàn thành hoặc đã bị hủy.'], 400);
        }

        $order_status = $request->input('order_status');

        // Xử lý các trạng thái
        switch ($order_status) {
            case Order::STATUS_CANCELED:
                if (!in_array($order->order_status, [Order::STATUS_PENDING, Order::STATUS_CONFIRMED])) {
                    return response()->json([
                        'message' => 'Chỉ có thể hủy đơn hàng khi đơn hàng đang ở trạng thái Đang chờ xác nhận hoặc Đã xác nhận.'
                    ], 400);
                }

                $user_note = $request->input('user_note');
                $this->handleOrderCancellation($order, $user_note);

                // Cập nhật trạng thái voucher nếu cần
                $voucher_logs = VoucherLog::query()
                    ->where('user_id', $user_id)
                    ->where('order_id', $order->id)
                    ->first();

                if ($voucher_logs) {
                    $voucher_logs->update(['action' => 'reverted']);
                }
                $order->order_status = $order_status;
                break;

            case Order::STATUS_COMPLETED:
                if ($order->order_status !== Order::STATUS_SUCCESS) {
                    return response()->json([
                        'message' => 'Chỉ có thể hoàn thành đơn hàng khi đơn hàng đang ở trạng thái giao hàng thành công.'
                    ], 400);
                }
                $order->order_status = $order_status;
                break;

            default:
                return response()->json(['message' => 'Trạng thái không hợp lệ.'], 400);
        }

        $order->save();

        return response()->json([
            'message' => 'Trạng thái đơn hàng đã được cập nhật thành công.',
            'order' => $order->load('orderDetails'),
        ]);
    }
    protected function handleOrderCancellation(Order $order, string $user_note)
    {
        // Lưu lý do hủy vào ghi chú
        $order->return_notes = $user_note;
        // Trả lại số lượng sản phẩm về kho
        foreach ($order->orderDetails as $detail) {
            // Kiểm tra nếu là sản phẩm có biến thể
            if ($detail->product_variant_id) {
                $variant = ProductVariant::find($detail->product_variant_id);
                if ($variant) {
                    $variant->increment('quantity', $detail->quantity);
                }
            } else {
                // Nếu là sản phẩm đơn
                $product = Product::find($detail->product_id);
                if ($product) {
                    $product->increment('quantity', $detail->quantity);
                }
            }
        }
    }
}
