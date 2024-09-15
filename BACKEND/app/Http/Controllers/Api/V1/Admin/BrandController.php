<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class BrandController extends Controller
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
                'per_page' => 'nullable|integer|min:1|max:10', // Giới hạn tối đa số bản ghi mỗi trang là 10
                'page' => 'nullable|integer|min:1'
            ]);
    
            $searchTerm = $validated['search'] ?? '';
            $perPage = $validated['per_page'] ?? 10; // Mặc định là 10 nếu không có tham số
            $page = $validated['page'] ?? 1;
    
            // Tạo truy vấn
            $query = Brand::query();
    
            if (!empty($searchTerm)) {
                $query->where('name', 'like', "%$searchTerm%");
            }
    
            // Phân trang
            $brands = $query->paginate($perPage, ['*'], 'page', $page);
    
            // Kiểm tra dữ liệu
            if ($brands->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => $page > 1 
                        ? 'Không có dữ liệu ở trang hiện tại. Vui lòng kiểm tra trang trước đó hoặc thay đổi từ khóa tìm kiếm.' 
                        : 'Không có dữ liệu phù hợp với từ khóa tìm kiếm.'
                ], Response::HTTP_NOT_FOUND);
            }
    
            return response()->json([
                'data' => $brands,
                'status' => true
            ], Response::HTTP_OK);
    
        } catch (\Exception $ex) {
            Log::error('API/V1/Admin/BrandController@index: ', [$ex->getMessage()]);
    
            return response()->json([
                'status' => false,
                'message' => 'Đã có lỗi nghiêm trọng xảy ra. Vui lòng thử lại sau.'
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
    }
}
