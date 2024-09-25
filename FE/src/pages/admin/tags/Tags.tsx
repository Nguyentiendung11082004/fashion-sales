import Loading from "@/common/Loading/Loading";
import { Itags } from "@/common/types/tags";
import { deleteTag, getTags } from "@/services/api/tags.api";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Pagination, Popconfirm, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {};

const Tags = (props: Props) => {
  const [currentTagId, setCurrentTagId] = useState<number | null>(null);
  const [visiable,setVisiable] = useState(false)
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const { data, isFetching, isError } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,

  });


  const { mutate } = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success('Xoá thành công',{
        style:{backgroundColor:'green',color:'#fff'}
      });
    },
    onError: () => {
      toast.error('Xoá thất bại');
    }
  });

  const handleOpen = (id:number) => {
    setCurrentTagId(id);
    setVisiable(true)
  }
  const handleRemove = () => {
    if(currentTagId) {
      mutate(currentTagId);
      setVisiable(false)
    }
  }



  const columns: ColumnType<Itags>[] = [
    {
      title: 'Stt',
      render: (text: any, record: any, index: number) => (<div>{(index + 1) + pageSize * (currentPage - 1)}</div>),
    },
    {
      title: 'Tên tag',
      dataIndex: 'name',
    },
    {
      title: 'Thao tác',
      render: (record: Itags) => (
        <div>
          <Link to={`edit/${record?.id}`}>
            <Button className="mx-2 btn-warning"><EditOutlined /></Button>
          </Link>
            <Button className="btn-danger"
            onClick={()=> handleOpen(record?.id)}
            ><DeleteOutlined /></Button>
        </div>
      ),
    },
  ];

  const dataSource = data?.data?.map((item: Itags) => ({
    key: item?.id,
    ...item,
  })) || [];
  if (isError) return <div>{isError}</div>;
  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">Tags</h1>
        <div>
          <Link to={`create`}>
            <Button className="my-2" type="primary">
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
            <Table className="custom-table" dataSource={dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)} columns={columns} pagination={false} />
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
            onOk={()=> handleRemove()}
            onCancel={()=> setVisiable(false)}
            >

            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Tags;
