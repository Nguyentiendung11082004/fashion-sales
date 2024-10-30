<?php

namespace App\Http\Controllers\Api\V1\Admin;
use App\Models\Order;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Lấy tất cả các đơn hàng kèm chi tiết đơn hàng
            $orders = Order::with('orderDetails')->get();

            return response()->json($orders, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
   public function show($id)
    {
        Log::info('Fetching order with ID: ' . $id); // Ghi log ID
        try {
            // Tìm đơn hàng theo ID và kèm chi tiết đơn hàng
            $order = Order::with('orderDetails')->findOrFail($id);
            return response()->json($order, Response::HTTP_OK);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('Order not found: ' . $e->getMessage());
            return response()->json(['message' => 'Order not found'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error('Error fetching order: ' . $e->getMessage());
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, $id)
    // {
    //     try {
    //         $order = Order::findOrFail($id);
            
    //         // Kiểm tra xem yêu cầu có trường order_status hay không
    //         $newStatus = $request->input('order_status');
            
    //         // Đảm bảo rằng trạng thái mới hợp lệ
    //         $allowedStatuses = ['Đang chờ xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Giao hàng thành công', 'Đã hủy'];
            
    //         if (!in_array($newStatus, $allowedStatuses)) {
    //             return response()->json(['message' => 'Trạng thái không hợp lệ.'], Response::HTTP_BAD_REQUEST);
    //         }
    
    //         // Cập nhật trạng thái của đơn hàng
    //         $order->order_status = $newStatus;
    //         $order->save();
    
    //         return response()->json(['message' => 'Cập nhật trạng thái thành công.', 'order' => $order], Response::HTTP_OK);
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }
    public function update(Request $request, $id)
{
    try {
        $order = Order::findOrFail($id);
        
        $currentStatus = $order->order_status;
        $newStatus = $request->input('order_status');

        // Mảng ánh xạ trạng thái với giá trị số tương ứng
        $statusMap = [
            'Đang chờ xác nhận' => 1,
            'Đã xác nhận' => 2,
            'Đang vận chuyển' => 3,
            'Giao hàng thất bại' => 4,
            'Giao hàng thành công' => 5,
            'Đã hủy' => 6
        ];
        
        // Nếu nhập trạng thái là số, lấy tên trạng thái từ mảng
        if (is_numeric($newStatus) && in_array((int)$newStatus, $statusMap)) {
            $newStatus = array_search((int)$newStatus, $statusMap);
        }

        // Kiểm tra xem trạng thái mới có hợp lệ không
        if (!array_key_exists($newStatus, $statusMap)) {
            return response()->json(['message' => 'Trạng thái không hợp lệ.'], Response::HTTP_BAD_REQUEST);
        }

        // Áp dụng quy tắc trạng thái
        if (in_array($currentStatus, ['Giao hàng thành công', 'Đã hủy'])) {
            return response()->json(['message' => "Không thể thay đổi trạng thái \"$currentStatus\"."], Response::HTTP_BAD_REQUEST);
        }

        if ($currentStatus === 'Đang vận chuyển' && !in_array($newStatus, ['Giao hàng thành công', 'Giao hàng thất bại'])) {
            return response()->json(['message' => 'Khi đang vận chuyển, chỉ có thể cập nhật thành "Giao hàng thành công" hoặc "Giao hàng thất bại".'], Response::HTTP_BAD_REQUEST);
        }

        if ($currentStatus === 'Giao hàng thất bại' && $newStatus !== 'Đã hủy') {
            return response()->json(['message' => 'Từ "Giao hàng thất bại", chỉ có thể chuyển sang "Đã hủy".'], Response::HTTP_BAD_REQUEST);
        }

        if ($currentStatus === 'Đã xác nhận' && !in_array($newStatus, ['Đang vận chuyển', 'Đã hủy'])) {
            return response()->json(['message' => 'Trạng thái tiếp theo chỉ có thể là "Đang vận chuyển" hoặc "Đã hủy".'], Response::HTTP_BAD_REQUEST);
        }

        if ($currentStatus === 'Đang chờ xác nhận' && !in_array($newStatus, ['Đã xác nhận', 'Đã hủy'])) {
            return response()->json(['message' => 'Trạng thái tiếp theo chỉ có thể là "Đã xác nhận" hoặc "Đã hủy".'], Response::HTTP_BAD_REQUEST);
        }

        // Cập nhật trạng thái nếu vượt qua các điều kiện trên
        $order->order_status = $newStatus;
        $order->save();

        return response()->json(['message' => 'Cập nhật trạng thái thành công.', 'order' => $order], Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
