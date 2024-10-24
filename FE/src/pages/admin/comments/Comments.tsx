import Loading from "@/common/Loading/Loading";
import { Icomments } from "@/common/types/comments";
import { deleteComment, getComments } from "@/services/api/admin/comments.api";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Pagination, Table } from "antd";
import { ColumnType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const CommentPage = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [hasError, setHasError] = useState(false);
  const [currentTagId, setCurrentTagId] = useState<number | null>(null);
  const [visiable, setVisiable] = useState(false);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
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

  const columns: ColumnType<Icomments>[] = [
    {
      title: "Stt",
      render: (_, record: any, index: number) => (
        <div>{index + 1 + pageSize * (currentPage - 1)}</div>
      ),
    },
    {
      title: "user_id",
      dataIndex: "user_id",
    },
    {
      title: "product_id",
      dataIndex: "product_id",
    },
    {
      title: "content",
      dataIndex: "content",
    },
    {
      title: "rating",
      dataIndex: "rating",
    },
    {
      title: "image",
      dataIndex: "image",
      render: (record: string) => {
        return <div>
          <img src={record} alt="cmt-img" style={{ height: '60px' }} />
        </div>    
       }
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Thao tác",
      render: (record: Icomments) => (
        <div>
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
    data?.data?.comments?.map((item: Icomments) => ({
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
          Quản lí bình luận
        </h1>
      </div>
      <div>
        {isFetching ? (
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

export default CommentPage;
