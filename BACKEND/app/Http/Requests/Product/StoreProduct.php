<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProduct extends FormRequest
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
            "brand_id" => "required",
            "category_children_id" => "required",
            'type' => "required",
           
            'sku' => "required",
            'name' => "required|unique:products",
            
            'img_thumbnail' => "required",
            'price_regular' => $this->input("type") == 0 ? "required" : "nullable",
            'price_sale' => $this->input("type") == 0 ? "required" : "nullable",
            "quantity" => $this->input("type") == 0 ? "required" : "nullable",
            'description' => "required",
            "short_description" => "required",
            
        ];
    }
}
