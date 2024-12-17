import React from "react";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const VoucherDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["vouchers", id],
    queryFn: async () => {
      try {
        return await instance.get(`/vouchers/${id}`);
      } catch (error) {
        throw new Error("Error");
      }
    },
  });

  const voucher = data?.data?.data?.voucher;
  const meta_data = data?.data?.data?.meta_data;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center p-10">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 transform hover:scale-105 transition-transform duration-300">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 border-b-2 border-indigo-500 pb-4">
          {voucher.title}
        </h1>

        {/* Voucher Code Card */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-8 text-white shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Mã giảm giá
          </h2>
          <p className="text-6xl font-extrabold text-center tracking-wider">
            {voucher.code}
          </p>
          <div className="flex justify-between mt-6 text-lg font-medium">
            <div>
              <span className="block font-bold">Giảm: </span>
              <span>
                {voucher.discount_value}{" "}
                {voucher.discount_type === "fixed" ? "VNĐ" : "%"}
              </span>
            </div>
            <div>
              <span className="block font-bold">Từ </span>
              <span>{dayjs(voucher.start_date).format("DD/MM/YYYY")}</span>
            </div>
            <div>
              <span className="block font-bold">Đến</span>
              <span>{dayjs(voucher.end_date).format("DD/MM/YYYY")}</span>
            </div>
          </div>
        </div>

        {/* Voucher Information */}
        <div className="space-y-4">
          {/* <h3 className="text-2xl font-semibold text-gray-700">
            {voucher.title}
          </h3> */}
          <p className="text-gray-600">
            <strong>Mô tả: </strong> {voucher.description}
          </p>
          <p className="text-gray-600">
            <strong>Giá trị đơn hàng tối thiểu: </strong>
            {new Intl.NumberFormat("vi-VN").format(
              voucher.min_order_value
            )} VNĐ
          </p>
          <p className="text-gray-600">
            <strong>Số lượng: </strong>
            {voucher.usage_limit}
          </p>
          <p className="text-gray-600">
            <strong>Đã sử dụng: </strong>
            {voucher.used_count}
          </p>
          <p className="text-gray-600">
            <strong>Số lượng chưa sử dụng: </strong>
            {voucher.usage_limit - voucher.used_count > 0
              ? voucher.usage_limit - voucher.used_count
              : "Out of Stock"}
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            Đối tượng áp dụng giảm giá
          </h3>
          {meta_data?.length === 0 ? (
            <p className="text-gray-500 italic">
              Không có đối tượng nào được áp dụng voucher này!!!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meta_data.map((value: any, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 border-l-4 border-indigo-500 rounded-lg shadow-sm"
                >
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {value.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {value.items?.map((name: any, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm"
                      >
                        {name?.name}
                      </span>
                    ))}
                    {value.max_discount_amount && (
                      <span className="px-3 py-1 bg-indigo-300 text-indigo-800 rounded-full text-sm">
                        {new Intl.NumberFormat("vi-VN").format(
                          value.max_discount_amount
                        )}{" "}
                        VNĐ
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherDetail;
