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
    //     if (!Auth::check()) {
    //         return response()->json(['message' => 'Bạn cần đăng nhập để có thể bình luận.'], Response::HTTP_UNAUTHORIZED);
    //     }
    //     $validated = $request->validate([
    //         'product_id' => 'required|exists:products,id',
    //         'content' => 'nullable|string|max:1000',
    //         'rating' => 'nullable|integer|min:1|max:5',
    //         'image' => 'nullable|string',
    //         'parent_id' => 'nullable|exists:comments,id'
    //     ]);
    //     //  Kiểm tra xem người dùng đã mua sản phẩm này chưa
    //     $userHasPurchased = Order::where('user_id', Auth::id())
    //     ->whereIn('order_status', ['Giao hàng thành công', 'Hoàn thành']) // Kiểm tra cả 2 trạng thái
    //     ->whereHas('orderDetails', function($query) use ($validated) { 
    //         $query->where('product_id', $validated['product_id']);
    //     })
    //     ->exists();

    //     if (!$userHasPurchased) {
    //         return response()->json(['message' => 'Bạn cần phải mua sản phẩm này trước khi bình luận.'], Response::HTTP_FORBIDDEN);
    //     }
    //         $comment = Comments::create([
    //         'user_id' => Auth::id(),
    //         'product_id' => $validated['product_id'],
    //         'content' => $validated['content'],
    //         'rating' => $validated['rating'],
    //         'image' => $validated['image'],
    //         'status' => true, 
    //         'parent_id' => $validated['parent_id'] ?? null
    //     ]);
    
    //     return response()->json(['message' => 'Thêm bình luận thành công!', 'comment' => $comment], Response::HTTP_CREATED);
    // }
    
    public function store(Request $request)
    {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (!Auth::check()) {
            return response()->json(['message' => 'Bạn cần đăng nhập để có thể bình luận.'], Response::HTTP_UNAUTHORIZED);
        }
    
        // Validate dữ liệu
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'content' => 'nullable|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5',
            'image' => 'nullable|string',
            'parent_id' => 'nullable|exists:comments,id' // Kiểm tra nếu có parent_id
        ]);
    
        // Nếu không có parent_id trong dữ liệu, đặt giá trị mặc định là null
        $parentId = $validated['parent_id'] ?? null;
    
        // Kiểm tra xem người dùng đã mua sản phẩm này chưa
        $userHasPurchased = Order::where('user_id', Auth::id())
            ->where('order_status', 'Hoàn thành')
            ->whereHas('orderDetails', function($query) use ($validated) {
                $query->where('product_id', $validated['product_id']);
            })
            ->exists();
    
        if (!$userHasPurchased) {
            return response()->json(['message' => 'Bạn cần phải mua sản phẩm này trước khi bình luận.'], Response::HTTP_FORBIDDEN);
        }
    
        // Nếu không có parent_id (bình luận cha), kiểm tra người dùng đã bình luận hay chưa
        if (is_null($parentId)) {
            $userHasCommented = Comments::where('user_id', Auth::id())
                ->where('product_id', $validated['product_id'])
                ->whereNull('parent_id') // Kiểm tra bình luận cha
                ->exists();
    
            if ($userHasCommented) {
                return response()->json([
                    'user_has_commented' => true,
                    'message' => 'Bạn đã đánh giá về sản phẩm này.',
                ], Response::HTTP_FORBIDDEN);
            }
        }
    
        // Tạo bình luận mới (cha hoặc con)
        $comment = Comments::create([
            'user_id' => Auth::id(),
            'product_id' => $validated['product_id'],
            'content' => $validated['content'],
            'rating' => $validated['rating'],
            'image' => $validated['image'],
            'status' => true,
            'parent_id' => $parentId // Nếu có parent_id thì đây là bình luận con
        ]);
    
        // Trả về kết quả sau khi bình luận được tạo thành công
        return response()->json([
            'user_has_commented' => false,
            'message' => 'Thêm bình luận thành công!',
            'comment' => $comment
        ], Response::HTTP_CREATED);
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
    public function update(Request $request, string $id)
    {
        $comment = Comments::findOrFail($id);
    
        
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Không có quyền chỉnh sửa'], Response::HTTP_FORBIDDEN);
        }
        $validated = $request->validate([
            'content' => 'nullable|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5',
            'image' => 'nullable|string', 
            'parent_id' => 'nullable|exists:comments,id'
        ]);
    
        if ($request->has('content')) {
            $comment->content = $validated['content'];
        }
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
