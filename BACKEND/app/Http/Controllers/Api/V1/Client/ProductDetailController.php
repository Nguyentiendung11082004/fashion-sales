<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductDetailController extends Controller
{
    //
    public function productdetail(string $id)
    {
        try {

            // "brand",
            // "category",
            // "galleries",
            // "tags",
            $product = Product::query()->with([

                "variants.attributes"
            ])->findOrFail($id)->toArray();
            dd($product);

            dd($this->getUniqueAttributes($product["variants"]));

            // dd($product->toArray());
        } catch (\Exception $ex) {
            response()->json(
                [
                    "message" => $ex->getMessage()
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
    // Hàm để lấy các thuộc tính độc nhất
   public function getUniqueAttributes($variants)
    {
        $uniqueAttributes = [];

        foreach ($variants as $variant) {
            foreach ($variant['attributes'] as $attribute) {
                $attrName = $attribute['name'];
                $attrValue = $attribute['pivot']['value'];

                if (!isset($uniqueAttributes[$attrName])) {
                    $uniqueAttributes[$attrName] = [];
                }

                if (!in_array($attrValue, $uniqueAttributes[$attrName])) {
                    $uniqueAttributes[$attrName][] = $attrValue;
                }
            }
        }

        return $uniqueAttributes;
    }
}
