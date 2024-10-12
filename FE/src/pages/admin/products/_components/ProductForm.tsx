import Loading from '@/common/Loading/Loading'
import { Icategories } from '@/common/types/categories'
import { IProductVariant, Iproduct } from '@/common/types/products'
import { Itags } from '@/common/types/tags'
import instance from '@/configs/axios'
import { productCreate, productStore, productUpdate } from '@/services/api/admin/products.api'
import { UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, InputNumber, Radio, RadioChangeEvent, Select, Skeleton, Switch, Table, Upload, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { UploadProps } from 'antd/es/upload'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
type ErrorResponse = {
    [key: string]: string[];
};

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
    const [error, setError] = useState<any>()

    const [variants, setVariants] = useState([
        { image: '', price_regular: '', price_sale: '', quantity: 0, sku: '' }
    ]);
    const handleInputChange = (index: number, field: string, value: any) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setVariants(newVariants);
    };
   
    const { data, isFetching } = useQuery({
        queryKey: ['productCreate'],
        queryFn: productCreate,
    })
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

    const columns: any = [
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
                render: (text: any, record: any, index: number) => (
                    <Input value={text} onChange={(e) => handleInputChange(index, attrId, e.target.value)} />
                )
            } : null;
        }).filter(Boolean) : [],
        {
            title: 'Ảnh',
            dataIndex: 'image',
            render: (text: any, record: any, index: number) => (
                <Upload
                    {...getPropsImgThumbnail(index)}
                >
                    <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                </Upload>
            )
        },
        {
            title: 'Price Regular',
            dataIndex: 'price_regular',
            render: (text: any, record: any, index: number) => (
                <Input value={text} onChange={(e) => handleInputChange(index, 'price_regular', e.target.value)} />
            )
        },
        {
            title: 'Price Sale',
            dataIndex: 'price_sale',
            render: (text: any, record: any, index: number) => (
                <Input value={text} onChange={(e) => handleInputChange(index, 'price_sale', e.target.value)} />
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (text: any, record: any, index: number) => (
                <Input value={text} onChange={(e) => handleInputChange(index, 'quantity', e.target.value)} />
            )
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            render: (text: any, record: any, index: number) => (
                <Input value={text} onChange={(e) => handleInputChange(index, 'sku', e.target.value)} />
            )
        },
        {
            title: 'Thao tác',
            render: (record: any) => (
                <Button onClick={() => handleRemoveAttributeValue(record)}>Xoá</Button>
            )
        }
    ];
    const handleErrorResponse = (error: any) => {
        console.log("error", error);
        setIsLoading(false); // Đặt loading về false ngay lập tức
    
        if (error.response && error.response.data.errors) {
            const errorFields: ErrorResponse = error.response.data.errors;
    
            // Thiết lập lỗi cho các trường có vấn đề
            const fields = Object.keys(errorFields).map((key) => ({
                name: key,
                errors: errorFields[key],
            }));
            form.setFields(fields);
    
            // Reset lỗi cho các trường không có vấn đề
            const allFieldNames = ['name', 'attribute_id', 'value']; // Thêm tất cả các trường có thể
            allFieldNames.forEach((field) => {
                if (!errorFields[field]) {
                    form.setFields([{ name: field, errors: [] }]);
                }
            });
        } else {
            toast.error('Có lỗi xảy ra');
        }
    };
    
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
        onError: handleErrorResponse,

    });
   

    const updateProductMutation = useMutation({
        mutationFn: (product: Iproduct) => productUpdate(Number(id), product),
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            })
            toast.success('Sửa sản phẩm thành công');
            form.resetFields();
            navigate('/admin/products')
        },
        onError: handleErrorResponse,
    })

    useEffect(() => {
        if (Object.keys(selectedValues).length > 0) {
            handleSaveAttributes();
        }
    }, [selectedValues]);

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
    useEffect(() => {
        if (productShow) {
            form.setFieldsValue(productShow);
        }
    }, [productShow, form]);

    const propsImgThumbnail: UploadProps = {
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dlvwxauhf/image/upload',
        data: {
            upload_preset: "fashion-sales",
            folder: "fashion-sales"
        },
        onChange(info: any) {
            if (info.file.status === "done") {
                const isImage = /^image\//.test(info.file.type);
                if (isImage) {
                    const imageUrl = info.file.response.url; // Định nghĩa biến imageUrl ở đây
                    setUrlImage(imageUrl); // Cập nhật URL
                    message.open({
                        type: 'success',
                        content: 'Upload ảnh thành công',
                    });


                }
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


    // Cập nhật propsImgThumbnail
    const getPropsImgThumbnail = (index: number): UploadProps => ({
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dlvwxauhf/image/upload',
        data: {
            upload_preset: "fashion-sales",
            folder: "fashion-sales"
        },
        onChange(info: any) {
            if (info.file.status === "done") {
                const isImage = /^image\//.test(info.file.type);
                if (isImage) {
                    const imageUrl = info.file.response.url;
                    const newVariants = [...variants];
                    newVariants[index] = { ...newVariants[index], image: imageUrl };
                    setVariants(newVariants);
                    message.open({ type: 'success', content: 'Upload ảnh thành công' });
                }
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    });

    const propsGallery: UploadProps = {
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dlvwxauhf/image/upload',
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
        const productVariantData: IProductVariant[] = [];
        const attributeData: { [key: string]: number[] } = {};

        selectedAttributeChildren.forEach(attrId => {
            const itemIds = selectedValues[attrId] || [];
            attributeData[attrId] = itemIds;
        });

        const attributeKeys = Object.keys(attributeData);
        const combinations: any[][] = [];

        const combine = (arr: any[], idx: number) => {
            if (idx === attributeKeys.length) {
                combinations.push(arr);
                return;
            }
            const key = attributeKeys[idx];
            attributeData[key].forEach(itemId => {
                combine([...arr, itemId], idx + 1);
            });
        };
        combine([], 0);
        combinations.forEach((combination, index) => {
            const variant = variants[index % variants.length];
            productVariantData.push({
                attribute_item_id: combination,
                price_regular: Number(variant.price_regular),
                price_sale: Number(variant.price_sale),
                quantity: Number(variant.quantity),
                sku: variant.sku,
                image: variant.image,
            });
        });

        if (!attribute) {
            if (id) {
                updateProductMutation.mutate({
                    ...values,
                    img_thumbnail: urlImage,
                    gallery: imageGallery,
                })
            } else {
                createProductMutation.mutate({
                    ...values,
                    img_thumbnail: urlImage,
                    gallery: imageGallery,
                });
            }
        } else {
            if (id) {
                updateProductMutation.mutate({
                    ...values,
                    img_thumbnail: urlImage,
                    attribute_item_id: attributeData,
                    gallery: imageGallery,
                    product_variant: productVariantData,
                });
            } else {
                createProductMutation.mutate({
                    ...values,
                    img_thumbnail: urlImage,
                    attribute_item_id: attributeData,
                    gallery: imageGallery,
                    product_variant: productVariantData,
                });
            }
        }
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
                                {error?.name && <div className='text-red-600'>{error.name.join(', ')}</div>}
                            </Form.Item>
                            <Form.Item name="tags" label="Tag" className="col-span-1">
                                <Select
                                    mode='multiple'
                                    options={
                                        data?.tag.map((item: Itags) => ({
                                            value: item?.id,
                                            label: item?.name
                                        }))
                                    }

                                    placeholder="Chọn tag"
                                    placement="bottomLeft" className='w-full' />
                                {error &&
                                    error.errors &&
                                    error.errors.tags &&
                                    error.errors.tags.length > 0 ? (
                                    <div className="text-red-600">{error.errors.tags[0]}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item name="brand_id" label="Thương hiệu" className="col-span-1">
                                <Select
                                    options={data?.brand.map((item: Itags) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}

                                    placeholder="Chọn thương hiệu"
                                    placement="bottomLeft" className='w-full' />
                                {error &&
                                    error.errors &&
                                    error.errors.brand_id &&
                                    error.errors.brand_id.length > 0 ? (
                                    <div className="text-red-600">{error.errors.brand_id[0]}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item name="category_id" label="Danh mục" className="col-span-1">
                                <Select
                                    options={data?.category.map((item: Icategories) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}

                                    placeholder="Chọn danh mục"
                                    placement="bottomLeft" className='w-full' />
                                {error &&
                                    error.errors &&
                                    error.errors.category_id &&
                                    error.errors.category_id.length > 0 ? (
                                    <div className="text-red-600">{error.errors.category_id[0]}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item name="slug" label="Slug" className="col-span-1">
                                <Input />
                                {error &&
                                    error.errors &&
                                    error.errors.slug &&
                                    error.errors.slug.length > 0 ? (
                                    <div className="text-red-600">{error.errors.slug[0]}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item name="sku" label="SKU" className="col-span-1">
                                <Input />
                                {error &&
                                    error.errors &&
                                    error.errors.sku &&
                                    error.errors.sku.length > 0 ? (
                                    <div className="text-red-600">{error.errors.sku[0]}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item name="img_thumbnail" label="Ảnh sản phẩm" >
                                <Upload
                                    {...propsImgThumbnail}
                                >
                                    <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                                </Upload>
                                {error &&
                                    error.errors &&
                                    error.errors.img_thumbnail &&
                                    error.errors.img_thumbnail.length > 0 ? (
                                    <div className="text-red-600">{error.errors.img_thumbnail[0]}</div>
                                ) : null}
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
                                {error &&
                                    error.errors &&
                                    error.errors.gallery &&
                                    error.errors.gallery.length > 0 ? (
                                    <div className="text-red-600">{error.errors.gallery[0]}</div>
                                ) : null}
                            </Form.Item>
                            {
                                !attribute && <>
                                    <Form.Item name="price_regular" label="Price Regular" className="col-span-1">
                                        <InputNumber />
                                        {error &&
                                            error.errors &&
                                            error.errors.price_regular &&
                                            error.errors.price_regular.length > 0 ? (
                                            <div className="text-red-600">{error.errors.price_regular[0]}</div>
                                        ) : null}
                                    </Form.Item>
                                    <Form.Item name="price_sale" label="Price Sale" className="col-span-1">
                                        <InputNumber />
                                        {error &&
                                            error.errors &&
                                            error.errors.price_sale &&
                                            error.errors.price_sale.length > 0 ? (
                                            <div className="text-red-600">{error.errors.price_sale[0]}</div>
                                        ) : null}
                                    </Form.Item>
                                    <Form.Item name="quantity" label="Số lượng" className="col-span-1">
                                        <InputNumber />
                                        {error &&
                                            error.errors &&
                                            error.errors.quantity &&
                                            error.errors.quantity.length > 0 ? (
                                            <div className="text-red-600">{error.errors.quantity[0]}</div>
                                        ) : null}
                                    </Form.Item>

                                </>
                            }
                            <Form.Item name="type" label="Kiểu sản phẩm" className="col-span-3">
                                <Select
                                    options={[
                                        {
                                            value: 0 || false,
                                            label: 'Sản phẩm đơn'
                                        },
                                        {
                                            value: 1 || true,
                                            label: 'Sản phẩm biến thể'
                                        }
                                    ]}
                                    onChange={handleChangeAttribute}
                                    placeholder="Chọn kiểu sản phẩm"
                                    placement="bottomLeft" className='w-full' />
                                {error &&
                                    error.errors &&
                                    error.errors.type &&
                                    error.errors.type.length > 0 ? (
                                    <div className="text-red-600">{error.errors.type[0]}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item className="col-span-3">
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
                                        className='w-full'
                                        dataSource={selectedItems}
                                        columns={columns}
                                        rowKey={(record) => record.id || record.value}
                                        pagination={false}
                                        key={JSON.stringify(selectedItems)}
                                    />

                                )}



                            </Form.Item>

                            <Form.Item name="description" label="Description" className="col-span-1">
                                <TextArea />
                                {error &&
                                    error.errors &&
                                    error.errors.description &&
                                    error.errors.description.length > 0 ? (
                                    <div className="text-red-600">{error.errors.description[0]}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item name="description_title" label="Description Title" className="col-span-1">
                                <Input />
                                {error &&
                                    error.errors &&
                                    error.errors.description_title &&
                                    error.errors.description_title.length > 0 ? (
                                    <div className="text-red-600">{error.errors.description_title[0]}</div>
                                ) : null}
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
