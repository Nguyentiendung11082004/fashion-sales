<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Voucher\StoreVoucherRequest;
use App\Http\Requests\Voucher\UpdateVoucherRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Voucher;
use App\Models\VoucherMeta;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $dataVouchers = Voucher::with('meta')->latest()->get();

            return response()->json([
                'status'       => true,
                'dataVouchers' => $dataVouchers,
                // 'voucherMeta' => $metaData
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'errors' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVoucherRequest $request)
    {
        try {
            // Sử dụng transaction nhưng có thể xử lý lỗi ngoài transaction
            return DB::transaction(function () use ($request) {
                // Tạo thông tin voucher
                $voucherData = [
                    'title' => $request->title,
                    'description' => $request->description,
                    'code' => 'MIXMATCH' . '_' . strtoupper(Str::random(6)),
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                    'min_order_value' => $request->min_order_value,
                    'usage_limit' => $request->usage_limit,
                    'used_count' => 0,
                    'is_active' => true,
                    'discount_type' => $request->discount_type,
                    'discount_value' => $request->discount_value,
                ];


                $metaData = [];
                $productIds = [];
                $excludeProductIds = [];
                $categoryIds = [];
                $excludeCategoryIds = [];

                // Kiểm tra và chuẩn bị dữ liệu cho product_ids và exclude_product_ids
                if (is_array($request->meta)) {
                    foreach ($request->meta as $meta) {
                        if ($meta['meta_key'] === '_voucher_product_ids') {
                            $productIds = json_decode($meta['meta_value'], true);
                        } elseif ($meta['meta_key'] === '_voucher_exclude_product_ids') {
                            $excludeProductIds = json_decode($meta['meta_value'], true);
                        } elseif ($meta['meta_key'] === '_voucher_category_ids') {
                            $categoryIds = json_decode($meta['meta_value'], true);
                        } elseif ($meta['meta_key'] === '_voucher_exclude_category_ids') {
                            $excludeCategoryIds = json_decode($meta['meta_value'], true);
                        }

                        $metaKey = $meta['meta_key'];
                        $metaValue = json_decode($meta['meta_value'], true); // Decode JSON để xử lý giá trị

                        // Kiểm tra `_voucher_max_discount_amount`
                        if ($metaKey === '_voucher_max_discount_amount') {
                            if (!is_numeric(value: $metaValue) || $metaValue < 0) {
                                return response()->json([
                                    'status' => 400,
                                    'success' => false,
                                    'message' => 'The value for _voucher_max_discount_amount must be a number greater than or equal to 0. ',
                                ], 400);
                            }
                        }

                        // Kiểm tra `_voucher_applies_to_total`
if ($metaKey === '_voucher_applies_to_total') {
                            if (!is_bool($metaValue)) {
                                return response()->json([
                                    'status' => 400,
                                    'success' => false,
                                    'message' => 'The value for _voucher_applies_to_total must be a boolean (true or false).',
                                ], 400);
                            }
                        }
                    }

                    // Kiểm tra nếu có trùng lặp giữa product_ids và exclude_product_ids
                    $duplicateProducts = array_intersect($productIds, $excludeProductIds);
                    if (!empty($duplicateProducts)) {
                        return response()->json([
                            'status' => 400,
                            'success' => false,
                            'message' => 'The selected products cannot be included in both "Applicable Products" and "Excluded Products". Duplicate products: ' . implode(', ', $duplicateProducts)
                        ], 400);
                    }

                    // Kiểm tra trùng lặp cho category_ids và exclude_category_ids
                    $duplicateCategories = array_intersect($categoryIds, $excludeCategoryIds);
                    if (!empty($duplicateCategories)) {
                        return response()->json([
                            'status' => 400,
                            'success' => false,
                            'message' => 'The selected categories cannot be included in both "Applicable Categories" and "Excluded Categories". Duplicate categories: ' . implode(', ', $duplicateCategories)
                        ], 400);
                    }

                    // Lưu voucher vào cơ sở dữ liệu
                    $voucher = Voucher::create($voucherData);

                    // Lưu meta_key và meta_value
                    foreach ($request->meta as $meta) {
                        if (!empty($meta['meta_key']) && isset($meta['meta_value'])) {
                            $metaKey = $meta['meta_key'];
                            $metaValue = json_decode($meta['meta_value'], true);

                            // Bỏ qua nếu `meta_value` là mảng rỗng
                            if (is_array($metaValue) && empty($metaValue)) {
                                continue;
                            }
                            // Bỏ qua nếu `_voucher_applies_to_total` là `false`
                            if ($metaKey === '_voucher_applies_to_total' && $metaValue === false) {
                                continue; // Bỏ qua và chuyển sang meta tiếp theo
                            }
                            $metaData[] = [
                                'voucher_id' => $voucher->id,
                                'meta_key' => $metaKey,
'meta_value' => $meta['meta_value'],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                        }
                    }
                }

                // Lưu thông tin meta vào cơ sở dữ liệu nếu có dữ liệu
                if (!empty($metaData)) {
                    VoucherMeta::insert($metaData);
                }

                return response()->json([
                    'status' => 201,
                    'success' => true,
                    'message' => 'Voucher has been added successfully!',
                    'data' => [
                        'voucher' => $voucher,
                        'meta_data' => $metaData,
                    ]
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'success' => false,
                'message' => 'An error occurred while adding the voucher. Please check the details and try again.',
                'errors' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            // Tìm voucher theo ID  
            $voucher = Voucher::findOrFail($id);

            // Lấy thông tin meta của voucher  
            $metaData = VoucherMeta::where('voucher_id', $voucher->id)->get();

            // Tạo một mảng ánh xạ cho meta_key và tên tương ứng (bao gồm tên cho applies_to_total)  
            $metaKeyNames = [
                '_voucher_category_ids' => 'Danh mục được áp dụng giảm giá',
                '_voucher_exclude_category_ids' => 'Danh mục không được áp dụng giảm giá',
                '_voucher_product_ids' => 'Sản phẩm được áp dụng giảm giá',
                '_voucher_exclude_product_ids' => 'Sản phẩm không được áp dụng giảm giá',
                '_voucher_max_discount_amount' => 'Số tiền giảm tối đa',
                '_voucher_applies_to_total' => 'Áp dụng giảm giá cho tất cả các đơn hàng',  // Chỉnh sửa key đây  
                // Thêm các meta_key và tên tương ứng khác nếu cần  
            ];

            // Duyệt qua metaData để lấy tên tương ứng  
            foreach ($metaData as $meta) {
                // Thêm tên tương ứng  
                if (array_key_exists($meta->meta_key, $metaKeyNames)) {
                    $meta->name = $metaKeyNames[$meta->meta_key];
                }

                if ($meta->meta_key === '_voucher_category_ids') {
                    $categoryIds = json_decode($meta->meta_value);
                    $names = Category::whereIn('id', $categoryIds)
                        ->pluck('name')->toArray();
                    // Cập nhật metaData để bao gồm tên danh mục  
                    $meta->item_names = $names;
                } elseif ($meta->meta_key === '_voucher_exclude_category_ids') {
                    $excludedCategoryIds = json_decode($meta->meta_value);
                    $names = Category::whereIn('id', $excludedCategoryIds)
                        ->pluck('name')->toArray();
                    // Cập nhật metaData để bao gồm tên danh mục loại trừ  
                    $meta->item_names = $names;
                } elseif ($meta->meta_key === '_voucher_product_ids') {
                    $productIds = json_decode($meta->meta_value);
                    $names = Product::whereIn('id', $productIds)
                        ->pluck('name')->toArray();
                    // Cập nhật metaData để bao gồm tên sản phẩm  
                    $meta->item_names = $names;
                } elseif ($meta->meta_key === '_voucher_exclude_product_ids') {
                    $excludedProductIds = json_decode($meta->meta_value);
                    $names = Product::whereIn('id', $excludedProductIds)
                        ->pluck('name')->toArray();
                    // Cập nhật metaData để bao gồm tên sản phẩm loại trừ
$meta->item_names = $names;
                } elseif ($meta->meta_key === '_voucher_max_discount_amount') {
                    $meta->max_discount_amount = $meta->meta_value; // Lưu số tiền giảm giá tối đa  
                } elseif ($meta->meta_key === '_voucher_applies_to_total') {
                    $meta->applies_to_total = $meta->meta_value; // Lưu giá trị tổng được áp dụng giảm giá  
                }
            }

            return response()->json([
                'status' => 200,
                'success' => true,
                'message' => 'Voucher retrieved successfully!',
                'data' => [
                    'voucher' => $voucher,
                    'meta_data' => $metaData,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'success' => false,
                'message' => 'Failed to retrieve the voucher. Please check the entered ID and try again.',
                'errors' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVoucherRequest $request, $id)
    {
        try {
            $response = DB::transaction(function () use ($request, $id) {
                // Tìm voucher theo ID
                $voucher = Voucher::findOrFail($id);

                // Cập nhật thông tin voucher
                $voucherData = [
                    'title' => $request->title ?? $voucher->title,
                    'description' => $request->description ?? $voucher->description,
                    'code' => $request->code ?? $voucher->code,
                    'start_date' => $request->start_date ?? $voucher->start_date,
                    'end_date' => $request->end_date ?? $voucher->end_date,
                    'min_order_value' => $request->min_order_value ?? $voucher->min_order_value,
                    'usage_limit' => $request->usage_limit ?? $voucher->usage_limit,
                    'is_active' => $request->is_active ?? $voucher->is_active,
                    'discount_type' => $request->discount_type ?? $voucher->discount_type,
                    'discount_value' => $request->discount_value ?? $voucher->discount_value,
                ];

                // Cập nhật voucher vào cơ sở dữ liệu
                $voucher->update($voucherData);
                
                // Cập nhật thông tin meta
                $metaData = [];
                $productIds = [];
                $excludeProductIds = [];
                $categoryIds = [];
                $excludeCategoryIds = [];

                if (is_array($request->meta)) {
                    foreach ($request->meta as $meta) {
                        $metaKey = $meta['meta_key'];
                        $metaValue = json_decode($meta['meta_value'], true);

                        // Kiểm tra `_voucher_max_discount_amount`
                        if ($metaKey === '_voucher_max_discount_amount') {
                            if (!is_numeric($metaValue) || $metaValue < 0) {
                                throw new \Exception('The value for _voucher_max_discount_amount must be a number greater than or equal to 0.');
                            }
                        }

                        // Kiểm tra `_voucher_applies_to_total`
                        if ($metaKey === '_voucher_applies_to_total') {
                            if (!is_bool($metaValue)) {
                                throw new \Exception('The value for _voucher_applies_to_total must be a boolean (true or false).');
                            }
                        }

                        // Xử lý giá trị theo meta_key
                        if ($metaKey === '_voucher_product_ids') {
                            $productIds = is_array($metaValue) ? $metaValue : [];
                        } elseif ($metaKey === '_voucher_exclude_product_ids') {
                            $excludeProductIds = is_array($metaValue) ? $metaValue : [];
                        } elseif ($metaKey === '_voucher_category_ids') {
                            $categoryIds = is_array($metaValue) ? $metaValue : [];
                        } elseif ($metaKey === '_voucher_exclude_category_ids') {
                            $excludeCategoryIds = is_array($metaValue) ? $metaValue : [];
                        }

                      

                        // Tìm kiếm meta đã tồn tại
                        $existingMeta = VoucherMeta::where('voucher_id', $voucher->id)
                            ->where('meta_key', $metaKey)
                            ->first();

                        if ($existingMeta) {
                            if (!empty($meta['meta_value'])) {
                                $existingMeta->update([
                                    'meta_value' => $meta['meta_value'],
                                    'updated_at' => now(),
                                ]);
                            }
                        } else {
                            if (!empty($meta['meta_value'])) {
                                $metaData[] = [
                                    'voucher_id' => $voucher->id,
                                    'meta_key' => $metaKey,
                                    'meta_value' => $meta['meta_value'],
                                    'created_at' => now(),
                                    'updated_at' => now(),
                                ];
                            }
                        }
                    }
                }

                if (!empty($metaData)) {
                    VoucherMeta::insert($metaData);
                }

                return [
                    'voucher' => $voucher,
                    'meta_data' => VoucherMeta::where('voucher_id', $voucher->id)->get(),
                ];
            });

            return response()->json([
                'status' => 200,
                'success' => true,
                'message' => 'Voucher updated successfully!',
                'data' => $response
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'success' => false,
                'message' => 'Failed to update the voucher. Please check the entered values and try again.',
                'errors' => $e->getMessage()
            ], 500);
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Tìm voucher theo ID
            $voucher = Voucher::findOrFail($id);

            // Xóa các meta liên quan
            $voucher->meta()->delete();

            // Xóa voucher
            $voucher->delete();

            return response()->json([
                'status' => true,
                'message' => 'Voucher deleted successfully!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete the voucher. Please check the entered ID and try again.',
                'errors' => $e->getMessage()
            ], 500);
        }
    }
}
