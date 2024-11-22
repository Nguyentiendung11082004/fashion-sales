<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ReturnItem;
use App\Models\ReturnLog;
use App\Models\ReturnRequest;
use Illuminate\Http\Request;

class ReturnAdminController extends Controller
{
    public function handleReturnRequest(Request $request)
    {
        try {
            // Validate dữ liệu từ client
            $validated = $request->validate([
                'return_request_id' => 'required|exists:return_requests,id', // ID của yêu cầu hoàn trả
                'action' => 'required|in:approved,rejected', // Hành động: duyệt hoặc từ chối
                'items' => 'nullable|array', // Danh sách item cần xử lý (nếu không truyền => xử lý toàn bộ)
                'items.*.return_item_id' => 'required|exists:return_items,id',
            ]);

            // Lấy yêu cầu hoàn trả
            $returnRequest = ReturnRequest::findOrFail($validated['return_request_id']);

            // Chỉ xử lý các item có trạng thái `pending`
            if (empty($validated['items'])) {
                $itemsToProcess = ReturnItem::where('return_request_id', $returnRequest->id)
                    ->where('status', 'pending')
                    ->get();
            } else {
                $itemsToProcess = ReturnItem::whereIn('id', collect($validated['items'])->pluck('return_item_id'))
                    ->where('return_request_id', $returnRequest->id)
                    ->where('status', 'pending')
                    ->get();
            }

            // Duyệt hoặc từ chối từng item
            foreach ($itemsToProcess as $returnItem) {
                // dd($returnItem->toArray());
                // Cập nhật trạng thái cho item
                $returnItem->update(['status' => $validated['action']]);

                // Nếu hành động là "approved", cộng lại số lượng sản phẩm
                if ($validated['action'] === 'approved') {
                    // Kiểm tra xem item liên quan đến `product` hay `product_variant`
                    if ($returnItem->product_variant_id) {
                        // Nếu là product_variant, cập nhật số lượng trong bảng `product_variants`
                        $variant = ProductVariant::find($returnItem->product_variant_id);
                        if ($variant) {
                            $variant->increment('quantity', $returnItem->quantity); // Cộng thêm số lượng
                        }
                    } else {
                        // Nếu không có `product_variant_id`, cập nhật số lượng trong bảng `products`
                        $product = Product::find($returnItem->product_id);
                        if ($product) {
                            $product->increment('quantity', $returnItem->quantity); // Cộng thêm số lượng
                        }
                    }
                }

                // Ghi log trạng thái vào bảng `return_logs`
                ReturnLog::create([
                    'return_request_id' => $returnRequest->id,
                    'user_id' => auth()->id(), // Admin đang xử lý
                    'action' => $validated['action'],
                    'comment' => "Admin {$validated['action']} item with ID: {$returnItem->id}",
                ]);
            }

            // Kiểm tra xem tất cả các item đã được xử lý chưa
            $remainingItems = ReturnItem::where('return_request_id', $returnRequest->id)
                ->where('status', 'pending')
                ->count();

            if ($remainingItems === 0) {
                // Nếu tất cả các item đã được xử lý, cập nhật trạng thái yêu cầu hoàn trả
                $returnRequest->update(['status' => $validated['action']]);

                // Ghi log trạng thái yêu cầu
                ReturnLog::create([
                    'return_request_id' => $returnRequest->id,
                    'user_id' => auth()->id(), // Admin đang xử lý
                    'action' => $validated['action'],
                    'comment' => "Admin {$validated['action']} the return request.",
                ]);
            }

            return response()->json([
                'message' => 'Return request processed successfully.',
                'total_processed' => $itemsToProcess->count(),
                'remaining_items' => $remainingItems,
            ], 200);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], 500);
        }
    }
}
