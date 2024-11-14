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
        // Tổng doanh thu từ các đơn hàng đã hoàn thành
        $totalRevenue = Order::where('status', 'completed')->sum('amount');

        // Doanh thu trong tháng hiện tại
        $monthlyRevenue = Order::where('status', 'completed')
            ->whereMonth('created_at', now()->month)
            ->sum('amount');

        return response()->json([
            'total_revenue' => $totalRevenue,
            'monthly_revenue' => $monthlyRevenue,
        ]);
    }
    // Thống kê đơn hàng
    public function getOrderStatistics()
    {
        // Tổng số lượng đơn hàng
        $totalOrders = Order::count();

        // Số lượng đơn hàng đã hoàn thành
        $completedOrders = Order::where('status', 'completed')->count();

        // Số lượng đơn hàng bị hủy
        $canceledOrders = Order::where('status', 'canceled')->count();

        return response()->json([
            'total_orders' => $totalOrders,
            'completed_orders' => $completedOrders,
            'canceled_orders' => $canceledOrders,
        ]);
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
                ->with(["product:id,name"])
                ->get();

            $sellingVariantProduct = OrderDetail::query()->select('product_variant_id', DB::raw('SUM(quantity) as total_sold'))
                ->whereNotNull('product_variant_id')
                ->groupBy('product_variant_id')
                ->orderByDesc('total_sold')
                ->with('productVariant.product')
                ->get();

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
                ->get(['id', 'name', 'quantity']);

            $highStockVariantProducts = ProductVariant::query()->where('quantity',">",20)
                ->orderByDesc('quantity')
                ->with(['product:id,name']) // Chỉ định id và name
                ->get(['id', 'product_id', 'sku', 'quantity']);



            // Sản phẩm sắp hết hàng (số lượng tồn kho dưới một ngưỡng, ví dụ 5)
            $lowStockSimpleProducts = Product::where('type', 0)
                ->where('quantity', '<=', 5)
                ->orderBy('quantity', 'asc')
                ->get(['id', 'name', 'quantity']);

            $lowStockVariantProducts = ProductVariant::where('quantity', '<=', 5)
                ->orderBy('quantity', 'asc')
                ->get(['id', 'sku', 'quantity']);

            // Trả về kết quả dưới dạng JSON
            return response()->json([
                'total_simple_products' => $totalSimpleProducts,
                'total_variant_products' => $totalVariantProducts,
                'sell_simple_product' => $sellingSimpleProduct,
                'sell_variant_product' => $sellingVariantProduct,
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
