/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Select, Table } from "antd";

const ReturnOrder = () => {
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
  console.log("data hoàn hàng admin : ", data);
  const dataSource = Array.isArray(data?.data?.data)
    ? data?.data?.data?.map((value: any) => ({
        key: value.id,
        ...value,
      }))
    : [];

  const column: any = [
    {
      title: "Stt",
      render: (_: any, __: any, index: number) => <div>{index + 1}</div>,
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
      title: "Thao tác",
      fixed: "right",
      render: (record: any) => {
        return (
          <div className="flex gap-2">
            huệ
            {/* <Link to={`${record?.id}`}>
              <Button className="btn-info w-12 flex items-center justify-center">
                <EyeOutlined />
              </Button>
            </Link> */}
            {/* <Link>
              <Button className="  flex items-center justify-center bg-[red] text-white ">
                Yêu cầu hoàn hàng
              </Button>
            </Link> */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          Danh sách yêu cầu hoàn trả hàng
        </h1>
      </div>
      <div className="">
        <Table
          className="custom-table"
          dataSource={dataSource}
          columns={column}
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ReturnOrder;
