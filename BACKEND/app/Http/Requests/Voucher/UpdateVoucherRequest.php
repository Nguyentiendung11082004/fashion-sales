<?php

namespace App\Http\Requests\Voucher;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVoucherRequest extends FormRequest
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
    public function rules()
    {
        return [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:500',
            'code' => 'nullable|string|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'min_order_value' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'is_active' => 'boolean',
            'discount_type' => 'in:fixed,percent',
            'discount_value' => [
                'required_if:discount_type,fixed,percent',  // bắt buộc nếu là fixed hoặc percentage
                'numeric',  // phải là số
                'min:0',  // không được nhỏ hơn 0
                function ($attribute, $value, $fail) {
                    if ($this->discount_type == 'percent' && $value > 100) {
                        $fail('The ' . $attribute . ' must not be greater than 100 when discount type is percentage.');
                    }
                }
            ],
            'meta' => 'nullable|array',
            'meta.*.meta_key' => 'required_with:meta.*|string|max:255',
            'meta.*.meta_value' => [
                'required_with:meta.*|string',
                function ($attribute, $value, $fail) {
                    // Kiểm tra xem meta_value có phải là JSON hợp lệ không
                    $decoded = json_decode($value);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        $fail('The ' . $attribute . ' must be a valid JSON string.');
                    } 
                },
            ],
        ];
    }

    public function messages()
    {
        return [
            'meta.*.meta_key.required_with' => 'The meta key field is required when meta is present.',
            'meta.*.meta_value.required_with' => 'The meta value field is required when meta is present.',
        ];
    }
}
