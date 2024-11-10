<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Tag;
use App\Models\Role;
use App\Models\User;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Voucher;
use App\Models\Category;
use App\Models\Attribute;
use App\Models\VoucherMeta;
use App\Models\AttributeItem;
use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DataCuong extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // thêm mới attribute
        Attribute::query()->insert(
            [
                [
                    "name" => "size",
                    "slug" => 'size'
                ],
                [
                    "name" => "color",
                    "slug" => 'color'
                ],
                [
                    "name" => "material",
                    "slug" => 'material'
                ],
            ]
        );
        // create attribute_item
        AttributeItem::query()->insert([
            [
                "attribute_id" => 1,
                "value" => "S",
                "slug" => "S",
            ],
            [
                "attribute_id" => 1,
                "value" => "M",
                "slug" => "M",
            ],
            [
                "attribute_id" => 1,
                "value" => "L",
                "slug" => "L",
            ],
            [
                "attribute_id" => 2,
                "value" => "BLUE",
                "slug" => "BLUE",
            ],
            [
                "attribute_id" => 2,
                "value" => "RED",
                "slug" => "RED",
            ],
            [
                "attribute_id" => 2,
                "value" => "BLACK",
                "slug" => "BLACK",
            ],
            [
                "attribute_id" => 3,
                "value" => "COTTON",
                "slug" => "COTTON",
            ],
            [
                "attribute_id" => 3,
                "value" => "KAKI",
                "slug" => "KAKI",
            ],
            [
                "attribute_id" => 3,
                "value" => "JEAN",
                "slug" => "JEAN",
            ],
        ]);
        // CREATE tag
        Tag::query()->insert([
            [
                "name" => "Hot Trend",
                "slug" => "hot-trend",
            ],
            [
                "name" => "Nổi Bật",
                "slug" => "noi-bat",
            ],
            [
                "name" => "Giảm Giá",
                "slug" => "giam-gia",
            ],
            [
                "name" => "Mới Nhất",
                "slug" => "moi-nhat",
            ],
            [
                "name" => "Bán Chạy",
                "slug" => "ban-chay",
            ],
        ]);
        Category::query()->insert(
            [
                [
                    "name" => "Thời trang nam",
                    "slug" => "thoi-trang-nam",
                    "description" => "Các sản phẩm thời trang dành cho nam giới, từ áo quần cho đến giày dép.",
                    "parent_id" => null,
                    "img_thumbnail" => "thoi-trang-nam.jpg",
                ],
                [
                    "name" => "Áo sơ mi nam",
                    "slug" => "ao-so-mi-nam",
                    "description" => "Bộ sưu tập áo sơ mi nam với nhiều kiểu dáng và màu sắc khác nhau.",
                    "parent_id" => 1,
                    "img_thumbnail" => "ao-so-mi-nam.jpg",
                ],
                [
                    "name" => "Áo khoác nam",
                    "slug" => "ao-khoac-nam",
                    "description" => "Các loại áo khoác dành cho nam, bao gồm áo khoác nhẹ và áo khoác mùa đông.",
                    "parent_id" => 1,
                    "img_thumbnail" => "ao-khoac-nam.jpg",
                ],
                [
                    "name" => "Giày dép nam",
                    "slug" => "giay-dep-nam",
                    "description" => "Đa dạng các mẫu giày dép nam, từ giày thể thao đến giày da công sở.",
                    "parent_id" => null,
                    "img_thumbnail" => "giay-dep-nam.jpg",
                ],
                [
                    "name" => "Giày thể thao nam",
                    "slug" => "giay-the-thao-nam",
                    "description" => "Bộ sưu tập giày thể thao nam phù hợp cho mọi hoạt động thể thao và giải trí.",
                    "parent_id" => 4,
                    "img_thumbnail" => "giay-the-thao-nam.jpg",
                ],
                [
                    "name" => "Giày công sở nam",
                    "slug" => "giay-cong-so-nam",
                    "description" => "Giày công sở nam cao cấp, thích hợp cho các buổi họp, gặp gỡ đối tác.",
                    "parent_id" => 4,
                    "img_thumbnail" => "giay-cong-so-nam.jpg",
                ],
            ]
        );

        // THÊM MỚI USER and role
        Role::query()->insert([
            ["name" => "client"],
            ["name" => "membership"],
            ["name" => "shipper"],
            ["name" => "admin"],
        ]);
        User::query()->insert([
            [
                "role_id" => 1,
                'name' => 'khách hàng 1',
                'email' => 'cuongnmph38402@fpt.edu.vn',
                'password' => Hash::make("12345678"),
                "phone_number" => "0987654321",
                'address' => "hà nội",
                'email_verified_at' => now(),
            ]
        ]);
        // thêm dữ liệu brands
        Brand::query()->insert([
            [
                "name" => "DIOR",
                'slug' => 'dior',
                'image' => 'dior.jpg',
                'email' => 'dior@gmail.com',
                'phone_number' => "0987654321",
                "address" => "hà nội"
            ],
            [
                "name" => "CHANEL",
                'slug' => 'CHANEL',
                'image' => 'CHANEL.jpg',
                'email' => 'CHANEL@2gmail.com',
                'phone_number' => "0987654322",
                "address" => "hà nội"
            ],
        ]);
        PaymentMethod::query()->insert([
            [
                "name" => "COD",
                "description" => "Nhận hàng thanh toán",
            ],
            [
                "name" => "VNPAY",
                "description" => "Thanh toán online",
            ],
        ]);
        // Tạo voucher
        Voucher::query()->insert([
            [
                "id" => 1,
                "title" => "Giảm giá danh mục sản phẩm",
                "description" => "Giảm giá áp dụng cho các danh mục sản phẩm đã chọn.",
                "code" => "CATSALE30",
                "discount_type" => "fixed",
                "discount_value" => "30000.00",
                "start_date" => Carbon::now(),
                "end_date" => Carbon::now()->addMonth(),
                "min_order_value" => "100000.00",
                "usage_limit" => 100,
                "used_count" => 8,
                "is_active" => 1,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "id" => 2,
                "title" => "Giảm 10% toàn bộ đơn hàng",
                "description" => "Giảm giá 10% áp dụng cho tổng giá trị đơn hàng.",
                "code" => "SALE10OFF",
                "discount_type" => "percentage",
                "discount_value" => "10.00",
                "start_date" => Carbon::now(),
                "end_date" => Carbon::now()->addMonth(),
                "min_order_value" => "0.00",
                "usage_limit" => 200,
                "used_count" => 20,
                "is_active" => 1,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "id" => 3,
                "title" => "Giảm giá sản phẩm cụ thể",
                "description" => "Giảm giá áp dụng cho các sản phẩm được chỉ định.",
                "code" => "PROD20OFF",
                "discount_type" => "fixed",
                "discount_value" => "20000.00",
                "start_date" => Carbon::now(),
                "end_date" => Carbon::now()->addMonth(),
                "min_order_value" => "50000.00",
                "usage_limit" => 50,
                "used_count" => 5,
                "is_active" => 1,
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "id" => 4,
                "title" => "Voucher giới hạn giảm giá tối đa",
                "description" => "Giảm giá áp dụng với giới hạn số tiền giảm tối đa.",
                "code" => "MAX100K",
                "discount_type" => "percentage",
                "discount_value" => "15.00",
                "start_date" => "2024-11-10 00:00:00",
                "end_date" => "2024-12-31 23:59:59",
                "min_order_value" => "200000.00",
                "usage_limit" => 150,
                "used_count" => 10,
                "is_active" => 1,
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
        VoucherMeta::query()->insert([
            // Voucher cho danh mục sản phẩm
            [
                "voucher_id" => 1,
                "meta_key" => "_voucher_category_ids",
                "meta_value" => json_encode([1, 2, 3]), // Áp dụng cho các danh mục có ID 1, 2, 3
                "created_at" => now(),
                "updated_at" => now(),
            ],
            // Voucher không áp dụng cho danh mục sản phẩm
            [
                "voucher_id" => 1,
                "meta_key" => "_voucher_exclude_category_ids",
                "meta_value" => json_encode([4, 5]), // Loại trừ các danh mục có ID 4, 5
                "created_at" => now(),
                "updated_at" => now(),
            ],
            // Voucher áp dụng cho tổng đơn hàng
            [
                "voucher_id" => 2,
                "meta_key" => "_voucher_applies_to_total",
                "meta_value" => "true", // Áp dụng cho tổng đơn hàng
                "created_at" => now(),
                "updated_at" => now(),
            ],
            // Voucher cho sản phẩm cụ thể
            [
                "voucher_id" => 3,
                "meta_key" => "_voucher_product_ids",
                "meta_value" => json_encode([101, 102, 103]), // Áp dụng cho các sản phẩm có ID 101, 102, 103
                "created_at" => now(),
                "updated_at" => now(),
            ],
            // Voucher không áp dụng cho sản phẩm
            [
                "voucher_id" => 3,
                "meta_key" => "_voucher_exclude_product_ids",
                "meta_value" => json_encode([104, 105]), // Loại trừ các sản phẩm có ID 104, 105
                "created_at" => now(),
                "updated_at" => now(),
            ],
            // Voucher giới hạn số tiền giảm tối đa
            [
                "voucher_id" => 4,
                "meta_key" => "_voucher_max_discount_amount",
                "meta_value" => "100000", // Giảm tối đa 100.000 VNĐ
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
        Product::query()->insert([
            // Sản phẩm 1: Áo sơ mi nam (Sản phẩm đơn)
            [
                "brand_id" => 1,
                "category_id" => 2, // Danh mục: Áo sơ mi nam
                "tags" => [1, 2],
                "gallery" => ["shirt-gallery-1", "shirt-gallery-2"],
                "type" => 0, // Sản phẩm đơn
                "sku" => "sku-ao-so-mi",
                "name" => "Áo sơ mi nam trắng",
                "views" => 50,
                "img_thumbnail" => "ao-so-mi-trang.png",
                "price_regular" => 250000,
                "price_sale" => 200000,
                "quantity" => 30,
                "description" => "Áo sơ mi nam trắng, chất liệu cotton thoáng mát.",
                "description_title" => "Áo sơ mi trắng",
                "status" => 1,
                "is_show_home" => 1,
                "trend" => 1,
                "is_new" => 1,
            ],
            // Sản phẩm 2: Áo khoác nam (Sản phẩm đơn)
            [
                "brand_id" => 2,
                "category_id" => 3, // Danh mục: Áo khoác nam
                "tags" => [2],
                "gallery" => ["jacket-gallery-1"],
                "type" => 0,
                "sku" => "sku-ao-khoac",
                "name" => "Áo khoác nam mùa đông",
                "views" => 100,
                "img_thumbnail" => "ao-khoac-mua-dong.png",
                "price_regular" => 500000,
                "price_sale" => 450000,
                "quantity" => 20,
                "description" => "Áo khoác nam ấm áp, chất liệu dày dặn, thích hợp cho mùa đông.",
                "description_title" => "Áo khoác mùa đông",
                "status" => 1,
                "is_show_home" => 1,
                "trend" => 1,
                "is_new" => 0,
            ],
        ]);
    }
}
