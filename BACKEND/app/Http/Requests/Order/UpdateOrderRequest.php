<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'order_status' => 'required|string|in:Đang chờ xác nhận,Hủy',  // Allowed statuses
            'user_note' => 'nullable|string|max:255',                // Optional user note by default
            // Require user_note if the status is "Hủy"
            'user_note' => 'required_if:status,Hủy|string|max:255',  
        ];
    }
}
