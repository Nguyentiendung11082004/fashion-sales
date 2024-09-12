<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProduct;
use App\Models\Attribute;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductGallery;
use App\Models\ProductVariant;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $product = Product::query()->get();
            return response()->json([
                'data' => $product
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            Log::error('API/V1/Admin/ProductController@index: ', [$ex->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function create()
    {
        try {
            $category = Category::query()->with(["categorychildrens"])->get();
            $tag = Tag::query()->get();
            $attribute = Attribute::with(["attributeitems"])->get();

            return response()->json([
                'category' => $category,
                'tag' => $tag,
                'attribute' => $attribute,
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            Log::error('API/V1/Admin/ProductController@create: ', [$ex->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProduct $request)
    {

        //

        // dd($request->all());
        try {

            $respone = DB::transaction(function () use ($request) {

                $dataProduct = $request->except(["attribute_id", "attribute_item_id", "product_variant"]);
                $dataProduct["slug"] = Str::slug($request->input("name"));
                if ($request->hasFile('img_thumbnail')) {
                    $path = Storage::put("public/product", $dataProduct["img_thumbnail"]);
                    $url = url(Storage::url($path));
                    $dataProduct["img_thumbnail"] = $url;
                }
                $product = Product::query()->create($dataProduct);
                // dd($product->toArray());
                foreach ($request->gallery as  $gallery) {


                    $path = Storage::put("public/product", $gallery);
                    $url = url(Storage::url($path));
                    ProductGallery::query()->create([
                        "product_id" => $product->id,
                        "image" => $url

                    ]);
                }
                $product->tags()->attach($dataProduct['tags']);


                if ($request->input('type') == 1) {
                    // create product_has_attribute

                    foreach ($request->input("attribute_item_id") as $attributeId => $attributeItemId) {
                        $product->attributes()->attach($attributeId, ["attribute_item_ids" => json_encode($attributeItemId)]);
                    }
                    // thêm mới productvariant

                    foreach ($request->input("product_variant") as $item) {
                        if ($request->hasFile($item["image"])) {
                            $path = Storage::put("public/product", $item["image"]);
                            $url = url(Storage::url($path));
                        }
                        $productVariant = ProductVariant::query()->create([
                            "product_id" => $product->id,
                            "price_regular" => $item["price_regular"],
                            "price_sale" => $item["price_sale"],
                            "quantity" => $item["quantity"],
                            "image" => $url,
                            "sku" => $item["sku"],
                            
                        ]);
                        foreach ($item["attribute_item_id"] as $key => $id) {
                            $productVariant->attributes()->attach($request->input('attribute_id')[$key], ["attribute_item_id" => $id]);
                        }
                    }
                }

                return [
                    "message" => "thêm mới thành công !",
                    "data" => $product
                ];
            });
            return response()->json($respone);
        } catch (\Exception $ex) {

            // Log::error('API/V1/Admin/ProductController@store: ', [$ex->getMessage()]);
            dd($ex->getMessage());
            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
