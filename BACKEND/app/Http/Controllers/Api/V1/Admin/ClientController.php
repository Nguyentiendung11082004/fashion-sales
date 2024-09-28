<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = User::whereIn('role_id', [1])->with('role')
        ->latest()->get();

        return response()->json([
            'success' => true,
            'data'    => $clients
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        try {
         
            $dataClient = [
                'name'        => $request->name,
                'phone_number' => $request->phone_number,
                'email'       => $request->email,
                'address'     => $request->address,
                'password'    => bcrypt($request->password),
                'birth_date'  => $request->birth_date,
                'is_active'   => $request->is_active ?? 1,
                'gender'      => $request->gender,
                'role_id'     => $request->role_id,
                'avatar'      => $request->avatar
            ];
       

            // if ($request->hasFile('avatar')) {
            //     // Lưu avatar vào thư mục avatars
            //     $avatarPath = Storage::put('public/avatars', $request->file('avatar'));
            //     // Tạo URL đầy đủ cho avatar
                
            //     $dataClient['avatar'] = url(Storage::url($avatarPath));

            // }

        $client = User::query()->create($dataClient);
        
        return response()->json([
            'status'  =>201,
            'success' =>true,  
            'message' =>'Client created successfully!',
            'data'    => $client
        ],201);
        } catch (\Exception $e) {
            return response()->json([
                'status'  => 500,
                'success' => false,
                'message' => 'Không thành công.',
                'error'   => $e->getMessage()
            ], 500); 
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $client = User::with('role')->findOrFail($id);
            return response()->json([
                'massage' => 'Chi tiết khách hàng id = '.$id,
                'data'    =>$client
            ]);       
        } catch (\Throwable $th) {
           if ($th instanceof ModelNotFoundException){
            return response()->json([
                'massage'=>'Không tìm thấy khách hàng có id='.$id,
            ], HttpResponse::HTTP_NOT_FOUND);
           }
           return response()->json([
            'massage'=>'Không tìm thấy khách hàng có id='.$id,
        ], HttpResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
{
    try {
        $client = User::findOrFail($id);

        // Tạo mảng dữ liệu để cập nhật
        $dataClient = [
            'name'         => $request->name,
            'phone_number' => $request->phone_number,
            'email'        => $request->email,
            'address'      => $request->address,
            'password'     => $request->password ? bcrypt($request->password) : $client->password,
            'birth_date'   => $request->birth_date,
            'is_active'    => $request->is_active ?? $client->is_active,
            'gender'       => $request->gender,
            'role_id'      => $request->role_id,
            'avatar'       => $request->avatar ?? $client->avatar //Kiểm tra avatar
        ];

          // Kiểm tra nếu có file avatar mới
        //   if ($request->hasFile('avatar')){
        //     // Xóa ảnh cũ nếu có
        //     if ($client->avatar) {
        //         // Lấy đường dẫn tương đối của ảnh cũ từ URL đầy đủ
        //         $avatarPathOld = str_replace(url('/') . '/', '', $client->avatar);
        //         if (Storage::exists($avatarPathOld)) {
        //             Storage::delete($avatarPathOld);
        //         }
        //     }

            // Lưu ảnh mới và cập nhật đường dẫn mới
        //     $avatarPath = Storage::put('avatars', $request->file('avatar'));
        //     $dataClient['avatar'] = url($avatarPath);
        // }

        // Cập nhật dữ liệu vào cơ sở dữ liệu
        $client->update($dataClient);

        return response()->json([
            'status'  => 200,
            'success' => true,  
            'message' => 'Client updated successfully!',
            'data'    => $client
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'status'  => 500,
            'success' => false,
            'message' => 'Update failed.',
            'error'   => $e->getMessage()
        ], 500); 
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = User::find($id);
    
        if (!$client) {
            return response()->json([
                'success' => false,
                'message' => 'Client not found',
            ], 404);
        }
    
        // Kiểm tra và xóa ảnh nếu tồn tại
        // if ($client->avatar) {
        //     // Lấy đường dẫn tương đối đến ảnh
        //     $avatarPath = str_replace(url('/') . '/', '', $client->avatar);
            
        //     // Xóa ảnh trong storage nếu tồn tại
        //     if (Storage::exists($avatarPath)) {
        //         Storage::delete($avatarPath);
        //     }
        // }
    
        // Xóa bản ghi nhân viên
        $client->delete();
    
        return response()->json([
            'success' => true,
            'message' => 'Client deleted successfully',
        ], 200);
    }
}
