/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { UploadFile, UploadProps } from 'antd/es/upload'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { productDestroy } from '@/services/api/admin/products.api'
import { generateGUID } from '@/common/utils/utils'
type ErrorResponse = {
    [key: string]: string[];
};

const ProductForm = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [urlImage, setUrlImage] = useState<any>();
    const [imageGallery, setImageGaller] = useState<any[]>([]);
    const [attribute, setAttribute] = useState<number>(0);
    const [selectedAttributeChildren, setSelectedAttributeChildren] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const [selectedItems, setSelectedItems] = useState<any>([]); // giá trị khi lưu ở table 

    const [isTableVisible, setIsTableVisible] = useState(false); // State điều khiển hiển thị bảng
    const [selectedValues, setSelectedValues] = useState<any>([]); // State lưu trữ giá trị đã chọn cho từng thuộc tính
    console.log("selectedValues", selectedValues)
    const [isColumnsVisible, setIsColumnsVisible] = useState(false); // state cột
    const [error, setError] = useState<any>()
    const [valueHome, setValueHome] = useState(1);
    const [valueTrend, setValueTrend] = useState(1);
    const [valueNew, setValueNew] = useState(1);
    const [valueStatus, setValueStatus] = useState(1);
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
    // const [checkedItems, setCheckedItems] = useState<any[]>([]);

    const [variants, setVariants] = useState([
        { id_guid: '', image: '', price_regular: '', price_sale: '', quantity: '', sku: '' }
    ]);
    console.log("variants", variants)
    // const handleInputChange = (idOrIndex: any, field: string, value: any) => {
    //     console.log("idOrIndex", typeof idOrIndex);

    //     const newVariants = [...variants];

    //     // Kiểm tra nếu idOrIndex là id_guid hoặc index
    //     if (typeof idOrIndex === 'string') {  // Nếu idOrIndex là id_guid (string)
    //         console.log("bienthe");
    //         // Duyệt qua tất cả các variants và cập nhật variant có id_guid tương ứng
    //         const updatedVariants = newVariants.map((variant) => {
    //             if (variant.id_guid === idOrIndex) {
    //                 return { ...variant, [field]: value }; // Cập nhật giá trị cho variant có id_guid
    //             }
    //             return variant; // Giữ nguyên các variant khác
    //         });
    //         setVariants(updatedVariants); // Cập nhật lại mảng variants
    //     } else if (typeof idOrIndex === 'number') {  // Nếu idOrIndex là index
    //         console.log("don");
    //         newVariants[idOrIndex] = { ...newVariants[idOrIndex], [field]: value }; // Cập nhật giá trị tại vị trí index
    //         setVariants(newVariants); // Cập nhật lại mảng variants
    //     }
    // };

    const handleInputChange = (index: number, field: string, value: any) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setVariants(newVariants);
    };


    const { data, isFetching } = useQuery({
        queryKey: ['productCreate'],
        queryFn: productCreate,
    });

    const handleChangeAttribute = (value: number) => {
        if (value === attribute) return;

        setAttribute(value);
        setSelectedAttributeChildren([]);
        setIsTableVisible(false);
        setSelectedItems([]);

        // Reset giá trị đã chọn
        const newCheckedItems = Array(variants.length).fill(false);
        // setCheckedItems(newCheckedItems);

        if (value === 0) {
            form.resetFields(['price_regular', 'price_sale', 'quantity']);
            const fieldsToClear = selectedAttributeChildren.concat(['attribute_id']);
            form.setFieldsValue(Object.fromEntries(fieldsToClear.map(field => [field, undefined])));
            setSelectedValues({}); // Reset selectedValues nếu cần
        } else {
            const fieldsToReset = [...selectedAttributeChildren];
            form.setFieldsValue(Object.fromEntries(fieldsToReset.map(field => [field, undefined])));
        }
    };
    const handleChangeAttributeChildren = (values: any) => {
        setSelectedAttributeChildren(values);
        const newSelectedValues = { ...selectedValues };
        values.forEach((attrId: any) => {
            if (!(attrId in newSelectedValues)) {
                newSelectedValues[attrId] = [];
            }
        });
        setSelectedValues(newSelectedValues);
        handleSaveAttributes();
    };
    const handleChangeAttributeItem = (attrId: number, values: any) => {
        setSelectedValues((prevValues: any) => ({
            ...prevValues,
            [attrId]: values,
        }));
        if (values.length === 0) {
            setSelectedAttributeChildren(prev => {
                const newChildren = prev.filter(id => id !== attrId);
                form.setFieldValue('attribute_id', newChildren);
                return newChildren;
            });
        } else {
            setIsTableVisible(true);
        }
        handleSaveAttributes();
    };

    const handleSaveAttributes = () => {
        const combinedItems: { [key: string]: string }[] = [];
        const attributeNames = Object.keys(selectedValues).filter(attrId => selectedValues[attrId]?.length > 0);

        const createCombinations = (index: number, currentCombination: { [key: string]: string }) => {
            if (index === attributeNames.length) {
                if (Object.keys(currentCombination).length > 0) {
                    // Kết hợp với ảnh
                    const variantWithImage = variants[index] ? { ...currentCombination, image: variants[index].image } : currentCombination;
                    combinedItems.push(variantWithImage);
                }
                return;
            }

            const attrName = attributeNames[index];
            const items = selectedValues[attrName] || [];

            if (items.length === 0) return;

            items.forEach((itemId: any) => {
                const item = data?.attribute.find((attr: any) => attr.id === Number(attrName))
                    ?.attributeitems.find((i: any) => i.id === itemId);

                if (item) {
                    const newCombination = { ...currentCombination, [attrName]: item.value };
                    createCombinations(index + 1, newCombination);
                }
            });
        };

        createCombinations(0, {});
        setSelectedItems(combinedItems);
        setIsColumnsVisible(combinedItems.length > 0);
    };
    const getPropsImgThumbnail = (index: number): UploadProps => ({
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dlvwxauhf/image/upload',
        data: {
            upload_preset: "fashion-sales",
            folder: "fashion-sales"
        },
        listType: "picture",
        onChange(info: any) {
            if (info.file.status === "done") {
                const isImage = /^image\//.test(info.file.type);
                if (isImage) {
                    const imageUrl = info.file.response.url;
                    const newVariants = [...variants];
                    newVariants[index] = { ...newVariants[index], image: imageUrl };
                    setVariants(newVariants); // Cập nhật lại variants
                    message.open({ type: 'success', content: 'Upload ảnh thành công' });
                }
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(file) {
            // Khi xóa ảnh, cần cập nhật lại variants
            setVariants(prevVariants => {
                const newVariants = [...prevVariants];
                newVariants[index] = { ...newVariants[index], image: '' }; // Reset ảnh
                return newVariants;
            });
            message.info(`${file.name} đã bị xóa.`);
            return true;
        }
    });
    const propsGallery: UploadProps = {
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dlvwxauhf/image/upload',
        data: {
            upload_preset: "fashion-sales",
            folder: "fashion-sales"
        },
        multiple: true,
        listType: "picture",
        onChange(info: any) {
            if (info.file.status === "done") {
                const isImage = /^image\//.test(info?.file?.type);
                if (isImage) {
                    const newImageUrl = info.file.response.secure_url || info.file.response.url;
                    setImageGaller((prev) => {
                        const newGallery = [...prev, newImageUrl];
                        return newGallery;
                    });
                    message.open({
                        type: 'success',
                        content: 'Upload ảnh thành công',
                    });
                }
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(file) {
            setImageGaller((prev) => prev.filter((imgUrl) => imgUrl !== file.url));
            message.info(`${file.name} đã bị xóa.`);
            return true;
        }
    };
    const propsImgThumbnail: UploadProps = {
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dlvwxauhf/image/upload',
        data: {
            upload_preset: "fashion-sales",
            folder: "fashion-sales"
        },
        listType: "picture",
        onChange(info: any) {
            if (info.file.status === "done") {
                const isImage = /^image\//.test(info.file.type);
                if (isImage) {
                    const imageUrl = info.file.response.url;
                    setUrlImage(imageUrl);
                    message.open({
                        type: 'success',
                        content: 'Upload ảnh thành công',
                    });


                }
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(file) {
            setUrlImage(null);
            message.info(`${file.name} đã bị xóa.`);
            return true;
        },
    };
    const columns: any = [
        // {
        //     title: "Checkox",
        //     render: (text: any, record: any, index: number) => (
        //         <Input
        //             type="checkbox"
        //             checked={!!checkedItems[index]}
        //             onChange={() => handleCheckboxChange(index)}
        //         />
        //     ),
        // },
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
                render: (text: any, record: any) => (
                    <Input value={record[attrId] || []} onChange={(e) => handleInputChange(record.key, attrId, e.target.value)} />
                )
            } : null;
        }).filter(Boolean) : [],
        {
            title: 'Ảnh',
            dataIndex: 'image',
            render: (text: any, record: any, index: number) => (
                <>
                    <Upload
                        {...getPropsImgThumbnail(index)}
                        onChange={(info) => {
                            if (info.file.status === 'done') {
                                const imageUrl = info.file.response.secure_url;
                                setVariants(prevVariants => {
                                    const newVariants = [...prevVariants];
                                    newVariants[index] = { ...newVariants[index], image: imageUrl };
                                    return newVariants;
                                });
                            }
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                    </Upload>
                    {
                        productShow?.galleries && (
                            <div className="flex">
                                {/* {
                                    variants[index]?.map((e: any) => (
                                        <> */}
                                <img src={variants[index]?.image} alt="Uploaded" style={{ marginTop: 16, width: 30, height: '30px', marginBottom: '10px' }} />
                                {/* </>
                                    ))
                                } */}
                            </div>
                        )
                    }
                </>
            )
        },
        {
            title: 'Price Regular',
            dataIndex: 'price_regular',
            render: (text: any, record: any, index: number) => (
                <div>
                    <Input
                        value={variants[index]?.price_regular || ''}
                        onChange={(e) => handleInputChange(index, 'price_regular', e.target.value)} />
                    {variantErrors[index]?.price_regular && (
                        <div style={{ color: 'red', fontSize: '12px' }}>
                            {variantErrors[index].price_regular}
                        </div>
                    )}
                </div>
            )
        },

        {
            title: 'Price Sale',
            dataIndex: 'price_sale',
            render: (text: any, record: any, index: number) => (
                <div>
                    <Input
                        value={variants[index]?.price_sale || ''}
                        onChange={(e) => handleInputChange(index, 'price_sale', e.target.value)} />
                    {variantErrors[index]?.price_sale && (
                        <div style={{ color: 'red', fontSize: '12px' }}>
                            {variantErrors[index].price_sale}
                        </div>
                    )}
                </div>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (text: any, record: any, index: number) => (
                <div>
                    <Input
                        value={variants[index]?.quantity}
                        min={0}
                        onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                    />
                    {variantErrors[index]?.quantity && (
                        <div style={{ color: 'red', fontSize: '12px' }}>
                            {variantErrors[index].quantity}
                        </div>
                    )}
                </div>
            )
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            render: (text: any, record: any, index: number) => (
                <div>
                    <Input
                        value={variants[index]?.sku || ''}
                        onChange={(e) => handleInputChange(index, 'sku', e.target.value)}
                    />
                    {variantErrors[index]?.sku && (
                        <div style={{ color: 'red', fontSize: '12px' }}>
                            {variantErrors[index].sku}
                        </div>
                    )}
                </div>
            )
        },
        // {
        //     title: 'Price Regular',
        //     dataIndex: 'price_regular',
        //     render: (text: any, record: any, index: number) => {
        //         console.log("variants", variants);

        //         // Trường hợp có id (tức là đang cập nhật)
        //         const { image, ...otherAttributes } = record;
        //         const matchingVariant = variants.find((variant: any) => {
        //             return variant?.attributes && Object.keys(otherAttributes).every(
        //                 (key) => variant?.attributes[key] === otherAttributes[key]
        //             );
        //         });

        //         // Sử dụng id_guid nếu có, nếu không có thì dùng index
        //         const idToUpdate = matchingVariant?.id_guid ? matchingVariant?.id_guid : index;

        //         if (id) {
        //             return (
        //                 <Input
        //                     value={matchingVariant?.price_regular}
        //                     onChange={(e) => handleInputChange(idToUpdate, 'price_regular', e.target.value)}
        //                 />
        //             );
        //         } else {
        //             return (
        //                 <Input
        //                     value={variants[index]?.price_regular || ''}
        //                     onChange={(e) => handleInputChange(idToUpdate, 'price_regular', e.target.value)}
        //                 />
        //             )
        //         }

        //     }
        // },

        // {
        //     title: 'Price Sale',
        //     dataIndex: 'price_sale',
        //     render: (text: any, record: any, index: number) => {
        //         // Kiểm tra nếu đây là trường hợp thêm mới (dựa vào id_guid)
        //         if (!id) {  // Kiểm tra nếu không có id_guid là trường hợp thêm mới
        //             return (
        //                 <Input
        //                     value={variants[index]?.price_sale || ''}
        //                     onChange={(e) => handleInputChange(index, 'price_sale', e.target.value)} // Dùng index cho thêm mới
        //                 />
        //             );
        //         }

        //         // Trường hợp cập nhật
        //         const { image, ...otherAttributes } = record;
        //         const matchingVariant = variants.find((variant: any) => {
        //             return variant?.attributes && Object.keys(otherAttributes).every(
        //                 (key) => variant?.attributes[key] === otherAttributes[key]
        //             );
        //         });

        //         return (
        //             <Input
        //                 value={matchingVariant?.price_sale || ''}
        //                 onChange={(e) => handleInputChanges(matchingVariant?.id_guid, 'price_sale', e.target.value)} // Dùng id_guid cho cập nhật
        //             />
        //         );
        //     }
        // },

        // {
        //     title: 'Số lượng',
        //     dataIndex: 'quantity',
        //     render: (text: any, record: any, index: number) => {
        //         // Kiểm tra nếu đây là trường hợp thêm mới (dựa vào id_guid)
        //         if (!id) {  // Nếu không có id_guid, là trường hợp thêm mới
        //             return (
        //                 <Input
        //                     value={variants[index]?.quantity || ''}
        //                     onChange={(e) => handleInputChange(index, 'quantity', e.target.value)} // Dùng index cho thêm mới
        //                 />
        //             );
        //         }

        //         // Trường hợp cập nhật
        //         const { image, ...otherAttributes } = record;
        //         const matchingVariant = variants.find((variant: any) => {
        //             return variant?.attributes && Object.keys(otherAttributes).every(
        //                 (key) => variant?.attributes[key] === otherAttributes[key]
        //             );
        //         });


        //         return (
        //             <Input
        //                 value={matchingVariant?.quantity || ''}
        //                 onChange={(e) => handleInputChanges(matchingVariant?.id_guid, 'quantity', e.target.value)} // Dùng id_guid cho cập nhật
        //             />
        //         );
        //     }
        // },

        // {
        //     title: 'SKU',
        //     dataIndex: 'sku',
        //     render: (text: any, record: any, index: number) => {
        //         // Kiểm tra nếu đây là trường hợp thêm mới (dựa vào id_guid)
        //         if (!id) {  // Nếu không có id_guid, là trường hợp thêm mới
        //             return (
        //                 <Input
        //                     value={variants[index]?.sku || ''}
        //                     onChange={(e) => handleInputChange(index, 'sku', e.target.value)} // Dùng index cho thêm mới
        //                 />
        //             );
        //         }

        //         // Trường hợp cập nhật
        //         const { image, ...otherAttributes } = record;
        //         const matchingVariant = variants.find((variant: any) => {
        //             return variant?.attributes && Object.keys(otherAttributes).every(
        //                 (key) => variant?.attributes[key] === otherAttributes[key]
        //             );
        //         });

        //         console.log("matchingVariant for SKU", matchingVariant);

        //         return (
        //             <Input
        //                 value={matchingVariant?.sku || ''}
        //                 onChange={(e) => handleInputChanges(matchingVariant?.id_guid, 'sku', e.target.value)} // Dùng id_guid cho cập nhật
        //             />
        //         );
        //     }
        // }


    ];


    useEffect(() => {
        if (Object.keys(selectedValues).length > 0) {
            handleSaveAttributes();
        }
    }, [selectedValues]);
    const { data: productShow } = useQuery({
        queryKey: ['productShow', id],
        queryFn: async () => {
            if (!id) return null;
            const response = await instance.get(`/products/${id}`);
            return response.data.product;
        },
        enabled: !!id
    });
    const getProduct = (productShow: any) => {
        const productTags = productShow.tags.map((tag: any) => tag.id);
        const productType = productShow.type ? 1 : 0;
        const productAttribute = productShow.attributes.map((attribute: any) => attribute.id);

        // Chuyển các attribute_item_ids thành một object để dễ dàng lấy giá trị của từng attribute
        const productAttributeValue = productShow.attributes.reduce((acc: any, attribute: any) => {
            acc[attribute.id] = attribute.pivot.attribute_item_ids;
            return acc;
        }, {});

        const initialGalleryFiles = (productShow.gallery || []).map((galleryItem: any, index: number) => ({
            uid: String(galleryItem.id || index),
            name: galleryItem.image.substring(galleryItem.image.lastIndexOf('/') + 1),
            status: 'done',
            url: galleryItem.image,
        }));

        // Thiết lập dữ liệu cho gallery, attributes, và variants
        setImageGaller(initialGalleryFiles.map((item: any) => item.url));
        setAttribute(productType);
        setSelectedAttributeChildren(productAttribute);
        setSelectedValues(productAttributeValue);

        // Xử lý variants và cập nhật theo id_guid
        const initialItems = productShow.variants.map((item: any) => {
            const itemAttributes = productAttribute.reduce((acc: any, attrId: any) => {
                acc[attrId] = item[attrId] || [];
                return acc;
            }, {});

            return {
                id_guid: item.id_guid,
                price_regular: item.price_regular,
                price_sale: item.price_sale,
                quantity: item.quantity,
                sku: item.sku,
                ...itemAttributes
            };
        });

        setSelectedItems(initialItems);


        // Xử lý variants và so sánh attributes với selectedItems
        const initialVariants = productShow.variants.map((variant: any) => {

            // Chuyển đổi attributes thành đối tượng key-value với id làm key và value từ pivot
            const variantAttributes = variant.attributes.reduce((acc: any, attribute: any) => {
                const { id, pivot } = attribute;
                const value = pivot ? pivot.value : null;

                if (value) {
                    acc[id] = value; // Thêm giá trị vào đối tượng với id làm khóa
                }

                return acc;
            }, {});


            // Tìm xem variantAttributes có trùng với selectedItems không
            const matchingItem = selectedItems.find((selectedItem: any) => {
                // Kiểm tra nếu attributes của variant khớp với selectedItem
                return Object.keys(variantAttributes).every(attrId => selectedItem[attrId] === variantAttributes[attrId]);
            });

            if (matchingItem) {
                // Nếu có trùng, trả về item đã đồng bộ
                return {
                    ...matchingItem,
                    id_guid: variant.id_guid,
                    image: variant.image || '',
                    price_regular: variant.price_regular || '',
                    price_sale: variant.price_sale || '',
                    quantity: variant.quantity || '',
                    sku: variant.sku || '',
                    attributes: variantAttributes, // Đồng bộ attributes
                };
            } else {
                // Nếu không có trùng, giữ nguyên thông tin variant
                return {
                    id_guid: variant.id_guid,
                    image: variant.image || '',
                    price_regular: variant.price_regular || '',
                    price_sale: variant.price_sale || '',
                    quantity: variant.quantity || '',
                    sku: variant.sku || '',
                    attributes: variantAttributes,
                };
            }
        });

        setVariants(initialVariants);  // Cập nhật state variants

        // Cập nhật trạng thái các flag (status, home, trend, new)
        setValueStatus(productShow.status ? 1 : 0);
        setValueHome(productShow.is_show_home ? 1 : 0);
        setValueTrend(productShow.trend ? 1 : 0);
        setValueNew(productShow.is_new ? 1 : 0);

        // Cập nhật form với dữ liệu mới
        form.setFieldsValue({
            ...productShow,
            status: productShow.status ? 1 : 0,
            is_show_home: productShow.is_show_home ? 1 : 0,
            trend: productShow.trend ? 1 : 0,
            is_new: productShow.is_new ? 1 : 0,
            tags: productTags,
            type: productType,
            attribute_id: productAttribute,
            gallery: initialGalleryFiles.map((item: any) => item.url),
            variants: initialVariants,  // Điền thông tin variants đã được chuẩn hóa
            ...productAttributeValue,  // Điền các thuộc tính của sản phẩm vào form
        });

        // Cập nhật selectedValues và các attribute
        productAttribute.forEach((attrId: any) => {
            const values = productAttributeValue[attrId] || [];
            handleChangeAttributeItem(attrId, values);
        });
    };


    useEffect(() => {
        if (productShow) {
            getProduct(productShow);
        }
    }, [productShow, form]);
    const [variantErrors, setVariantErrors] = useState<Record<number, Record<string, string>>>({});

    const handleErrorResponse = (error: any) => {
        console.log("error", error)
        setIsLoading(false);
        if (error.response && error.response.data.errors) {
            const errorFields: ErrorResponse = error.response.data.errors;
            const fields = Object.keys(errorFields).map((key) => ({
                name: key,
                errors: errorFields[key],
            }));
            form.setFields(fields);
            const allFieldNames = ['name', 'attribute_id', 'tags', 'brand_id', 'category_id', 'slug', 'sku', 'img_thumbnail', 'gallery', 'type', 'price_regular', 'price_sale', 'quantity', 'description', 'description_title'];
            allFieldNames.forEach((field) => {
                if (!errorFields[field]) {
                    form.setFields([{ name: field, errors: [] }]);
                }
            });
            const variantErrors = Object.entries(errorFields).reduce((acc, [key, messages]) => {
                if (key.includes("product_variant")) {
                    const [, index, field] = key.split(".");
                    const rowIndex = parseInt(index);
                    if (!acc[rowIndex]) acc[rowIndex] = {};
                    acc[rowIndex][field] = messages.join(", "); // Gộp nhiều lỗi
                }
                return acc;
            }, {} as Record<number, Record<string, string>>);

            setVariantErrors(variantErrors);
        } else {
            toast.error('Có lỗi xảy ra');
        }
    };
    console.log("error", error)
    // const handleCheckboxChange = (index: number) => {
    //     setCheckedItems(prev => {
    //         const newCheckedItems = [...prev];
    //         newCheckedItems[index] = !newCheckedItems[index];
    //         if (!newCheckedItems[index]) {
    //             setVariants(prev => {
    //                 const newVariants = [...prev];
    //                 newVariants[index] = {
    //                     id_guid: '',
    //                     price_regular: '',
    //                     price_sale: '',
    //                     quantity: '',
    //                     sku: '',
    //                     image: '',
    //                 };
    //                 return newVariants;
    //             });
    //         }
    //         return newCheckedItems;
    //     });
    // };
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
            const attributeItemIds = combination.map((itemId, idx) => {
                const attrId = attributeKeys[idx];
                const item = data?.attribute.find((attr: any) => attr.id === Number(attrId))
                    ?.attributeitems.find((i: any) => i.id === itemId);
                return {
                    id: itemId,
                    value: item ? item.value : '',
                };
            });
            productVariantData.push({
                attribute_item_id: attributeItemIds,
                price_regular: Number(variant?.price_regular),
                price_sale: Number(variant?.price_sale),
                quantity: Number(variant?.quantity),
                image: variant?.image,
                sku: variant?.sku,
                id_guid: generateGUID()
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
            // const filteredVariants = productVariantData.filter((_, index) => checkedItems[index]);
            const productPayload = {
                ...values,
                img_thumbnail: urlImage,
                gallery: imageGallery,
                attribute_item_id: attributeData,
                product_variant: productVariantData,
            };
            if (id) {
                updateProductMutation.mutate(productPayload);
            } else {
                createProductMutation.mutate(productPayload);
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
                isFetching ? (<Loading />)
                    : (
                        <Form layout='vertical' className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            onFinish={onFinish}
                            form={form}

                        >
                            <Form.Item name="name" label="Tên sản phẩm" className="col-span-1"
                            >
                                <Input size='large' />
                                {error?.name && <div className='text-red-600'>{error.name.join(', ')}</div>}
                            </Form.Item>
                            <Form.Item name="tags" label="Tag" className="col-span-1">
                                <Select
                                    size='large'
                                    mode='multiple'
                                    options={
                                        data?.tag.map((item: Itags) => ({
                                            value: item?.id,
                                            label: item?.name
                                        })) || []
                                    }
                                    placeholder="Chọn tag"
                                    placement="bottomLeft"
                                    className='w-full'
                                />

                                {error?.tags && <div className='text-red-600'>{error.tags.join(', ')}</div>}
                            </Form.Item>
                            <Form.Item name="brand_id" label="Thương hiệu" className="col-span-1">
                                <Select
                                    size='large'
                                    options={data?.brand.map((item: any) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}
                                    placeholder="Chọn thương hiệu"
                                    placement="bottomLeft" className='w-full' />
                                {error?.brand_id && <div className='text-red-600'>{error.brand_id.join(', ')}</div>}
                            </Form.Item>
                            <Form.Item name="category_id" label="Danh mục" className="col-span-1">
                                <Select
                                    size='large'
                                    options={data?.category.map((item: Icategories) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}
                                    value={productShow?.tags.map((item: any) => item.id)}
                                    placeholder="Chọn danh mục"
                                    placement="bottomLeft" className='w-full' />
                                {error?.category_id && <div className='text-red-600'>{error.category_id.join(', ')}</div>}
                            </Form.Item>
                            <Form.Item name="weight" label="Cân nặng sản phẩm" className="col-span-1">
                                <InputNumber size='large' />
                                {error?.weight && <div className='text-red-600'>{error.weight.join(', ')}</div>}

                            </Form.Item>
                            <Form.Item name="sku" label="SKU" className="col-span-1">
                                <Input size='large' />
                                {error?.sku && <div className='text-red-600'>{error.sku.join(', ')}</div>}

                            </Form.Item>
                            <Form.Item name="img_thumbnail" label="Ảnh sản phẩm" >
                                <Upload
                                    {...propsImgThumbnail}
                                >
                                    <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                                </Upload>
                                {urlImage ? (
                                    <>
                                        <img src={urlImage} alt="Uploaded" style={{ marginTop: 16, width: 100, marginBottom: '10px' }} />
                                    </>
                                ) : (
                                    productShow?.img_thumbnail && (
                                        <>
                                            <img src={productShow.img_thumbnail} alt="Uploaded" style={{ marginTop: 16, width: 100, marginBottom: '10px' }} />
                                        </>
                                    )
                                )}
                                {error?.img_thumbnail && <div className='text-red-600'>{error.img_thumbnail.join(', ')}</div>}

                            </Form.Item>
                            <Form.Item
                                name="gallery"
                                label="Chọn bộ sưu tập"
                                className="col-span-1"
                            >
                                <Upload {...propsGallery}>
                                    <Button icon={<UploadOutlined />}>Tải lên gallery</Button>
                                </Upload>
                                {productShow?.galleries && (
                                    <>
                                        {productShow.galleries.map((e: any, index: number) => (
                                            <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                                                <img
                                                    src={e.image}
                                                    alt={`gallery-${index}`}
                                                    style={{ width: 100, marginBottom: '10px' }}
                                                />
                                                {/* <Button
                                                    danger
                                                    size="small"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '5px',
                                                        right: '5px',
                                                    }}
                                                    onClick={() => handleRemoveImage(index)}
                                                >
                                                    Xoá
                                                </Button> */}
                                            </div>
                                        ))}
                                    </>
                                )}
                                {error?.gallery && <div className='text-red-600'>{error.gallery.join(', ')}</div>}
                            </Form.Item>


                            <Form.Item name="type" label="Kiểu sản phẩm" className="col-span-3">
                                <Select
                                    value={productShow?.type ? 1 : 0}
                                    options={[
                                        { value: 0, label: 'Sản phẩm đơn' },
                                        { value: 1, label: 'Sản phẩm biến thể' },
                                    ]}
                                    onChange={handleChangeAttribute}
                                    placeholder="Chọn kiểu sản phẩm"
                                    placement="bottomLeft" className='w-full'
                                />
                                {error?.type && <div className='text-red-600'>{error.type.join(', ')}</div>}
                            </Form.Item>
                            <Form.Item className="col-span-3">
                                {attribute == 1 && (
                                    <Form.Item name="attribute_id" label="Chọn thuộc tính">
                                        <Select
                                            size='large'
                                            allowClear={false}
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
                                                        size='large'
                                                        allowClear={false}
                                                        options={attributeItem && selectedValues && attributeItem.attributeitems.map((item: any) => ({
                                                            value: item.id,
                                                            label: item.value,
                                                        }))}
                                                        mode='multiple'
                                                        onChange={values => handleChangeAttributeItem(attrId, values)}
                                                        value={selectedValues[attrId] || []}
                                                    />
                                                </Form.Item>
                                            </div>
                                        )
                                    );
                                })
                                }

                                {/* {
                                    attribute == 1 && <Button type='default' onClick={() => {
                                        setSelectedAttributeChildren([]);
                                        setSelectedValues({});
                                        setIsTableVisible(false);
setAttribute(0)
                                        form.resetFields();
                                    }}>Hủy</Button>
                                } */}
                                {attribute == 1 && isTableVisible && (
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
                            {attribute === 0 && <>
                                <Form.Item name="price_regular" label="Giá gốc" className="col-span-1">
                                    <InputNumber size='large' />
                                    {error?.price_regular && <div className='text-red-600'>{error.price_regular.join(', ')}</div>}

                                </Form.Item>
                                <Form.Item name="price_sale" label="Giá khuyến mãi" className="col-span-1">
                                    <InputNumber size='large' />
                                    {error?.price_sale && <div className='text-red-600'>{error.price_sale.join(', ')}</div>}

                                </Form.Item>
                                <Form.Item name="quantity" label="Số lượng" className="col-span-1">
                                    <InputNumber size='large' />
                                    {error?.quantity && <div className='text-red-600'>{error.quantity.join(', ')}</div>}

                                </Form.Item>

                            </>
                            }

                            <Form.Item name="description" label="Mô tả" className="col-span-1">
                                <TextArea size='large' />
                                {error?.description && <div className='text-red-600'>{error.description.join(', ')}</div>}

                            </Form.Item>
                            <Form.Item name="description_title" label=" Tiêu đề mô tả" className="col-span-1">
                                <Input size='large' />
                                {error?.description_title && <div className='text-red-600'>{error.description_title.join(', ')}</div>}

                            </Form.Item>
                            <Form.Item name="status" label="Trạng thái" className="col-span-1">
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
                            <Form.Item name="is_show_home" label="Hiển thị ở trang chủ" className="col-span-1" >
                                <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
                                    <Radio.Group onChange={onChangeHome} value={valueHome} className="flex space-x-4">
                                        <Radio
                                            value={1}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            Có
                                        </Radio>
                                        <Radio
                                            value={0}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            Không
                                        </Radio>
                                    </Radio.Group>

                                </div>
                            </Form.Item>


                            <Form.Item name="trend" label="Xu hướng" className="col-span-1" >
                                <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
                                    <Radio.Group onChange={onChangeTrend} value={valueTrend} className="flex space-x-4">
                                        <Radio
                                            value={1}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            Có
                                        </Radio>
                                        <Radio
                                            value={0}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            Không
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Item>
                            <Form.Item name="is_new" label="Sản phẩm Mới" className="col-span-1" >
                                <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4">
                                    <Radio.Group onChange={onChangeNew} value={valueNew} className="flex space-x-4">
                                        <Radio
                                            value={1}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            Có 
                                        </Radio>
                                        <Radio
                                            value={0}
                                            className="text-lg font-semibold focus:outline-none"
                                        >
                                            Không
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