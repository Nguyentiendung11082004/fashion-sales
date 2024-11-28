<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class OrderConfirmationNotification extends Notification implements ShouldQueue
{
    use Queueable;
    public $order;
    public $details;
    public $email;

    /**
     * Create a new notification instance.
     */
    public function __construct($order, $email, $details)
    {
        $this->order = $order;
        $this->email = $email;
        $this->details = $details;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    // Xây dựng nội dung email
    public function toMail($notifiable)
    {
        $mailMessage = (new MailMessage)
            ->subject('Order Confirmation') // Tiêu đề email
            ->line('Thank you for your order, ' . $this->order->user_name . '!') // Lời cảm ơn đến khách hàng
            ->line('Your order has been successfully placed.') // Đơn hàng đã được xác nhận
            ->line('Order Code: ' . $this->order->order_code) // Mã đơn hàng
            ->line('Total Quantity: ' . $this->order->total_quantity) // Tổng số lượng sản phẩm
            ->line('Total Price: ₫' . number_format($this->order->total, 2)) // Tổng giá trị đơn hàng (định dạng tiền)
            ->line('Shipping Fee: ₫' . number_format($this->order->shipping_fee, 2)) // Phí vận chuyển
            ->line('Order Date: ' . $this->order->created_at->format('d/m/Y')) // Ngày đặt hàng
            ->line('Shipping Address: ' . $this->order->ship_user_address) // Địa chỉ giao hàng
            ->line('Customer Note: ' . $this->order->user_note) // Ghi chú của khách hàng
            ->line('Product Details:'); // Chi tiết sản phẩm

        // Duyệt qua từng chi tiết sản phẩm trong đơn hàng
        foreach ($this->details as $detail) {
            $mailMessage->line('Product: ' . $detail->product_name) // Tên sản phẩm
                ->line('Quantity: ' . $detail->quantity) // Số lượng sản phẩm
                ->line('Price: ₫' . number_format($detail->price, 0, ',', '.')) // Giá mỗi sản phẩm
                ->line('Total Price: ₫' . number_format($detail->total_price, 0, ',', '.')); // Tổng giá trị sản phẩm
        }

        return $mailMessage;
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
