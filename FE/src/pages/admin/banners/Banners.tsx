/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/common/Loading/Loading";
import { IBanner } from "@/common/types/banners";
import { IUser } from "@/common/types/users";
import instance from "@/configs/axios";
import { bannersDestroy, bannersIndex } from "@/services/api/admin/banners";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Input, Modal, Pagination } from "antd";
import Table, { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBanner, setcurrentBanner] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const initialPage = queryClient.getQueryData(["currentPage"]) || 1;
  const [currentPage, setCurrentPage] = useState(Number(initialPage));

  const [pageSize] = useState(5);
  const navigate = useNavigate();

  const { data: dataBanner, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: bannersIndex,
  });
  const data = dataBanner?.data;

  const { mutate } = useMutation({
    mutationFn: bannersDestroy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Xoá thành công");
    },
    onError: () => {
      toast.error("Xoá thất bại");
    },
  });

  useEffect(() => {
    const totalItems = data?.banners?.length || 0;
    const maxPage = Math.ceil(totalItems / pageSize);

    if (totalItems > 0 && currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [data, currentPage, pageSize]);

  const showModal = (id: number | null) => {
    setcurrentBanner(id);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`, { state: { currentPage } });
  };

  const handleOk = () => {
    if (currentBanner !== null) {
      mutate(currentBanner);
    }
    setIsModalOpen(false);
    setcurrentBanner(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setcurrentBanner(null);
  };

  const column: ColumnType<IUser>[] = [
    {
      title: "STT",
      key: "index",
      render: (__: any, _: any, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
      ),
      width: 50,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      width: 200,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (image: any) => (
        <Image src={image} style={{ height: "50", margin: "0 auto" }} />
      ),
      width: 100,
    },
    {
      title: "Link",
      dataIndex: "link",
      width: 200,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      render: (start_date: string) => {
        const date = dayjs(start_date);
        return date.isValid() ? date.format("DD/MM/YYYY") : "";
      },
      width: 40,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      render: (end_date: string) => {
        const date = dayjs(end_date);
        return date.isValid() ? date.format("DD/MM/YYYY") : "";
      },
      width: 40,
    },

    {
      title: "Thao tác",
      fixed: "right",
      width: 150,
      render: (banner: IBanner) => (
        <div>
          <Button
            className="mx-2 bg-yellow-400 text-white"
            onClick={() => handleEdit(banner.id)}
          >
            <EditOutlined />
          </Button>
          <Button
            className="bg-red-500 text-white"
            onClick={() => showModal(banner.id)}
          >
            <DeleteOutlined />
          </Button>

          <Modal
            title="Xác nhận xóa"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Xóa"
            cancelText="Hủy"
            mask={false}
          >
            <p>Bạn có chắc chắn muốn xóa không ?</p>
          </Modal>
        </div>
      ),
    },
  ];

  const dataSource = Array.isArray(data?.banners)
    ? data.banners.map((banner: IBanner) => ({
        key: banner.id,
        ...banner,
      }))
    : [];



  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-300 pb-2 uppercase">
            Quản lý banner
          </h1>
          {/* <form className="flex items-center gap-2">
            <Input
              // value={query}
              // onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm"
              className="w-full md:w-64 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <Button
              // onClick={handleSearch}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow"
            >
              Tìm kiếm
            </Button>
          </form> */}
        </div>

        <Link to={`create`}>
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            type="primary"
          >
            <PlusOutlined className="mr-2" />
            Thêm ảnh banner
          </Button>
        </Link>
      </div>
      <div className="">
        <div className="flex space-x-4 py-4"></div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
