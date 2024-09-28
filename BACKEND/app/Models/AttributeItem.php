<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeItem extends Model
{
    use HasFactory;
    protected $fillable = [
        "attribute_id",
        "value",
        "slug"

    ];

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function productvariants()
    {
       return $this->belongsToMany(Attribute::class, 'product_variant_has_attributes')
                    ->withPivot('attribute_item_id')
                    ->with('attributeItems');
    }
}
