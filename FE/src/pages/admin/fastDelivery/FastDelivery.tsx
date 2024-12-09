/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { notifyOrdersChanged, useRealtimeOrders } from "@/common/hooks/useRealtimeOrders";
import instance from "@/configs/axios";
import { EyeOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Select, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FastDelivery = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: ["ghn_get_order"],
    queryFn: async () => {
      try {
        return await instance.get("/ghn_get_order");
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });
  useRealtimeOrders();
  const orStatus: Record<number, string> = {
    1: "Đang giao hàng",
    2: "Giao hàng thành công",
  };

  const dataGhn = data?.data?.order;

  const handleUpdateStatus = async (orderId: number, status: string) => {
    try {
      const statusId = Object.keys(orStatus).find(
        (key) => orStatus[Number(key)] === status
      );

      const response = await instance.post(`/ghn_update_order`, {
        order_id: orderId,
        order_status: Number(statusId),
      });
      queryClient.invalidateQueries({ queryKey: ["ghn_get_order"] });
      toast.success("Cập nhật trạng thái thành công");
      notifyOrdersChanged();
    } catch (error) {
      console.error("Cập nhật trạng thái thất bại:", error);
    }
  };

  console.log("data giao hàng nhanh: ", data);

  const dataSource = dataGhn
    ? dataGhn?.map((item: any) => ({
        key: item?.id,
        ...item,
      }))
    : [];
  const columns: any = [
    {
      title: "Stt",
      render: (_: any, __: any, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "user_name",
    },
    {
      title: "Tên sản phẩm",
      render: (record: any) => (
        <div>
          {record.order_details?.map((value: any, index: any) => (
            <div key={index}>{value.product_name}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "order_code",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment_method_id",
      render: (method: number | undefined) => {
        if (typeof method !== "number") return "";
        return method === 1 ? "Thanh toán khi nhận hàng" : "Thanh toán online";
      },
    },
    {
      title: "Trạng thái giao hàng nhanh",
      render: (record: any) => (
        <div className="w-full">
          <Select
            value={record.order_status}
            onChange={(value: any) => handleUpdateStatus(record.id, value)}
            className="w-full"
          >
            {Object.entries(orStatus).map(([key, label]) => (
              <Select.Option key={key} value={label}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </div>
      ),
    },

    {
      title: "Thao tác",
      fixed: "right",
      render: (record: any) => {
        return (
          <div className="flex gap-2">
            <Link to={`/admin/orders/${record?.id}`}>
              <Button className="btn-info w-12 flex items-center justify-center">
                <EyeOutlined />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="p-6 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Giao hàng nhanh
          </h1>
        </div>
        <div>
          <Table
            className="custom-table"
            scroll={{ x: "max-content" }}
            dataSource={dataSource.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
            columns={columns}
            pagination={false}
          />
          {/* {isFetching ? (
            <Loading />
          ) : (
            <>
             
            </>
          )} */}
        </div>
      </div>
    </>
  );
};

export default FastDelivery;
