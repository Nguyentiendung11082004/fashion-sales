<?php

namespace App\Http\Requests\Checkout;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCheckoutRequest extends FormRequest
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
            // Mua giỏ hàng
            'cart_item_ids' => 'required_without:product_id|array',
            'cart_item_ids.*' => 'integer|exists:cart_items,id', // Kiểm tra từng ID của cart_item_ids
            // Mua ngay
            'product_id' => 'required_without:cart_item_ids|integer|exists:products,id',
            'product_variant_id' => 'required_if:is_variant,true|integer|exists:product_variants,id|nullable', // Yêu cầu nếu là biến thể
            'quantity' => 'required_without:cart_item_ids|integer|min:1',
        ];
    }
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // Kiểm tra nếu mua ngay
            if ($this->has('product_id')) {
                $product = Product::find($this->product_id);
    
                if ($product->type) {  // Sản phẩm có biến thể
                    if (!$this->filled('product_variant_id')) {
                        $validator->errors()->add('product_variant_id', 'Vui lòng chọn biến thể sản phẩm.');
                    } else {
                        $variant = ProductVariant::find($this->product_variant_id);
                        if (!$variant || $variant->product_id != $product->id) {
                            $validator->errors()->add('product_variant_id', 'Biến thể sản phẩm không hợp lệ.');
                        } else {
                            if ($this->quantity > $variant->quantity) {
                                $validator->errors()->add('quantity', 'Số lượng mua vượt quá số lượng tồn kho của biến thể.');
                            }
                        }
                    }
                } else {  // Sản phẩm đơn
                    if ($this->filled('product_variant_id')) {
                        $validator->errors()->add('product_variant_id', 'Sản phẩm đơn không có biến thể.');
                    }
    
                    if ($this->quantity > $product->quantity) {
                        $validator->errors()->add('quantity', 'Số lượng mua vượt quá số lượng tồn kho.');
                    }
                }
            }
        });
    }
}
