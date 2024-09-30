<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

use function Laravel\Prompts\alert;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $tags = Tag::query()->latest('id')->get();
            return response()->json([
                'data' => $tags
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            Log::error('API/V1/Admin/TagController@index: ', [$ex->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {
            // dd($request->all());

            $request->validate([
                "name" => 'required|unique:tags,name'

            ]);
            $tag = Tag::query()->create(
                [
                    "name" => $request->input("name"),
                    "slug"=>Str::slug($request->input("name"))
                ]
            );
            return response()->json(
                [
                    "message" => "thêm mới thành công",
                    "tag" => $tag
                ],
                Response::HTTP_OK
            );
        } catch (\Exception $ex) {
            return response()->json(
                ["message" => $ex->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        try {
            $tag = Tag::query()->findOrFail($id);
            return response()->json(
                ["data" => $tag],
                Response::HTTP_OK
            );
        } catch (\Exception $ex) {
            //throw $th;
            return response()->json(
                [
                    "message" => $ex->getMessage()
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        try {
            $request->validate([
                "name" => "required|unique:tags,name,$id"
            ]);
            $tag = Tag::query()->findOrFail($id);
            $tag->update([
                "name" => $request->input('name')
            ]);

            return response()->json(
                [
                    "message" => "cập nhật thành công",
                    "tag" => $tag
                ],
                Response::HTTP_OK
            );
        } catch (\Exception $ex) {
            //throw $th;
            return response()->json(
                [
                    "message" => $ex->getMessage()
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        try {
            $tag=Tag::query()->findOrFail($id);
            $tag->delete();
            return response()->json(
                ["message"=>"xóa thành công"],Response::HTTP_OK
            );
        } catch (\Exception $ex) {
            return response()->json(
                ["message"=>$ex->getMessage()],Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
