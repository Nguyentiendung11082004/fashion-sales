/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Table } from "antd";
import Pusher from "pusher-js";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GetReturnRequestOrderId = () => {
  const location = useLocation();
  const request_id = location?.state.id;
  const { token } = useAuth();

  const { data: dataReturnRequest } = useQuery({
    queryKey: ["return-item"],
    queryFn: async () => {
      try {
        return await instance.get(`user/return-item/${request_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });
  console.log("dataReturnRequest: ", dataReturnRequest);
  const dataSource = dataReturnRequest?.data?.data?.items
    ? dataReturnRequest?.data?.data?.items.map((item: any, index: number) => ({
        key: item?.id,
        ...item,
      }))
    : [];

  const columns: any = [
    {
      title: "STT",
      render: (_: any, __: any, index: number) => <div>{index + 1}</div>,
    },
    {
      title: "Tên sản phẩm",
      render: (record: any) => (
        <div>{record?.order?.order_detail?.product_name}</div>
      ),
    },
    {
      title: "Ảnh sản phẩm",
      render: (record: any) => (
        <img
          className="w-[100px] h-[100px] m-auto object-fit object-cover"
          src={record?.order?.order_detail?.product_img}
          alt="Ảnh sản phẩm"
        />
      ),
    },
    {
      title: "Phân loại sản phẩm",
      render: (record: any) => {
        const attributes = record?.order?.order_detail?.attributes;
        return attributes && typeof attributes === "object" ? (
          Object.entries(attributes).map(([key, value]: [string, any]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))
        ) : (
          <div>Không có phân loại</div>
        );
      },
    },
    {
      title: "Số lượng",
      render: (record: any) => <div>{record?.quantity || 0}</div>,
    },
    {
      title: "Trạng thái hoàn hàng",
      render: (record: any) => {
        const getStatus = (status: string) => {
          switch (status) {
            case "approved":
              return "Chấp nhận";
            case "canceled":
              return "Đã hủy";
            case "pending":
              return "Đang chờ xử lý";
            case "rejected":
              return "Bị từ chối";
            default:
              return "Không xác định";
          }
        };

        return <div>{getStatus(record?.status)}</div>;
      },
    },
  ];
  // Tính tổng số tiền
  const totalAmount = dataSource.reduce(
    (sum: number, record: any) =>
      sum + Number(record?.order?.order_detail?.total_price || 0),
    0
  );

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

  console.log("huệ : ", dataSource?.data?.data?.status);

  useEffect(() => {
    const pusher = new Pusher("4d3e0d70126f2605977e", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("orders");
    pusher.connection.bind("connected", () => {
      console.log("Connected to Pusher!");
    });
    channel.bind("order.updated", (newOrder: any) => {
      queryClient.invalidateQueries({ queryKey: ["return-item"] });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [queryClient]);

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
                <p className="text-sm lg:text-base">
                  {dataReturnRequest?.data?.data?.reason}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-[100px]">
              <h2 className="ml-4 text-lg lg:text-xl font-semibold text-gray-800">
                Sản phẩm đã chọn:
              </h2>

              <Table
                className="custom-table"
                dataSource={dataSource}
                columns={columns}
                scroll={{ x: "max-content" }}
                pagination={false}
              />

              <div className="fixed bottom-0 left-[134px] right-[134px] flex justify-between items-center p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-2">
                  <p className="ml-4 text-sm font-medium text-gray-800">
                    <span> Số tiền hoàn lại: </span>
                    {dataReturnRequest?.data?.data?.total_refund_amount ? (
                      <>
                        {dataReturnRequest.data.data.total_refund_amount &&
                          `${new Intl.NumberFormat("vi-VN").format(dataReturnRequest.data.data.total_refund_amount)} ₫`}
                      </>
                    ) : (
                      <>
                        {totalAmount.toLocaleString("vi-VN")}
                        <span> ₫</span>
                      </>
                    )}
                  </p>
                </div>

                {dataReturnRequest?.data?.data?.status === "pending" && (
                  <button
                    className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md px-6 py-2"
                    onClick={() =>
                      cancelReturnRequest(dataReturnRequest?.data?.data?.id)
                    }
                  >
                    Hủy yêu cầu
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default GetReturnRequestOrderId;
