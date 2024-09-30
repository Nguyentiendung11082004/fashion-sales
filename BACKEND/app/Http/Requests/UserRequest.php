<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
        if ($this->isMethod('post')) {
            return [
                'name'         => 'required|string|max:255',
                'phone_number' => 'required|string|regex:/^[0-9]{10}$/|unique:users,phone_number',
                'email'        => 'required|email|unique:users,email',
                'address'      => 'required|string|max:255',
                'avatar'       => 'nullable',
                'password'     => 'required|min:8',
                'birth_date'   => 'nullable|date',
                'is_active'    => 'boolean',
                'gender'       => 'nullable|boolean',
<<<<<<< HEAD
                'role_id'      => 'exists:roles,id',
=======
                'role_id'      => 'required|exists:roles,id',
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
            ];
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            if ($this->route('employee')) {
                $userID = $this->route('employee');
            } elseif ($this->route('client')) {
                $userID = $this->route('client');
            } else {
                $userID = null; 
            }
            

            return [
                'name'         => 'nullable|string|max:255',
                'phone_number' => [
                    'required',
                    'regex:/^[0-9]{10}$/', // Chỉ chấp nhận số điện thoại gồm đúng 10 chữ số
                    Rule::unique('users')->ignore($userID,'id'), // Bỏ qua ID hiện tại
                ],
                'email' => [
                    'required',
                    'email',
                    Rule::unique('users')->ignore($userID,'id'), // Bỏ qua ID hiện tại
                ],
                'address'      => 'nullable|string|max:255',
                'avatar'       => 'nullable',
                'password'     => 'nullable|min:8',
                'birth_date'   => 'nullable|date',
                'is_active'    => 'boolean',
                'gender'       => 'nullable|boolean',
                'role_id'      => 'exists:roles,id',
            ];
        }

        return [];
    }


    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->messages();

        $response = response()->json([
            'errors' => $errors,
        ], Response::HTTP_BAD_REQUEST);
        throw new HttpResponseException($response);
    }
}
