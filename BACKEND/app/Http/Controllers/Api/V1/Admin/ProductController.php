<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProduct;
use App\Models\Attribute;
use App\Models\Brand;
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
            $brand = Brand::query()->get();
            return response()->json([
                'category' => $category,
                'tag' => $tag,
                'attribute' => $attribute,
                "brand" => $brand
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
            return response()->json($respone, Response::HTTP_CREATED);
        } catch (\Exception $ex) {

            // dd($ex->getMessage());
            return response()->json([
                'message' => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {

            $product = Product::query()->findOrFail($id)->load(["brand", "categorychildren", "attributes", "variants", "galleries", "tags"]);
            // dd($product->toArray());
            $category = Category::query()->with(["categorychildrens"])->get();
            $tag = Tag::query()->pluck('name', 'id');
            $attribute = Attribute::with(["attributeitems"])->get();
            $brand = Brand::query()->pluck('name', 'id');
            return response()->json([
                "product" => $product,
                "category" => $category,
                "tag" => $tag,
                "attribute" => $attribute,
                "brand" => $brand,

            ], Response::HTTP_OK);
            // dd($product->toArray());
        } catch (\Exception $ex) {
            Log::error('API/V1/Admin/ProductController@show: ', [$ex->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {


            $product = Product::query()->findOrFail($id);
            // dd($product->galleries->toArray());
            DB::transaction(function () use ($request, $product) {
                $dataProduct = $request->except([
                    "attribute_id",
                    "attribute_item_id",
                    "product_variant",
                    "gallery",
                    "tags"
                ]);
                // dd($dataProduct);
                if ($request->hasFile('img_thumbnail')) {
                    $path = Storage::put("public/product", $dataProduct["img_thumbnail"]);
                    $dataProduct["img_thumbnail"] = url(Storage::url($path));
                    $relativePath = str_replace("/storage/", 'public/', parse_url($product->img_thumbnail, PHP_URL_PATH));
                    Storage::delete($relativePath);
                }
                $dataProduct['slug']=Str::slug($dataProduct["name"]);
                $product->update($dataProduct);

                // Xử lý ảnh gallery
                if ($request->has('gallery') && is_array($request->input('gallery'))) {
                    // dd($request->input('gallery'));
                    foreach ($request->input('gallery') as $galleryItem) {
                        // Kiểm tra xem ID có tồn tại và ảnh có mới không
                        if (isset($galleryItem['id']) && isset($galleryItem['image'])) {
                                                    
                            // Cập nhật ảnh gallery dựa trên ID
                            // echo 1;die;
                            $gallery = ProductGallery::query()->findOrFail($galleryItem['id']);
                            // dd($gallery);
                            if ($gallery) {
                                // Xóa ảnh cũ nếu có
                                $relativePath = str_replace("/storage/", 'public/', parse_url($gallery->image, PHP_URL_PATH));
                                Storage::delete($relativePath);
        
                                // Lưu ảnh mới
                                $path = Storage::put("public/product", $galleryItem['image']);
                                // dd($path);
                                $url = url(Storage::url($path));
        
                                // Cập nhật thông tin ảnh trong gallery
                                $gallery->update([
                                    "image" => $url
                                ]);
                            }
                        }
                    }
                }
                // dd($request->tags);
                $product->tags()->sync($request->tags);


                if ($request->input('type') == 1) {
                    $variant=$product->load(["variants"]);
                    dd($variant);
                    foreach ($request->input("attribute_item_id") as $attributeId => $attributeItemId) {
                        $product->attributes()->sync($attributeId, ["attribute_item_ids" => json_encode($attributeItemId)]);
                    }
              

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
                            $productVariant->attributes()->sync($request->input('attribute_id')[$key], ["attribute_item_id" => $id]);
                        }
                    }
                }

            });
            // dd($product->galleries->toArray());

            return [
                "message" => "cập nhật thành công !",
                // "data" => $product
            ];

            return response()->json($respone, Response::HTTP_CREATED);
        } catch (\Exception $ex) {

            // Log::error('API/V1/Admin/ProductController@store: ', [$ex->getMessage()]);
            dd($ex->getMessage());
            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
