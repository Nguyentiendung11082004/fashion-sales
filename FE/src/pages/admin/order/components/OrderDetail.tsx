/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
const OrderDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["order-status", id],
    queryFn: async () => {
      try {
        return await instance.get(`/order-status/${id}`);
      } catch (error) {
        throw new Error("Error");
      }
    },
  });
  const dataOrderDetail = data?.data;
  console.log("data order nè : ", dataOrderDetail);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Title */}
      <div className="text-4xl font-extrabold  mb-8 text-center">
        Chi tiết Đơn hàng
      </div>

      {/* Order Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
          Thông tin Đơn hàng
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-gray-700">
            <span className="font-semibold">Mã đơn hàng: </span>
            {dataOrderDetail?.order?.order_code}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Trạng thái: </span>
            {dataOrderDetail?.order?.order_status}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Tổng số lượng: </span>
            {dataOrderDetail?.order?.total_quantity}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Tổng tiền: </span>
            {new Intl.NumberFormat("vi-VN").format(
              parseInt(dataOrderDetail?.order?.total)
            )}
            VNĐ
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Phương thức thanh toán: </span>
            {dataOrderDetail?.order?.payment_method_id === 1
              ? "Thanh toán khi nhận hàng"
              : "Thanh toán online"}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Trạng thái thanh toán: </span>
            {dataOrderDetail?.order?.payment_status}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Giao đến:</span>
            {dataOrderDetail?.order?.user_address}
          </div>
        </div>
      </div>

      {/* User Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
          Thông tin người dùng
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-gray-700">
            <span className="font-semibold">Tên: </span>
            {dataOrderDetail?.order?.user_name}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Email: </span>
            {dataOrderDetail?.order?.user_email}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Số điện thoại: </span>
            {dataOrderDetail?.order?.user_phonenumber}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Địa chỉ: </span>
            {dataOrderDetail?.order?.user_address}
          </div>
        </div>
      </div>
      {/* User Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
          Thông tin người giao hàng
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-gray-700">
            <span className="font-semibold">Tên: </span>
            {dataOrderDetail?.order?.ship_user_name}
          </div>

          <div className="text-gray-700">
            <span className="font-semibold">Địa chỉ: </span>
            {dataOrderDetail?.order?.ship_user_address}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Số điện thoại: </span>
            {dataOrderDetail?.order?.ship_user_phonenumber}
          </div>
        </div>
      </div>

      {/* Products Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
          Sản phẩm trong Đơn hàng
        </h2>
        <div className="space-y-6">
          {dataOrderDetail?.order_details?.map(
            (product: any, index: number) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm"
              >
                <img
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                  src={product?.product_img}
                  alt="Product"
                />
                <div className="ml-6 space-y-1">
                  <div className="text-gray-800 font-semibold text-lg">
                    {product?.product_name}
                  </div>
                  <div className="text-gray-600">
                    <strong>Số lượng:</strong> {product?.quantity}
                  </div>
                  <div className="text-gray-600">
                    <strong>Giá: </strong>
                    {new Intl.NumberFormat("vi-VN").format(
                      parseInt(product?.price)
                    )}
                    VNĐ
                  </div>
                  <div className="text-gray-600">
                    <strong>Tổng tiền: </strong>
                    {new Intl.NumberFormat("vi-VN").format(
                      parseInt(product?.total_price)
                    )}
                    VNĐ
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
