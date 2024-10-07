<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Shop\ProductShopRequest;
use App\Http\Helper\Product\GetUniqueAttribute;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductShopController extends Controller
{
    // lấy ra tất cả product và biến thể của nó
    public function getAllProduct(ProductShopRequest $request)
    {
        // Lấy tất danh mục 
        $allCategory = Category::query()->latest('id')->get();
        // Lấy tất cả brands
        $allBrand = Brand::query()->latest('id')->get();
        // lấy ra các thuộc tính
        $allAttribute = Attribute::with('attributeitems')->get();
       

        $search = $request->input('search'); // Người dùng nhập từ khóa tìm kiếm
        $colors = $request->input('colors'); // Người dùng truyền lên một mảng các màu
        $sizes = $request->input('sizes'); // Người dùng truyền lên một mảng các kích thước
        $minPrice = $request->input('min_price'); // Người dùng nhập giá tối thiểu
        $maxPrice = $request->input('max_price'); // Người dùng nhập giá tối đa
        $categories = $request->input('categorys');
        $brands = $request->input('brands');
        $sortPrice = $request->input('sortPrice');
        $sortDirection = $request->input('sortDirection');
        $sortAlphaOrder = $request->input('sortAlphaOrder');
        $trend = $request->input('trend');
        // Kiểm tra giá trị sortDirection
        if ($sortDirection && !in_array(strtolower($sortDirection), ['asc', 'desc'])) {
            throw new \InvalidArgumentException('Giá trị sortDirection chỉ có thể là "asc" hoặc "desc".');
        }
        // Kiểm tra giá trị sortAlphaOrder
        if ($sortAlphaOrder && !in_array(strtolower($sortAlphaOrder), ['asc', 'desc'])) {
            throw new \InvalidArgumentException('Giá trị sortAlphaOrder chỉ có thể là "asc" hoặc "desc".');
        }
        try {
            $products = Product::query()
                ->when($trend, function ($query, $trend) {
                    // Lọc sản phẩm hot trend
                    return $query->where('trend', 1);
                })
                ->when($categories, function ($query) use ($categories) {
                    // Lọc theo danh mục
                    return $query->whereIn('category_id', $categories); // Giả sử trường lưu ID danh mục là category_id
                })
                ->when($brands, function ($query) use ($brands) {
                    // Lọc theo danh mục
                    return $query->whereIn('brand_id', $brands); // Giả sử trường lưu ID danh mục là category_id
                })
                ->when($search, function ($query, $search) {
                    // Nếu có từ khóa tìm kiếm, lọc sản phẩm có tên chứa từ khóa
                    return $query->where('name', 'like', "%{$search}%");
                })
                ->when($colors, function ($query, $colors) {
                    // Lọc theo màu sắc
                    return $query->whereHas('variants.attributes', function ($subQuery) use ($colors) {
                        $subQuery->where('name', 'color')
                            ->whereIn('product_variant_has_attributes.value', $colors); // Truy cập giá trị trực tiếp từ bảng trung gian
                    });
                })
                ->when($sizes, function ($query, $sizes) {
                    // Lọc theo kích thước
                    return $query->whereHas('variants.attributes', function ($subQuery) use ($sizes) {
                        $subQuery->where('name', 'size')
                            ->whereIn('product_variant_has_attributes.value', $sizes); // Truy cập giá trị trực tiếp từ bảng trung gian
                    });
                })
                ->when($minPrice || $maxPrice, function ($query) use ($minPrice, $maxPrice) {
                    return $query->where(function ($subQuery) use ($minPrice, $maxPrice) {
                        if (!is_null($minPrice)) {
                            $subQuery->where(function ($q) use ($minPrice) {
                                $q->whereHas('variants', function ($query) use ($minPrice) {
                                    $query->where('price_sale', '>=', $minPrice);
                                })->orWhere('price_sale', '>=', $minPrice);
                            });
                        }
                        if (!is_null($maxPrice)) {
                            $subQuery->where(function ($q) use ($maxPrice) {
                                $q->whereHas('variants', function ($query) use ($maxPrice) {
                                    $query->where('price_sale', '<=', $maxPrice);
                                })->orWhere('price_sale', '<=', $maxPrice);
                            });
                        }
                    });
                })
                ->when($sortPrice, function ($query) use ($sortPrice) {
                    $query->leftJoin('product_variants', 'products.id', '=', 'product_variants.product_id')
                        ->select('products.*', DB::raw('MAX(product_variants.price_sale) as variant_price_sale')) // Sử dụng hàm MAX()
                        ->groupBy('products.id') // Nhóm theo product id
                        ->orderByRaw("
                            CASE
                                WHEN products.type = 0 THEN products.price_sale
                                WHEN products.type = 1 THEN variant_price_sale
                            END $sortPrice
                        ");
                })
                // Chỉ sắp xếp theo tên nếu có giá trị sortAlphaOrder
                ->when($sortAlphaOrder, function ($query) use ($sortAlphaOrder) {
                    return $query->orderBy('name', $sortAlphaOrder);
                })
                // Chỉ sắp xếp theo ID nếu có giá trị sortDirection
                ->when($sortDirection, function ($query) use ($sortDirection) {
                    return $query->orderBy('id', $sortDirection);
                })
                ->with([
                    "brand",
                    "category",
                    "galleries",
                    "tags",
                    "comments",
                    "variants.attributes"
                ])->get();
            $allProducts = []; // Mảng chứa tất cả sản phẩm và biến thể

            foreach ($products as $product) {
                $product->increment('views'); // Tăng số lượt xem
                $getUniqueAttributes = new GetUniqueAttribute();

                // Thêm sản phẩm và biến thể vào mảng
                $allProducts[] = [
                    'product' => $product,
                    'getUniqueAttributes' => $getUniqueAttributes->getUniqueAttributes($product["variants"]),
                ];
            }
            // Trả về tất cả sản phẩm sau khi vòng lặp kết thúc
            return response()->json([ $allBrand, $allAttribute, $allCategory,$allProducts]);
        } catch (ModelNotFoundException $e) {
            // Trả về lỗi 404 nếu không tìm thấy Category
            return response()->json([
                'message' => 'Sản Phẩm Không Tồn Tại!'
            ], 404);
        }
    }
}
