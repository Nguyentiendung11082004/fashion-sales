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

            $product = Product::query()->with([
                // "brand",
                // "category",
                // "galleries",
                // "tags",
                "variants.attributes.attributeitems" 
            ])->findOrFail($id);


            dd($product->toArray());
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
