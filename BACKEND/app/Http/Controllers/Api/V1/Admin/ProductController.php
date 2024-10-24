<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProduct;
use App\Http\Requests\Product\UpdateProduct;
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
            $product = Product::query()->latest('id')->get();
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
            $category = Category::query()->latest('id')->get();

            $tag = Tag::query()->latest('id')->get();
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
        try {

            $respone = DB::transaction(function () use ($request) {

                $dataProduct = $request->except(["attribute_id", "attribute_item_id", "product_variant"]);

                $dataProduct["slug"] = Str::slug($request->input("name"));

                $product = Product::query()->create($dataProduct);
                foreach ($request->gallery as  $gallery) {

                    ProductGallery::query()->create([
                        "product_id" => $product->id,
                        "image" => $gallery

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
                        //    dd($item);
                        $productVariant = ProductVariant::query()->create([
                            "product_id" => $product->id,
                            "price_regular" => $item["price_regular"],
                            "price_sale" => $item["price_sale"],
                            "quantity" => $item["quantity"],
                            "image" => $item['image'],
                            "sku" => $item["sku"],

                        ]);
                        foreach ($item["attribute_item_id"] as  $value) {

                            $attribute_id = null;

                            foreach ($request->input('attribute_id') as  $attr_id) {

                                if (in_array($value['id'], $request->input('attribute_item_id')[$attr_id])) {
                                    $attribute_id = $attr_id;
                                    break;
                                }
                            }
                            if ($attribute_id !== null) {
                                $productVariant->attributes()->attach(
                                    $attribute_id,
                                    ["attribute_item_id" => $value["id"], "value" => $value['value']]
                                );
                            }
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
            // dd($id);
            $product = Product::query()->latest('id')->findOrFail($id)->load(["brand", "category", "attributes", "variants", "galleries", "tags"]);
            // dd($product);
            foreach ($product->attributes as  $item) {
                $item->pivot->attribute_item_ids = json_decode($item->pivot->attribute_item_ids);
            }
            $category = Category::query()->latest('id')->get();
            // dd($category->toArray());
            $tag = Tag::query()->latest('id')->pluck('name', 'id');
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
    public function update(UpdateProduct $request, string $id)
    {

        try {


            $product = Product::query()->findOrFail($id);


            DB::transaction(function () use ($request, $product) {
                $dataProduct = $request->except([
                    "attribute_id",
                    "attribute_item_id",
                    "product_variant",
                    "gallery",
                    "tags"
                ]);

                $dataProduct['slug'] = Str::slug($dataProduct["name"]);

                if (isset($request->gallery)) {

                    foreach ($request->gallery as $galleryItem) {

                        if (isset($galleryItem['id']) && isset($galleryItem['image'])) {

                            $gallery = ProductGallery::query()->findOrFail($galleryItem['id']);
                            $gallery->update([
                                "image" => $galleryItem['image']
                            ]);
                        }
                    }
                }

                $product->tags()->sync($request->tags);

                if ($request->input('type') == 1) {
                    $syncData = [];
                    foreach ($request->input("attribute_item_id") as $attributeId => $attributeItemId) {
                        $syncData[$attributeId] = ["attribute_item_ids" => json_encode($attributeItemId)];
                    }
                    $product->attributes()->sync($syncData);

                    // Lấy biến thể hiện tại của sản phẩm từ database



                    // Tải các biến thể hiện có của sản phẩm và chuyển đổi thành mảng
                    $existingVariants = $product->load(['variants'])->toArray()['variants'];

                    // Tạo một mảng để lưu trữ ID của các biến thể được xử lý từ yêu cầu
                    $processedVariantIds = [];

                    // Vòng lặp qua các biến thể từ yêu cầu
                    foreach ($request->product_variant as $keys => $item) {
                        // Đặt lại $syncVariant cho mỗi biến thể
                        $syncVariant = [];

                        // Xử lý hình ảnh
                        if (isset($item["image"])) {

                            $url = $item["image"];
                        } else {
                            // Giữ ảnh cũ nếu không upload ảnh mới
                            $url = $existingVariants[$keys]["image"] ?? null;
                        }

                        // Kiểm tra xem biến thể có tồn tại trong DB không, nếu có thì update, nếu không thì tạo mới
                        if (isset($existingVariants[$keys])) {
                            // Cập nhật biến thể hiện có
                            ProductVariant::where('id', $existingVariants[$keys]["id"])
                                ->update([
                                    "product_id" => $product->id,
                                    "price_regular" => $item["price_regular"],
                                    "price_sale" => $item["price_sale"],
                                    "quantity" => $item["quantity"],
                                    "image" => $url,
                                    "sku" => $item["sku"],
                                ]);

                            // Lấy biến thể sau khi cập nhật
                            $productVariant = ProductVariant::findOrFail($existingVariants[$keys]["id"]);

                            // Thêm ID vào mảng đã xử lý
                            $processedVariantIds[] = $existingVariants[$keys]["id"];
                        } else {
                            $productVariant = ProductVariant::create([
                                "product_id" => $product->id,
                                "price_regular" => $item["price_regular"],
                                "price_sale" => $item["price_sale"],
                                "quantity" => $item["quantity"],
                                "image" => $url,
                                "sku" => $item["sku"],
                            ]);

                            // Thêm ID vào mảng đã xử lý
                            $processedVariantIds[] = $productVariant->id;
                        }

                        foreach ($item["attribute_item_id"] as  $value) {

                            $attribute_id = null;

                            foreach ($request->input('attribute_id') as  $attr_id  ) { //2,1

                                if (in_array($value['id'], $request->input('attribute_item_id')[$attr_id])) {
                                    $attribute_id = $attr_id;
                                    break;
                                }
                            }
                            // dd($attribute_id);

                            if ($attribute_id !== null) {
                                
                                $syncVariant[$attribute_id] = [
                                    "attribute_item_id" => $value["id"],
                                    "value" => $value["value"]
                                ];
                            }
                            // dd($syncVariant);
                        }
                        // dd($syncVariant);

                        // Đồng bộ hóa thuộc tính
                        $productVariant->attributes()->sync($syncVariant);
                    }

                    // Sau khi xử lý tất cả các biến thể từ yêu cầu, xóa các biến thể không được xử lý
                    if (!empty($existingVariants)) {
                        // dd($existingVariants);
                        // Lấy tất cả ID của biến thể hiện có
                        $existingVariantIds = array_column($existingVariants, 'id');
                        // dd($existingVariantIds,$processedVariantIds);

                        // Xác định các ID cần xóa
                        $variantIdsToDelete = array_diff($existingVariantIds, $processedVariantIds);
                        // dd($variantIdsToDelete);

                        if (!empty($variantIdsToDelete)) {
                            // Tách các thuộc tính liên kết trước khi xóa
                            ProductVariant::whereIn('id', $variantIdsToDelete)->each(function ($variant) {
                                $variant->attributes()->detach(); // Tách các thuộc tính
                                $variant->delete(); // Xóa biến thể
                            });
                        }
                    }
                }
                if ($request->input('type') == 0 && $product->type == 1) {


                    DB::table('product_variant_has_attributes')->whereIn('product_variant_id', function ($query) use ($product) {
                        $query->select('id')
                            ->from('product_variants')
                            ->where('product_id', $product->id);
                    })->delete();

                    ProductVariant::where('product_id', $product->id)->delete();

                    DB::table('product_has_attributes')->where('product_id', $product->id)->delete();
                }
                $product->update($dataProduct);
            });


            return [
                "message" => "cập nhật thành công !",

            ];

            return response()->json($respone, Response::HTTP_CREATED);
        } catch (\Exception $ex) {

            // Log::debug();
            return response()->json([
                "message" => $ex->getMessage(),

            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        try {
            $product = Product::query()->findOrFail($id);
            $respone = DB::transaction(function () use ($product) {

                ProductGallery::query()->where('product_id', $product->id)->delete();
                $product->tags()->sync([]);
                if ($product->type == 1) {

                    DB::table('product_variant_has_attributes')->whereIn('product_variant_id', function ($query) use ($product) {
                        $query->select('id')
                            ->from('product_variants')
                            ->where('product_id', $product->id);
                    })->delete();

                    ProductVariant::where('product_id', $product->id)->delete();

                    $product->attributes()->sync([]);
                }
                $product->delete();

                return [
                    "message" => "xóa dữ liệu thành công"
                ];
            });
            return response()->json($respone);
        } catch (\Exception $ex) {
            return response()->json(
                [
                    "message" => $ex->getMessage()
                ]
            );
        }
    }
}
