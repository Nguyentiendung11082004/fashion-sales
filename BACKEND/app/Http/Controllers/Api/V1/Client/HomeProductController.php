<?php
namespace App\Http\Controllers\Api\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HomeProductController extends Controller
{
    /**
     * Lấy sản phẩm trend và sản phẩm is_show_home cùng với các thuộc tính.
     */
    public function homeProduct()
    {
        try {
            // Lấy sản phẩm có trend = true
            $trendProductsTrend = Product::with([
                'variants.attributes' => function ($query) {
                    $query->with('attributeItems');
                }
            ])
            ->where('trend', true)
            ->select('id', 'name', 'price_regular', 'price_sale', 'img_thumbnail', 'trend')
            ->get();

            // Lấy sản phẩm có is_show_home = true
            $homeProductsShow = Product::with([
                'variants.attributes' => function ($query) {
                    $query->with('attributeItems');
                }
            ])
            ->where('is_show_home', true)
            ->select('id', 'name', 'price_regular', 'price_sale', 'img_thumbnail', 'is_show_home')
            ->get();

            // Định dạng dữ liệu sản phẩm trend
            $formattedTrendProducts = $trendProductsTrend->map(function ($product) {
                $attributes = $product->variants->flatMap(function ($variant) {
                    return $variant->attributes->map(function ($attribute) {
                        return [
                            'attribute_name' => $attribute->name,
                            'attribute_items' => $attribute->attributeItems->pluck('name')
                        ];
                    });
                });

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price_regular' => $product->price_regular,
                    'price_sale' => $product->price_sale, // Thêm giá sale
                    'img_thumbnail' => $product->img_thumbnail,
                    'trend' => $product->trend,
                    'attributes' => $attributes
                ];
            });

            // Định dạng dữ liệu sản phẩm is_show_home
            $formattedHomeProducts = $homeProductsShow->map(function ($product) {
                $attributes = $product->variants->flatMap(function ($variant) {
                    return $variant->attributes->map(function ($attribute) {
                        return [
                            'attribute_name' => $attribute->name,
                            'attribute_items' => $attribute->attributeItems->pluck('name')
                        ];
                    });
                });

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price_regular' => $product->price_regular,
                    'price_sale' => $product->price_sale, // Thêm giá sale
                    'img_thumbnail' => $product->img_thumbnail,
                    'is_show_home' => $product->is_show_home,
                    'attributes' => $attributes
                ];
            });

            return response()->json([
                'message' => 'Lấy dữ liệu sản phẩm trend và is_show_home thành công',
                'trend_products' => $formattedTrendProducts,
                'show_home_products' => $formattedHomeProducts
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi: ' . $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
?>