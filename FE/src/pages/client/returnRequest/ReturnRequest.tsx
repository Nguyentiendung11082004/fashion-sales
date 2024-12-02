/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReturnRequest = () => {
  const location = useLocation();
  const items = location.state?.items;
  const reasonReturn = location.state?.reasonFromState;
  const dataOrder = location.state?.dataOrder;

  console.log("kiểm tra items: ", items);
  console.log("kiểm tra dataOrder: ", dataOrder);
  console.log("kiểm tra reasonReturn: ", reasonReturn);

  const filteredProduct = dataOrder.order_details?.filter((product: any) =>
    items.some((item: any) => item.order_detail_id === product.id)
  );
  const navigate = useNavigate();

  console.log("sp đã lọc: ", filteredProduct);

  const updatedProducts = filteredProduct.map((product: any) => {
    const item = items.find((i: any) => i.order_detail_id === product.id);
    if (item) {
      return {
        ...product,
        quantity: item.quantity,
      };
    }
    return product;
  });
  const { token } = useAuth();
  const { mutate } = useMutation({
    mutationFn: async (request: any) => {
      return await instance.post(`return-requests/create`, request, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Đã yêu cầu trả tiền hoàn hàng");
      setCheckRequest(true);
      navigate(`/history-order`, { state: { checkRequest } });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Yêu cầu hoàn hàng thất bại";
      console.log("Lỗi khi hoàn hàng:", errorMessage);
      toast.error(errorMessage);
    },
  });

  const [checkRequest, setCheckRequest] = useState<boolean>(false);

  const handleContinue = () => {
    const items = updatedProducts.map((item: any) => ({
      order_detail_id: item.id,
      quantity: item.quantity,
    }));

    const request = {
      order_id: dataOrder?.id,
      items,
      reason: reasonReturn,
    };

    mutate(request);
  };

  const [refund, setRefund] = useState<number>(0);

  useEffect(() => {
    // Calculate total refund
    const totalRefund = updatedProducts.reduce((acc: number, product: any) => {
      return acc + product.price * product.quantity;
    }, 0);
    setRefund(totalRefund); // Set the calculated refund amount
  }, [updatedProducts]); // Recalculate when updatedProducts changes

  console.log("sp đã cập nhật số lượng: ", updatedProducts);

  return (
    <>
      <div className="mb-20px">
        <section className="w-full">
          <div className="hd-page-head">
            <div className="hd-header-banner bg-no-repeat bg-cover bg-center">
              <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
                <div className="z-[100] relative hd-container text-white">
                  <h1 className="text-xl font-medium leading-5 mb-3">
                    Yêu cầu trả hàng hoàn tiền
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container max-w-4xl m-auto mt-8">
          <section className="hd-page-body text-[14px] lg:mt-[60px] mt-[30px] block m-0 p-0 border-0 isolate *:box-border">
            <div className="lg:flex-row justify-between items-center lg:items-start font-medium text-xl lg:text-2xl mb-8 text-gray-800 bg-white p-6 rounded-lg shadow-xl">
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full mb-6">
                <div className="flex-shrink-0 text-center lg:text-left mb-4 lg:mb-0">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
                    Tình huống bạn đang gặp?
                  </h2>
                </div>
              </div>

              <div className="text-gray-600 text-center lg:text-left mt-4 lg:mt-0">
                <p className="text-sm lg:text-base">{reasonReturn}</p>
              </div>
            </div>

            <div className="space-y-4 mb-[100px]">
              <h2 className="ml-4 text-lg lg:text-xl font-semibold text-gray-800">
                Sản phẩm đã chọn:
              </h2>
              {updatedProducts?.map((value: any, index: number) => (
                <div
                  key={value.id}
                  className="flex justify-between items-center p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-6">
                    <Link
                      to={`/products/${value?.product_id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={
                          value.product_img || "https://via.placeholder.com/100"
                        }
                        alt={value.product_name}
                        className="w-[100px] h-[100px] object-cover rounded-lg border border-gray-300"
                      />
                    </Link>

                    <div className="text-sm font-medium text-gray-800">
                      <Link
                        to={`/products/${value?.product_id}`}
                        className="text-lg font-semibold text-gray-900 hover:underline"
                      >
                        {value.product_name}
                      </Link>
                      <div className="mt-2 space-y-1 text-gray-600">
                        <span>Phân loại: </span>
                        {value.attributes &&
                          Object.entries(value.attributes).map(
                            ([key, val]: any) => (
                              <span key={key} className="capitalize mr-2">
                                {key} {val}
                              </span>
                            )
                          )}
                      </div>
                      <span className="block mt-2 text-base">
                        Số lượng: <span>{value?.quantity}</span>
                      </span>
                      <span className="block mt-2 text-base">
                        Giá: {Number(value.price).toLocaleString("vi-VN")} VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-2">
                <h2 className=" ml-4 pb-4 text-lg lg:text-xl font-semibold text-gray-800">
                  Thông tin hoàn tiền
                </h2>
                <span className="text-base mb-4 ml-4">
                  Số tiền hoàn lại: {refund.toLocaleString("vi-VN")} VNĐ
                </span>
                <br />
                <span className="text-base pb-4 ml-4">Hoàn tiền vào: ???</span>
              </div>

              <div className="fixed bottom-0 left-[134px] right-[134px] flex justify-between items-center p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-2">
                  <p className="ml-4 text-sm font-medium text-gray-800">
                    Số tiền hoàn lại: {refund.toLocaleString("vi-VN")} VNĐ
                  </p>
                </div>
                <button
                  className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md px-6 py-2"
                  onClick={handleContinue}
                >
                  Hoàn thành
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ReturnRequest;
