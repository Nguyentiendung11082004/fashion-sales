<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAttributeItemRequest extends FormRequest
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
            'value' => 'required|string|max:255|unique:attribute_items,value,' . $this->route('attributeItem')
        ];
    }
         /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'value.required' => 'Tên là trường bắt buộc.',
            'value.string' => 'Tên phải là chuỗi ký tự.',
            'value.max' => 'Tên không được vượt quá 255 ký tự.',
            'value.unique' => 'Tên này đã tồn tại. Vui lòng chọn tên khác.',
        ];
    }
}
