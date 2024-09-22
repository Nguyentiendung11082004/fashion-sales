import Loading from '@/common/Loading/Loading'
import { Iproduct } from '@/common/types/products'
import { Itags } from '@/common/types/tags'
import { createProduct, getProducts } from '@/services/api/products.api'
import { UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Form, Input, InputNumber, Radio, RadioChangeEvent, Select, Upload, message } from 'antd'
import { UploadFile, UploadProps } from 'antd/es/upload'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const ProductForm = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const _inputRef = useRef<HTMLInputElement | null>(null);

    const [valueHome, setValueHome] = useState(1);
    const [valueTrend, setValueTrend] = useState(1);
    const [valueNew, setValueNew] = useState(1);
    const [valueStatus,setValueStatus] = useState(1);
    const handleChangeTag = (e: any) => {
        console.log("tag", e)
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
    const onChangeStatus = (e: RadioChangeEvent) => {
        setValueStatus(e.target.value);
    };
    

    const createProductMutation = useMutation({
        mutationFn: createProduct,
    });
    const [urlImage, setUrlImage] = useState<any>();
    const [imageGallery, setImageGaller] = useState<any>([]);
    const propsImgThumbnail: UploadProps = {
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dvlmsxt43/image/upload',
        data: {
            upload_preset: "fashion-sales",
            folder: "fashion-sales"
        },
        onChange(info) {
            if (info.file.status === "done") {
                setUrlImage(info.file.response.url);
                message.open({
                    type: "success",
                    content: "Upload ảnh thành công",
                });
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }
    const propsGallery: UploadProps = {
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dvlmsxt43/image/upload',
        data: {
            upload_preset: "fashion-sales",
            folder: "fashion-sales"
        },
        multiple: true,
        onChange(info: any) {
            if (info.file.status === "done") {
                const isImage = /^image\//.test(info?.file?.type);
                if (isImage) {
                    setImageGaller((prev: any) => [...prev, info.file.response.url]);
                    message.open({
                        type: 'success',
                        content: 'Upload ảnh thành công',
                    });
                }
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
    }
    const onFinish = (values: Iproduct) => {
        createProductMutation.mutate({
            ...values,
            img_thumbnail: urlImage,
            gallery: imageGallery,
        });
        console.log("values", {
            ...values,
            img_thumbnail: urlImage,
            gallery: imageGallery,
        })

    };



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

                            form={form}
                        >
                            <Form.Item name="name" label="Tên sản phẩm" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="type" label="Kiểu sản phẩm" className="col-span-1">
                                <Select
                                    options={[
                                        {
                                            value: 0,
                                            label: 'Sản phẩm đơn'
                                        },
                                        {
                                            value: 1,
                                            label: 'Sản phẩm biến thể'
                                        }
                                    ]}
                                    onChange={(e) => handleChangeTag(e.target.value)}
                                    placeholder="Chọn thương hiệu"
                                    placement="bottomLeft" className='w-full' />
                            </Form.Item>
                            <Form.Item name="tags" label="Tag" className="col-span-1">
                                <Select
                                    mode='multiple'
                                    options={data?.tag.map((item: Itags) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}
                                    onChange={(e) => handleChangeTag(e.target.value)}
                                    placeholder="Chọn thương hiệu"
                                    placement="bottomLeft" className='w-full' />
                            </Form.Item>
                            <Form.Item name="brand_id" label="Thương hiệu" className="col-span-1">
                                <Select
                                    options={data?.brand.map((item: Itags) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}
                                    onChange={(e) => handleChangeTag(e.target.value)}
                                    placeholder="Chọn thương hiệu"
                                    placement="bottomLeft" className='w-full' />
                            </Form.Item>
                            <Form.Item name="category_id" label="Danh mục" className="col-span-1">
                                <Select

                                    options={data?.category.map((item: Itags) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}
                                    onChange={(e) => handleChangeTag(e.target.value)}
                                    placeholder="Chọn danh mục"
                                    placement="bottomLeft" className='w-full' />
                            </Form.Item>


                            <Form.Item
                                name="img_thumbnail"
                                label="Ảnh sản phẩm"

                            >
                                <Upload
                                    {...propsImgThumbnail}

                                >
                                    <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                                </Upload>
                            </Form.Item>


                            <Form.Item
                                name="gallery"
                                label="Chọn mảng nhiều ảnh"
                                className="col-span-1"
                            >

                                <Upload
                                    {...propsGallery}
                                >
                                    <Button icon={<UploadOutlined />}>Tải lên gallery</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item name="slug" label="Slug" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="quantity" label="Số lượng" className="col-span-1">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name="price_regular" label="Price Regular" className="col-span-1">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name="price_sale" label="Price Sale" className="col-span-1">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name="sku" label="SKU" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="short_description" label="Description Title" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="status" label="Status" className="col-span-1" initialValue={'1'}>
                                <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
                                    <Radio.Group onChange={onChangeStatus} value={valueStatus} className="flex space-x-4">
                                        <Radio
                                            value={1}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            Còn hàng
                                        </Radio>
                                        <Radio
                                            value={0}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            Hết hàng
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                            <Form.Item name="is_show_home" label="Is Show Home" className="col-span-1" initialValue={'1'}> 
                                <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
                                    <Radio.Group onChange={onChangeHome} value={valueHome} className="flex space-x-4">
                                        <Radio
                                            value={1}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            True
                                        </Radio>
                                        <Radio
                                            value={0}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            False
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>


                            <Form.Item name="is_trend" label="Is Trend" className="col-span-1" initialValue={'1'}>
                                <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
                                    <Radio.Group onChange={onChangeTrend} value={valueTrend} className="flex space-x-4">
                                        <Radio
                                            value={1}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            True
                                        </Radio>
                                        <Radio
                                            value={0}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            False
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                            <Form.Item name="is_new" label="Is New" className="col-span-1" initialValue={'1'}>
                                <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
                                    <Radio.Group onChange={onChangeNew} value={valueNew} className="flex space-x-4">
                                        <Radio
                                            value={1}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            True
                                        </Radio>
                                        <Radio
                                            value={0}
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