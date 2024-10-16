import React, { useState, useEffect } from 'react';
import { Modal as AntModal, Skeleton } from 'antd';
import instance from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/common/context/Auth/AuthContext';

type Props = {
    open: boolean;
    onClose: () => void;
    idCart: any;
    onUpdateAttributes: (idCart: any, attributes: any) => void;
    attributes: any;
};

const ModalCart = ({ open, onClose, idCart, onUpdateAttributes, attributes }: Props) => {
    const { token } = useAuth();
    const [activeAttributes, setActiveAttributes] = useState<any>({});

    const handleActive = (attribute: any, id: any) => {
        setActiveAttributes((prev: any) => ({
            ...prev,
            [attribute]: id, // Chỉ cập nhật giá trị cho thuộc tính đang chọn
        }));
    };

    const handleConfirm = () => {
        onUpdateAttributes(idCart, activeAttributes);
        console.log("activeAttributes",activeAttributes)
        onClose();
    };

    useEffect(() => {
        if (open && attributes) {
            setActiveAttributes(attributes);
        } else {
            setActiveAttributes({}); // Reset activeAttributes khi đóng modal
        }
    }, [open, attributes]);

    const { data: cartAttribute, isFetching } = useQuery({
        queryKey: ['cartAttribute', idCart],
        queryFn: async () => {
            const res = await instance.get(`/cart/${idCart}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res?.data;
        },
        enabled: !!idCart && open,
    });

    const attributesFromCart = cartAttribute?.cart_item.productvariant.attributes.map((e: any) => e.pivot.value);
    const dataAttribute = cartAttribute?.getuniqueattributes;
    const resultDataAttribute = Object.entries(dataAttribute ?? {}).map(([key, value]) => ({
        attribute: key,
        attributeValue: Object.entries(value ?? {}).map(([id, name]) => ({
            id,
            name,
        })),
    }));

    return (
        <AntModal open={open} onCancel={onClose} footer={false} closable={false} maskClosable={false}>
            {isFetching ? (
                <Skeleton />
            ) : (
                <div>
                    <h2>Tên sản phẩm: {cartAttribute?.cart_item?.product?.name}</h2>
                    <span>Giá: {cartAttribute?.cart_item?.productvariant?.price_sale}</span>
                    {resultDataAttribute.map((e) => (
                        <div key={e.attribute}>
                            <p>{e.attribute}</p>
                            <div className={`flex mt-3 gap-2 ${e.attribute === 'Color' ? 'flex-wrap' : 'grid grid-cols-5 sm:grid-cols-7'}`}>
                                {e.attributeValue.map((item) => {
                                    const isActive = activeAttributes[e.attribute] === item.id; // Kiểm tra thuộc tính đang chọn
                                    // const isDefault = attributesFromCart.includes(item.name); // Kiểm tra thuộc tính mặc định

                                    return (
                                        <div
                                            key={item.id}
                                            className={`relative flex-1 max-w-[75px] h-8 sm:h-8 rounded-full border-2 cursor-pointer 
                                            border-primary-6000 dark:border-primary-500 
                                            ${isActive   ? 'border-black' : ''}`}
                                            onClick={() => handleActive(e.attribute, item.id)}
                                        >
                                            {e.attribute === 'Color' ? (
                                                <div
                                                    className={`absolute inset-0.5 rounded-full overflow-hidden`}
                                                    style={{ backgroundColor: item.name.toLowerCase() }}
                                                ></div>
                                            ) : (
                                                <p className="flex items-center justify-center h-full text-sm">{item.name}</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button
                onClick={handleConfirm}
                className="nc-Button relative right-2 h-14 w-64 inline-flex items-center justify-center rounded-full text-sm sm:text-base font-medium sm:py-3.5 sm:px-2 lg:px-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 animate-bounce focus:animate-none hover:animate-none text-md mt-8 ml-28 border bg-[#56cfe1] text-white"
            >
                <span className="xl:ml-3 ml-1 lg:text-base xl:text-lg">Xác nhận</span>
            </button>
        </AntModal>
    );
};

export default ModalCart;
