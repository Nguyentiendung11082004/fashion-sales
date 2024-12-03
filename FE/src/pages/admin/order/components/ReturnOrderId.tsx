/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import instance from "@/configs/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, Table } from "antd";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ReturnOrderId = () => {
  const queryClient = useQueryClient();
  const initialPage = queryClient.getQueryData(["currentPage"]) || 1;
  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  const [pageSize] = useState(5);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["return-requests"],
    queryFn: async () => {
      try {
        return await instance.get(`/return-requests`);
      } catch (error) {
        throw Error("Có lỗi khi lấy dữ liệu");
      }
    },
  });

  const { id } = useParams();
  const returnRequest = data?.data?.data?.find(
    (item: any) => Number(item.id) === Number(id)
  );
  const status = {
    pending: "Đang đợi xử lí",
    approved: "Chấp nhận",
    rejected: "Từ chối",
  };

  const dataSource = Array.isArray(returnRequest?.items)
    ? returnRequest?.items.map((value: any) => ({
        key: value.id,
        ...value,
      }))
    : [];

  const { token } = useAuth();
  const handleUpdateStatus = async (itemId: number, status: string) => {
    try {
      const data = { reason: "", status };
      const response = await instance.post(
        `/return-items/status/${itemId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["return-requests"] });
        toast.success("Đã xử lí yêu cầu!");
      } else {
        const errorMessage = response.data?.message;
        toast.error(errorMessage || "Có lỗi xảy ra!");
      }
    } catch (error: any) {
      console.log("error: ", error.message);
      toast.error("Lỗi khi cập nhật trạng thái yêu cầu hoàn trả!");
    }
  };

  const column: any = [
    {
      title: "Stt",
      render: (__: any, _: any, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
      ),
    },

    {
      title: "Tên sản phẩm",
      render: (record: any) => (
        <div>
          <div>{record?.product?.name}</div>
        </div>
      ),
    },
    {
      title: "Ảnh sản phẩm",
      render: (record: any) => (
        <div>
          <div>{record?.product?.image}</div>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Xử lí",
      render: (record: any) => (
        <div className="w-full">
          <Select
            value={record?.status}
            onChange={(value: string) => handleUpdateStatus(record?.id, value)}
            className="w-full"
          >
            {Object.entries(status).map(([key, label]) => (
              <Select.Option key={key} value={key}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          Yêu cầu hoàn trả
        </h1>
      </div>
      <div className="">
        <Table
          className="custom-table"
          dataSource={dataSource.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          columns={column}
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ReturnOrderId;
