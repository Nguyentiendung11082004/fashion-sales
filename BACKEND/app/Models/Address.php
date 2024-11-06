<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $filltable = [
        'user_id',
        'label',
        'address',
        'city',
        'district',
        'ward',
        'phone',
        'is_default',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    protected $casts=[
        "is_default"=>"boolean"
    ];

}
