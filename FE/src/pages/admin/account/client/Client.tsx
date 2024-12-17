/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/common/Loading/Loading";
import { IUser } from "@/common/types/users";
import instance from "@/configs/axios";
import { deleteClient, getClients } from "@/services/api/admin/clients";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Input, Modal, Pagination } from "antd";
import Table, { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ClientPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClientId, setCurrentClientId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const { mutate } = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Xoá thành công");
    },
    onError: () => {
      toast.error("Xoá thất bại");
    },
  });

  useEffect(() => {
    const totalItems = data?.data?.length || 0;
    const maxPage = Math.ceil(totalItems / pageSize);

    if (totalItems > 0 && currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [data, currentPage, pageSize]);

  const showModal = (id: number | null) => {
    setCurrentClientId(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (currentClientId !== null) {
      mutate(currentClientId);
    }
    setIsModalOpen(false);
    setCurrentClientId(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentClientId(null);
  };

  const column: ColumnType<IUser>[] = [
    {
      title: "STT",
      key: "index",
      render: (__: any, _: any, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
      ),
    },
    {
      title: "Họ Và Tên",
      dataIndex: "name",
    },
    {
      title: "Ảnh Đại Diện",
      dataIndex: "avatar",
      render: (avatar: string, _: IUser) => <Image src={avatar} width={100} />,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Ngày Sinh",
      dataIndex: "birth_date",
      render: (birth_date: string) => {
        const date = dayjs(birth_date);
        return date.isValid() ? date.format("DD/MM/YYYY") : "";
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (gender: number | undefined) => {
        if (typeof gender !== "number") return "";
        return gender === 1 ? "Nam" : "Nữ";
      },
    },
    {
      title: "Ngày Tạo",
      dataIndex: "create_at",
      render: (create_at: string) => {
        const date = dayjs(create_at);
        return date.isValid() ? date.format("DD/MM/YYYY HH:mm:ss") : "N/A";
      },
    },
    {
      title: "Thao Tác",
      fixed: "right",
      render: (client: IUser) => (
        <div>
          <Button
            className="bg-red-500 text-white"
            onClick={() => showModal(client.id)}
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
            <p>Bạn có chắc chắn muốn xóa khách hàng này?</p>
          </Modal>
        </div>
      ),
    },
  ];

  //  tìm kiếm theo tên  ;
  const [query, setQuery] = useState<string>("");
  const [dataSearch, setDataSearch] = useState<IUser[]>([]);

  const handleSearch = async () => {
    try {
      const res = await instance.post(`/client/search`, { query });
      setDataSearch(res?.data?.data || []);
      setCurrentPage(1);
    } catch (error) {
      toast.error("Lỗi khi tìm kiếm");
    }
  };

  const dataSource =
    dataSearch?.length > 0
      ? dataSearch
      : Array.isArray(data?.data)
        ? data.data.map((client: IUser) => ({
            key: client.id,
            ...client,
          }))
        : [];

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-300 pb-2 uppercase">
            Khách Hàng
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
            Tìm Kiếm
          </Button>
        </div>
        <Link to={`create`}>
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            type="primary"
          >
            <PlusOutlined className="mr-2" />
            Thêm Khách Hàng
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

export default ClientPage;
