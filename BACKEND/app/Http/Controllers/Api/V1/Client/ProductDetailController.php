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
    protected $getUniqueAttributes;
    public function __construct()
    {
        $this->getUniqueAttributes = new GetUniqueAttribute();
    }
    public function productdetail(string $id)
    {
        try {
            $product = Product::query()->with([
                "brand",
                "category",
                "galleries",
                "tags",
                "comments.user",

                "variants.attributes"
            ])->findOrFail($id);
            $product->increment('views');

            $productRelated = Product::query()->with(["variants.attributes"])->where([
                ['id', "<>", $product->id],
                ['category_id', $product->category_id],
            ])->get()->toArray();
            foreach ($productRelated as $key => $item) {

                $productRelated[$key]["product_related_attributes"] = $this->getUniqueAttributes->getUniqueAttributes($item["variants"]);
            }
            return response()->json(
                [
                    'product' => $product,
                    "getUniqueAttributes" => $this->getUniqueAttributes->getUniqueAttributes($product["variants"]),
                    'productRelated' => $productRelated,
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
    public function findvariant(Request $request,$id)
    {
        // dd($id);
        try {
            return DB::transaction(function () use ($request,$id) {
                $product = Product::query()->findOrFail($id)->load(["variants.attributes"])->toArray();
                $productVariant = $request->input('product_variant');
                $findProductVariant = $this->getUniqueAttributes->findVariantByAttributes($product["variants"], $productVariant);
                return response()->json([
                    "message" => "lấy dữ liệu thành công",
                    "findProductVariant" => $findProductVariant
                ], Response::HTTP_OK);
            });
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
