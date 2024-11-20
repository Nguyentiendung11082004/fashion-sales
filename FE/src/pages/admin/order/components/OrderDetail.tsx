// /* eslint-disable @typescript-eslint/no-explicit-any */
// import instance from "@/configs/axios";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// const OrderDetail = () => {
//   const { id } = useParams();
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["order-status", id],
//     queryFn: async () => {
//       try {
//         return await instance.get(`/order-status/${id}`);
//       } catch (error) {
//         throw new Error("Error");
//       }
//     },
//   });
//   const dataOrderDetail = data?.data;
//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>{error.message}</div>;
//   return (
//     <>
//       <div className="p-6 min-h-screen">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
//             Chi tiết đơn hàng
//           </h1>
//         </div>

//         <div className="bg-gray-100 p-6 rounded-lg mb-6">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">
//             Thông tin đơn hàng
//           </h3>
//           <div className="space-y-3">
//             <div className="text-gray-700">
//               <strong>Mã đơn hàng:</strong> {dataOrderDetail?.order?.order_code}
//             </div>
//             <div className="text-gray-700">
//               <strong>Trạng thái đơn hàng: </strong>
//               {dataOrderDetail?.order?.order_status}
//             </div>
//             <div className="text-gray-700">
//               <strong>Tổng số lượng: </strong>
//               {dataOrderDetail?.order?.total_quantity}
//             </div>
//             <div className="text-gray-700">
//               <strong>Tổng tiền: </strong>
//               {new Intl.NumberFormat("vi-VN").format(
//                 parseInt(dataOrderDetail?.order?.total)
//               )}
//               <span> VNĐ</span>
//             </div>
//             <div className="text-gray-700">
//               <strong>Phương thức thanh toán: </strong>
//               {dataOrderDetail?.order?.payment_status}
//             </div>
//             <div className="text-gray-700">
//               <strong>Giao đến: </strong>
//               {dataOrderDetail?.order?.user_address}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg mb-6">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">
//             Thông tin người dùng
//           </h3>
//           <div className="space-y-3">
//             <div className="text-gray-700">
//               <strong>Tên người dùng: </strong>
//               {dataOrderDetail?.order?.user_name}
//             </div>
//             <div className="text-gray-700">
//               <strong>Email: </strong>
//               {dataOrderDetail?.order?.user_email}
//             </div>
//             <div className="text-gray-700">
//               <strong>Số điện thoại: </strong>
//               {dataOrderDetail?.order?.user_phonenumber}
//             </div>
//             <div className="text-gray-700">
//               <strong>Địa chỉ: </strong>
//               {dataOrderDetail?.order?.user_address}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">
//             Sản phẩm trong đơn hàng
//           </h3>
//           <div className="space-y-6">
//             {dataOrderDetail?.order_details?.map((value: any) => (
//               <div className="flex items-center space-x-6">
//                 <img
//                   className="w-24 h-24 object-cover rounded-lg"
//                   src={value?.product_img}
//                   alt="Sản phẩm đơn 1"
//                 />
//                 <div className="flex flex-col space-y-2">
//                   <div className="text-gray-700">
//                     <strong>Tên sản phẩm: </strong>
//                     {value?.product_name}
//                   </div>
//                   <div className="text-gray-700">
//                     <strong>Số lượng: </strong>
//                     {value?.quantity}
//                   </div>
//                   <div className="text-gray-700">
//                     <strong>Giá: </strong>
//                     {new Intl.NumberFormat("vi-VN").format(
//                       parseInt(value?.price)
//                     )}
//                     <span> VNĐ</span>
//                   </div>
//                   <div className="text-gray-700">
//                     <strong>Tổng tiền: </strong>
//                     {new Intl.NumberFormat("vi-VN").format(
//                       parseInt(value?.total_price)
//                     )}
//                     <span> VNĐ</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderDetail;
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
            <span className="font-semibold">Mã đơn hàng:</span>{" "}
            {dataOrderDetail?.order?.order_code}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Trạng thái:</span>{" "}
            {dataOrderDetail?.order?.order_status}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Tổng số lượng:</span>{" "}
            {dataOrderDetail?.order?.total_quantity}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Tổng tiền:</span>{" "}
            {new Intl.NumberFormat("vi-VN").format(
              parseInt(dataOrderDetail?.order?.total)
            )}{" "}
            VNĐ
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Phương thức thanh toán:</span>{" "}
            {dataOrderDetail?.order?.payment_status}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Giao đến:</span>{" "}
            {dataOrderDetail?.order?.user_address}
          </div>
        </div>
      </div>

      {/* User Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
          Thông tin Người dùng
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-gray-700">
            <span className="font-semibold">Tên:</span>{" "}
            {dataOrderDetail?.order?.user_name}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Email:</span>{" "}
            {dataOrderDetail?.order?.user_email}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Số điện thoại:</span>{" "}
            {dataOrderDetail?.order?.user_phonenumber}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Địa chỉ:</span>{" "}
            {dataOrderDetail?.order?.user_address}
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
                    <strong>Giá:</strong>{" "}
                    {new Intl.NumberFormat("vi-VN").format(
                      parseInt(product?.price)
                    )}{" "}
                    VNĐ
                  </div>
                  <div className="text-gray-600">
                    <strong>Tổng tiền:</strong>{" "}
                    {new Intl.NumberFormat("vi-VN").format(
                      parseInt(product?.total_price)
                    )}{" "}
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
