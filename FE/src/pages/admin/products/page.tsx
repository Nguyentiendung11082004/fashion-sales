/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/common/Loading/Loading";
import { Iproduct } from "@/common/types/products";
import instance from "@/configs/axios";
import { productDestroy, productsIndex } from "@/services/api/admin/products.api";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal, Pagination, Table, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductPageManager = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [visiable, setVisiable] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [query, setQuery] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<Iproduct[]>([]);

  const queryClient = useQueryClient();

  // Fetch product data using React Query
  const { data, isFetching, isError } = useQuery({
    queryKey: ["productsIndex"],
    queryFn: productsIndex,
  });

  // Search handler
  const handleSearch = async () => {
    try {
      const res = await instance.post('/product/search', { query });
      setDataSearch(res?.data?.data || []);
      setCurrentPage(1); // Quay lại trang đầu khi tìm kiếm
    } catch (error) {
      toast.error("Không tìm thấy sản phẩm nào.");
    }
  };

  // Cancel search and reset to all products
  const handleCancelSearch = () => {
    setQuery('');
    setDataSearch([]);
    setCurrentPage(1);
  };

  // Mutation to delete a product
  const { mutate } = useMutation({
    mutationFn: productDestroy,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productsIndex"],
      });
      toast.success("Xoá sản phẩm thành công");
    },
    onError: () => {
      toast.error("Xoá sản phẩm thất bại");
    },
  });

  // Open confirmation modal for deleting a product
  const handleOpen = (id: number) => {
    setCurrentId(id);
    setVisiable(true);
  };

  // Remove the product after confirmation
  const handleRemove = () => {
    if (currentId !== null) {
      mutate(currentId);
      setVisiable(false);
    }
  };

  // Table columns configuration
  const column: ColumnType<Iproduct>[] = [
    {
      title: "STT",
      render: (_, __, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
      ),
    },
    {
      title: "Loại Sản Phẩm",
      dataIndex: "type",
      render: (text, record: Iproduct) => (
        <p>{record.type === false ? "Sản phẩm đơn" : "Sản phẩm biến thể"}</p>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "img_thumbnail",
      render: (img_thumbnail: string) => (
        <img src={img_thumbnail} style={{ height: "60px", margin: "0 auto" }} alt="Product Thumbnail" />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: boolean) => (
        <Tag color={status ? "green" : "red"}>{status ? "Còn hàng" : "Hết hàng"}</Tag>
      ),
    },
    {
      title: "Hiển thị ở trang chủ",
      dataIndex: "is_show_home",
      render: (is_show_home: boolean) => (
        <Tag color={is_show_home ? "green" : "red"}>{is_show_home ? "Có" : "Không"}</Tag>
      ),
    },
    {
      title: "Xu Hướng",
      dataIndex: "trend",
      render: (is_trend: boolean) => (
        <Tag color={is_trend ? "green" : "red"}>{is_trend ? "Hot trend" : "Lỗi thời"}</Tag>
      ),
    },
    {
      title: "Thao Tác",
      fixed: "right",
      render: (record: any) => (
        <div>
          <Link to={`${record?.id}`}>
            <Button className="btn-info" style={{ width: "46px" }}>
              <EyeOutlined className="" />
            </Button>
          </Link>
          <Link to={`edit/${record?.id}`}>
            <Button className="btn-warning mx-2" style={{ width: "46px" }}>
              <EditOutlined className="" />
            </Button>
          </Link>
          <Button
            onClick={() => handleOpen(record?.id)}
            className="btn-danger"
            style={{ width: "46px" }}
          >
            <DeleteOutlined className="" />
          </Button>
        </div>
      ),
    },
  ];

  // Determine the data source, whether from search results or fetched data
  const dataSource = dataSearch.length > 0 ? dataSearch : data?.data || [];

  // Handle error state
  useEffect(() => {
    if (isError) {
      toast.error("Có lỗi xảy ra khi tải dữ liệu.");
    }
  }, [isError]);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 uppercase">
          Danh Sách Sản Phẩm
        </h1>
        <Link to={`create`}>
          <Button className="bg-blue-500 text-white rounded-lg h-10 px-4 flex items-center hover:bg-blue-600 transition duration-200">
            <PlusOutlined className="mr-2" />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>
      <div>
        {isFetching ? (
          <Loading />
        ) : (
          <>
            <div className="w-[36%] flex mb-4 float-right">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm"
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
            <Pagination
              className="mt-4"
              align="end"
              current={currentPage}
              total={dataSource.length}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
            />
            <Modal
              open={visiable}
              title="Xoá sản phẩm"
              onOk={handleRemove}
              onCancel={() => setVisiable(false)}
            >
              <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPageManager;
