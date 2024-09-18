<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['slug', 'status', 'name', 'description', 'img_thumbnail', 'parent_id'];

    //Mối quan hệ với danh mục cha
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    //Mối quan hệ với danh mục con
     
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
}
