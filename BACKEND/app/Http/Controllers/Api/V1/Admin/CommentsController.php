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
            // Xác thực tham số đầu vào
            $validated = $request->validate([
                'search' => 'nullable|string',
                'email' => 'nullable|string|email',
                'phone_number' => 'nullable|string',
                'name' => 'nullable|string',
                'per_page' => 'nullable|integer|min:1',
                'page' => 'nullable|integer|min:1'
            ]);
    
            $searchTerm = $validated['search'] ?? '';
            $email = $validated['email'] ?? null;
            $phoneNumber = $validated['phone_number'] ?? null;
            $name = $validated['name'] ?? null;
            $perPage = $validated['per_page'] ?? 15;
            $page = $validated['page'] ?? 1;
    
            $perPage = min($perPage, 8); // Giới hạn tối đa là 100 mục
    
            // Tạo truy vấn
            $query = Comments::query()
                ->join('users', 'comments.user_id', '=', 'users.id')
                ->join('products', 'comments.product_id', '=', 'products.id')
                ->select('comments.*');
    
            // Thêm điều kiện tìm kiếm theo email
            if ($email) {
                $query->where('users.email', $email);
            }
    
            // Thêm điều kiện tìm kiếm theo phone_number
            if ($phoneNumber) {
                $query->where('users.phone_number', $phoneNumber);
            }
    
            // Thêm điều kiện tìm kiếm theo tên sản phẩm
            if ($name) {
                $query->where('products.name', 'like', "%$name%");
            }
    
            // Thêm điều kiện tìm kiếm theo nội dung nếu có
            if (!empty($searchTerm)) {
                $query->where('comments.content', 'like', "%$searchTerm%");
            }
    
            // Phân trang
            $comments = $query->paginate($perPage, ['*'], 'page', $page);
    
            // Kiểm tra dữ liệu
            if ($comments->isEmpty()) {
                if ($page > 1) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Không có dữ liệu ở trang hiện tại. Vui lòng kiểm tra trang trước đó hoặc thay đổi từ khóa tìm kiếm.'
                    ], Response::HTTP_NOT_FOUND);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Không có dữ liệu phù hợp với từ khóa tìm kiếm.'
                    ], Response::HTTP_NOT_FOUND);
                }
            }
    
            return response()->json([
                'data' => $comments
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            Log::error('API/V1/Admin/CommentsController@index: ', [$ex->getMessage()]);
    
            return response()->json([
                'status' => false,
                'message' => 'Đã có lỗi nghiêm trọng xảy ra trong quá trình tìm kiếm.'
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
        //
        $comments = Comments::query()->findOrFail($id);

        if($comments->image && Storage::disk('public')->exists($comments->image)){
            Storage::disk('public')->delete($comments->image);

        }
        $comments->delete();
        return response()->json([
            'status'=>true,
            'message'=> "Xóa comments thành công."
        ],200);

    }
}
