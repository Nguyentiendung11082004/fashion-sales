<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
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
            // $userId = auth()->user()->id;
            $userId = 1;
            $orders = Order::query()->where('user_id', $userId)->get();
            return response()->json($orders, 200);
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
            $response = DB::transaction(function () use ($request) {
                // Tạo đơn hàng
                $order = Order::create([
                    'user_id' => $request->user_id,
                    'payment_method_id' => $request->payment_method_id,
                    'order_status' => $request->order_status,
                    'payment_status' => $request->payment_status,
                    'total_quantity' => 0, // Tạm thời gán bằng 0
                    'total' => 0.00, // Tạm thời gán bằng 0
                    'user_name' => $request->user_name,
                    'user_email' => $request->user_email,
                    'user_phonenumber' => $request->user_phonenumber,
                    'user_address' => $request->user_address,
                    'user_note' => $request->user_note,
                    'ship_user_name' => $request->ship_user_name,
                    'ship_user_phonenumber' => $request->ship_user_phonenumber,
                    'ship_user_address' => $request->ship_user_address,
                    'shipping_method' => $request->shipping_method,
                ]);
        
                // Tính toán tổng số lượng và tổng giá tiền
                $totalQuantity = 0;
                $totalPrice = 0;
        
                // Lặp qua từng sản phẩm trong đơn hàng
                if (isset($request->products) && is_array($request->products)) {
                    foreach ($request->products as $productData) {
                        $product = $productData['product'];
        
                        // Nếu sản phẩm có biến thể
                        if (isset($product['variants']) && count($product['variants']) > 0) {
                            foreach ($product['variants'] as $variant) {
                                // Kiểm tra số lượng biến thể
                                if (isset($variant['quantity']) && $variant['quantity'] > 0) {
                                    $variantPrice = $variant['price_sale'] > 0 ? $variant['price_sale'] : $variant['price_regular'];
                                    $totalQuantity += $variant['quantity']; // Cộng dồn số lượng
                                    $totalPrice += $variantPrice * $variant['quantity']; // Cộng dồn tổng giá
        
                                    // Xây dựng thuộc tính dưới dạng mảng với tên và giá trị
                                    $attributes = [];
                                    foreach ($variant['attributes'] as $attribute) {
                                        $attributes[$attribute['name']] = $attribute['pivot']['value'];
                                    }
        
                                    // Lưu thông tin chi tiết đơn hàng cho từng biến thể
                                    OrderDetail::create([
                                        'order_id' => $order->id,
                                        'product_id' => $product['id'],
                                        'product_variant_id' => $variant['id'],
                                        'voucher_id' => null,
                                        'product_name' => $product['name'],
                                        'product_img' => $product['img_thumbnail'],
                                        'attributes' => json_encode($attributes), // Lưu thuộc tính của biến thể
                                        'quantity' => $variant['quantity'],
                                        'price' => $variantPrice,
                                        'total_price' => $variantPrice * $variant['quantity'],
                                    ]);
                                }
                            }
                        } else {
                            // Nếu không có biến thể, xử lý sản phẩm chính
                            $productPrice = $product['price_sale'] > 0 ? $product['price_sale'] : $product['price_regular'];
        
                            // Giả sử số lượng của sản phẩm chính là 1
                            $quantity = isset($product['quantity']) ? $product['quantity'] : 1;
                            $totalQuantity += $quantity; // Cộng dồn số lượng
                            $totalPrice += $productPrice * $quantity; // Cộng dồn tổng giá
        
                            // Xây dựng thuộc tính cho sản phẩm chính
                            $attributes = $productData['getUniqueAttributes'] ?? [];
        
                            // Lưu thông tin chi tiết đơn hàng cho sản phẩm chính
                            OrderDetail::create([
                                'order_id' => $order->id,
                                'product_id' => $product['id'],
                                'product_variant_id' => null, // Không có biến thể
                                'product_name' => $product['name'],
                                'product_img' => $product['img_thumbnail'],
                                'attributes' => json_encode($attributes), // Lưu thuộc tính của sản phẩm chính
                                'quantity' => $quantity, // Số lượng từ yêu cầu
                                'price' => $productPrice,
                                'total_price' => $productPrice * $quantity,
                            ]);
                        }
                    }
                }
        
                // Cập nhật lại tổng số lượng và tổng giá tiền vào đơn hàng
                $order->update([
                    'total_quantity' => $totalQuantity,
                    'total' => $totalPrice,
                ]);
        
                return response()->json($order, Response::HTTP_CREATED);
            });
        
            return $response;
        } catch (\Exception $ex) {
            return response()->json(['message' => $ex->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
    
    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        // dd($order);
        try {
            // Tạm thời sử dụng user_id = 1 để thay thế cho người dùng đã đăng nhập
            $userId = 1;
            // Lấy đơn hàng với thông tin chi tiết đơn hàng dựa trên user_id và order_id
            $order = Order::with('orderDetails')
                ->where('user_id', $userId)
                ->where('id', $order->id) // $orderId là ID của đơn hàng cần lấy
                ->firstOrFail();

            // Trả về dữ liệu đơn hàng dưới dạng JSON
            return response()->json($order, 200);
        } catch (\Exception $e) {
            // Nếu có lỗi xảy ra, trả về thông báo lỗi
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
