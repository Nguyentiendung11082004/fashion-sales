import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Select, Table } from 'antd'
import TableProduct from './_components/TableProduct'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/api/products.api'
import { Iproduct } from '@/common/types/products'
import Loading from '@/common/Loading/Loading'
import { ColumnType } from 'antd/es/table'
import { Link } from 'react-router-dom'

const ProductPageManager = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  const column: ColumnType<Iproduct>[] = [
    {
      title: 'STT',
      render: (index: number) => (<div>{index + 1}</div>)
    },
    {
      title: 'type',
      dataIndex: 'type',
    },
    {
      title: 'brand_id',
      dataIndex: 'brand_id',
    },
    {
      title: 'category_id',
      dataIndex: 'category_id',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'views',
      dataIndex: 'views',
    },
    {
      title: 'image_thumbnail',
      dataIndex: 'image_thumbnail',
    },
    {
      title: 'slug',
      dataIndex: 'slug',
    },
    {
      title: 'price_regular',
      dataIndex: 'price_regular',
    },
    {
      title: 'price_sale',
      dataIndex: 'price_sale',
    },
    {
      title: 'description',
      dataIndex: 'description',
    },
    {
      title: 'description_title',
      dataIndex: 'description_title',
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
    {
      title: 'is_show_home',
      dataIndex: 'is_show_home',
    },
    {
      title: 'is_trend',
      dataIndex: 'is_trend',
    },
    {
      title: 'is_new',
      dataIndex: 'is_new',
    },
    {
      title: 'Thao tác',
      fixed: 'right',
      render: (record: Iproduct) => {
        return <div>

        </div>
      }
    },
  ]

  const dataSource = data?.data?.map((product: Iproduct) => (
    {
      key: product.id,
      ...product
    }
  ))


  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          Danh sách sản phẩm
        </h1>
        <Link to={`create`}>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
            <PlusOutlined className="mr-2" />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>
      <div className="">
        <div className="flex space-x-4 py-4">
          {/* <Input
            placeholder="Nhập tên sản phẩm bạn muốn tìm"
            className="w-1/4"
          />
          <Select
            mode="multiple"
            allowClear
            className="w-[32%]"
            placeholder="Chọn danh mục sản phẩm bạn muốn tìm"
            defaultValue={[]}
            options={[

            ]}

          /> */}
        </div>
        {
          isLoading ? (<Loading />)
            : (
              <Table className='custom-table' dataSource={dataSource}
                columns={column}
                scroll={{ x: 'max-content' }}
              />

            )
        }

      </div>
    </div>
  )
}

export default ProductPageManager
