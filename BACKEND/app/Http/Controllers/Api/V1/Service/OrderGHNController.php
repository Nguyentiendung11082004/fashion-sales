<?php

namespace App\Http\Controllers\Api\V1\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderGHNController extends Controller
{
    //
    public function createOrder(Request $dataRequestOrder)
    {
        try {
            $dataOrder = $dataRequestOrder->toArray();

            $api_key = '18f28540-8fbc-11ef-839a-16ebf09470c6';
            $shop_id = 5404502; // Thay bằng shop_id thực tế của bạn
            $data = [
                "shop_id" => $shop_id,
                "payment_type_id" => $dataOrder['status'] === "Đã thanh toán" ? 1 : 2,
                "note" => "Hàng dễ vỡ xin nhẹ tay",
                "required_note" => "KHONGCHOXEMHANG",
                "return_phone" => "0988207698",
                "return_address" => "Đan Phượng - Hà Nội",

                "from_phone" => "0988207698",
                "from_address" => "Đan Phượng - Hà Nội",
                "from_ward_name" => "Thượng Mỗ",
                "from_district_name" => "Đan Phượng",
                "from_province_name" => "Hà Nội",
                "to_name" => $dataOrder["to_name"],
                "to_phone" => $dataOrder["to_phone"],
                "to_address" => $dataOrder["to_address"],
                "to_ward_name" => $dataOrder["to_ward_name"],
                "to_district_name" => $dataOrder["to_district_name"],
                "to_province_name" => $dataOrder["to_province_name"],
                "cod_amount" => $dataOrder['status'] === "Đã thanh toán" ? null : $dataOrder['total'], //tiền thu hộ người gửi max:50.000.000	

                "weight" => $dataOrder["weight"],
                "length" => 1,
                "width" => 19,
                "height" => 10,

                "service_id" => 0,
                "service_type_id" => 2,

                "items" => []
            ];
            foreach ($dataOrder["items"] as  $value) {

                $data["items"][] = [
                    "name" => $value["product_name"],
                    "code" => $value["product_id"],
                    "quantity" => $value["product_quantity"],
                    "price" => $value["product_price"],
                ];
            }
            // dd($dataOrder);


            // Khởi tạo cURL
            $ch = curl_init();

            // Cấu hình cURL
            curl_setopt($ch, CURLOPT_URL, "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Token: ' . $api_key,
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

            // Gửi request và lấy response
            $response = curl_exec($ch);

            // Kiểm tra lỗi cURL
            if (curl_errno($ch)) {
                throw new \Exception('cURL Error: ' . curl_error($ch));
            }

            // Đóng cURL
            curl_close($ch);

            // Decode JSON response
            $responseData = json_decode($response, true);

            // Kiểm tra nếu có lỗi từ API GHN
            if (!isset($responseData['code']) || $responseData['code'] !== 200) {
                throw new \Exception($responseData['message'] ?? 'Lỗi không xác định từ API GHN');
            }

            // Trả về response thành công
            return response()->json([
                "message" => "Tạo đơn hàng thành công",
                "order_data" => $responseData['data']
            ], \Illuminate\Http\Response::HTTP_OK);
        } catch (\Exception $ex) {
            // Trả về lỗi
            return response()->json([
                "message" => $ex->getMessage()
            ], \Illuminate\Http\Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
