import React, { useState } from "react";

const OrderLookup = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [orders, setOrders] = useState([]);

  const handleInputChange = (e: any) => {
    setTrackingCode(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Tra cứu mã đơn hàng:", trackingCode);
  };

  return (
    <div className="container bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full my-20 py-10">
      <div className="flex">
        <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">Mã đơn hàng</h2>
        <p className="text-gray-600 mb-6">
          (Vui lòng nhập cả chữ và số)
        </p>
        <form  className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="VD: MIXMATCH-674ED2B778397"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="recaptcha"
              className="mr-2 accent-red-500"
            />
            <label htmlFor="recaptcha" className="text-gray-700">
              Tôi không phải là người máy
            </label>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-600 transition"
          >
            <p>TRA CỨU</p> <p className="mb-[3px]">→</p>
          </button>
        </form>
        </div>
        <div className="w-1/2 justify-items-center">
            <img src="https://viettelpost.com.vn/viettelpost-iframe/assets/images/tracking-img.svg" alt="" />
        </div>

      </div>
       {/* Bảng hiển thị đơn hàng */}
        {/* {orders.length > 0 && ( */}
        <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Kết quả tra cứu</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left">
                Mã đơn hàng
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Tên sản phẩm
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Thuộc tính
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Trạng thái
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Ngày tạo
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.map((order) => ( */}
              <tr 
            //   key={order.id}
              >
                <td className="border border-gray-200 px-4 py-2">
                  {/* {order.id} */}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                    {/* {order.name} */}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                    (<span>Đen, S</span>)  x<span>1</span>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {/* {order.status} */}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {/* {order.date} */}
                </td>
              </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
     {/* )} */}
   </div> 
    
       
    
  );
};

export default OrderLookup;
