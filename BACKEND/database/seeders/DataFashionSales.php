<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\CategoryChildren;
use App\Models\Comments;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DataFashionSales extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // tạo danh mục
        Category::query()->insert(
            [
                [
                    "name" => "Áo",

                    // 'status'=>,
                ],
                [
                    "name" => "quần",

                    // 'status'=>,
                ],
            ]
        );
        // tạo dữ liệu category_children
        CategoryChildren::query()->insert([
            [
                "category_id" => 1,
                "name" => "áo ba lỗ",
                'description' => "Áo ba lỗ thời trang",
                "img_thumbnail" => "https://demo-kalles-4-1.myshopify.com/cdn/shop/products/famer2052212158_q1_2-1_26f6b1d8-3197-4c2b-9230-2247b4c15689.jpg?v=1652168784&width=600",
            ],
            [
                "category_id" => 2,
                "name" => "quần đùi",
                'description' => "quần đùi thời trang",
                "img_thumbnail" => "https://demo-kalles-4-1.myshopify.com/cdn/shop/files/71.jpg?v=1713694592&width=600",
            ]
        ]);
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
                'email' => fake()->email(),
                'password' => Hash::make("12345"),
                "phone_number" => "0987654321",
                'address' => "hà nội",
            ],
            [
                "role_id" => 2,
                'name' => 'membership',
                'email' => fake()->email(),
                'password' => Hash::make("12345"),
                "phone_number" => "0987654321",
                'address' => "hà nội",
            ],
            [
                "role_id" => 3,
                'name' => 'shipper',
                'email' => fake()->email(),
                'password' => Hash::make("12345"),
                "phone_number" => "0987654321",
                'address' => "hà nội",
            ],
            [
                "role_id" => 4,
                'name' => 'khách hàng 1',
                'email' => "admin@gmail.com",
                'password' => Hash::make("12345"),
                "phone_number" => "0987654321",
                'address' => "hà nội",
            ],

        ]);
        // thêm dữ liệu brands
        Brand::query()->insert([
            [
                "name" => "DIOR",
                "address" => "hà nội"
            ],
            [
                "name" => "CHANEL",
                "address" => "hà nội"
            ],
        ]);
    }
}
