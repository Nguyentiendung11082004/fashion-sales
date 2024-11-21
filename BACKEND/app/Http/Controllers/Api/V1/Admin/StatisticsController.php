<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    //
    // Thống kê doanh thu
    public function getRevenueStatistics(Request $request)
    {
        try {
            // Lấy và kiểm tra tham số filter từ request
            $filterType = $request->input('filter_type', 'day'); // Mặc định là 'day'

            if ($filterType === 'range') {
                $request->validate([
                    'filter_start_date' => 'required|date',
                    'filter_end_date' => 'required|date|after_or_equal:filter_start_date',
                ]);

                $filterStartDate = $request->input('filter_start_date');
                $filterEndDate = $request->input('filter_end_date');
            } else {
                $filterValue = $request->input('filter_value', now()->format('Y-m-d')); // Mặc định là ngày hiện tại
                $filterStartDate = null;
                $filterEndDate = null;
            }

            // Khởi tạo truy vấn cơ bản
            $query = OrderDetail::select(
                'order_details.product_id',
                'order_details.product_variant_id',
                'products.name as product_name',
                'products.sku as product_sku',
                'product_variants.sku as variant_sku',
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
                    'product_variants.sku'
                );

            // Áp dụng bộ lọc thời gian
            switch ($filterType) {
                case 'day':
                    $query->whereDate('order_details.created_at', $filterValue);
                    break;

                case 'week':
                    $startOfWeek = Carbon::parse($filterValue)->startOfWeek()->format('Y-m-d 00:00:00');
                    $endOfWeek = Carbon::parse($filterValue)->endOfWeek()->format('Y-m-d 23:59:59');
                    $query->whereBetween('order_details.created_at', [$startOfWeek, $endOfWeek]);
                    break;

                case 'month':
                    $query->whereMonth('order_details.created_at', Carbon::parse($filterValue)->month)
                        ->whereYear('order_details.created_at', Carbon::parse($filterValue)->year);
                    break;

                case 'year':
                    $query->whereYear('order_details.created_at', Carbon::parse($filterValue)->year);
                    break;

                case 'range':
                    if ($filterStartDate && $filterEndDate) {
                        $startDate = Carbon::parse($filterStartDate)->format('Y-m-d 00:00:00');
                        $endDate = Carbon::parse($filterEndDate)->format('Y-m-d 23:59:59');
                        $query->whereBetween('order_details.created_at', [$startDate, $endDate]);
                    }
                    break;

                default:
                    throw new \Exception("Filter type không hợp lệ.");
            }

            // Lấy dữ liệu tổng hợp
            $revenueData = $query->get();

            // Tính tổng doanh thu
            $totalRevenue = $revenueData->sum('revenue');

            // Lấy thông tin thuộc tính sản phẩm
            $variantAttributes = DB::table('product_variant_has_attributes')
                ->join('attributes', 'product_variant_has_attributes.attribute_id', '=', 'attributes.id')
                ->join('attribute_items', 'product_variant_has_attributes.attribute_item_id', '=', 'attribute_items.id')
                ->select(
                    'product_variant_has_attributes.product_variant_id',
                    'attributes.name as attribute_name',
                    'attribute_items.value as attribute_value'
                )
                ->get();

            // Ánh xạ thuộc tính theo biến thể
            $attributeMap = [];
            foreach ($variantAttributes as $attr) {
                $attributeMap[$attr->product_variant_id][] = $attr->attribute_name . ': ' . $attr->attribute_value;
            }

            // Chuẩn hóa dữ liệu trả về
            $result = $revenueData->map(function ($item) use ($attributeMap) {
                return [
                    'product_name' => $item->product_name,
                    'product_sku' => $item->product_sku,
                    'variant_sku' => $item->variant_sku,
                    'attributes' => isset($attributeMap[$item->product_variant_id])
                        ? implode(", ", $attributeMap[$item->product_variant_id])
                        : null,
                    'revenue' => (float)$item->revenue,
                    'total_quantity' => (int)$item->total_quantity,
                ];
            });

            // Trả về kết quả JSON bao gồm tổng doanh thu và dữ liệu chi tiết
            return response()->json([
                'status' => 'success',
                'filter_type' => $filterType,
                'filter_value' => $filterValue ?? null,
                'filter_start_date' => $filterStartDate,
                'filter_end_date' => $filterEndDate,
                'total_revenue' => $totalRevenue,
                'data' => $result,
            ], 200);
        } catch (\Exception $e) {
            // Xử lý lỗi và trả về phản hồi
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 400);
        }
    }




    // Thống kê đơn hàng
    public function getOrderStatistics()
    {
        try {
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
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ]);
        }
    }

    public function getProductStatistics(Request $request)
    {
        try {
            // Lấy dữ liệu từ request
            $typeFilter = $request->input('type', []); // [0, 1]: 0 - simple, 1 - variant
            $statusFilter = $request->input('status', []); // [1, 2, 3]: 1 - tồn kho, 2 - sắp hết hàng, 3 - bán chạy

            // Ngưỡng để xác định trạng thái sản phẩm
            $bestSellingThreshold = 50; // Sản phẩm bán chạy nếu tổng số bán >= 50
            $lowStockThreshold = 10;   // Sắp hết hàng nếu số lượng còn lại < 10

            $results = [];

            // Kiểm tra nếu typeFilter trống, mặc định lấy cả 2 loại
            if (empty($typeFilter)) {
                $typeFilter = [0, 1];
            }

            // Lọc sản phẩm đơn giản nếu typeFilter chứa 0
            if (in_array(0, $typeFilter)) {
                $simpleProducts = DB::table('products')
                    ->where('type', 0) // Sản phẩm đơn giản
                    ->leftJoin('order_details', 'products.id', '=', 'order_details.product_id')
                    ->select(
                        'products.id',
                        'products.name',
                        'products.sku',
                        DB::raw('IFNULL(SUM(order_details.quantity), 0) as total_sold'),
                        DB::raw('(products.quantity) as remaining_quantity')
                    )
                    ->groupBy(
                        'products.id',
                        'products.name',
                        'products.sku'
                    )
                    ->get()
                    ->map(function ($product) use ($bestSellingThreshold, $lowStockThreshold, $statusFilter) {
                        // Tính toán trạng thái
                        $statuses = [];
                        $product->total_sold = (int) $product->total_sold;
                        $product->remaining_quantity = (int) $product->remaining_quantity;

                        if ($product->total_sold >= $bestSellingThreshold) {
                            $statuses[] = 'Bán chạy';
                        }
                        if ($product->remaining_quantity < $lowStockThreshold) {
                            $statuses[] = 'Sắp hết hàng';
                        }
                        if (empty($statuses)) {
                            $statuses[] = 'Tồn kho';
                        }

                        // Lọc theo statusFilter nếu có
                        $statusIds = $this->getStatusIds($statuses);
                        if (empty($statusFilter) || !empty(array_intersect($statusFilter, $statusIds))) {
                            $product->status = implode('|', $statuses);
                            return $product;
                        }
                        return null;
                    })
                    ->filter(); // Loại bỏ các sản phẩm không khớp filter

                $results['simple_products'] = $simpleProducts;
            }

            // Lọc sản phẩm có biến thể nếu typeFilter chứa 1
            if (in_array(1, $typeFilter)) {
                $variantProducts = DB::table('products')
                    ->where('products.type', 1) // Sản phẩm có biến thể
                    ->join('product_variants', 'products.id', '=', 'product_variants.product_id')
                    ->leftJoin('order_details', 'product_variants.id', '=', 'order_details.product_variant_id')
                    ->select(
                        'products.id as product_id',
                        'products.name as product_name',
                        'product_variants.id as variant_id',
                        'product_variants.sku as variant_sku',
                        'product_variants.quantity as remaining_quantity',
                        DB::raw('IFNULL(SUM(order_details.quantity), 0) as total_sold')
                    )
                    ->groupBy(
                        'products.id',
                        'product_variants.id',
                        'products.name',
                        'product_variants.sku',
                        'product_variants.quantity'
                    )
                    ->get()
                    ->map(function ($variant) use ($bestSellingThreshold, $lowStockThreshold, $statusFilter) {
                        // Lấy các thuộc tính của biến thể
                        $attributes = DB::table('product_variant_has_attributes')
                            ->join('attributes', 'product_variant_has_attributes.attribute_id', '=', 'attributes.id')
                            ->join('attribute_items', 'product_variant_has_attributes.attribute_item_id', '=', 'attribute_items.id')
                            ->where('product_variant_has_attributes.product_variant_id', $variant->variant_id)
                            ->select('attributes.name as attribute_name', 'attribute_items.value as attribute_value')
                            ->get();

                        $variant->attributes = $attributes;

                        // Tính toán trạng thái
                        $statuses = [];
                        $variant->total_sold = (int) $variant->total_sold;
                        $variant->remaining_quantity = (int) $variant->remaining_quantity;

                        if ($variant->total_sold >= $bestSellingThreshold) {
                            $statuses[] = 'Bán chạy';
                        }
                        if ($variant->remaining_quantity < $lowStockThreshold) {
                            $statuses[] = 'Sắp hết hàng';
                        }
                        if (empty($statuses)) {
                            $statuses[] = 'Tồn kho';
                        }

                        // Lọc theo statusFilter nếu có
                        $statusIds = $this->getStatusIds($statuses);
                        if (empty($statusFilter) || !empty(array_intersect($statusFilter, $statusIds))) {
                            $variant->status = implode('|', $statuses);
                            return $variant;
                        }
                        return null;
                    })
                    ->filter(); // Loại bỏ các sản phẩm không khớp filter

                $results['variant_products'] = $variantProducts;
            }

            // Trả về kết quả
            return response()->json($results);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    private function getStatusIds($statuses)
    {
        $statusMap = [
            'Tồn kho' => 1,
            'Sắp hết hàng' => 2,
            'Bán chạy' => 3,
        ];

        return array_map(function ($status) use ($statusMap) {
            return $statusMap[$status] ?? null;
        }, $statuses);
    }
}
