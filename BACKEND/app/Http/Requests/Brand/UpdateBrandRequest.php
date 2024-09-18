<?php

namespace App\Http\Requests\Brand;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;


class UpdateBrandRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' =>'Lỗi sửa brand',
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
            'name' => 'required|string|min:3|max:255|unique:brands,name|regex:/^[a-zA-Z0-9\s]+$/',
            'address' => 'required|string|min:5|max:255|regex:/^[a-zA-Z0-9\s,.]+$/'
        ];
    }
}
