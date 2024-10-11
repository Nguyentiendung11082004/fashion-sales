import Loading from '@/common/Loading/Loading'
import { Iproduct } from '@/common/types/products'
import { productDestroy, productsIndex } from '@/services/api/products.api'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Modal, Pagination, Table, Tag } from 'antd'
import { ColumnType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductPageManager = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [visiable, setVisiable] = useState(false);
  const [currentId, setCurrentId] = useState<number>();
  const [hasError, setHasError] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['productsIndex'],
    queryFn: productsIndex,

  })

  const { mutate } = useMutation({
    mutationFn: productDestroy,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['productsIndex'],
      })
      toast.success('Xoá sản phẩm thành công')
    },
    onError: () => {
      toast.error('Xoá sản phẩm thất bại')
    }
  })

  const handleOpen = (id: number) => {
    setCurrentId(id)
    setVisiable(true);
  }
  const handleRemove = () => {
    if (currentId) {
      mutate(currentId);
      setVisiable(false);
    }
  };

  const column: ColumnType<Iproduct>[] = [
    {
      title: 'STT',
      render: (_, record: any, index: number) => (<div>{(index + 1) + pageSize * (currentPage - 1)}</div>),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text: any, record: Iproduct, index: number) => {
        return <p>
          {record.type == 0 ? 'Sản phẩm đơn' : 'Sản phẩm biến thể'}
        </p>
      }
    },
    // {
    //   title: 'brand_id',
    //   dataIndex: 'brand_id',
    // },
    // {
    //   title: 'category_id',
    //   dataIndex: 'category_id',
    // },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'views',
      dataIndex: 'views',
    },
    {
      title: 'img_thumbnail',
      dataIndex: 'img_thumbnail',
      render: (record: Iproduct) => {
        return <img src={`${record}`} style={{ height: '60px', margin: '0 auto' }} alt={`${record?.name}`} />
      }
    },
    {
      title: 'slug',
      dataIndex: 'slug',
    },
    // {
    //   title: 'price_regular',
    //   dataIndex: 'price_regular',
    // },
    // {
    //   title: 'price_sale',
    //   dataIndex: 'price_sale',
    // },
    // {
    //   title: 'description',
    //   dataIndex: 'description',
    // },
    // {
    //   title: 'description_title',
    //   dataIndex: 'description_title',
    // },
    {
      title: 'status',
      dataIndex: 'status',
      render: (status) => <Tag
        color={status ? 'green' : 'red'}
      >{status ? 'Còn hàng' : 'Hết hàng'}</Tag>
    },
    {
      title: 'is_show_home',
      dataIndex: 'is_show_home',
      render: (is_show_home) => <Tag
        color={is_show_home ? 'green' : 'red'}
      >{is_show_home ? 'Còn hàng' : 'Hết hàng'}</Tag>
    },
    {
      title: 'trend',
      dataIndex: 'trend',
      render: (is_trend) => <Tag
        color={is_trend ? 'green' : 'red'}
      >{is_trend == true ? 'Hot trend' : 'Lỗi thời'}</Tag>
    },
    // {
    //   title: 'is_new',
    //   dataIndex: 'is_new',
    //   render: (is_new) => <Tag
    //     color={is_new ? 'green' : 'red'}
    //   >{is_new ? 'Sản phẩm mới' : 'Sản phẩm cũ'}</Tag>
    // },
    {
      title: 'Thao tác',
      fixed: 'right',
      render: (record: Iproduct) => {
        return <div>
          <Link to={`${record?.id}`}>
            <Button className='btn-info' style={{ width: '46px' }}><EyeOutlined className='pl-2' /> </Button>
          </Link>
          <Link to={`edit/${record?.id}`}>
            <Button className='btn-warning mx-2' style={{ width: '46px' }}><EditOutlined className='pl-2' /> </Button>
          </Link>
          <Button onClick={() => handleOpen(record?.id)} className='btn-danger' style={{ width: '46px' }} ><DeleteOutlined className='pl-2' /> </Button>
        </div>
      }
    },
  ]


  const dataSource = data?.data?.map((product: Iproduct) => (
    {
      key: product.id,
      ...product
    }
  )) || [];
  useEffect(() => {
    if (isError && !hasError) {
      toast.error('Có lỗi xảy ra');
      setHasError(true);
    }
  }, [isError, hasError]);
  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          Danh sách sản phẩm
        </h1>
        <Link to={`create`}>
          <Button className="bg-blue-500 text-white rounded-lg h-10 px-4 flex items-center hover:bg-blue-600 transition duration-200">
            <PlusOutlined className="mr-2" />
            Thêm sản phẩm
          </Button>

        </Link>
      </div>
      <div className="">
        {
          isLoading ? (<Loading />)
            : (
              <>
                <Table className='custom-table' dataSource={dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                  columns={column}
                  scroll={{ x: 'max-content' }}
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
                  open={visiable}
                  title="Xoá sản phẩm"
                  onOk={() => handleRemove()}
                  onCancel={() => setVisiable(false)}
                >

                </Modal>
              </>

            )
        }


      </div>
    </div>
  )
}

export default ProductPageManager
