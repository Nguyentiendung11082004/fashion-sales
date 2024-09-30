/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Loading from "@/common/Loading/Loading";
import { Itags } from "@/common/types/tags";
import { deleteTag, getTags } from "@/services/api/tags.api";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Pagination, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

<<<<<<< HEAD
const Tags = () => {
=======

const Tags = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTagId, setCurrentTagId] = useState<number | null>(null);
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
  const queryClient = useQueryClient();
  const [currentTagId, setCurrentTagId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const initialPage = queryClient.getQueryData(['currentTagsPage']) || 1;
  const [currentTagsPage, setCurrentTagsPage] = useState(Number(initialPage));
  const [pageSize] = useState(5);
  const navigate = useNavigate();
  const { data, isFetching, isError } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
  const dataSource = data?.data?.map((item: Itags) => ({
    key: item?.id,
    ...item,
  })) || [];
  const { mutate } = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
<<<<<<< HEAD
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success('Xoá thành công');
      if (dataSource.length % pageSize === 1 && currentTagsPage > 1) {
        setCurrentTagsPage(currentTagsPage - 1);
      }
    },
    onError: () => {
      toast.error('Xoá thất bại');
=======
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Xoá thành công");
    },
    onError: () => {
      toast.error("Xoá thất bại");
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
    },
  });

  const handleOpen = (id: number) => {
    setCurrentTagId(id);
    setVisible(true);
  };

  const handleRemove = () => {
    if (currentTagId) {
      mutate(currentTagId);
      setVisible(false);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`, { state: { currentTagsPage } });
  };

  const columns: ColumnType<Itags>[] = [
    {
<<<<<<< HEAD
      title: 'Stt',
      render: (_, record: any, index: number) => (
        <div>{(index + 1) + pageSize * (currentTagsPage - 1)}</div>
=======
      title: "STT",
      render: (text: any, record: any, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
      ),
    },
    {
      title: "Tên tag",
      dataIndex: "name",
    },
    {
      title: "Thao tác",
      render: (record: Itags) => (
        <div>
<<<<<<< HEAD
          <Button className="mx-2 btn-warning" onClick={() => handleEdit(record?.id)}>
            <EditOutlined />
          </Button>
          <Button className="btn-danger" onClick={() => handleOpen(record?.id)}>
            <DeleteOutlined />
          </Button>
=======
          <Link to={`edit/${record?.id}`}>
            <Button className="mx-2 bg-yellow-400 text-white">
              <EditOutlined />
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có muốn xoá?"
            onConfirm={() => mutate(record?.id)}
          >
            <Button className="bg-red-500 text-white">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
        </div>
      ),
    },
  ];

<<<<<<< HEAD
  useEffect(() => {
    if (isError && !hasError) {
      toast.error('Có lỗi xảy ra');
      setHasError(true);
    }
  }, [isError, hasError]);
=======
  const dataSource =
    data?.data?.map((item: Itags) => ({
      key: item?.id,
      ...item,
    })) || [];
  if (isError) return <div>{isError}</div>;
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          Tags
        </h1>
        <div>
          <Link to={`create`}>
<<<<<<< HEAD
            <Button className="my-2" type="primary">
=======
            <Button
              className="my-2"
              type="primary"
              onClick={() => showModal(null)}
            >
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
              <PlusOutlined /> Thêm tag
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
<<<<<<< HEAD
              dataSource={dataSource.slice((currentTagsPage - 1) * pageSize, currentTagsPage * pageSize)}
=======
              dataSource={dataSource.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )}
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
              columns={columns}
              pagination={false}
            />
            <Pagination
              className="mt-4"
              align="end"
<<<<<<< HEAD
              current={currentTagsPage}
=======
              current={currentPage}
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
              total={dataSource.length}
              pageSize={pageSize}
              onChange={(page) => setCurrentTagsPage(page)}
            />
            <Modal
              title="Bạn có chắc chắn muốn xoá"
              open={visible}
              onOk={handleRemove}
              onCancel={() => setVisible(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Tags;
