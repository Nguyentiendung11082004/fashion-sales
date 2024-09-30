<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Helper\Product\GetUniqueAttribute;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ProductShopController extends Controller
{
    // lấy ra tất cả product và biến thể của nó
    public function getAllProduct(Request $request)
    {
        $search = $request->input('search');
        try {
            $products = Product::query()
                ->when($search, function ($query, $search) {
                    return $query->where('name', 'like', "%{$search}%"); // Tìm kiếm theo tên sản phẩm
                })
                ->with([
                    "brand",
                    "category",
                    "galleries",
                    "tags",
                    "comments",
                    "variants.attributes"
                ])->get();
            $allProducts = []; // Mảng chứa tất cả sản phẩm và biến thể

            foreach ($products as $product) {
                $product->increment('views'); // Tăng số lượt xem
                $getUniqueAttributes = new GetUniqueAttribute();

                // Thêm sản phẩm và biến thể vào mảng
                $allProducts[] = [
                    'product' => $product,
                    'getUniqueAttributes' => $getUniqueAttributes->getUniqueAttributes($product["variants"]),
                ];
            }

            // Trả về tất cả sản phẩm sau khi vòng lặp kết thúc
            return response()->json($allProducts);
        } catch (ModelNotFoundException $e) {
            // Trả về lỗi 404 nếu không tìm thấy Category
            return response()->json([
                'message' => 'Thuộc tính Tồn Tại!'
            ], 404);
        }
    }
}
