<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeItem;
use App\Models\Product;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DataAttribute extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // thêm mới attribute
        Attribute::query()->insert(
            [
                [
                    "name" => "size",
                ],
                [
                    "name" => "color",
                ],
            ]
        );
        // create attribute_item
        AttributeItem::query()->insert([
            [
                "attribute_id" => 1,
                "value" => "S"
            ],
            [
                "attribute_id" => 1,
                "value" => "M"
            ],
            [
                "attribute_id" => 1,
                "value" => "40"
            ],
            [
                "attribute_id" => 1,
                "value" => "41"
            ],
            [
                "attribute_id" => 2,
                "value" => "RED"
            ],
            [
                "attribute_id" => 2,
                "value" => "BLACK"
            ],
        ]);
        // CREATE tag
        Tag::query()->insert([
            ["name"=>"spre"],
            ["name"=>"spdep"],

        ]);

    }
}
