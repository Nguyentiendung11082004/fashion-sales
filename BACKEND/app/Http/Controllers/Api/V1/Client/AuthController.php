<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email'    => 'required|email',
                'password' => 'required'
            ]);

            $user = User::where('email', request('email'))->first();
            // dd($user);

            if (
                !$user || !Hash::check(request('password'), $user->password) ||
                $user->role_id != 1
            ) {
                throw ValidationException::withMessages([
                    'infor' => ['The provided credentials are incorrect.'],
                ]);
            }

            $token = $user->createToken($user->id)->plainTextToken;

            return response()->json([
                'token' => $token,
                'message' => 'Login sucessfully!!'
            ]);
        } catch (\Throwable $th) {
            if ($th instanceof ValidationException) {
                return response()->json([
                    'errors' => $th->errors()
                ], Response::HTTP_BAD_REQUEST);
            }
            return response()->json([
                'errors' => $th->getMessage()
            ], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function register(UserRequest $request)
    {
        try {
            $dataUser = [
                'name'         => $request->name,
                'phone_number' => $request->phone_number,
                'email'        => $request->email,
                'address'      => $request->address,
                'password'     => bcrypt($request->password),
                'birth_date'   => $request->birth_date,
                'is_active'    => $request->is_active ?? 1,
                'gender'       => $request->gender,
                'role_id'      => $request->role_id ?? 1,
                'avatar'       => $request->avatar
            ];

            $user = User::query()->create($dataUser);

            $token = $user->createToken($user->id)->plainTextToken;

            return response()->json([
                'message' => 'Register sucessfully!!',
                'token' => $token
            ]);
        } catch (\Throwable $th) {
            if ($th instanceof ValidationException) {
                return response()->json([
                    'errors' => $th->errors()
                ], Response::HTTP_BAD_REQUEST);
            }
            return response()->json([
                'errors' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function logout(Request $request)
    {

        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logout Sucessfully!!!!'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'errors' => $th->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
