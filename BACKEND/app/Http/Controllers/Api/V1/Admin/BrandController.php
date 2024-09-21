<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Brand\BrandRequest;
use App\Http\Requests\Brand\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index(Request $request)
    {
        try {
            // Lấy tất cả các thương hiệu và sắp xếp theo ID mới nhất
            $brands = Brand::query()->latest('id')->get();
        
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
            try {

                $params = $request->all();
                $imagePath = null;
                if ($request->hasFile('image')) {
                    $imagePath = Storage::disk('public')->put('brands', $request->file('image'));
                    $params['image'] = url(Storage::url($imagePath));
                }
                $params['slug'] = $this->generateUniqueSlug($params['name']);
                $brand = Brand::create($params);
                return response()->json([
                    'data' => new BrandResource($brand),
                    'success' => true,
                    'message' => 'Brand đã được thêm thành công'
                ], 201);
            } catch (QueryException $e) {
                // Xóa ảnh đã upload nếu có lỗi cơ sở dữ liệu
                if ($imagePath) {
                    Storage::disk('public')->delete($imagePath);
                }
                return response()->json([
                    'success' => false,
                    'message' => 'Thêm Brand thất bại!',
                    'error' => $e->getMessage()
                ], 500);
            }
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
        try {
          
            $data = $request->except('image');
            $brand = Brand::findOrFail($id);
            if ($request->hasFile('image')) {
                $data['image'] = Storage::disk('public')->put('brands', $request->file('image'));
                $data['image'] = url(Storage::url($data['image']));
                if (!empty($brand->image)) {
                    $relativePath = str_replace("/storage/", 'public/', parse_url($brand->image, PHP_URL_PATH));
                    if (Storage::exists($relativePath)) {
                        Storage::delete($relativePath);
                    }
                }
            } else {
                $data['image'] = $brand->image;
            }
            if ($data['name'] !== $brand->name) { 
                $data['slug'] = $this->generateUniqueSlug($data['name'], $id);
            } else {    
                $data['slug'] = $brand->slug;
            } 
            $brand->update($data);   
            return response()->json([
                'data' => new BrandResource($brand),
                'success' => true,
                'message' => 'Brand đã được sửa thành công'
            ], 200);
        } catch (ModelNotFoundException $e) {  
            return response()->json([
                'message' => 'Brand không tồn tại!'
            ], 404);
        } catch (QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cập nhật Brand thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       
        $brand = Brand::query()->findOrFail($id);
        if ($brand->image) {
            $imagePath = str_replace(url('/storage'), '', $brand->image);
            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }
    
      
        $brand->delete();
    
       
        return response()->json([
            'status' => true,
            'message' => "Xóa brand và ảnh thành công."
        ], 200);
    }
    private function generateUniqueSlug($value, $id = null)
    {
        // Tạo slug từ 'value'
        $slug = Str::slug($value, '-');

        // Kiểm tra slug trùng lặp, bỏ qua chính bản ghi đang được cập nhật (nếu có id)
        $original_slug = $slug;
        $count = 1;

        // Vòng lặp kiểm tra slug có trùng lặp không, nếu có thì thêm số
        while (Brand::where('slug', $slug)->where('id', '!=', $id)->exists()) {
            $slug = $original_slug . '-' . $count;
            $count++;
        }
        return $slug;
    }
}
