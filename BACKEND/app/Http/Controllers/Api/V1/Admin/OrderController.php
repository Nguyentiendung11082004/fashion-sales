<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Order;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   
    public function index()
{
    try {
      
        Order::where('order_status', 'Giao hàng thành công')
            ->whereDate('updated_at', '<', now()->subDays(3))
            ->update(['order_status' => 'Hoàn thành']);
        
      
        $orders = Order::with('orderDetails')  
                        ->latest()  
                        ->get();

        // Trả lại dữ liệu cho frontend
        return response()->json([
            'message' => 'Thông tin đơn hàng',
            'data' => $orders,  // Dữ liệu đơn hàng và chi tiết
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Có lỗi xảy ra: ' . $e->getMessage(),
        ], 500);
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
        Log::info('Fetching order with ID: ' . $id);
        try {
            // Lấy thông tin đơn hàng từ bảng Order
            $order = Order::findOrFail($id);
            $orderDetails = $order->orderDetails()->get();
            // Kết hợp thông tin đơn hàng với các chi tiết
            $orderData = [
                'order' => $order,
                'order_details' => $orderDetails,
            ];

            return response()->json($orderData, Response::HTTP_OK);
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
    public function update(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);

            $currentStatus = $order->order_status;
            $newStatus = $request->input('order_status');

            $statusMap = [
                'Đang chờ xác nhận' => 1,
                'Đã xác nhận' => 2,
                'Đang vận chuyển' => 3,
                'Hoàn trả hàng' => 4,
                'Giao hàng thành công' => 5,
                'Đã hủy' => 6,
                'Hoàn thành' => 7
            ];
            
         
            if (is_numeric($newStatus) && in_array((int)$newStatus, $statusMap)) {
                $newStatus = array_search((int)$newStatus, $statusMap);
            }

            // Kiểm tra trạng thái đơn hàng 
            if (!array_key_exists($newStatus, $statusMap)) {
                return response()->json(['message' => 'Trạng thái không hợp lệ.'], Response::HTTP_BAD_REQUEST);
            }

            if ($currentStatus === 'Đã hủy' || $currentStatus === 'Hoàn thành') {
                return response()->json(['message' => "Không thể thay đổi trạng thái \"$currentStatus\"."], Response::HTTP_BAD_REQUEST);
            }

            if ($currentStatus === 'Đang chờ xác nhận' && !in_array($newStatus, ['Đã xác nhận', 'Đã hủy'])) {
                return response()->json(['message' => 'Trạng thái tiếp theo chỉ có thể là "Đã xác nhận" hoặc "Đã hủy".'], Response::HTTP_BAD_REQUEST);
            }

            if ($currentStatus === 'Đã xác nhận' && !in_array($newStatus, ['Đang vận chuyển', 'Đã hủy'])) {
                return response()->json(['message' => 'Trạng thái tiếp theo chỉ có thể là "Đang vận chuyển" hoặc "Đã hủy".'], Response::HTTP_BAD_REQUEST);
            }

            if ($currentStatus === 'Đang vận chuyển' && !in_array($newStatus, ['Giao hàng thành công'])) {
                return response()->json(['message' => 'Khi đang vận chuyển, chỉ có thể cập nhật thành "Giao hàng thành công".'], Response::HTTP_BAD_REQUEST);
            }

            if ($currentStatus === 'Giao hàng thành công' && !in_array($newStatus, ['Hoàn trả hàng', 'Hoàn thành'])) {
                return response()->json(['message' => 'Sau "Giao hàng thành công", chỉ có thể chuyển sang "Hoàn trả hàng" hoặc "Hoàn thành".'], Response::HTTP_BAD_REQUEST);
            }

            if ($currentStatus === 'Hoàn trả hàng' && $newStatus !== 'Hoàn thành') {
                return response()->json(['message' => 'Từ "Hoàn trả hàng", chỉ có thể chuyển sang "Hoàn thành".'], Response::HTTP_BAD_REQUEST);
            }

         
          

            // Nếu có trạng thái mới từ request, thực hiện thay đổi trạng thái
            if ($newStatus && $newStatus !== $order->order_status) {
                $order->order_status = $newStatus;
            }

            $order->save();

            return response()->json(['message' => 'Cập nhật trạng thái đơn hàng thành công.', 'order' => $order], Response::HTTP_OK);
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

    public function search(Request $request)
    {
        $query = $request->input('query'); // Lấy từ khóa tìm kiếm từ body request

        if (!$query) {
            return response()->json([
                'message' => 'Vui lòng nhập từ khóa tìm kiếm.',
                'data' => []
            ], 400);
        }

        // Tìm kiếm trong cột `name` hoặc các cột khác nếu cần
        $results = Order::where('order_code', 'LIKE', "%{$query}%")
            ->orWhere('user_name', 'LIKE', "%{$query}%")
            ->orWhere('user_email', 'LIKE', "%{$query}%")
            ->get();

        return response()->json([
            'message' => 'Kết quả tìm kiếm.',
            'data' => $results,
        ]);
    }
}
