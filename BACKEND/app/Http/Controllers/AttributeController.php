<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $attributes = Attribute::query()->paginate(5);
        return response()->json($attributes, 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Lấy toàn bộ dữ liệu từ request
            $data = $request->all();
    
            // Tạo slug từ name
            $data['slug'] = Str::slug($data['name'], '-');
    
            // Tạo attribute mới
            $attribute = Attribute::create($data);
    
            // Trả về JSON với thông báo thành công và dữ liệu attribute
            return response()->json([
                'message' => 'Thêm Thuộc Tính Thành Công!',
                'data' => $attribute
            ], 201);
    
        } catch (QueryException $e) {
            // Trả về lỗi nếu có vấn đề trong quá trình thêm mới
            return response()->json([
                'message' => 'Thêm Thuộc Tính Thất Bại!',
                'error' => $e->getMessage() // Tùy chọn: trả về chi tiết lỗi nếu cần
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            // Tìm attribute theo ID
            $attribute = Attribute::findOrFail($id);
            return response()->json($attribute, 200);
        } catch (ModelNotFoundException $e) {
            // Trả về lỗi 404 nếu không tìm thấy attribute
            return response()->json([
                'message' => 'Thuộc tính Tồn Tại!'
            ], 404);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $data = $request->all();
            $data['slug'] = Str::slug($data['name'], '-');
            // Tìm attribute theo ID
            $attribute = Attribute::findOrFail($id);

            // Cập nhật attribute với dữ liệu mới
            $attribute->update($data);

            // Trả về JSON với dữ liệu thuộc tính sau khi cập nhật
            return response()->json([
                'message' => 'Cập Nhật Thuộc Tính Thành Công!',
                'data' => $attribute
            ], 200);
        } catch (ModelNotFoundException $e) {
            // Trả về lỗi 404 nếu không tìm thấy attribute
            return response()->json([
                'message' => 'Thuộc tính Tồn Tại!'
            ], 404);
        } catch (QueryException $e) {
            // Trả về lỗi 500 nếu có vấn đề trong quá trình cập nhật
            return response()->json([
                'message' => 'Cập Nhật Thuộc Tính Thất Bại!',
                'error' => $e->getMessage() // Tùy chọn: trả về chi tiết lỗi
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Tìm attribute theo ID
            $attribute = Attribute::findOrFail($id);
    
            // Xóa attribute
            $attribute->delete();
    
            // Trả về JSON với thông báo sau khi xóa thành công
            return response()->json([
                'message' => 'Xóa Thuộc Tính Thành Công!'
            ], 200);
    
        } catch (ModelNotFoundException $e) {
            // Trả về lỗi 404 nếu không tìm thấy attribute
            return response()->json([
                'message' => 'Thuộc tính Tồn Tại!'
            ], 404);
    
        } catch (QueryException $e) {
            // Trả về lỗi 500 nếu có vấn đề trong quá trình xóa
            return response()->json([
                'message' => 'Xóa Thuộc Tính Thất Bại!',
                'error' => $e->getMessage() // Tùy chọn: trả về chi tiết lỗi nếu cần
            ], 500);
        }
    }
}
