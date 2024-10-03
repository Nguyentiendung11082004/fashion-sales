<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category; // Add Category model
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Helper\Product\GetUniqueAttribute;

class HomeProductController extends Controller
{
    public function getHomeProducts()
    {
        try {
            // Lấy sản phẩm xu hướng (trend) và sản phẩm hiển thị trên trang chủ (is_show_home)
            $trendProducts = Product::query()->with([
                "variants.attributes"
            ])->where('trend', true)->get();

            $homeShowProducts = Product::query()->with([
                "variants.attributes"
            ])->where('is_show_home', true)->get();

            // Khởi tạo đối tượng để lấy các thuộc tính độc nhất
            $getUniqueAttributes = new GetUniqueAttribute();

            // Thêm các thuộc tính độc nhất cho sản phẩm xu hướng
            foreach ($trendProducts as $key => $product) {
                $trendProducts[$key]['unique_attributes'] = $getUniqueAttributes->getUniqueAttributes($product->variants->toArray());
            }

            // Thêm các thuộc tính độc nhất cho sản phẩm hiển thị trên trang chủ
            foreach ($homeShowProducts as $key => $product) {
                $homeShowProducts[$key]['unique_attributes'] = $getUniqueAttributes->getUniqueAttributes($product->variants->toArray());
            }

            // Lấy danh mục (categories) từ database
            $categories = Category::query()
                ->whereNull('parent_id') // Chỉ lấy danh mục cha (parent categories)
                ->with('children') // Gồm cả danh mục con nếu có
                ->get();

            // Trả về kết quả JSON bao gồm sản phẩm trend, sản phẩm hiển thị trên trang chủ và danh mục
            return response()->json(
                [
                    'trend_products' => $trendProducts,
                    'home_show_products' => $homeShowProducts,
                    'categories' => $categories // Add categories to the response
                ],
                Response::HTTP_OK
            );
        } catch (\Exception $ex) {
            return response()->json(
                [
                    "message" => $ex->getMessage()
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
