<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

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
         // Đếm tổng số sản phẩm chính
         $totalProducts = Product::count();
        
         // Đếm tổng số biến thể
         $totalVariants = ProductVariant::count();
 
         // Sản phẩm bán chạy nhất
         $bestSellingProduct = Product::query()->withCount('orderDetails')
             ->orderBy('order_details_count', 'desc')
             ->first();
             dd($bestSellingProduct->toArray());
 
         // Sản phẩm biến thể bán chạy nhất
         $bestSellingVariant = ProductVariant::withCount('orderDetails')
    ->orderBy('order_details_count', 'desc')
    ->first();

 
         // Sản phẩm đơn còn ít hàng
         $lowStockProducts = Product::where('quantity', '<', 5)->get();
 
         // Sản phẩm biến thể còn ít hàng
         $lowStockVariants = ProductVariant::where('quantity', '<', 5)->get();
 
         return response()->json([
             'total_products' => $totalProducts,
             'total_variants' => $totalVariants,
             'best_selling_product' => $bestSellingProduct,
             'best_selling_variant' => $bestSellingVariant,
             'low_stock_products' => $lowStockProducts,
             'low_stock_variants' => $lowStockVariants,
         ]);
       } catch (\Exception $ex) {
            return response()->json([
                "message"=>$ex->getMessage()
            ]);
       }
    }
}


