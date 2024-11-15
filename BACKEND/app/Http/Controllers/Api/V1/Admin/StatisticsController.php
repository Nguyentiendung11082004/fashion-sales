<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductVariant;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    //
    // Thống kê doanh thu
    public function getRevenueStatistics()
    {
        $revenueData = OrderDetail::select(
            'order_details.product_id',
            'order_details.product_variant_id',
            'products.name as product_name',
            'products.sku as product_sku',
            'product_variants.sku as variant_sku',
            'order_details.attributes',
            DB::raw('SUM(order_details.total_price) as revenue'),
            DB::raw('SUM(order_details.quantity) as total_quantity')
        )
            ->leftJoin('products', 'order_details.product_id', '=', 'products.id')
            ->leftJoin('product_variants', 'order_details.product_variant_id', '=', 'product_variants.id')
            ->groupBy(
                'order_details.product_id',
                'order_details.product_variant_id',
                'products.name',
                'products.sku',
                'product_variants.sku',
                'order_details.attributes'
            )
            ->get();

        $result = $revenueData->map(function ($item) {
            // Truy vấn các thuộc tính của biến thể sản phẩm từ bảng `product_variant_has_attributes`
            $variantAttributes = DB::table('product_variant_has_attributes')
                ->where('product_variant_id', $item->product_variant_id)
                ->get();

            $attributeValues = [];

            // Lấy thuộc tính từ bảng `product_variant_has_attributes` và ánh xạ với tên thuộc tính và giá trị
            foreach ($variantAttributes as $variantAttribute) {
                $attribute = DB::table('attributes')
                    ->where('id', $variantAttribute->attribute_id)
                    ->first();

                $attributeItem = DB::table('attribute_items')
                    ->where('id', $variantAttribute->attribute_item_id)
                    ->value('value');

                // Thêm thuộc tính vào mảng
                $attributeValues[] = $attribute->name . ': ' . $attributeItem;
            }

            return [
                'product_name' => $item->product_name,
                'product_sku' => $item->product_sku,
                'variant_sku' => $item->variant_sku,
                'attributes' => empty($attributeValues) ? null : implode(", ", $attributeValues),
                'revenue' => (float)$item->revenue,
                'total_quantity' => (int)$item->total_quantity,
            ];
        });

        return response()->json($result);
    }
    // Thống kê đơn hàng
    public function getOrderStatistics()
    {
        $orderCountsByStatus = Order::select('order_status', DB::raw('count(*) as total_orders'))
            ->groupBy('order_status')
            ->get();

        // Lấy tổng số lượng sản phẩm (bao gồm cả sản phẩm đơn và biến thể) trong các đơn hàng
        $totalQuantityInOrder = OrderDetail::sum('quantity');

        // Tạo một mảng để lưu kết quả
        $result = [
            'order_counts_by_status' => $orderCountsByStatus,
            'total_quantity_in_order' => $totalQuantityInOrder,
        ];

        return response()->json($result);
    }

    // Thống kê sản phẩm (bao gồm sản phẩm đơn và sản phẩm biến thể)
    public function getProductStatistics()
    {
        try {
            // Thống kê tổng số sản phẩm đơn và biến thể
            $totalSimpleProducts = Product::where('type', 0)->count();
            $totalVariantProducts = ProductVariant::count();

            // Sản phẩm đơn và biến thể bán chạy nhất (dựa trên số lượng bán được)
            $sellingSimpleProduct = OrderDetail::query()->select('product_id', DB::raw('SUM(quantity) as total_sold'))
                ->whereNull('product_variant_id')
                ->groupBy('product_id')
                ->orderByDesc('total_sold')
                ->with(["product:id,name,sku"])
                ->get();

            $sellingVariantProduct = OrderDetail::query()->select('product_variant_id', DB::raw("SUM(quantity) as total_sold"))
                ->whereNotNull('product_variant_id')
                ->groupBy('product_variant_id')
                ->orderByDesc('total_sold')
                ->with(['productVariant' => function ($query) {
                    $query->select('id', 'product_id')->with('product:id,name,sku');
                }])
                ->get();
            $formattedResult = $sellingVariantProduct->map(function ($item) {
                return [
                    'product_variant_id' => $item->product_variant_id,
                    'total_sold' => $item->total_sold,
                    'product_variant' => [
                        'id' => $item->productVariant->id,
                        'product_id' => $item->productVariant->product_id,
                        'name' => $item->productVariant->product->name,
                        'sku' => $item->productVariant->product->sku,
                    ]
                ];
            });



            // Sản phẩm tồn kho nhiều (sắp xếp theo số lượng tồn kho giảm dần)
            $highStockSimpleProducts = Product::query()->where([
                [
                    'type',
                    0
                ],
                [
                    'quantity',
                    ">",
                    20
                ],
            ])
                ->orderByDesc('quantity')
                ->get(['id', 'name', 'sku', 'quantity']);

            $highStockVariantProducts = ProductVariant::query()->where('quantity', ">", 20)
                ->orderByDesc('quantity')
                ->with(['product:id,name']) // Chỉ định id và name
                ->get(['id', 'product_id', 'sku', 'quantity']);



            // Sản phẩm sắp hết hàng (số lượng tồn kho dưới một ngưỡng, ví dụ 5)
            $lowStockSimpleProducts = Product::where('type', 0)
                ->where('quantity', '<=', 5)
                ->orderBy('quantity', 'asc')
                ->get(['id', 'name', "sku", 'quantity']);

            $lowStockVariantProducts = ProductVariant::where('quantity', '<=', 5)
                ->orderBy('quantity', 'asc')
                ->with(['product' => function ($query) {
                    $query->select('id', 'name'); // Lấy id và name từ bảng Product
                }])
                ->get(['id', 'sku', 'quantity', 'product_id']); // Lấy thêm product_id để mối quan hệ hoạt động


            // Trả về kết quả dưới dạng JSON
            return response()->json([
                'total_simple_products' => $totalSimpleProducts,
                'total_variant_products' => $totalVariantProducts,
                'sell_simple_product' => $sellingSimpleProduct,
                'sell_variant_product' => $formattedResult,
                'high_stock_simple_products' => $highStockSimpleProducts,
                'high_stock_variant_products' => $highStockVariantProducts,
                'low_stock_simple_products' => $lowStockSimpleProducts,
                'low_stock_variant_products' => $lowStockVariantProducts,
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ]);
        }
    }
}
