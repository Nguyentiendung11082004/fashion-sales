import React, { useState, useEffect } from 'react';
import { Select, Space, Table, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import instance from '@/configs/axios';
import Loading from '@/common/Loading/Loading';
import { ColumnType } from "antd/es/table";

// Define the shape of simple product data
interface SimpleProduct {
  id: number;
  name: string;
  sku: string;
  total_sold: number;
  remaining_quantity: number;
  status: string;
}

// Define the shape of variant product data
interface VariantProduct {
  product_id: number;
  product_name: string;
  variant_id: number;
  variant_sku: string;
  remaining_quantity: number;
  total_sold: number;
  status: string;
  attributes: { attribute_name: string; attribute_value: string }[];
}
interface ProductData {
  simple_products: { [key: string]: SimpleProduct };
  variant_products: VariantProduct[];
}

const columns: ColumnType<any>[] = [
  {
    title: "STT",
    render: (_: any, record: any, index: number) => index + 1,
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mã sản phẩm',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Số lượng đã bán',
    dataIndex: 'total_sold',
    key: 'total_sold',
  },
  {
    title: 'Số lượng còn lại',
    dataIndex: 'remaining_quantity',
    key: 'remaining_quantity',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (text: string, record: any) => {
      let statusText = '';
      let color = '';
      if (record.total_sold >= 50) {
        statusText = 'Bán chạy';
        color = 'blue';
      } else if (record.remaining_quantity < 10) {
        statusText = 'Sắp hết hàng';
        color = 'orange';
      } else {
        statusText = 'Tồn kho';
        color = 'green';
      }

      return <Tag color={color}>{statusText}</Tag>;
    },
  },
  {
    title: 'Thuộc tính',
    dataIndex: 'attributes',
    key: 'attributes',
    render: (attributes: string) => <span>{attributes}</span>,
  }
];
const TableProduct: React.FC = () => {
  const [filter, setFilter] = useState<{
    type: number[];
    status: number[];
  }>({
    type: [],
    status: [],
  });
  const [dataProduct, setDataProduct] = useState<ProductData | null>(null);

  const getData = async () => {
    try {
      const res = await instance.post(`/getproductstatistics`, {
        status: filter.status,
        type: filter.type,
      });
      if (res?.data) {
        setDataProduct(res.data); // Cập nhật dữ liệu mới, không thêm vào
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Xử lý khi thay đổi trạng thái
  const handleStatusChange = (value: number[]) => {
    setFilter((prev) => ({
      ...prev,
      status: value,
    }));
  };

  // Xử lý khi thay đổi loại sản phẩm
  const handleTypeChange = (value: number[]) => {
    setFilter((prev) => ({
      ...prev,
      type: value,
    }));
  };

  // Kết hợp dữ liệu đơn giản và biến thể
  const variantProducts =
    dataProduct?.variant_products?.map((item) => ({
      key: `variant-${item.variant_id}`,
      name: `${item.product_name} - ${item.variant_sku}`,
      sku: item.variant_sku,
      total_sold: item.total_sold,
      remaining_quantity: item.remaining_quantity,
      status: item.status,
      attributes: item.attributes
        .map((attr) => `${attr.attribute_name}: ${attr.attribute_value}`)
        .join(", "),
    })) || [];

  const simpleProducts =
    Object.values(dataProduct?.simple_products || {})?.map((item) => ({
      key: `simple-${item.id}`,
      name: item.name,
      sku: item.sku,
      total_sold: item.total_sold,
      remaining_quantity: item.remaining_quantity,
      status: item.status,
    }));

  // Dữ liệu được tái tạo mỗi lần `dataProduct` thay đổi
  const combinedData = [...simpleProducts, ...variantProducts];

  // Gọi API mỗi lần bộ lọc thay đổi
  useEffect(() => {
    getData();
  }, [filter]);

  return (
    <>
      <Space style={{ marginBottom: 16, width: "100%" }}>
        <Select
          mode="multiple"
          value={filter.status}
          onChange={handleStatusChange}
          style={{ width: 400 }}
          placeholder="Chọn trạng thái"
        >
          <Select.Option value={1}>Tồn kho</Select.Option>
          <Select.Option value={2}>Sắp hết hàng</Select.Option>
          <Select.Option value={3}>Bán chạy</Select.Option>
        </Select>
        <Select
          mode="multiple"
          value={filter.type}
          onChange={handleTypeChange}
          style={{ width: 400 }}
          placeholder="Chọn loại sản phẩm"
        >
          <Select.Option value={0}>Sản phẩm đơn</Select.Option>
          <Select.Option value={1}>Sản phẩm biến thể</Select.Option>
        </Select>
      </Space>
      <Table columns={columns} dataSource={combinedData} rowKey="key" />
    </>
  );
};


export default TableProduct;
