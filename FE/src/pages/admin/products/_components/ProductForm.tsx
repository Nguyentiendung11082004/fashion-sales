import Loading from '@/common/Loading/Loading'
import { Iproduct } from '@/common/types/products'
import { createProduct, getProducts } from '@/services/api/products.api'
import { DownOutlined, UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Dropdown, Form, Input, Menu, Radio, RadioChangeEvent, Space } from 'antd'
import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const ProductForm = (props: Props) => {
    const { id } = useParams();
    const [typeProduct, setTypeProduct] = useState(null);
    const [typeBrand, setTypeBrand] = useState(null);
    const [typeCategory, setTypeCategory] = useState(null);
    const _inputRef = useRef<HTMLInputElement | null>(null);
    const [valueHome, setValueHome] = useState(1);
    const [valueTrend, setValueTrend] = useState(1);
    const [valueNew, setValueNew] = useState(1);

    const handleChangeType = (e: any) => {
        setTypeProduct(e.key);

    }
    const handleChangeBrand = (e: any) => {
        setTypeBrand(e.key)
    }

    const handleChangeCategory = (e:any) => {
        setTypeCategory(e.key)
    }
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    })



    const onChangeHome = (e: RadioChangeEvent) => {
        setValueHome(e.target.value);
    };
    const onChangeTrend = (e: RadioChangeEvent) => {
        setValueTrend(e.target.value);
    };

    const onChangeNew = (e: RadioChangeEvent) => {
        setValueNew(e.target.value);
    };


    const typesProduct = (
        <Menu onClick={handleChangeType}>
            <Menu.Item key="0">Sản phẩm đơn</Menu.Item>
            <Menu.Item key="1">Sản phẩm biến thể</Menu.Item>
        </Menu>
    );
    const typeLabelsProduct = {
        "0": "Sản phẩm đơn",
        "1": "Sản phẩm biến thể",
    };


    const typesBrand = (
        <Menu onClick={handleChangeBrand}>
            {
                data?.tag.map((item: any) => {
                    return <Menu.Item key={item.id}>{item.name}</Menu.Item>
                })
            }
        </Menu>
    )

    const typesDanhMuc = (
        <Menu onClick={handleChangeCategory}>
            {
                data?.category.map((item: any) => {
                    return <Menu.Item key={item.id}>{item.name}</Menu.Item>
                })
            }
        </Menu>
    )

    const createProductMutation = useMutation({
        mutationFn: createProduct
    })
    const onFinish = (data: Iproduct) => {
        createProductMutation.mutate(data)
    }

    return (
        <div className="p-6 min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                    {id ? 'Sửa Sản phẩm' : 'Thêm Sản phẩm'}
                </h1>
            </div>
            {
                isLoading ? (<Loading />)
                    : (
                        <Form layout='vertical' className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            onFinish={onFinish}
                        >
                            <Form.Item name="name" label="Tên sản phẩm" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="type" label="Kiểu sản phẩm" className="col-span-1">
                                <Dropdown overlay={typesProduct} placement="bottomLeft" className='w-full'>
                                    <Button>
                                        <Space>
                                            {typeProduct ? typeLabelsProduct[typeProduct] : 'Chọn kiểu sản phẩm'}
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </Form.Item>
                            <Form.Item name="brand_id" label="Thương hiệu" className="col-span-1">
                                <Dropdown overlay={typesBrand} placement="bottomLeft" className='w-full'>
                                    <Button>
                                        <Space>
                                            {typeBrand ? typeBrand : 'Chọn thương hiệu'}
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </Form.Item>
                            <Form.Item name="category_id" label="Danh mục" className="col-span-1">
                                <Dropdown overlay={typesDanhMuc} placement="bottomLeft" className='w-full'>
                                    <Button>
                                        <Space>
                                            {typeCategory ? typeCategory : 'Chọn danh mục'}
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </Form.Item>
                            <Form.Item name="image_thumbnail" label="Image Thumbnail" className="col-span-1">
                                <Button
                                    className='w-full'
                                    onClick={() => {
                                        _inputRef?.current?.click();
                                    }}
                                >
                                    <UploadOutlined />
                                    Chọn ảnh
                                </Button>
                                <input
                                    type="file"
                                    hidden
                                    className="hidden"
                                    ref={_inputRef}

                                />

                            </Form.Item>
                            <Form.Item name="slug" label="Slug" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="price_regular" label="Price Regular" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="price_sale" label="Price Sale" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="sku" label="SKU" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="description_title" label="Description Title" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="status" label="Status" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="is_show_home" label="Is Show Home" className="col-span-1">
                                <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
                                    <Radio.Group onChange={onChangeHome} value={valueHome} className="flex space-x-4">
                                        <Radio
                                            value={1}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            True
                                        </Radio>
                                        <Radio
                                            value={2}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            False
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>


                            <Form.Item name="is_trend" label="Is Trend" className="col-span-1">
                                <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
                                    <Radio.Group onChange={onChangeTrend} value={valueTrend} className="flex space-x-4">
                                        <Radio
                                            value={1}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            True
                                        </Radio>
                                        <Radio
                                            value={2}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            False
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                            <Form.Item name="is_new" label="Is New" className="col-span-1">
                                <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
                                    <Radio.Group onChange={onChangeNew} value={valueNew} className="flex space-x-4">
                                        <Radio
                                            value={1}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            True
                                        </Radio>
                                        <Radio
                                            value={2}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            False
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                            <Button type='primary' htmlType='submit' className="mt-4 col-span-3">Submit</Button>
                        </Form>
                    )
            }

        </div>
    )
}

export default ProductForm