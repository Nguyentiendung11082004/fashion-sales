<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        "brand_id",
        "category_children_id",
        'type',
        'slug',
        'sku',
        'name',
        "views",
        'img_thumbnail',
        'price_regular',
        'price_sale',
        "quantity",
        'description',
        "short_description",
        "status",
        'is_show_home',
        'trend',
        'is_new',

    ];
}
