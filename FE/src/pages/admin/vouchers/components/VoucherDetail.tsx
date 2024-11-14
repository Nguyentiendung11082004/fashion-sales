/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import instance from "@/configs/axios";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import dayjs from "dayjs";
// const VoucherDetail = () => {
//   const { id } = useParams();
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["vouchers", id],
//     queryFn: async () => {
//       try {
//         return await instance.get(`/vouchers/${id}`);
//       } catch (error) {
//         throw new Error("Error");
//       }
//     },
//   });
//   const { data: dataProducts } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       try {
//         return await instance.get(`/products`);
//       } catch (error) {
//         throw new Error("Error");
//       }
//     },
//   });

//   console.log("dataProduct: ", dataProducts);

//   console.log("data detail", data);
//   const voucher = data?.data?.data?.voucher;
//   const meta_data = data?.data?.data?.meta_data;
//   console.log("voucher:", voucher);
//   console.log("meta_data:", meta_data);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>{error.message}</div>;
//   return (
//     <>
//       <div className="p-6 min-h-screen">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
//             Chi tiết voucher
//           </h1>
//         </div>
//         <div className="flex ">
//           <>
//             <div className="relative w-[600px] h-[300px] bg-yellow-300 rounded-lg shadow-lg overflow-hidden">
//               <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-16 flex items-center justify-center rounded-t-lg">
//                 <h2 className="text-white text-2xl font-bold">
//                   Voucher giảm giá
//                 </h2>
//               </div>

//               <div className="flex flex-col items-center mt-10 h-full">
//                 <p className="text-gray-700 text-lg mb-2">Mã giảm giá:</p>
//                 <span className="text-4xl font-bold text-yellow-600 bg-white p-3 rounded-lg shadow-md">
//                   {voucher.code}
//                 </span>
//               </div>

//               <div className="absolute bottom-0 left-0 w-full h-16 bg-yellow-200 flex items-center justify-between px-6">
//                 <span className="text-sm font-semibold text-gray-600">
//                   Giảm: <span>{voucher.discount_value}</span>
//                   <span>{voucher.discount_type == "fixed" ? "VNĐ" : "%"}</span>
//                 </span>
//                 <span className="text-sm font-semibold text-gray-600">
//                   Từ
//                   <span>
//                     {dayjs(voucher.start_date).format(" DD/MM/YYYY HH:mm:ss ")}
//                   </span>
//                   đến
//                   <span>
//                     {dayjs(voucher.end_date).format(" DD/MM/YYYY HH:mm:ss ")}
//                   </span>
//                 </span>
//               </div>
//             </div>
//             <div className="ml-[100px] w-[50%] ">
//               <h1 className="font-bold text-2xl mb-2">{voucher.title}</h1>
//               <h2 className="mb-2">
//                 <span className="font-bold text-base">Mô tả: </span>
//                 <span className="text-base">{voucher.description}</span>
//               </h2>
//               <h2 className="text-base mb-2">
//                 <span className="font-bold">
//                   Giá trị đơn hàng tối thiểu để giảm giá:
//                 </span>
//                 <span>
//                   {new Intl.NumberFormat("vi-VN").format(
//                     voucher.min_order_value
//                   )}{" "}
//                   VNĐ
//                 </span>
//               </h2>
//               <h2 className="text-base mb-2">
//                 <span className="font-bold">Số lượng:</span>
//                 <span> {voucher.usage_limit}</span>
//               </h2>
//               <h2 className="text-base mb-2">
//                 <span className="font-bold">Đã sử dụng:</span>
//                 <span> {voucher.used_count}</span>
//               </h2>
//               <h2 className="text-base mb-2">
//                 <span className="font-bold">Số lượng chưa sử dụng: </span>
//                 <span>
//                   {Number(voucher.usage_limit) - Number(voucher.used_count) ===
//                   0
//                     ? " Đã hết"
//                     : Number(voucher.usage_limit) - Number(voucher.used_count)}
//                 </span>
//               </h2>
//               <span className="font-bold">Đối tượng áp dụng giảm giá: </span>
//               <div className="">
//                 {meta_data?.length === 0 ? (
//                   <p>Không có đối tượng nào được áp dụng voucher này!!!</p>
//                 ) : (
//                   meta_data.map((value: any, index: number) => (
//                     <div
//                       key={index}
//                       className="p-4 bg-white border border-gray-300 rounded-lg shadow-md mt-2"
//                     >

//                       <h2 className="text-base font-bold">{value.name}</h2>
//                       <div className="grid grid-cols-4 gap-2 mt-2">

//                         {value.item_names?.map(
//                           (name: any, nameIndex: number) => (
//                             <div
//                               key={nameIndex}
//                               className="flex items-center justify-center p-2 bg-yellow-100 border border-yellow-300 rounded-lg text-center text-sm"
//                             >
//                               {name}
//                             </div>
//                           )
//                         )}
//                         {value.max_discount_amount && (
//                           <div className="flex items-center justify-center p-2 bg-yellow-100 border border-yellow-300 rounded-lg text-center text-sm">
//                             {value.max_discount_amount}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </>
//         </div>
//       </div>
//     </>
//   );
// };

// export default VoucherDetail;

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
            {new Intl.NumberFormat("vi-VN").format(voucher.min_order_value)} VNĐ
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
                    {value.item_names?.map((name: any, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm"
                      >
                        {name}
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
