
import Loading from "@/common/Loading/Loading";
import { Icategories } from "@/common/types/categories";
import { categoriesDestroy, categoriesIndex } from "@/services/api/admin/categories";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Pagination, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const queryClient = useQueryClient();
  const [pageSize] = useState(5);
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  
  const initialPage = queryClient.getQueryData(['currentCategoryPage']) || 1;
  const [currentCategoryPage, setcurrentCategoryPage] = useState(Number(initialPage));
  const [visiable, setVisiable] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const { data, isFetching, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesIndex,
  })
  const { mutate } = useMutation({
    mutationFn: categoriesDestroy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (dataSource.length % pageSize === 1 && currentCategoryPage > 1) {
        setcurrentCategoryPage(currentCategoryPage - 1);
      }
      toast.success('Xoá thành công');
    },
    onError: () => {
      toast.error('Xoá thất bại');
    }
  });

  const handleOpen = (id: number) => {
    setVisiable((prev) => !prev);
    setCurrentId(id)
  }
  const hanldeRemove = () => {
    if (currentId) {
      mutate(currentId)
      setVisiable(false)
    }
  }

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`, { state: { currentCategoryPage } })
  }

  const columns = [
    {
      title: 'Stt',
      render: (text: any, record: any, index: number) => (<div>{(index + 1) + pageSize * (currentCategoryPage - 1)}</div>),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Img',
      dataIndex: 'img_thumbnail',
      render: (text: any, record: Icategories, index: number) => (<img src={record?.img_thumbnail} style={{ height: '60px', margin: '0 auto' }} alt={record?.name} />)
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Action',
      render: (text: any, record: Icategories) => (
        <div>
          <Button className="mx-2 btn-warning"
            onClick={() => handleEdit(record?.id)}
          ><EditOutlined /></Button>
          <Button className="btn-danger"
            onClick={() => handleOpen(record?.id)}
          ><DeleteOutlined /></Button>
        </div>
      )
    }
  ]
  const dataSource = data?.map((item: Icategories, index: number) => (
    {
      key: index + 1,
      ...item
    }
  )) || [];
  useEffect(() => {
    if (isError && !hasError) {
      toast.error('Có lỗi xảy ra');
      setHasError(true);
    }
  }, [isError, hasError]);

  return (
    <>
      <div className="p-6 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Danh mục sản phẩm
          </h1>
          <div>
            <Link to={`create`}>
              <Button className="my-2" type="primary">
                <PlusOutlined /> Thêm category
              </Button>
            </Link>
          </div>
        </div>
        {
          isFetching ? <Loading /> :
            <>
              <Table
                className="custom-table"
                dataSource={dataSource.slice((currentCategoryPage - 1) * pageSize, currentCategoryPage * pageSize)}
                columns={columns}
                pagination={false}
              />
              <Pagination
                className="mt-4"
                align="end"
                current={currentCategoryPage}
                total={dataSource.length}
                pageSize={pageSize}
                onChange={(page) => {
                  setcurrentCategoryPage(page);
                }}
              />
            </>
        }

        <Modal
          title={'Bạn có muốn xoá'}
          open={visiable}
          onOk={() => hanldeRemove()}
          onCancel={() => setVisiable(false)}
        />

      </div>
    </>
  );
};

export default CategoryPage;
