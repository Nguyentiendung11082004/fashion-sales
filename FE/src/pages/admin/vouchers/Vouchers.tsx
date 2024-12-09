/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/common/Loading/Loading";
import { IVouchers } from "@/common/types/vouchers";
import instance from "@/configs/axios";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal, Pagination, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Vouchers = () => {
  const [pageSize] = useState(5);
  const [visiable, setVisiable] = useState(false);
  const [currentId, setCurrentId] = useState<number>();
  const [hasError, setHasError] = useState(false);
  const queryClient = useQueryClient();
  const initialPage = queryClient.getQueryData(["currentPage"]) || 1;

  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["vouchers"],
    queryFn: async () => {
      try {
        return await instance.get(`/vouchers`);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  });
  console.log("voucher : ", data);

  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`, { state: { currentPage } });
  };
  const dataVoucher = data?.data?.dataVouchers;
  useEffect(() => {
    const totalItems = data?.data?.length || 0;
    const maxPage = Math.ceil(totalItems / pageSize);

    if (totalItems > 0 && currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [data, currentPage, pageSize]);

  const { mutate } = useMutation({
    mutationFn: async (id: any) => {
      try {
        return await instance.delete(`/vouchers/${id}`);
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      toast.success("Xoá thành công");
    },
    onError: () => {
      toast.error("Xoá thất bại");
    },
  });

  const handleOpen = (id: number) => {
    setCurrentId(id);
    setVisiable(true);
  };
  const handleRemove = () => {
    if (currentId) {
      mutate(currentId);
      setVisiable(false);
    }
  };

  const columns: ColumnType<IVouchers>[] = [
    {
      title: "Stt",
      render: (_, __: any, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
      ),
    },
    {
      title: "Tên voucher",
      dataIndex: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },

    {
      title: "Số lượng",
      dataIndex: "usage_limit",
    },
    {
      title: "Đã sử dụng",
      dataIndex: "used_count",
    },

    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
    },
    {
      title: "Thao tác",
      fixed: "right",
      render: (record: IVouchers) => {
        return (
          <div>
            <Link to={`${record?.id}`}>
              <Button className="btn-info" style={{ width: "46px" }}>
                <EyeOutlined className="" />
              </Button>
            </Link>

            <Button
              className="btn-warning mx-2"
              style={{ width: "46px" }}
              onClick={() => handleEdit(record?.id)}
            >
              <EditOutlined />
            </Button>

            <Button
              onClick={() => handleOpen(record?.id)}
              className="btn-danger"
              style={{ width: "46px" }}
            >
              <DeleteOutlined className="pl-2" />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (isError && !hasError) {
      toast.error("Có lỗi xảy ra");
      setHasError(true);
    }
  }, [isError, hasError]);

  //  tìm kiếm theo tên  ;
  const [query, setQuery] = useState<string>("");
  const [dataSearch, setDataSearch] = useState<IVouchers[]>([]);

  const handleSearch = async () => {
    try {
      const res = await instance.post(`/voucher/search`, { query });
      setDataSearch(res?.data?.data || []);
      setCurrentPage(1);
    } catch (error) {
      toast.error("Lỗi khi tìm kiếm");
    }
  };

  const dataSource =
    dataSearch?.length > 0
      ? dataSearch
      : dataVoucher?.map((item: IVouchers) => ({
          key: item?.id,
          ...item,
        })) || [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        {/* <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          Danh sách voucher
        </h1> */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Danh sách voucher
          </h1>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm"
            className="w-full md:w-64 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <Button
            onClick={handleSearch}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow"
          >
            Tìm kiếm
          </Button>
        </div>
        <Link to={`create`}>
          <Button className="bg-blue-500 text-white rounded-lg h-10 px-4 flex items-center hover:bg-blue-600 transition duration-200">
            <PlusOutlined className="mr-2" />
            Thêm voucher
          </Button>
        </Link>
      </div>
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Table
              className="custom-table"
              dataSource={dataSource.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )}
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={false}
            />
            <Pagination
              className="mt-4"
              align="end"
              current={currentPage}
              total={dataSource.length}
              pageSize={pageSize}
              onChange={(page) => {
                setCurrentPage(page);
              }}
            />
            <Modal
              open={visiable}
              title="Xoá sản phẩm"
              onOk={() => handleRemove()}
              onCancel={() => setVisiable(false)}
            ></Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Vouchers;
