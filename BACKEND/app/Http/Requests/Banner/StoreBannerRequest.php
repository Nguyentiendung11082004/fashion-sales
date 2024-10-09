<?php

namespace App\Http\Requests\Banner;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreBannerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Handle a failed validation attempt.
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Lỗi thêm banner',
            'status' => false,
            'errors' => $validator->errors()
        ], 400));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'reuired|string|min:3|max:255',  // Tiêu đề có thể null
            'image' => 'required|string',                // Bắt buộc phải có ảnh (image URL hoặc path)
            'link' => 'required|url|max:255',            // URL hợp lệ cho liên kết
            'start_date' => 'required|date|before_or_equal:end_date', // Ngày bắt đầu bắt buộc, phải trước hoặc bằng ngày kết thúc
            'end_date' => 'required|date|after_or_equal:start_date',  // Ngày kết thúc bắt buộc, phải sau hoặc bằng ngày bắt đầu
          'status' => 'required|in:0,1'
        ];
    }
}
