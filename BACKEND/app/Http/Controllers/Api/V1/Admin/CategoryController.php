<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::query()->latest('id')->get();
        return response()->json($categories, 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        try {
            // Lấy toàn bộ dữ liệu từ request
            $data = $request->all();
            // if ($request->hasFile('img_thumbnail')) {
            //     // Upload ảnh lưu vào thư mục public/storage/category
            //     $data['img_thumbnail'] = Storage::disk('public')->put('categories', $request->file('img_thumbnail'));
            //     $data['img_thumbnail'] = url(Storage::url($data['img_thumbnail']));
            // }
            if ($request->has('img_thumbnail')) {
                $data['img_thumbnail'] = $request->input('img_thumbnail');
            }
            // Tạo slug từ name
            $data['slug'] = $this->generateUniqueSlug($data['name']);

            // Tạo attribute mới
            $categories = Category::create($data);

            // Trả về JSON với thông báo thành công và dữ liệu attribute
            return response()->json([
                'message' => 'Thêm Thuộc Tính Thành Công!',
                'data' => $categories
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
            $category = Category::findOrFail($id);
            return response()->json($category, 200);
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
    public function update(UpdateCategoryRequest $request, string $id)
    {
        try {
            // Lấy toàn bộ dữ liệu từ request
            $data = $request->all();
            dd($data);
            // Tìm attribute theo ID
            $category = Category::findOrFail($id);
            // if ($request->hasFile('img_thumbnail')) {
            //     // Upload ảnh lưu vào thư mục /storage/app/public/category
            //     $data['img_thumbnail'] = Storage::disk('public')->put('categories', $request->file('img_thumbnail'));
            //     $data['img_thumbnail'] = url(Storage::url($data['img_thumbnail']));
            //     // Xóa ảnh cũ nếu có
            //     if (!empty($category->img_thumbnail)) {
            //         $relativePath = str_replace("/storage/", 'public/', parse_url($category->img_thumbnail, PHP_URL_PATH));
            //         Storage::delete($relativePath);
            //     }
            // } else {
            //     // Nếu không có ảnh mới, giữ nguyên ảnh cũ
            //     $data['img_thumbnail'] = $category->img_thumbnail;
            // }

            // Xử lý ảnh: nếu có ảnh mới, sử dụng giá trị ảnh từ request, nếu không giữ nguyên ảnh cũ
            if ($request->filled('img_thumbnail')) {
                // Lấy chuỗi từ trường 'image' trong request
                $data['img_thumbnail'] = $request->input('img_thumbnail');
            } else {
                // Nếu không có ảnh mới, giữ nguyên giá trị ảnh cũ
                $data['img_thumbnail'] = $category->img_thumbnail;
            }
            $data['slug'] = Str::slug($data['name'], '-');

            // Kiểm tra xem giá trị 'name' có thay đổi hay không
            if ($data['name'] !== $category->name) {
                // Nếu 'name' thay đổi, tạo slug mới và đảm bảo slug duy nhất
                $data['slug'] = $this->generateUniqueSlug($data['name'], $id);
            } else {
                // Nếu không thay đổi, giữ nguyên slug hiện tại
                $data['slug'] = $category->slug;
            }
            // Cập nhật attribute với dữ liệu mới
            $category->update($data);

            // Trả về JSON với dữ liệu thuộc tính sau khi cập nhật
            return response()->json([
                'message' => 'Cập Nhật Thuộc Tính Thành Công!',
                'data' => $category
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
            $category = Category::findOrFail($id);

            // Xóa attribute
            $category->delete();
            if (!empty($category->img_thumbnail)) {
                $relativePath = str_replace("/storage/", 'public/', parse_url($category->img_thumbnail, PHP_URL_PATH));
                Storage::delete($relativePath);
            }
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
    private function generateUniqueSlug($value, $id = null)
    {
        // Tạo slug từ 'value'
        $slug = Str::slug($value, '-');

        // Kiểm tra slug trùng lặp, bỏ qua chính bản ghi đang được cập nhật (nếu có id)
        $original_slug = $slug;
        $count = 1;

        // Vòng lặp kiểm tra slug có trùng lặp không, nếu có thì thêm số
        while (Category::where('slug', $slug)->where('id', '!=', $id)->exists()) {
            $slug = $original_slug . '-' . $count;
            $count++;
        }
        return $slug;
    }
}
