<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\OrderDetail;
use App\Models\ReturnItem;
use App\Models\ReturnLog;
use App\Models\ReturnRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReturnController extends Controller
{

    public function getUserReturnRequests()
    {
        try {
            // Lấy thông tin người dùng hiện tại
            $user = auth()->user();
            // Lấy danh sách return_requests của người dùng hiện tại
            $returnRequests = ReturnRequest::with(['items'])
                ->where('user_id', $user->id)
                ->get();

            return response()->json([
                'message' => 'User return requests retrieved successfully.',
                'data' => $returnRequests,
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Error retrieving return requests: ' . $ex->getMessage(),
            ], 500);
        }
    }

    //
    public function createReturnRequest(Request $request)
    {
        try {
            $respone = DB::transaction(function () use ($request) {
                // Validate dữ liệu từ client
                $validated = $request->validate([
                    'order_id' => 'required|exists:orders,id',
                    'items' => 'required|array',
                    'items.*.order_detail_id' => 'required|exists:order_details,id',
                    'items.*.quantity' => 'required|integer|min:1',
                    'reason' => 'required|string',
                ]);

                // Tạo yêu cầu hoàn trả
                $returnRequest = ReturnRequest::create([
                    'order_id' => $validated['order_id'],
                    'user_id' => auth()->id(),
                    'reason' => $validated['reason'],
                    // 'status' => 'pending',
                ]);

                // Duyệt qua từng sản phẩm
                foreach ($validated['items'] as $item) {
                    // Lấy thông tin chi tiết sản phẩm từ bảng order_details
                    $orderDetail = OrderDetail::findOrFail($item['order_detail_id']);

                    // Kiểm tra số lượng yêu cầu hoàn trả không vượt quá số lượng đã mua
                    if ($item['quantity'] > $orderDetail->quantity) {
                        throw new \Exception("Quantity to return for order_detail_id {$item['order_detail_id']} exceeds purchased quantity.");
                    }

                    // Tạo danh sách các item yêu cầu hoàn trả
                    ReturnItem::create([
                        'return_request_id' => $returnRequest->id,
                        'order_detail_id' => $item['order_detail_id'],
                        'quantity' => $item['quantity'],
                        // 'status' => 'pending',
                    ]);
                }

                return [
                    'message' => 'Return request created successfully.',
                    'return_request' => $returnRequest,
                ];
            });
            return response()->json($respone, 201);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ]);
        }
    }

    // public function cancelReturnItems(Request $request)
    // {
    //     try {
    //         // Lấy thông tin user từ token
    //         $user = auth()->user();

    //         // Validate dữ liệu từ client
    //         $validated = $request->validate([
    //             'return_request_id' => 'required|exists:return_requests,id',
    //             'cancel_items' => 'nullable|array', // Danh sách item cần hủy (nếu không truyền => hủy toàn bộ)
    //             'cancel_items.*.return_item_id' => 'required|exists:return_items,id',
    //         ]);

    //         // Lấy yêu cầu hoàn trả
    //         $returnRequest = ReturnRequest::findOrFail($validated['return_request_id']);

    //         // Kiểm tra quyền: Chỉ chủ sở hữu yêu cầu mới được hủy
    //         if ($returnRequest->user_id != $user->id) {
    //             return response()->json([
    //                 'message' => 'Unauthorized to cancel these items.',
    //             ], 403);
    //         }

    //         // Xử lý hủy toàn bộ nếu `cancel_items` không được truyền
    //         if (empty($validated['cancel_items'])) {
    //             $itemsToCancel = ReturnItem::where('return_request_id', $returnRequest->id)
    //                 ->where('status', 'pending')
    //                 ->get();
    //         } else {
    //             // Lấy danh sách item cần hủy từ `cancel_items`
    //             $itemsToCancel = ReturnItem::whereIn('id', collect($validated['cancel_items'])->pluck('return_item_id'))
    //                 ->where('return_request_id', $returnRequest->id)
    //                 ->where('status', 'pending')
    //                 ->get();
    //         }
    //         // dd($itemsToCancel->toArray());
    //         // Duyệt qua từng item để hủy
    //         foreach ($itemsToCancel as $returnItem) {
    //             // dd($returnItem->toArray());
    //             $returnItem->update(['status' => 'canceled']);

    //             // Ghi log trạng thái hủy vào bảng `return_logs`
    //             ReturnLog::create([
    //                 'return_request_id' => $returnRequest->id,
    //                 'user_id' => $user->id,
    //                 'action' => 'canceled',
    //                 'comment' => "Client canceled item with ID: {$returnItem->id}",
    //             ]);
    //         }

    //         // Kiểm tra xem tất cả các item đã bị hủy chưa
    //         $remainingItems = ReturnItem::where('return_request_id', $returnRequest->id)
    //             ->where('status', '!=', 'canceled')
    //             ->count();

    //         // Nếu tất cả các item đều bị hủy, cập nhật trạng thái của `return_request`
    //         if ($remainingItems === 0) {
    //             $returnRequest->update(['status' => 'canceled']);

    //             // Ghi log trạng thái hủy toàn bộ yêu cầu
    //             ReturnLog::create([
    //                 'return_request_id' => $returnRequest->id,
    //                 'user_id' => $user->id,
    //                 'action' => 'canceled',
    //                 'comment' => 'Client canceled the entire return request.',
    //             ]);
    //         }

    //         return response()->json([
    //             'message' => 'Return items canceled successfully.',
    //             'total_canceled' => $itemsToCancel->count(),
    //         ], 200);
    //     } catch (\Exception $ex) {
    //         return response()->json([
    //             "message" => $ex->getMessage()
    //         ]);
    //     }
    // }

    public function cancelReturnRequest(Request $request)
    {
        try {
            $user = auth()->user();

            // Validate dữ liệu
            $validated = $request->validate([
                'return_request_id' => 'required|exists:return_requests,id',
                'cancel_items' => 'nullable|array',
                'cancel_items.*' => 'exists:return_items,id',
            ]);

            // Lấy yêu cầu hoàn trả
            $returnRequest = ReturnRequest::findOrFail($validated['return_request_id']);

            // Kiểm tra quyền hủy
            if ($returnRequest->user_id !== $user->id) {
                return response()->json(['message' => 'Unauthorized action.'], 403);
            }

            // Kiểm tra trạng thái yêu cầu hoàn trả
            if ($returnRequest->status !== 'pending') {
                return response()->json([
                    'message' => 'Only pending return requests can be canceled.'
                ], 400);
            }

            // Lấy các mục cần hủy
            $itemsToCancel = !empty($validated['cancel_items'])
                ? ReturnItem::whereIn('id', $validated['cancel_items'])
                ->where('return_request_id', $returnRequest->id)
                ->where('status', 'pending') // Chỉ cho phép hủy các mục còn đang pending
                ->get()
                : ReturnItem::where('return_request_id', $returnRequest->id)
                ->where('status', 'pending')
                ->get();

            if ($itemsToCancel->isEmpty()) {
                return response()->json([
                    'message' => 'No items to cancel or items are not in pending status.',
                ], 400);
            }

            // Cập nhật trạng thái từng mục
            $canceledItems = [];
            foreach ($itemsToCancel as $item) {
                $item->update(['status' => 'canceled']);
                $canceledItems[] = $item->id;

                // Ghi log
                ReturnLog::create([
                    'return_request_id' => $returnRequest->id,
                    'user_id' => $user->id,
                    'action' => 'canceled',
                    'comment' => "Canceled item ID: {$item->id}",
                ]);
            }

            // Kiểm tra trạng thái toàn bộ yêu cầu
            $remainingItems = ReturnItem::where('return_request_id', $returnRequest->id)
                ->where('status', 'pending')
                ->count();

            if ($remainingItems === 0) {
                // Nếu không còn mục nào ở trạng thái pending, hủy toàn bộ yêu cầu
                $returnRequest->update(['status' => 'canceled']);
                ReturnLog::create([
                    'return_request_id' => $returnRequest->id,
                    'user_id' => $user->id,
                    'action' => 'canceled',
                    'comment' => 'Canceled the entire return request.',
                ]);
            }

            return response()->json([
                'message' => 'Cancellation successful.',
                'canceled_items' => $canceledItems,
                'remaining_items' => $remainingItems,
                'request_status' => $remainingItems === 0 ? 'canceled' : 'partially_canceled',
            ], 200);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => "Error: " . $ex->getMessage()
            ], 500);
        }
    }
}
