<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            // Lấy tất cả các bình luận
            $comments = Comments::query()
                ->leftJoin('users', 'comments.user_id', '=', 'users.id')
                ->leftJoin('products', 'comments.product_id', '=', 'products.id')
                ->select(
                    'comments.*',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.phone_number as user_phone',  
                    'products.name as product_name'
                )
                ->get();
    
            // Thay thế thông tin người dùng và sản phẩm nếu không tồn tại
            foreach ($comments as $comment) {
                if (is_null($comment->user_name)) {
                    $comment->user_name = 'Người dùng đã bị xóa';
                    $comment->user_email = 'Không có thông tin';
                    $comment->user_phone = 'Không có thông tin';
                }
                if (is_null($comment->product_name)) {
                    $comment->product_name = 'Sản phẩm đã bị xóa';
                }
            }
    
            // Kiểm tra dữ liệu
            if ($comments->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không có dữ liệu.',
                    'data' => []
                ], Response::HTTP_NOT_FOUND);
            }
    
            // Trả về dữ liệu với cấu trúc rõ ràng
            return response()->json([
                'status' => true,
                'message' => 'Danh sách bình luận được lấy thành công.',
                'data' => [
                    'total' => $comments->count(),
                    'comments' => $comments
                ]
            ], Response::HTTP_OK);
    
        } catch (\Exception $ex) {
            Log::error('API/V1/Admin/CommentsController@index: ', [$ex->getMessage()]);
    
            return response()->json([
                'status' => false,
                'message' => 'Đã có lỗi nghiêm trọng xảy ra trong quá trình lấy dữ liệu.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Tìm bình luận theo ID
            $comment = Comments::findOrFail($id);
    
            // Nếu bình luận có hình ảnh liên quan, xóa hình ảnh
            if ($comment->image && Storage::disk('public')->exists($comment->image)) {
                Storage::disk('public')->delete($comment->image);
            }
    
            // Xóa bình luận
            $comment->delete();
    
            return response()->json([
                'status' => true,
                'message' => "Xóa bình luận thành công."
            ], 200);
    
        } catch (\Exception $ex) {
            Log::error('API/V1/Admin/CommentsController@destroy: ', [$ex->getMessage()]);
    
            return response()->json([
                'status' => false,
                'message' => 'Đã có lỗi xảy ra trong quá trình xóa bình luận.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
}
