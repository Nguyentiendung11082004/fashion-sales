import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface OrderDetail {
  product_name: string;
  attributes: string | null;
  quantity: number;
  price: number;
}

interface Order {
  order_details: OrderDetail[];
  total: number;
  order_status: string;
  ship_user_address: string;
  payment_status: string;
  created_at: string;
}

const OrderLookup = () => {
  const [orderCode, setOrderCode] = useState("");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [lookupType, setLookupType] = useState("all");

  const [errors, setErrors] = useState({
    orderCode: "",
    contact: "",
    otp: "",
  });

  const { mutate: fetchOrders } = useMutation({
    mutationFn: async () => {
      const response = await instance.post("/search-order", {
        type: "phoneNumber",
        contact: contact,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setOrder(data.order);
      setErrors({ orderCode: "", contact: "", otp: "" });
    },
    onError: (error: any) => {
      console.error("Có lỗi xảy ra:", error);
      setErrors(error.response?.data?.errors || {});
      toast.error(
        error.response?.data?.message || "Tra cứu đơn hàng thất bại."
      );
    },
  });

  const { mutate: sendOtp } = useMutation({
    mutationFn: async () => {
      const response = await instance.post("/search-order", {
        type: "email",
        order_code: orderCode,
        contact: contact,
      });
      return response.data;
    },
    onSuccess: () => {
      setShowOtpInput(true); // Hiển thị ô nhập OTP
      toast.success("Mã OTP đã được gửi đến email của bạn.");
      setErrors({ orderCode: "", contact: "", otp: "" });
    },
    onError: (error: any) => {
      console.error("Có lỗi xảy ra:", error);
      setErrors(error.response?.data?.errors || {});
      toast.error(error.response?.data?.message || "Gửi OTP thất bại.");
    },
  });

  const { mutate: verifyOtp } = useMutation({
    mutationFn: async () => {
      const response = await instance.post("/verify-otp", {
        order_code: orderCode,
        contact: contact,
        otp: otp,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setOrder(data.order); // Lưu thông tin đơn hàng
      setErrors({ orderCode: "", contact: "", otp: "" });
    },
    onError: (error: any) => {
      console.error("Có lỗi xảy ra:", error);
      setErrors(error.response?.data?.errors || {});
      toast.error(error.response?.data?.message || "Xác thực OTP thất bại.");
    },
  });

  const handleContinue = () => {
    sendOtp();
  };

  const handleSearch = () => {
    if (lookupType === "all") {
      fetchOrders();
    } else {
      verifyOtp();
    }
  };

  useEffect(() => {
    // Reset các trường input khi `lookupType` thay đổi
    setOrderCode("");
    setContact("");
    setOtp("");
    setErrors({ orderCode: "", contact: "", otp: "" });
    setShowOtpInput(false); // Ẩn ô nhập OTP nếu cần
    setOrder(null);
  }, [lookupType]);

  return (
    <div className="container bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full my-20 py-10">
      <div className="space-y-4 flex">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold">Tra cứu đơn hàng</h2>

          {/* Radio chọn kiểu tra cứu */}
          <div className="flex space-x-4 my-5">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="all"
                checked={lookupType === "all"}
                onChange={() => setLookupType("all")}
              />
              <span>Tất cả đơn hàng</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="specific"
                checked={lookupType === "specific"}
                onChange={() => setLookupType("specific")}
              />
              <span>Đơn hàng cụ thể</span>
            </label>
          </div>

          {/* Form tra cứu */}
          {lookupType === "all" && (
            <div>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none`}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
              )}
              <button
                type="button"
                onClick={handleSearch}
                className="w-full flex items-center justify-center mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-600 transition"
              >
                TRA CỨU
                <p className="mb-[4px] ml-1">→</p>
              </button>
            </div>
          )}

          {lookupType === "specific" && (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nhập email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className={`w-full px-4 py-2 border ${
                    errors.contact ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none`}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Nhập mã đơn hàng"
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                  className={`w-full px-4 py-2 border ${
                    errors.orderCode ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none`}
                />
                {errors.orderCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.orderCode}
                  </p>
                )}
              </div>

              {showOtpInput && (
                <div>
                  <input
                    type="text"
                    placeholder="Nhập mã OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={`w-full px-4 py-2 border ${
                      errors.otp ? "border-red-500" : "border-gray-300"
                    } rounded-lg shadow-sm focus:outline-none`}
                  />
                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  if (showOtpInput) {
                    handleSearch();
                  } else {
                    handleContinue();
                  }
                }}
                className="w-full flex items-center justify-center mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-600 transition"
              >
                {showOtpInput ? "TRA CỨU" : "TIẾP TỤC"}
                <p className="mb-[4px] ml-1">→</p>
              </button>
            </div>
          )}
        </div>
        <div className="w-1/2 justify-items-center">
          <img
            src="https://viettelpost.com.vn/viettelpost-iframe/assets/images/tracking-img.svg"
            alt=""
          />
        </div>
      </div>

      {/* Bảng hiển thị đơn hàng */}
      {order && (
        <>
          {/* Trường hợp order là object */}
          {typeof order === "object" &&
            !Array.isArray(order) &&
            order.order_details &&
            order.order_details.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Kết quả tra cứu</h3>
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Tên sản phẩm
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Thuộc tính
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Số lượng
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Giá sản phẩm
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Tổng giá
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Trạng thái đơn hàng
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Địa chỉ giao hàng
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Hình thức thanh toán
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Ngày tạo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_details.map((orderDetail, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 px-4 py-2">
                          {orderDetail.product_name}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {orderDetail.attributes &&
                          Object.entries(orderDetail.attributes).length > 0
                            ? Object.entries(orderDetail.attributes)
                                .map(([key, value]) => `${value}`)
                                .join(", ")
                            : ""}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {orderDetail.quantity}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {new Intl.NumberFormat("vi-VN").format(
                            orderDetail.price
                          )}{" "}
                          VNĐ
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {new Intl.NumberFormat("vi-VN").format(order.total)}
                          VNĐ
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {order.order_status}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {order.ship_user_address}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {order.payment_status}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {new Date(order.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          {/* Trường hợp order là mảng */}
          {Array.isArray(order) && order.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Kết quả tra cứu</h3>
              {order.map((o) => (
                <div key={o.id} className="mb-6">
                  <h4 className="font-semibold">
                    Đơn hàng #{o.id} - {o.order_status}
                  </h4>
                  <table className="w-full border-collapse border border-gray-200 mt-2">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Tên sản phẩm
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Thuộc tính
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Số lượng
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Giá sản phẩm
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Tổng giá
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Trạng thái đơn hàng
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Địa chỉ giao hàng
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Hình thức thanh toán
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Ngày tạo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {o.order_details.map((orderDetail: any) => (
                        <tr key={orderDetail.id}>
                          <td className="border border-gray-200 px-4 py-2">
                            {orderDetail.product_name}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {orderDetail.attributes &&
                            Object.entries(orderDetail.attributes).length > 0
                              ? Object.entries(orderDetail.attributes)
                                  .map(([key, value]) => `${value}`)
                                  .join(", ")
                              : ""}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {orderDetail.quantity}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {new Intl.NumberFormat("vi-VN").format(
                              orderDetail.price
                            )}{" "}
                            VNĐ
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {new Intl.NumberFormat("vi-VN").format(o.total)}
                            VNĐ
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {o.order_status}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {o.ship_user_address}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {o.payment_status}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {new Date(o.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {/* Trường hợp không có kết quả */}
          {!Array.isArray(order) &&
            !(order.order_details && order.order_details.length > 0) && (
              <p className="mt-8 text-red-500">Không tìm thấy đơn hàng nào.</p>
            )}
        </>
      )}

    </div>
  );
};

export default OrderLookup;
