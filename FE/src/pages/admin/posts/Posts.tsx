/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import Loading from "@/common/Loading/Loading";
import { IPost } from "@/common/types/post";
import instance from "@/configs/axios";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Input, Modal, Pagination, Table } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setcurrentPost] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const initialPage = queryClient.getQueryData(["currentPage"]) || 1;
  const [currentPage, setCurrentPage] = useState(Number(initialPage));
  const [pageSize] = useState(5);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await instance.get("/posts", {});
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      await instance.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
    setcurrentPost(id);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`, { state: { currentPage } });
  };

  const handleOk = () => {
    if (currentPost !== null) {
      mutate(currentPost.toString());
    }
    setIsModalOpen(false);
    setcurrentPost(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setcurrentPost(null);
  };

  const column: any = [
    {
      title: "STT",
      key: "index",
      render: (__: any, _: any, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
      ),
      width: 50,
    },
    {
      title: "Tên",
      dataIndex: "post_name",
      width: 100,
    },
    {
      title: "Ảnh",
      dataIndex: "img_thumbnail",
      render: (img_thumbnail: any) => (
        <Image src={img_thumbnail} style={{ height: "50", margin: "0 auto" }} />
      ),
      width: 100,
    },
    {
      title: "Nội dung",
      dataIndex: "post_content",
      width: 400,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: number | undefined) => {
        if (typeof status !== "number") return "";
        return status === 1 ? "Ẩn" : "Hiện";
      },
    },
    {
      title: "Nêu bật",
      dataIndex: "featured",
      render: (featured: number | undefined) => {
        if (typeof featured !== "number") return "";
        return featured === 1 ? "Nêu bật" : "Không nêu bật";
      },
    },

    {
      title: "Action",
      fixed: "right",
      width: 150,
      render: (post: IPost) => (
        <div>
          <Button
            className="mx-2 bg-yellow-400 text-white"
            onClick={() => handleEdit(post.id)}
          >
            <EditOutlined />
          </Button>
          <Button
            className="bg-red-500 text-white"
            onClick={() => showModal(post.id)}
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

  //  tìm kiếm theo tên  ;
  const [query, setQuery] = useState<string>("");
  const [dataSearch, setDataSearch] = useState<IPost[]>([]);

  const handleSearch = async () => {
    try {
      const res = await instance.post(`/post/search`, { query });
      setDataSearch(res?.data?.data || []);
      setCurrentPage(1);
    } catch (error) {
      toast.error("Kết quả tìm kiếm trống");
    }
  };

  const dataSource =
    dataSearch?.length > 0
      ? dataSearch
      : Array.isArray(data?.data)
        ? data.data.map((post: IPost) => ({
            key: post.id,
            ...post,
          }))
        : [];
  const handleCancelSearch = () => {
    setQuery("");
    setDataSearch([]);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 uppercase">
            Bài viết
          </h1>
          {/* <Input
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
          </Button> */}
        </div>
        <Link to={`create`}>
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            type="primary"
          >
            <PlusOutlined className="mr-2" />
            Thêm bài viết
          </Button>
        </Link>
      </div>
      <div className="">
        <div className="flex space-x-4 py-4"></div>
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

export default Posts;
