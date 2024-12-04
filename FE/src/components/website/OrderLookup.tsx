import { colorTranslations } from "@/common/colors/colorUtils";
import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const [errors, setErrors] = useState({
    orderCode: "",
    email: "",
    otp: "",
  });

  const validateInputs = (isOtpStep: boolean) => {
    let hasError = false;
    const tempErrors = { orderCode: "", email: "", otp: "" };

    // Kiểm tra mã đơn hàng
    if (!orderCode.trim()) {
      tempErrors.orderCode = "Vui lòng nhập mã đơn hàng.";
      hasError = true;
    }

    // Kiểm tra email
    if (
      !email.trim() ||
      !/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      tempErrors.email = "Vui lòng nhập email hợp lệ.";
      hasError = true;
    }

    // Kiểm tra OTP nếu đang ở bước xác thực OTP
    if (isOtpStep && (!otp.trim() || otp.length !== 6)) {
      tempErrors.otp = "Mã OTP phải có 6 ký tự.";
      hasError = true;
    }

    setErrors(tempErrors);
    return !hasError;
  };

  const { mutate: sendOtp } = useMutation({
    mutationFn: async () => {
      const response = await instance.post(
        "/search-order",
        {
          order_code: orderCode,
          email: email,
        },
        {
          timeout: 3000,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setShowOtpInput(true); // Hiển thị ô nhập OTP
      toast.success("Mã OTP đã được gửi đến email của bạn.");
    },
    onError: (error: any) => {
      console.error("Có lỗi xảy ra:", error);
      toast.error(error.response?.data?.message || "Gửi OTP thất bại.");
    },
  });

  const { mutate: verifyOtp } = useMutation({
    mutationFn: async () => {
      const response = await instance.post("/verify-otp", {
        order_code: orderCode,
        email: email,
        otp: otp,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setOrder(data.order); // Lưu thông tin đơn hàng
      toast.success("Đã tìm thấy đơn hàng.");
    },
    onError: (error: any) => {
      console.error("Có lỗi xảy ra:", error);
      toast.error(error.response?.data?.message || "Xác thực OTP thất bại.");
    },
  });

  const handleContinue = () => {
    const isValid = validateInputs(false); // Không kiểm tra OTP
    if (!isValid) return;

    sendOtp();
  };

  const handleSearch = () => {
    const isValid = validateInputs(true); // Kiểm tra thêm OTP
    if (!isValid) return;

    verifyOtp();
  };

  const colorKeys = ["color", "colour", "hue", "màu", "màu sắc"];

  return (
    <div className="container bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full my-20 py-10">
      <div className="flex">
        <div className="w-1/2">
          <form className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Mã đơn hàng</h2>
            <p className="text-gray-600 mb-6">(Vui lòng nhập cả chữ và số)</p>
            <div>
              <input
                type="text"
                placeholder="VD: MIXMATCH-674ED2B778397"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  errors.orderCode ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {errors.orderCode && (
                <p className="text-red-500 text-sm mt-1">{errors.orderCode}</p>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Email</h2>
              <input
                type="text"
                placeholder="VD: mix&match2024@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            {/* OTP */}
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
              onClick={showOtpInput ? handleSearch : handleContinue}
              className="w-full my-10 flex items-center justify-center space-x-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-600 transition"
            >
              <p>{showOtpInput ? "TRA CỨU" : "TIẾP TỤC"}</p>
              <p className="mb-[3px]">→</p>
            </button>
          </form>
        </div>
        <div className="w-1/2 justify-items-center">
          <img
            src="https://viettelpost.com.vn/viettelpost-iframe/assets/images/tracking-img.svg"
            alt=""
          />
        </div>
      </div>
      {/* Bảng hiển thị đơn hàng */}
      {order && order.order_details.length > 0 && (
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
                          .map(([key, value]) => {
                            if (
                              colorKeys.includes(key.toLowerCase()) &&
                              colorTranslations[value]
                            ) {
                              return colorTranslations[value];
                            }
                            return value; 
                          })
                          .join(", ")
                      : ""}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {orderDetail.quantity}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {new Intl.NumberFormat("vi-VN").format(orderDetail.price)}₫
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {new Intl.NumberFormat("vi-VN").format(order.total)}₫
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
    </div>
  );
};

export default OrderLookup;
