<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Helper\Product\GetUniqueAttribute;

class ProductDetailController extends Controller
{
    //
    public function productdetail(string $id)
    {
        try {
            $product = Product::query()->with([
                "brand",
                "category",
                "galleries",
                "tags",
                "comments",
                "variants.attributes"
                ])->findOrFail($id);
                $product->increment('views');
            $getUniqueAttributes = new GetUniqueAttribute();
            $productRelated = Product::query()->with(["variants.attributes"])->where('id', "<>", $product)->get()->toArray();
            
            foreach ($productRelated as $key=> $item) {
               
                $productRelated[$key]["product_related_attributes"]=$getUniqueAttributes->getUniqueAttributes($item["variants"]);
            }
            return response()->json(
                [
                    'product' => $product,
                    "getUniqueAttributes" => $getUniqueAttributes->getUniqueAttributes($product["variants"]),
                    'productRelated'=>$productRelated,
                ]
            );
        } catch (\Exception $ex) {
            response()->json(
                [
                    "message" => $ex->getMessage()
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
