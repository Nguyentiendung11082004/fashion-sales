<?php

namespace App\Http\Requests\Voucher;

use Illuminate\Foundation\Http\FormRequest;


class StoreVoucherRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'string|max:50|unique:vouchers,code',
            'start_date' => 'required|date|after_or_equal:today|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'min_order_value' => 'required|numeric|min:0',
            'usage_limit' => 'required|integer|min:1',
            'is_active' => 'boolean',
            'discount_type' => 'required|in:fixed,percent',
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
            'meta' => 'array', // Kiểm tra xem meta có phải là mảng không
            'meta.*.meta_key' => 'required|string|max:255', // Đảm bảo meta_key không null và là string
            'meta.*.meta_value' => [
                'required', // Đảm bảo meta_value không null
                function ($attribute, $value, $fail) {
                    // Kiểm tra xem meta_value có phải là JSON hợp lệ không
                    $decoded = json_decode($value);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        $fail('The ' . $attribute . ' must be a valid JSON string.');
                    } 
                    // else if (!is_array($decoded)) { // Kiểm tra xem kết quả có phải là mảng không
                    //     $fail('The ' . $attribute . ' must be a valid JSON array.');
                    // }
                },
            ],
        ];
    }

    public function messages()
    {
        return [
            'meta.*.meta_key.required' => 'The meta key field is required.',
            'meta.*.meta_value.required' => 'The meta value field is required.',
        ];
    }
}
