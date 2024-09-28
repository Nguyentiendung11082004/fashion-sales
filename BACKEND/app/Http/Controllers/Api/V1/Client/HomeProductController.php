<?php
namespace App\Http\Controllers\Api\V1\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HomeProductController extends Controller
{
    public function homeProduct()
    {
        try {
            // Lấy sản phẩm có trend = true
            $products = DB::table('products')
                ->where('trend', true)
                ->select('id', 'name', 'price_regular', 'price_sale', 'img_thumbnail')
                ->get();

            // Lấy các variants (biến thể) liên quan đến sản phẩm
            $productIds = $products->pluck('id');
            $variants = DB::table('product_variants')
                ->whereIn('product_id', $productIds)
                ->select('id', 'product_id', 'price_regular', 'price_sale', 'quantity', 'image', 'sku')
                ->get();

            // Lấy các thuộc tính của biến thể qua bảng pivot
            $variantIds = $variants->pluck('id');
            $attributes = DB::table('product_variant_has_attributes')
                ->join('attributes', 'product_variant_has_attributes.attribute_id', '=', 'attributes.id')
                ->join('attribute_items', 'product_variant_has_attributes.attribute_item_id', '=', 'attribute_items.id')
                ->whereIn('product_variant_has_attributes.product_variant_id', $variantIds)
                ->select('product_variant_has_attributes.product_variant_id', 'attributes.name as attribute_name', 'attribute_items.value as attribute_value')
                ->get();

            // Định dạng dữ liệu sản phẩm và biến thể
            $formattedProducts = $products->map(function ($product) use ($variants, $attributes) {
                // Lọc ra các biến thể thuộc về sản phẩm hiện tại
                $productVariants = $variants->where('product_id', $product->id);

                // Định dạng biến thể cùng với các thuộc tính
                $formattedVariants = $productVariants->map(function ($variant) use ($attributes) {
                    // Lọc ra các thuộc tính thuộc về biến thể hiện tại
                    $variantAttributes = $attributes->where('product_variant_id', $variant->id);

                    // Định dạng các thuộc tính
                    $formattedAttributes = $variantAttributes->map(function ($attribute) {
                        return [
                            'attribute_name' => $attribute->attribute_name,
                            'attribute_value' => $attribute->attribute_value,
                        ];
                    })->values(); // Loại bỏ các key không mong muốn

                    return [
                        'variant_id' => $variant->id,
                        'price_regular' => $variant->price_regular,
                        'price_sale' => $variant->price_sale,
                        'quantity' => $variant->quantity,
                        'image' => $variant->image,
                        'sku' => $variant->sku,
                        'attributes' => $formattedAttributes, // Sử dụng values() để loại bỏ key
                    ];
                })->values(); // Loại bỏ các key không mong muốn

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price_regular' => $product->price_regular,
                    'price_sale' => $product->price_sale,
                    'img_thumbnail' => $product->img_thumbnail,
                    'variants' => $formattedVariants, // Sử dụng values() để loại bỏ key
                ];
            })->values(); // Loại bỏ các key không mong muốn

            return response()->json([
                'message' => 'Lấy dữ liệu sản phẩm thành công',
                'trend_products' => $formattedProducts,
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi: ' . $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}



?>