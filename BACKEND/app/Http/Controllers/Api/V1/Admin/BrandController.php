<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Brand\BrandRequest;
use App\Http\Requests\Brand\UpdateBrandRequest;
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
        // Lấy tất cả các thương hiệu
        $brands = Brand::all();

        // Kiểm tra dữ liệu
        if ($brands->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Không có dữ liệu.',
                'data' => []
            ], Response::HTTP_NOT_FOUND);
        }

        // Trả về dữ liệu với cấu trúc rõ ràng
        return response()->json([
            'status' => true,
            'message' => 'Danh sách thương hiệu được lấy thành công.',
            'data' => [
                'total' => $brands->count(),
                'brands' => $brands
            ]
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
    public function store(BrandRequest $request)
    {
        //
        $params = $request->all();
        $brand = Brand::create($params);
        return response()->json([
            'data' => new BrandResource($brand),
            'success'=>true,
            'message' => 'Brand đã được thêm thành công'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $brand = Brand::query()->findOrFail($id);
        return new BrandResource($brand);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, string $id)
    {
        //
        $brand = Brand::query()->findOrFail($id);
        $params = $request->all();
        $brand->update($params);
        return response()->json([
            'data' => new BrandResource($brand),
            'success'=>true,
            'message' => 'Brand đã được sửa thành công'
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brand = Brand::query()->findOrFail($id);

      
        $brand->delete();
        return response()->json([
            'status'=>true,
            'message'=> "Xóa brand thành công."
        ],200);
    }
}
