<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ProductDetailController extends Controller
{
    //
    public function productdetail(string $id)
    {
        // dd($id);
        try {
            $product = Product::query()->with([
                // "galleries",
                // "brand",
                // "category",
                // "tags",

                'variants.attributes' => function ($query) {
                    dd($query->attributes);
                    $query->with(['attributeitems' => function ($query) {
                        // dd();
                        $query->where('attribute_items.id','product_variant_has_attributes.attribute_item_id');
                    }]);
                },
                // "attributes.attributeitems"
                //  'variants.attributes.attributeitems'
                
                   
              
                


            ])->findOrFail($id);

            
            

            // dd($product);
            // $commentProduct = $product->comments->toArray();
            // $variantProduct=$product->variants->toArray();
            // dd($variantProduct);
            // // $attributeItemProduct=$product->
            // dd($commentProduct);



            // $galleries=$product->load(["galleries"]);

            // dd($product->toArray());
            

            return response()->json([
                "message" => "lấy dữ liệu thành công",
                "product" => $product,
                // "galleries"=>$galleries
            ]);
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
