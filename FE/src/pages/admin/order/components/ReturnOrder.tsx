/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRealtimeOrders } from "@/common/hooks/useRealtimeOrders";
import Loading from "@/common/Loading/Loading";
import instance from "@/configs/axios";
import { EyeOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Pagination, Select, Table } from "antd";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ReturnOrder = () => {
  const queryClient = useQueryClient();
  const initialPage = queryClient.getQueryData(["currentPage"]) || 1;
  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  const [pageSize] = useState(5);
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["return-requests"],
    queryFn: async () => {
      try {
        return await instance.get(`/return-requests`);
      } catch (error) {
        throw Error("Có lỗi khi lấy dữ liệu");
      }
    },
  });

  console.log("data hoàn hàng admin : ", data);

  const dataSource = Array.isArray(data?.data?.data)
    ? data?.data?.data?.map((value: any) => ({
        key: value.id,
        ...value,
      }))
    : [];
  console.log("data trả hàng 9999 : ", dataSource);

  const column: any = [
    {
      title: "Stt",
      render: (__: any, _: any, index: number) => (
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
          {record?.items?.map((item: any, index: any) => (
            <div key={index}>{item?.order?.order_detail?.product_name}</div>
          ))}
        </div>
      ),
    },

    {
      title: "Trạng thái xử lí",
      dataIndex: "status",
    },
    {
      title: "Lí do hoàn hàng",
      dataIndex: "reason",
    },

    {
      title: "Thao tác",
      fixed: "right",
      render: (record: any) => {
        return (
          <Link to={`/admin/return-item/${record?.id}`}>
            <Button
              className={` ${
                dataSource?.status === "pending"
                  ? "bg-red-500 text-white"
                  : "bg-green-400"
              }`}
            >
              Xử lí yêu cầu hoàn hàng
            </Button>
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
        const pusher = new Pusher("4d3e0d70126f2605977e", {
          cluster: "ap1",
        });
    
        const channel = pusher.subscribe("orders");
        pusher.connection.bind("connected", () => {
          console.log("Connected to Pusher!");
        });
        channel.bind("order.updated", (newOrder: any) => {
          queryClient.invalidateQueries({ queryKey: ["return-requests"] });
        });
    
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      }, [queryClient]);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 uppercase">
          Danh sách yêu cầu hoàn trả hàng
        </h1>
      </div>

      {/* {isFetching ? (
        <Loading />
      ) : ( */}
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
          <div className="mt-4 flex justify-end">
            <Pagination
              current={currentPage}
              total={dataSource.length}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
        
      {/* )} */}
    </div>
  );
};

export default ReturnOrder;
