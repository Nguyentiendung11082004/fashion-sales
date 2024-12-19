/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/common/Loading/Loading";
import { IUser } from "@/common/types/users";
import instance from "@/configs/axios";
import { deleteEmployee, getEmployees } from "@/services/api/admin/employee";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Input, Modal, Pagination } from "antd";
import Table, { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeePage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState<number | null>(
    null
  );
  const initialPage = queryClient.getQueryData(["currentPage"]) || 1;

  const [currentPage, setCurrentPage] = useState(Number(initialPage));

  const [pageSize] = useState(5);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
  console.log("data employees", data);

  const { mutate } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Xoá thành công");
    },
    onError: () => {
      toast.error("Xoá thất bại");
    },
  });

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`, { state: { currentPage } });
  };

  useEffect(() => {
    const totalItems = data?.data?.length || 0;
    const maxPage = Math.ceil(totalItems / pageSize);

    if (totalItems > 0 && currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [data, currentPage, pageSize]);

  const showModal = (id: number | null) => {
    setCurrentEmployeeId(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (currentEmployeeId !== null) {
      mutate(currentEmployeeId);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      title: "Họ và Tên",
      dataIndex: "name",
    },
    {
      title: "Ảnh Đại Diện",
      dataIndex: "avatar",
      render: (avatar: string, _: IUser) => <Image src={avatar} width={100} />,
    },
    {
      title: "Số Điện Thoại",
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
      title: "Chức vụ",
      dataIndex: "role_id",
      render: (role: number) => {
        return role === 3 ? "Shipper" : "MemberShip";
      },
    },
    {
      title: "Thao Tác",
      fixed: "right",
      render: (employee: IUser) => (
        <div>
          <Button
            className="mx-2 bg-yellow-400 text-white"
            onClick={() => handleEdit(employee.id)}
          >
            <EditOutlined />
          </Button>
          <Button
            className="bg-red-500 text-white"
            onClick={() => showModal(employee.id)}
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
            <p>Bạn có chắc chắn muốn xóa tài khoản này không ?</p>
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
      const res = await instance.post(`/employee/search`, { query });
      setDataSearch(res?.data?.data || []);
      setCurrentPage(1);
    } catch (error) {
      toast.error("Kết quả tìm kiếm trống!!!");
    }
  };

  const dataSource =
    dataSearch?.length > 0
      ? dataSearch
      : Array.isArray(data?.data)
        ? data.data.map((employee: IUser) => ({
            key: employee.id,
            ...employee,
          }))
        : [];

  console.log("dataSource: ", dataSource);
  const handleCancelSearch = () => {
    setQuery("");
    setDataSearch([]);
    setCurrentPage(1);
  };
  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 uppercase">
            Nhân Viên
          </h1>
        </div>
        <Link to={`create`}>
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            type="primary"
          >
            <PlusOutlined className="mr-2" />
            Thêm nhân viên
          </Button>
        </Link>
      </div>
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="w-[36%] flex mb-4 float-right">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm"
              />
              <Button onClick={handleSearch} className="ml-2">
                <SearchOutlined />
              </Button>
              <Button onClick={handleCancelSearch} className="ml-2">
                <SyncOutlined />
              </Button>
            </div>
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

export default EmployeePage;
