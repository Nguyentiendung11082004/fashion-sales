import { Iproduct } from '@/common/types/products'
import { Itags } from '@/common/types/tags'
import instance from '@/configs/axios'
import { productCreate, productStore } from '@/services/api/products.api'
import { UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, InputNumber, Radio, RadioChangeEvent, Select, Skeleton, Switch, Table, Upload, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { UploadProps } from 'antd/es/upload'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const ProductForm = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [valueHome, setValueHome] = useState(1);
    const [valueTrend, setValueTrend] = useState(1);
    const [valueNew, setValueNew] = useState(1);
    const [valueStatus, setValueStatus] = useState(1);
    const [urlImage, setUrlImage] = useState<any>();
    const [imageGallery, setImageGaller] = useState<any>([]);
    const [attribute, setAttribute] = useState(false);
    const [selectedAttributeChildren, setSelectedAttributeChildren] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const [selectedItems, setSelectedItems] = useState<any>([]); // giá trị khi lưu ở table
    const [isTableVisible, setIsTableVisible] = useState(false); // State điều khiển hiển thị bảng
    const [selectedValues, setSelectedValues] = useState<any>([]); // State lưu trữ giá trị đã chọn cho từng thuộc tính
    const [isColumnsVisible, setIsColumnsVisible] = useState(false); // state cột
    const { data, isFetching } = useQuery({
        queryKey: ['productCreate'],
        queryFn: productCreate,
    })
    // console.log("data", data.attribute)
    const handleChangeAttribute = (value: number) => {
        setAttribute(value === 1);
        setSelectedAttributeChildren([])
        setIsTableVisible(false)
    };
    const handleChangeAttributeChildren = (values: any) => {
        setSelectedAttributeChildren(values);
        const newSelectedValues = { ...selectedValues };
        values.forEach((attrId: any) => {
            if (!(attrId in newSelectedValues)) {
                newSelectedValues[attrId] = [];
            }
        });
        Object.keys(newSelectedValues).forEach(attrId => {
            if (!values.includes(Number(attrId))) {
                newSelectedValues[attrId] = [];
                form.setFieldsValue({ [`size_${attrId}`]: [] });
            }
        });
        setSelectedValues(newSelectedValues);
        handleSaveAttributes();
    };
    const handleChangeAttributeItem = (attrId: number, values: any) => {
        const newSelectedValues = {
            ...selectedValues,
            [attrId]: values,
        };

        if (values.length === 0) {
            const { [attrId]: _, ...rest } = newSelectedValues;
            setSelectedValues(rest);
            setSelectedAttributeChildren(prev => {
                let rs = [...prev.filter(id => id !== attrId)]
                form.setFieldValue('attribute_id', rs)
                return rs;
            });
            // form.setFieldsValue({ [`size_${attrId}`]: [] });
            // const hasValues = Object.values(rest).some((val: any) => val.length > 0);
            // setIsTableVisible(hasValues);
        } else {
            setSelectedValues(newSelectedValues);
            setIsTableVisible(true);
        }
        handleSaveAttributes();
    };


    const handleSaveAttributes = () => {
        const combinedItems: { [key: string]: string }[] = [];
        const attributeNames = Object.keys(selectedValues).filter(attrId => selectedValues[attrId]?.length > 0);

        const createCombinations = (index: number, currentCombination: { [key: string]: string }) => {
            if (index === attributeNames.length) {
                combinedItems.push({ ...currentCombination });
                return;
            }

            const attrName = attributeNames[index];
            const items = selectedValues[attrName] || [];
            if (items.length === 0) return;

            items.forEach((itemId: any) => {
                const item = data?.attribute.find((attr: any) => attr.id === Number(attrName))?.attributeitems.find((i: any) => i.id === itemId);


                if (itemId === 0) {
                    delete currentCombination[attrName];
                } else if (item) {
                    const newCombination = { ...currentCombination, [attrName]: item.value };
                    createCombinations(index + 1, newCombination);
                }
            });
        };
        createCombinations(0, {});
        setSelectedItems(combinedItems);
        setIsColumnsVisible(combinedItems.length > 0);
    };


    const handleRemoveAttributeValue = (record: any) => {
        const updatedItems = selectedItems.filter((item: any) => item !== record);
        setSelectedItems(updatedItems);

        // Object.keys(updatedItems).forEach(attrId => {
        //     if (!record.includes(Number(attrId))) {
        //         updatedItems[attrId] = [];
        //         form.setFieldsValue({ [`size_${attrId}`]: [] });
        //     }
        // });



        setIsTableVisible(updatedItems.length > 0);
    };

    const columns: any[] = [
        {
            title: 'STT',
            render: (text: any, record: any, index: number) => <div>{index + 1}</div>,
            key: 'Stt',
        },
        ...isColumnsVisible ? Object.keys(selectedValues).filter(attrId => selectedValues[attrId].length > 0).map(attrId => {
            const attribute = data?.attribute.find((attr: any) => attr.id === Number(attrId));
            return attribute ? {
                title: attribute.name,
                dataIndex: attrId,
                key: attrId,
            } : null;
        }).filter(Boolean) : [],
        {
            title: 'Ảnh',
            dataIndex: 'img',
            render: () => (<Input type='file'></Input>)
        },
        {
            title: 'Mảng Ảnh',
            dataIndex: 'gallery',
            render: () => (<Input type='file'></Input>)
        },
        {
            title: 'Price Regular',
            dataIndex: 'Price Regular',
            render: () => (<Input ></Input>)
        },
        {
            title: 'Price Sale',
            dataIndex: 'Price Sale',
            render: () => (<Input ></Input>)
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: () => (<Input></Input>)
        },
        {
            title: 'Thao tác',
            render: (record: any) => (<Button onClick={() => handleRemoveAttributeValue(record)}>Xoá</Button>)
        }
    ];

    const createProductMutation = useMutation({
        mutationFn: productStore,
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            })
            toast.success('Thêm sản phẩm thành công');
            form.resetFields();
            navigate('/admin/products')
        },
        onError: () => {
            toast.error('Thêm sản phẩm thất bại');
            setIsLoading(false)
        }
    });

    useEffect(() => {
        if (Object.keys(selectedValues).length > 0) {
            handleSaveAttributes();
        }
    }, [selectedValues]);
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
    const { data: productShow } = useQuery({
        queryKey: ['productShow', id],
        queryFn: async () => {
            if (!id) return null;
            const response = await instance.get(`/products/${id}`);
            return response.data.product;
        },
        enabled: !!id
    });
    const propsImgThumbnail: UploadProps = {
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dvlmsxt43/image/upload',
        data: {
            upload_preset: "fashion-sales",
            folder: "fashion-sales"
        },
        onChange(info: any) {
            if (info.file.status === "done") {
                const isImage = /^image\//.test(info?.file?.type);
                if (isImage) {
                    setUrlImage(info.file.response.url);
                    message.open({
                        type: "success",
                        content: "Upload ảnh thành công",
                    });
                }
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }
    const onFinish = (values: Iproduct) => {
        const attributeItemIds: number[] = selectedAttributeChildren
            .map(attrId => selectedValues[attrId])
            .flat();

        createProductMutation.mutate({
            ...values,
            img_thumbnail: urlImage,
            gallery: imageGallery,
            attribute_item_id: attributeItemIds, // trực tiếp gán mảng số vào đây
        });
    };



    return (
        <div className="p-6 min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                    {id ? 'Sửa Sản phẩm' : 'Thêm Sản phẩm'}
                </h1>
            </div> 
            {
                isFetching ? (<Skeleton />)
                    : (
                        <Form layout='vertical' className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            onFinish={onFinish}
                            form={form}
                        >
                            <Form.Item name="name" label="Tên sản phẩm" className="col-span-1"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="tags" label="Tag" className="col-span-1">
                                <Select
                                    mode='multiple'
                                    options={data?.tag.map((item: Itags) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}

                                    placeholder="Chọn tag"
                                    placement="bottomLeft" className='w-full' />
                            </Form.Item>
                            <Form.Item name="brand_id" label="Thương hiệu" className="col-span-1">
                                <Select
                                    options={data?.brand.map((item: Itags) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}

                                    placeholder="Chọn thương hiệu"
                                    placement="bottomLeft" className='w-full' />
                            </Form.Item>
                            <Form.Item name="category_id" label="Danh mục" className="col-span-1">
                                <Select

                                    options={data?.category.map((item: Itags) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}

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
                            <Form.Item name="type" label="Kiểu sản phẩm" className="col-span-3">
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
                                    onChange={handleChangeAttribute}
                                    placeholder="Chọn kiểu sản phẩm"
                                    placement="bottomLeft" className='w-full' />
                            </Form.Item>
                            <Form.Item className="col-span-2">
                                {attribute && (
                                    <Form.Item name="attribute_id" label="Chọn thuộc tính">
                                        <Select
                                            value={selectedAttributeChildren}
                                            options={data?.attribute.map((item: any) => ({
                                                value: item.id,
                                                label: item.name,
                                            })) || []}
                                            mode='multiple'
                                            onChange={handleChangeAttributeChildren}
                                        />
                                    </Form.Item>
                                )}
                                {selectedAttributeChildren.map(attrId => {
                                    const attributeItem = data?.attribute.find((item: any) => item?.id === attrId);
                                    return (
                                        attributeItem && (
                                            <div key={attrId}>
                                                <Form.Item name={`${attrId}`} label={`Chọn ${attributeItem.name}`}>
                                                    <Select
                                                        options={attributeItem && selectedValues && attributeItem.attributeitems.map((item: any) => ({
                                                            value: item.id,
                                                            label: item.value,
                                                        }))}
                                                        mode='multiple'
                                                        onChange={values => handleChangeAttributeItem(attrId, values)}
                                                        value={selectedValues[attrId]}
                                                    />
                                                </Form.Item>
                                            </div>
                                        )
                                    );
                                })
                                }
                                {/* {
                                    attribute && (<Button type="primary" onClick={handleSaveAttributes}
                                    >Lưu thuộc tính</Button>)
                                } */}
                                {
                                    attribute && <Button type='default' onClick={() => {
                                        setSelectedAttributeChildren([]);
                                        setSelectedValues({});
                                        setIsTableVisible(false);
                                        setAttribute(false)
                                        form.resetFields();
                                    }}>Hủy</Button>

                                }

                                {attribute && isTableVisible && (
                                    <Table
                                        dataSource={selectedItems}
                                        columns={columns}
                                        rowKey={(record) => record.id || record.value}
                                        pagination={false}
                                        key={JSON.stringify(selectedItems)}
                                    />

                                )}



                            </Form.Item>
                            <Form.Item name="sku" label="SKU" className="col-span-1">
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description" className="col-span-1">
                                <TextArea />
                            </Form.Item>
                            <Form.Item name="description_title" label="Description Title" className="col-span-1">
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


                            <Form.Item name="trend" label="Is Trend" className="col-span-1" initialValue={'1'}>
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
                            <br />
                            <Button type='primary' htmlType='submit' className="mt-4 w-20"
                                loading={isLoading}
                            >Submit</Button>
                        </Form>
                    )
            }
        </div>
    )
}
export default ProductForm
