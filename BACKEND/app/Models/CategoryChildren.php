<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryChildren extends Model
{
    use HasFactory;
    protected $fillable=[
        "category_id",
        "name",
        'description',
        "img_thumbnail",

    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function products(){
        return $this->hasMany(Product::class);
    }
}
