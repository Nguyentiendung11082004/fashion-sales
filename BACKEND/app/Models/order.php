<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'payment_method_id',
        'order_status',
        'payment_status',
        'order_code',
        'total_quantity',
        'total',
        'user_name',
        'user_email',
        'user_phonenumber',
        'user_address',
        'user_note',
        'ship_user_name',
        'ship_user_phonenumber',
        'ship_user_address'
    ];
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($order) {
            // Tạo mã order_code bao gồm chữ và số
            $order->order_code = 'ORD-' . strtoupper(uniqid());
        });
    }
    // Quan hệ với model User (người dùng)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Quan hệ với model PaymentMethod (phương thức thanh toán)
    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    // Quan hệ với model OrderDetail (chi tiết đơn hàng)
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
     // Liên kết đến voucher_logs
     public function voucherLogs()
     {
         return $this->hasMany(VoucherLog::class);
     }
     
}
