<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Comments;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    /**
     * Hiển thị danh sách bình luận.
     */
    public function index()
    {
        $comments = Comments::with(['user:id,name,avatar', 'childrenRecursive.user:id,name,avatar'])
                            ->whereNull('parent_id')
                            ->latest('created_at')
                            ->get();
        return response()->json($comments, Response::HTTP_OK);
    }

    
    

    /**
     * Thêm bình luận mới.
     */
    // public function store(Request $request)
    // {
    //     // Kiểm tra người dùng đã đăng nhập
    //     if (!Auth::check()) {
    //         return response()->json(['message' => 'Bạn cần đăng nhập để có thể bình luận.'], Response::HTTP_UNAUTHORIZED);
    //     }

    //     // Xác thực dữ liệu đầu vào
    //     $validated = $request->validate([
    //         'product_id' => 'required|exists:products,id',
    //         'content' => 'required|string|max:1000',
    //         'rating' => 'nullable|integer|min:1|max:5',
    //         'image' => 'nullable|string',
    //     ]);

    //     // Tạo bình luận mới
    //     $comment = Comments::create([
    //         'user_id' => Auth::id(),
    //         'product_id' => $validated['product_id'],
    //         'content' => $validated['content'],
    //         'rating' => $validated['rating'],
    //         'image' => $validated['image'],
    //         'status' => true, // Mặc định trạng thái bình luận là kích hoạt
    //     ]);

    //     return response()->json(['message' => 'Thêm bình luận thành công!', 'comment' => $comment], Response::HTTP_CREATED);
    // }
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Bạn cần đăng nhập để có thể bình luận.'], Response::HTTP_UNAUTHORIZED);
        }
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'content' => 'required|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5',
            'image' => 'nullable|string',
            'parent_id' => 'nullable|exists:comments,id'
        ]);
        //  Kiểm tra xem người dùng đã mua sản phẩm này chưa
        // $userHasPurchased = Order::where('user_id', Auth::id())
        // ->where('order_status', 'completed') // Chỉ tính đơn hàng đã hoàn tất
        // ->whereHas('orderItems', function($query) use ($validated) {
        //     $query->where('product_id', $validated['product_id']);
        // })
        // ->exists();

        // if (!$userHasPurchased) {
        //     return response()->json(['message' => 'Bạn cần phải mua sản phẩm này trước khi bình luận.'], Response::HTTP_FORBIDDEN);
        // }
            $comment = Comments::create([
            'user_id' => Auth::id(),
            'product_id' => $validated['product_id'],
            'content' => $validated['content'],
            'rating' => $validated['rating'],
            'image' => $validated['image'],
            'status' => true, 
            'parent_id' => $validated['parent_id'] ?? null
        ]);
    
        return response()->json(['message' => 'Thêm bình luận thành công!', 'comment' => $comment], Response::HTTP_CREATED);
    }
    


    /**
     * Hiển thị một bình luận cụ thể.
     */
    public function show(string $id)
    {
        $comment = Comments::with('user', 'product')->findOrFail($id);
        return response()->json($comment, Response::HTTP_OK);
    }

    /**
     * Cập nhật bình luận.
     */
    // public function update(Request $request, string $id)
    // {
    //     $comment = Comments::findOrFail($id);
    
    //     // Kiểm tra nếu người dùng hiện tại là chủ sở hữu bình luận
    //     if ($comment->user_id !== Auth::id()) {
    //         return response()->json(['message' => 'Không có quyền chỉnh sửa'], Response::HTTP_FORBIDDEN);
    //     }
    
    //     // Xác thực dữ liệu đầu vào
    //     $validated = $request->validate([
    //         'content' => 'sometimes|required|string|max:1000',
    //         'rating' => 'nullable|integer|min:1|max:5',
    //         'image' => 'nullable|string',  // Dữ liệu ảnh có thể null
    //     ]);
    
    //     // Cập nhật nội dung bình luận và đánh giá (nếu có)
    //     $comment->content = $validated['content'] ?? $comment->content;
    //     $comment->rating = $validated['rating'] ?? $comment->rating;
    
    //     // Chỉ cập nhật ảnh nếu người dùng gửi ảnh mới
    //     if ($request->has('image')) {
    //         $comment->image = $validated['image'];
    //     }
    
    //     // Lưu lại các thay đổi
    //     $comment->save();
    
    //     return response()->json(['message' => 'Cập nhật bình luận thành công!', 'comment' => $comment], Response::HTTP_OK);
    // }
    public function update(Request $request, string $id)
    {
        $comment = Comments::findOrFail($id);
    
        
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Không có quyền chỉnh sửa'], Response::HTTP_FORBIDDEN);
        }
        $validated = $request->validate([
            'content' => 'sometimes|required|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5',
            'image' => 'nullable|string', 
            'parent_id' => 'nullable|exists:comments,id'
        ]);
    
        $comment->content = $validated['content'] ?? $comment->content;
        $comment->rating = $validated['rating'] ?? $comment->rating;
        if ($request->has('image')) {
            $comment->image = $validated['image'];
        }
        if ($comment->parent_id !== null) {
            $comment->parent_id = $validated['parent_id'] ?? $comment->parent_id;
        }
        $comment->save();
    
        return response()->json(['message' => 'Cập nhật bình luận thành công!', 'comment' => $comment], Response::HTTP_OK);
    }
    

    /**
     * Xóa bình luận.
     */
    public function destroy(string $id)
    {
        $comment = Comments::findOrFail($id);
    
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Không có quyền xóa bình luận'], Response::HTTP_FORBIDDEN);
        }
    
        $this->deleteChildComments($comment);
    
        $comment->delete();
    
        return response()->json(['message' => 'Xóa bình luận thành công!'], Response::HTTP_OK);
    }
    
    private function deleteChildComments($comment)
    {
        foreach ($comment->childrenRecursive as $child) {
            $this->deleteChildComments($child);
            $child->delete();
        }
    }
    
}
