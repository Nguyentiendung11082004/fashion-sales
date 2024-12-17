import Loading from "@/common/Loading/Loading";
import { Ibrands } from "@/common/types/brands";
import instance from "@/configs/axios";
import { deleteBrand, getBrands } from "@/services/api/admin/brands.api";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal, Pagination } from "antd";
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
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); 

  const { data, isFetching, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults(data?.data?.brands || []);
      return;
    }
    try {
      const response = await instance.post("/brand/search", { query });
      setSearchResults(response.data.data);
    } catch (error) {
      toast.error("Không tìm thấy thương hiệu nào!");
      setSearchResults([]);
    }
  };

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
      title: "STT",
      render: (_, record: any, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
      ),
    },
    {
      title: "Tên Thương Hiệu",
      dataIndex: "name",
    },
    {
      title: "Ảnh Đại Diện",
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone_number",
    },
    {
      title: "Địa Chỉ",
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

  const dataSource = (searchResults.length ? searchResults : data?.data?.brands || []).map((item: any) => ({
    key: item?.id,
    ...item,
  }));

  useEffect(() => {
    if (isError && !hasError) {
      toast.error("Có lỗi xảy ra");
      setHasError(true);
    }
  }, [isError, hasError]);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 uppercase">
          Thương Hiệu
        </h1>
        <div className="flex items-center">
          <Input className="w-80" placeholder="Tìm kiếm thương hiệu" value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
    
              if (!value.trim()) {
                setSearchResults(data?.data?.brands || []);
              }
            }}/>
          <Button className="ml-1" onClick={handleSearch}>Tìm kiếm</Button>
        </div>
        <div>
          <Link to={`create`}>
            <Button
              className="my-2"
              type="primary"
              onClick={() => showModal(null)}
            >
              <PlusOutlined /> Thêm thương hiệu
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
