<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "product_id",
        "content",
        "rating",
        'image',
        "status",
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function parent()
    {
        return $this->belongsTo(Comments::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Comments::class, 'parent_id');
    }
}
