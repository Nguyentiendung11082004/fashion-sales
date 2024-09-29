import Loading from "@/common/Loading/Loading";
import { Ibrands } from "@/common/types/brands";
import { deleteBrand, getBrands } from "@/services/api/brands.api";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Pagination } from "antd";
import Table, { ColumnType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Brands = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTagId, setCurrentTagId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [hasError, setHasError] = useState(false);
  const [visiable, setVisiable] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const { mutate } = useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Xoá thành công");
      if (dataSource.length % pageSize === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
    onError: () => {
      toast.error("Xoá thất bại");
    },
  });

  const handleOpen = (id: number) => {
    setCurrentTagId(id);
    setVisiable(true);
  };

  const handleRemove = () => {
    if (currentTagId) {
      mutate(currentTagId);
      setVisiable(false);
    }
  };

  const handleEdit = (id: number) => {
    localStorage.setItem("currentPage", currentPage.toString());
    navigate(`edit/${id}`, { state: { currentPage } });
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
  
    if (location.state?.currentPage) {
      setCurrentPage(location.state.currentPage);
    } else if (savedPage) {
      setCurrentPage(Number(savedPage));
      localStorage.removeItem("currentPage");
    } else {
      setCurrentPage(1);
    }
  }, [location.state]);

  const showModal = (id: number | null) => {
    setCurrentTagId(id);
    setIsModalOpen(true);
  };

  const columns: ColumnType<Ibrands>[] = [
    {
      title: "Stt",
      render: (_, record: any, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
      ),
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "image",
      dataIndex: "image",
      render: (record: string) => {
        return (
          <div>
            <img src={record} alt="brand-img" style={{ height: "60px" }} />
          </div>
        );
      },
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "phone_number",
      dataIndex: "phone_number",
    },
    {
      title: "address",
      dataIndex: "address",
    },
    {
      title: "Thao tác",
      render: (record: Ibrands) => (
        <div>
          <Button
            className="mx-2 bg-yellow-400 text-white"
            onClick={() => handleEdit(record?.id)}
          >
            <EditOutlined />
          </Button>
          <Button
            className="bg-red-500 text-white"
            onClick={() => handleOpen(record?.id)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const dataSource =
    data?.data?.brands?.map((item: Ibrands) => ({
      key: item?.id,
      ...item,
    })) || [];

  useEffect(() => {
    if (isError && !hasError) {
      toast.error("Có lỗi xảy ra");
      setHasError(true);
    }
  }, [isError, hasError]);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          Brands
        </h1>
        <div>
          <Link to={`create`}>
            <Button
              className="my-2"
              type="primary"
              onClick={() => showModal(null)}
            >
              <PlusOutlined /> Thêm brands
            </Button>
          </Link>
        </div>
      </div>
      <div>
        {isFetching ? (
          <Loading />
        ) : (
          <>
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
              title="Bạn có chắc chắn muốn xoá"
              open={visiable}
              onOk={() => handleRemove()}
              onCancel={() => setVisiable(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Brands;
