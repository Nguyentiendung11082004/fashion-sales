<?php

use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // ID đơn hàng
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade'); // Liên kết với bảng users
            $table->foreignIdFor(PaymentMethod::class)->constrained()->onDelete('cascade'); // Liên kết với bảng payment_methods
            $table->string('order_status'); // Trạng thái đơn hàng (completed, pending, shipped, v.v.).
            $table->string('payment_status')->default('pending'); // Trạng thái thanh toán
            $table->string('order_code')->unique(); // Mã đơn hàng
            $table->integer('total_quantity'); // Tổng số lượng
            $table->decimal('total', 15, 2); // Tổng giá trị đơn hàng
            $table->string('user_name'); // Tên người đặt hàng
            $table->string('user_email'); // Email người đặt hàng
            $table->string('user_phonenumber'); // Số điện thoại người đặt hàng
            $table->text('user_address'); // Địa chỉ người đặt hàng
            $table->text('user_note')->nullable(); // Ghi chú của người đặt hàng
            $table->string('ship_user_name')->nullable(); // Tên người nhận
            $table->string('ship_user_phonenumber')->nullable(); // Số điện thoại người nhận
            $table->text('ship_user_address')->nullable(); // Địa chỉ người nhận
            $table->string('shipping_method')->nullable(); // Phương thức vận chuyển
            $table->timestamps(); // Thời gian tạo và cập nhật

            // Thêm chỉ mục
            $table->index('user_id');
            $table->index('payment_method_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
