<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Banner\BannerRequest;
use App\Http\Requests\Banner\StoreBannerRequest;
use App\Http\Requests\Banner\UpdateBannerRequest;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Carbon\Carbon;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $banners = Banner::query()->latest('id')->get();

            if ($banners->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không có dữ liệu.',
                    'data' => []
                ], Response::HTTP_OK);
            }

            return response()->json([
                'status' => true,
                'message' => 'Danh sách banners được lấy thành công.',
                'data' => [
                    'total' => $banners->count(),
                    'banners' => $banners
                ]
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            Log::error('API/V1/Admin/BannerController@index: ', [$ex->getMessage()]);

            return response()->json([
                'status' => false,
                'message' => 'Đã có lỗi nghiêm trọng xảy ra. Vui lòng thử lại sau.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBannerRequest $request)
    {
        try {
            $params = $request->all();

    
            if (!$this->isValidDates($request->input('start_date'), $request->input('end_date'))) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc, và ngày kết thúc không được nằm trong quá khứ.'
                ], 400);
            }

            if ($request->has('image')) {
                $params['image'] = $request->input('image');
            }

            $banner = Banner::create($params);

            return response()->json([
                'data' => new BannerResource($banner),
                'success' => true,
                'message' => 'Banner đã được thêm thành công'
            ], 201);

        } catch (QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Thêm Banner thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $banner = Banner::query()->findOrFail($id);
        return new BannerResource($banner);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBannerRequest $request, string $id)
    {
        try {
            $data = $request->except('image');
            
            $banner = Banner::findOrFail($id);

            
            if (!$this->isValidDates($request->input('start_date'), $request->input('end_date'))) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc, và ngày kết thúc không được nằm trong quá khứ.'
                ], 400);
            }

            if ($request->filled('image')) {
                $data['image'] = $request->input('image');
            } else {
                $data['image'] = $banner->image;
            }

            $banner->update($data);

            return response()->json([
                'data' => new BannerResource($banner),
                'success' => true,
                'message' => 'Banner đã được sửa thành công'
            ], 200);
            
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Banner không tồn tại!'
            ], 404);
        } catch (QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cập nhật Banner thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $banner = Banner::query()->findOrFail($id);
            $banner->delete();

            return response()->json([
                'status' => true,
                'message' => "Xóa banner thành công."
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Banner không tồn tại!'
            ], 404);
        }
    }

  
    private function isValidDates($start_date, $end_date)
    {
        $start = Carbon::parse($start_date);
        $end = Carbon::parse($end_date);

       
        return $start->lessThanOrEqualTo($end) && $end->greaterThanOrEqualTo(Carbon::now());
    }
}
