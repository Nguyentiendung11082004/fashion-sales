/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GetReturnRequestOrderId = () => {
  const location = useLocation();
  const order_id = location?.state.order_id;
  console.log("keiemr tra order_id ", order_id);
  const { token } = useAuth();
  const { data: dataReturnRequest } = useQuery({
    queryKey: ["return-requests"],
    queryFn: async () => {
      try {
        return await instance.get(`user/return-requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });
  const returnRequest = dataReturnRequest?.data?.data?.find(
    (item: any) => Number(item.order_id) === Number(order_id)
  );

  console.log("returnRequest", returnRequest);

  const dataSource = returnRequest?.items
    ? returnRequest.items.map((item: any, index: number) => ({
        key: item.id,
        productName: item.name,
        image: item.image,
        quantity: item.quantity,
        status: returnRequest.status,
      }))
    : [];

  console.log("data trả hàng: ", dataSource);

  const column: any = [
    {
      title: "Stt",
      render: (_: any, __: any, index: number) => <div>{index + 1}</div>,
    },
    {
      title: "Tên sản phẩm",
      render: (record: any) => <div>{record.productName}</div>,
    },
    {
      title: "Ảnh sản phẩm",
      render: (record: any) => <img src={record.image} alt="Product" />,
    },
    {
      title: "Số lượng",
      render: (record: any) => <div>{record.quantity}</div>,
    },
    // {
    //   title: "Trạng thái",
    //   render: (record: any) => <div>{record.status}</div>, // Render status
    // },
  ];

  console.log("token nè : ", token);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (data: {
      return_request_id: number;
      cancel_items: number[];
    }) => {
      const { return_request_id, cancel_items } = data;
      await instance.post(
        "return-requests/cancel",
        {
          return_request_id,
          cancel_items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history_order"] });
      toast.success("Hủy yêu cầu hoàn hàng thành công");
      navigate("/history-order");
    },
    onError: () => {
      toast.error("Hủy thất bại");
    },
  });

  const cancelReturnRequest = (id: number, cancelItems: number[] = []) => {
    mutate({
      return_request_id: id,
      cancel_items: cancelItems,
    });
  };

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
                    Lí do hoàn hàng
                  </h2>
                </div>
              </div>

              <div className="text-gray-600 text-center lg:text-left mt-4 lg:mt-0">
                <p className="text-sm lg:text-base">{returnRequest?.reason}</p>
              </div>
            </div>

            <div className="space-y-4 mb-[100px]">
              <h2 className="ml-4 text-lg lg:text-xl font-semibold text-gray-800">
                Sản phẩm đã chọn:
              </h2>

              <Table
                className="custom-table"
                dataSource={dataSource}
                columns={column}
                scroll={{ x: "max-content" }}
                pagination={false}
              />

              <div className="fixed bottom-0 left-[134px] right-[134px] flex justify-between items-center p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-2">
                  <p className="ml-4 text-sm font-medium text-gray-800">
                    Số tiền hoàn lại: 100.000
                    {/* {refund.toLocaleString("vi-VN")} */}
                    VNĐ
                  </p>
                </div>
                <button
                  className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md px-6 py-2"
                  onClick={() => cancelReturnRequest(returnRequest?.id)}
                >
                  Hủy yêu cầu
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default GetReturnRequestOrderId;
