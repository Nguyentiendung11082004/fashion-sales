<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Models\Cart;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\OrderDetail;
use Illuminate\Http\Response;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Requests\Order\UpdateOrderRequest;

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
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        try {
            $data = $request->validated(); // Lấy dữ liệu đã xác thực
            // Kiểm tra xem người dùng có muốn mua ngay hay không
            $isImmediatePurchase = isset($data['id_product']) && isset($data['quantity']);
            // Kiểm tra xem người dùng có muốn mua từ giỏ hàng hay không
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
                // Nếu người dùng chưa đăng nhập, tạo tài khoản cho khách hàng
                // Kiểm tra email có tồn tại không
                $existingUser = User::where('email', $data['ship_user_email'])->first();

                if ($existingUser) {
                    return response()->json(['message' => 'Email đã tồn tại'], Response::HTTP_BAD_REQUEST);
                } else {
                    // Nếu email chưa tồn tại, tạo tài khoản mới
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
                    'order_status' => "Đang chờ xác nhận đơn hàng",
                    'payment_status' => $data['payment_status'],
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
                ]);

                // Khởi tạo tổng số lượng và tổng giá
                $totalQuantity = 0;
                $totalPrice = 0.00;

                // Mua ngay sản phẩm
                if ($isImmediatePurchase) {
                    $product = Product::findOrFail($data['id_product']);
                    $quantity = $data['quantity'];

                    // Kiểm tra nếu sản phẩm có biến thể
                    if ($product->type == 1) {
                        if (!isset($data['product_variant_id'])) {
                            DB::rollBack(); // Rollback nếu có lỗi
                            return response()->json(['message' => 'Sản phẩm này có biến thể. Vui lòng chọn biến thể. haha'], Response::HTTP_BAD_REQUEST);
                        }
                        $variant = ProductVariant::with('attributes')->findOrFail($data['product_variant_id']);
                        // Nếu tìm thấy biến thể
                        if ($variant) {
                            $variantPrice = $variant->price_sale > 0 ? $variant->price_sale : $variant->price_regular;
                            // Lấy thuộc tính của biến thể
                            $attributes = [];
                            foreach ($variant->attributes as $attribute) {
                                $attributes[$attribute->name] = $attribute->pivot->value;
                            }
                            // Lưu thông tin chi tiết đơn hàng cho sản phẩm biến thể
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
                            ]);
                            // Cập nhật tổng số lượng và tổng giá
                            $totalQuantity += $quantity;
                            $totalPrice += $variantPrice * $quantity;
                            // Cập nhật số lượng sản phẩm
                            $variant->decrement('quantity', $data['quantity']);
                        }
                    } else {
                        // Nếu không có biến thể, xử lý sản phẩm đơn
                        $productPrice = $product->price_sale > 0 ? $product->price_sale : $product->price_regular;

                        // Lưu thông tin chi tiết đơn hàng cho sản phẩm đơn
                        OrderDetail::create([
                            'order_id' => $order->id,
                            'product_id' => $product->id,
                            'product_variant_id' => null,
                            'product_name' => $product->name,
                            'product_img' => $product->img_thumbnail,
                            'attributes' => null, // Không có thuộc tính nếu không có biến thể
                            'quantity' => $quantity,
                            'price' => $productPrice,
                            'total_price' => $productPrice * $quantity,
                        ]);

                        // Cập nhật tổng số lượng và tổng giá
                        $totalQuantity += $quantity;
                        $totalPrice += $productPrice * $quantity;
                        $product->decrement('quantity', $data['quantity']);
                    }
                    // Cập nhật tổng số lượng và tổng tiền cho đơn hàng mua ngay
                    $order->update([
                        'total_quantity' => $totalQuantity,
                        'total' => $totalPrice,
                    ]);
                }
                // Mua từ giỏ hàng
                if ($isCartPurchase) {
                    $cartItemIds = $data['cart_item_ids'];
                    $quantities = $data['quantityOfCart'];

                    $cart = Cart::query()
                        ->where('user_id', $user['id'])
                        ->with('cartitems.product', 'cartitems.productvariant.attributes')
                        ->first();
                    // Check if the cart is empty
                    if (!$cart || $cart->cartitems->isEmpty()) {
                        DB::rollBack(); // Rollback nếu có lỗi
                        // Return a notification or an error message indicating that the cart is empty
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

                            // Nếu có biến thể
                            if ($variant) {
                                $variantPrice = $variant->price_sale > 0 ? $variant->price_sale : $variant->price_regular;
                                $totalQuantity += $quantity;
                                $totalPrice += $variantPrice * $quantity;

                                // Xây dựng thuộc tính dưới dạng mảng với tên và giá trị
                                $attributes = [];
                                foreach ($variant->attributes as $attribute) {
                                    $attributes[$attribute->name] = $attribute->pivot->value;
                                }
                                // Lưu thông tin chi tiết đơn hàng cho sản phẩm biến thể
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
                                ]);
                                $variant->decrement('quantity', $quantity);
                            } else {
                                // Nếu không có biến thể, xử lý sản phẩm chính
                                $productPrice = $product->price_sale > 0 ? $product->price_sale : $product->price_regular;
                                $totalQuantity += $quantity;
                                $totalPrice += $productPrice * $quantity;

                                // Lưu thông tin chi tiết đơn hàng cho sản phẩm đơn
                                OrderDetail::create([
                                    'order_id' => $order->id,
                                    'product_id' => $product->id,
                                    'product_variant_id' => null,
                                    'product_name' => $product->name,
                                    'product_img' => $product->img_thumbnail,
                                    'attributes' => null, // Không có thuộc tính nếu không có biến thể
                                    'quantity' => $quantity,
                                    'price' => $productPrice,
                                    'total_price' => $productPrice * $quantity,
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
                    // Cập nhật tổng số lượng và tổng tiền cho đơn hàng
                    $order->update([
                        'total_quantity' => $totalQuantity,
                        'total' => $totalPrice,
                    ]);

                    // Xóa các sản phẩm đã mua trong giỏ hàng
                    CartItem::whereIn('id', $cartItemIds)->delete();
                }
                return response()->json($order->load('orderDetails')->toArray(), Response::HTTP_CREATED);
            });
            return $response;
        } catch (\Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage()
                // "message" => "Đặt Hàng Không Thành Công!"
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
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
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
