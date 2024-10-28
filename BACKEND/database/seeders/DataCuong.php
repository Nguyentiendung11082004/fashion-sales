<?php

namespace Database\Seeders;

use App\Models\Tag;
use App\Models\Role;
use App\Models\User;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Attribute;
use App\Models\AttributeItem;
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
                "name" => "Hot trend",
                "slug" => "hottrend"
            ],
            [
                "name" => "Nổi bật",
                "slug" => "noi-bat"
            ],

        ]);

        Category::query()->insert(
            [
                [
                    "name" => "Áo phông cotton",
                    'slug' => "ao-phong-cotton",
                    'description' => "đẹp",
                    'parent_id' => null,
                    "img_thumbnail" => "ao-phong-cotton.jpg",
                ],
                [
                    "name" => "Áo khoác",
                    'slug' => "ao-khoac",
                    'description' => "đẹp",
                    "parent_id" => 1,
                    "img_thumbnail" => "ao-khoac.jpg",

                ],
                [
                    "name" => "Giày",
                    'slug' => "giay",
                    'description' => "đẹp",
                    'parent_id' => null,

                    "img_thumbnail" => "giay.jpg",


                    // 'status'=>,
                ],
                [
                    "name" => "Giày thể thao",
                    'slug' => "giay-the-thao",
                    'description' => "đẹp",
                    "parent_id" => 3,
                    "img_thumbnail" => "giay-the-thao.jpg",

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
    }
}
