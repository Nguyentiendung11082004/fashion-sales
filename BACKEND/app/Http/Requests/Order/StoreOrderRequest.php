<?php

namespace App\Http\Requests\Order;

use App\Models\Cart;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\ProductVariant;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            'payment_method_id' => 'required|integer|exists:payment_methods,id',
            'payment_status' => 'required|string',
            'user_note' => 'nullable|string|max:255',
            'ship_user_name' => 'required|string|max:255',
            // Validate số điện thoại Việt Nam
            'ship_user_phonenumber' => [
                'required',
                'regex:/^0[3|5|7|8|9][0-9]{8}$/',
            ],
            'ship_user_email' => 'required|string|max:255',
            'ship_user_address' => 'required|string|max:255',
            'shipping_method' => 'required|string|max:50',
            // Validate mua ngay
            'id_product' => 'required_without:cart_item_ids|integer|exists:products,id',
            'product_variant_id' => 'required_if:is_variant,true|integer|exists:product_variants,id|nullable', // Yêu cầu nếu là biến thể
            'quantity' => 'required_without:cart_item_ids|integer|min:1',
            // Validate mua theo cart
            'cart_item_ids' => 'required_without:id_product|array',
            'cart_item_ids.*' => 'integer|exists:cart_items,id', // Kiểm tra từng ID của cart_item_ids
            'quantityOfCart.*' => 'required_without:id_product|integer|min:1', // Kiểm tra từng quantity tương ứng với cart_item_ids

        ];
    }
    public function withValidator($validator)
{
    $validator->after(function ($validator) {
        // Kiểm tra nếu mua ngay
        if ($this->has('id_product')) {
            $product = Product::find($this->id_product);

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

       // Kiểm tra nếu mua từ giỏ hàng
       if ($this->has('cart_item_ids')) {
        foreach ($this->cart_item_ids as $index => $itemId) {
            $quantityFromRequest = $this->quantityOfCart[$itemId] ?? 0;  // Lấy số lượng từ request
            $cartItem = CartItem::find($itemId);
            if (!$cartItem) {
                $validator->errors()->add("cart_item_ids.$index", "Giỏ hàng không hợp lệ.");
                continue;
            }
            // Kiểm tra loại sản phẩm (sản phẩm đơn hoặc biến thể)
            $product = $cartItem->product;

            if ($product->type == 1) {  // Sản phẩm có biến thể (type = 1)
                $variant = $cartItem->productVariant;

                if (!$variant) {
                    $validator->errors()->add("cart_item_ids.$index", "Biến thể sản phẩm không hợp lệ.");
                } else {
                    if ($quantityFromRequest > $variant->quantity) {
                        $validator->errors()->add("quantityOfCart.$index", "Số lượng mua vượt quá số lượng tồn kho của biến thể.");
                    }
                }
            } else {  // Sản phẩm đơn (type = 0)
                if ($quantityFromRequest > $product->quantity) {
                    $validator->errors()->add("quantityOfCart.$index", "Số lượng mua vượt quá số lượng tồn kho của sản phẩm.");
                }
            }
        }
    }
    });
}

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Đặt Hàng Không Thành Công!',
            'errors' => $validator->errors(),
        ], 422));
    }
}
