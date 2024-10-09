<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'user_id' => 'required|integer|exists:users,id',
            'payment_method_id' => 'required|integer|exists:payment_methods,id',
            'order_status' => 'required|string',
            'payment_status' => 'required|string',
            'user_name' => 'required|string|max:255',
            'user_email' => 'required|email|max:255',
            'user_phonenumber' => 'required|string|max:15',
            'user_address' => 'required|string|max:255',
            'user_note' => 'nullable|string|max:500',
            'ship_user_name' => 'required|string|max:255',
            'ship_user_phonenumber' => 'required|string|max:15',
            'ship_user_address' => 'required|string|max:255',
            'shipping_method' => 'required|string',
            'products' => 'required|array',
            'products.*.product' => 'required|array',
            'products.*.product.id' => 'required|integer|exists:products,id',
            'products.*.product.name' => 'required|string',
            'products.*.product.img_thumbnail' => 'required|string',
            'products.*.product.quantity' => 'nullable|integer|min:1',
            'products.*.product.variants' => 'nullable|array',
            'products.*.product.variants.*.id' => 'nullable|integer|exists:product_variants,id',
            'products.*.product.variants.*.quantity' => 'nullable|integer|min:1',
            'products.*.getUniqueAttributes' => 'nullable|array',
        ];
    }
}
