/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notifyOrdersChanged, useRealtimeOrders } from "@/common/hooks/useRealtimeOrders";
import Loading from "@/common/Loading/Loading";
import { IOrder } from "@/common/types/order";
import { IVouchers } from "@/common/types/vouchers";
import instance from "@/configs/axios";
import { EyeOutlined, SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { DatePickerProps, GetProps } from "antd";
import { Button, DatePicker, Pagination, Select } from "antd";
import Table, { ColumnType } from "antd/es/table";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const OrderPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [hasError, setHasError] = useState(false);
  const [rangeValue, setRangeValue] = useState<any>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState<any>({
    statuses: [],
    filter_end_date: null,
    filter_start_date: null,
    filter_type: "ranger",
    filter_value: new Date().toISOString().split("T")[0],
  });
  const [dataFilter, setDataFilter] = useState<any>([]);
  const handleSearch = async () => {
    try {
      const res = await instance.post(`/order/search`, filter);
      setDataFilter(res?.data.data);
      setIsSearching(true); // Bật trạng thái tìm kiếm
    } catch (err) {
      console.error('Search error:', err);
    }
  };
  const handleCancelSearch = () => {
    setDataFilter([]);
    setFilter({
      statuses: [],
      filter_end_date: null,
      filter_start_date: null,
      filter_type: 'ranger',
      filter_value: new Date().toISOString().split('T')[0],
    });
    setRangeValue([]); // Clear RangePicker UI
    setCurrentPage(1); // Nhảy về trang 1
    setIsSearching(false); // Tắt trạng thái tìm kiếm
  };
  // const handleClearFilter = () => {
  //   setRangeValue([]); // Clear giá trị UI của RangePicker
  //   setFilter({
  //     filter_type: 'range',
  //     filter_start_date: null,
  //     filter_end_date: null,
  //   }); // Reset bộ lọc
  //   setDataFilter([]); // Xóa kết quả tìm kiếm
  //   setCurrentPage(1); // Quay về trang đầu tiên
  // };
  const filterRange = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('filterRange: ', value);
  };
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["order-status"],
    queryFn: async () => {
      try {
        return await instance.get(`/order-status`);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    
  });
  const dataOrder = data?.data?.data;

  useRealtimeOrders();

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const prinfOrderAll = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/pdf-order", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Không thể tải PDF");
      }

      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      setPdfUrl(blobUrl);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi khi tải PDF");
    }
  };

  const prinfOrderId = async (order_id: any) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/pdf-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_ids: [order_id] }),
      });

      if (!response.ok) {
        throw new Error("Không thể tải PDF");
      }

      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      setPdfUrl(blobUrl);
    } catch (error: any) {
      console.error(error);
      toast.error("Có lỗi khi tải PDF");
    }
  };

  const queryClient = useQueryClient();


  const orStatus = {
    1: "Đang chờ xác nhận",
    2: "Đã xác nhận",
    3: "Đã hủy",
    4: "Đang vận chuyển",
    5: "Giao hàng thành công",
    6: "Yêu cầu hoàn trả hàng",
    7: "Hoàn trả hàng",
    8: "Hoàn thành",
  };
  const handleUpdateStatus = async (orderId: number, status: string) => {
    try {
      const response = await instance.put(`/order-status/${orderId}`, {
        order_status: status,
      });

      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["order-status"] });

        toast.success("Cập nhật trạng thái đơn hàng thành công!");
        notifyOrdersChanged();
      } else {
        const errorMessage = response.data?.message;
        toast.error(errorMessage);
      }
    } catch (error: any) {
      if (error.response) {
        queryClient.invalidateQueries({ queryKey: ["order-status"] });

        const errorMessage = error.response.data?.message;
        toast.error(errorMessage);
      }
    }
  };



  const dataSource =
    dataOrder
      ? dataOrder?.map((item: IOrder) => ({
        key: item?.id,
        ...item,
      }))
      : [];
  const dataSourceSearch = dataFilter
    ? dataFilter?.map((item: IOrder) => ({
        key: item?.id,
        ...item,
      }))
    : [];

  const columns: ColumnType<IOrder>[] = [
    {
      title: "STT",
      render: (_, __: any, index: number) => (
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
      title: "Trạng thái đơn hàng",
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
      render: (record: IVouchers) => {
        return (
          <div className="flex gap-2">
            <Link to={`${record?.id}`}>
              <Button className="btn-info w-12 flex items-center justify-center">
                <EyeOutlined />
              </Button>
            </Link>
            {/* <Link>
              <Button className="  flex items-center justify-center bg-[red] text-white ">
                Yêu cầu hoàn hàng
              </Button>
            </Link> */}
            <Button
              className="btn-info  flex items-center justify-center"
              onClick={() => prinfOrderId(record?.id)}
            >
              Xuất hóa đơn
            </Button>
            {pdfUrl && (
              <>
                <div className="fixed inset-0 bg-gray-800 opacity-50 z-10"></div>

                <div className="fixed inset-0 flex justify-center items-center z-20">
                  <div className="w-full max-w-3xl bg-gray-100 border rounded-lg shadow-lg overflow-hidden p-4 relative">
                    <button
                      onClick={closePdfViewer}
                      className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center border-2 border-red-600 transition-all duration-300 ease-in-out shadow-lg z-50"
                    >
                      <span className="text-xl font-bold transform">
                        &times;
                      </span>
                    </button>

                    <div className="relative w-full">
                      <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        className="border-0 rounded-lg"
                        title="PDF Invoice"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      },
    },
  ];
  const trangThai = [
    {
      name: "Giao hàng thành công",
      id: "Giao hàng thành công",
    },
    {
      name: "Đang chờ xác nhận",
      id: "Đang chờ xác nhận",
    },
  ];

  useEffect(() => {
    if (isError && !hasError) {
      toast.error("Có lỗi xảy ra");
      setHasError(true);
    }
  }, [isError, hasError]);
  const closePdfViewer = () => {
    setPdfUrl(null);
  };

  useEffect(() => {
    const pusher = new Pusher("4d3e0d70126f2605977e", {
      cluster: "ap1",
    });
  
    const channel = pusher.subscribe("orders");
    pusher.connection.bind("connected", () => {
      console.log("Connected to Pusher!");
    });
  
    channel.bind("order.updated", (newOrder: any) => {
      queryClient.invalidateQueries({ queryKey: ["order-status"] });
    });
  
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [queryClient]);
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 uppercase">
          Quản lí đơn hàng
        </h1>
        <div>
          <div className="flex ">
            <Button
              className="btn-info w-32 flex items-center justify-center"
              onClick={() => prinfOrderAll()}
            >
              Hóa đơn
            </Button>
          </div>

          <div>
            {pdfUrl && (
              <>
                <div className="fixed inset-0 flex justify-center items-center z-20">
                  <div className="w-full max-w-3xl bg-gray-100 border rounded-lg shadow-lg overflow-hidden p-4 relative">
                    <button
                      onClick={closePdfViewer}
                      className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center border-2 border-red-600 transition-all duration-300 ease-in-out shadow-lg z-50"
                    >
                      <span className="text-xl font-bold transform">
                        &times;
                      </span>
                    </button>
                    <div className="relative w-full">
                      <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        className="border-0 rounded-lg"
                        title="PDF Invoice"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="">
        {/* {isFetching ? (
          <Loading />
        ) : (
          <>
            <div className="flex mb-4 float-right">
              <RangePicker
                className="mt-4"
                value={rangeValue} // Giá trị hiện tại của RangePicker
          <> */}
            <div className="flex mb-2">
              <RangePicker className="mt-4"
                onChange={(value, dateString) => {
                  if (value) {
                    setRangeValue(value); // Cập nhật UI
                    setFilter((prev: any) => ({
                      ...prev,
                      filter_type: 'range',
                      filter_start_date: dateString[0],
                      filter_end_date: dateString[1],
                    }));
                  } else {
                    // handleClearFilter(); // Xóa bộ lọc khi người dùng xóa
                  }
                }}
                allowClear
              />
              <div className="flex items-center mt-4">
                <Select
                  size="large"
                  mode="multiple"
                  options={
                    trangThai?.map((item: any) => ({
                      value: item?.id,
                      label: item?.name
                    })) || []
                  }
                  onChange={(e) => setFilter((prev: any) => ({ ...prev, statuses: e }))}
                  value={filter?.statuses}
                  placeholder="Chọn trạng thái"
                  placement="bottomLeft"
                  className="w-[480px] max-w-md mx-2"
                />
                <Button
                  onClick={handleSearch}
                  className="ml-2"
                >
                  <SearchOutlined />
                </Button>
                <Button
                  onClick={handleCancelSearch}
                  className="ml-2"
                >
                  <SyncOutlined />
                </Button>
              </div>
            </div>

            <Table
              className="custom-table"
              dataSource={
                (isSearching ? dataSourceSearch : dataSource).slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              }
              columns={columns}
              scroll={{ x: 'max-content' }}
              pagination={false}
            />
            <Pagination
              className="mt-4"
              align="end"
              current={currentPage}
              total={(isSearching ? dataSourceSearch : dataSource).length}
              pageSize={pageSize}
              onChange={(page) => {
                setCurrentPage(page);
              }}
            />
          {/* </>
        )} */}
      </div>
    </div>
  );
};
export default OrderPage;
