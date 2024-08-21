import React from 'react'
import TableProduct from './_components/TableProduct'
import { PlusOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'

const ProductPageManager = () => {
  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          Danh sách sản phẩm
        </h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
          <PlusOutlined className="mr-2" />
          Thêm sản phẩm
        </button>
      </div>
      <div className="">
        <div className="flex space-x-4 py-4">
          <Input 
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
            
          />
        </div>
        <div className="p-4 bg-white rounded-lg overflow-hidden shadow-md">
          <TableProduct />
        </div>
      </div>
    </div>
  )
}

export default ProductPageManager
