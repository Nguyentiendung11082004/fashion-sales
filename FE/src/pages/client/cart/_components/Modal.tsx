import { useAuth } from '@/common/context/Auth/AuthContext';
import { FormatMoney } from '@/common/utils/utils';
import instance from '@/configs/axios';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal as AntModal, Button, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
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
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);
    const transformAttributes = (attributes: any) => {
        return attributes?.reduce((acc: any, curr: any) => {
            acc[curr.name] = curr.pivot.attribute_item_id.toString();
            return acc;
        }, {}) || {};
    };
    const [dataAttributes, setAttribute] = useState<any>(transformAttributes(attributes));
    useEffect(() => {
        if (open && attributes) {
            setAttribute(transformAttributes(attributes));
        }
    }, [open, attributes]);
    const queryClient = useQueryClient();
    const handleActive = (attribute: any, id: any) => {
        setAttribute((prev: any) => {
            const updatedAttributes = {
                ...prev,
                [attribute]: id,
            };
            const selectedVariant = formattedAttributes.find((variant: any) =>
                Object.entries(updatedAttributes).every(([key, value]) => variant[key]?.toString() === value?.toString())
            );
            if (selectedVariant) {
                setCurrentPrice(selectedVariant.price_sale);
            }
            return updatedAttributes; 
        });
    };
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
    const updateCart = useMutation({
        mutationFn: async ({ idCart, qty, dataAttributes }: { idCart: number, qty: number, dataAttributes: any }) => {
            await instance.put(`/cart/${idCart}`, {
                "quantity": qty,
                "product_variant": dataAttributes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
    });
    const formattedAttributes = cartAttribute ? cartAttribute.cart_item.product.variants?.map((item: any) => {
        const attributeObj: { [key: string]: number } = {};
        item.attributes.forEach((attribute: any) => {
            attributeObj[attribute.name] = attribute.pivot.attribute_item_id;
        });
        return {
            ...attributeObj,
            price_sale: item.price_sale
        };
    }) : [];
    const dataAttribute = cartAttribute?.getuniqueattributes;
    const checkDisable = (attribute: string, value: any) => {
        let result = false;
        let matchingItems = formattedAttributes.filter((x: any) => {
            return Object.keys(dataAttributes).every((key) => {
                if (key !== attribute) {
                    return x[key] && x[key].toString() === dataAttributes[key].toString();
                }
                return true;
            });
        });
        let isAttributeValid = matchingItems.some((x: any) => x[attribute] && x[attribute].toString() === value.toString());
        if (!isAttributeValid) {
            result = true;
        }
        return result;
    };
    const styles = {
        disable: {
            opacity: 0.2,
        }
    }
    const resultDataAttribute = Object.entries(dataAttribute ?? {}).map(([key, value]) => ({
        attribute: key,
        attributeValue: Object.entries(value ?? {}).map(([id, name]) => ({
            id,
            name,
        })),
    }));
    const handleConfirm = (idCart: any) => {
        onUpdateAttributes(idCart, { ...activeAttributes, dataAttributes });
        let qty = cartAttribute?.cart_item?.quantity;
        updateCart.mutate({ idCart, qty, dataAttributes }, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['cart']
                });
            },
        });
        onClose();
    };
    console.log("cartAttribute?.cart_item?.productvariant?.price_sale", cartAttribute?.cart_item?.productvariant?.price_sale)
    return (
        <AntModal open={open} onCancel={onClose} footer={false} closable={false} maskClosable={false}>
            {isFetching ? (
                <Skeleton />
            ) : (
                <div>
                    <h2 className='text-2xl font-bold text-gray-800 mb-2'>{cartAttribute?.cart_item?.product?.name}</h2>
                    <span className='text-2xl text-[#696969] mb-4'>{FormatMoney(currentPrice || cartAttribute?.cart_item?.productvariant?.price_sale)}</span>
                    {resultDataAttribute.map((e) => (
                        <div key={e.attribute} >
                            <p>{e.attribute}</p>
                            <div className={`flex mt-3 gap-2 ${e.attribute === 'Color' ? 'flex-wrap' : 'grid grid-cols-5 sm:grid-cols-7'}`}>
                                {e.attributeValue.map((item) => {
                                    const isActive = dataAttributes[e.attribute] === item.id;
                                    let dis = false;
                                    if (e.attribute) {
                                        dis = checkDisable(e.attribute, item.id);
                                    }
                                    const _styles = dis ? styles.disable : {}
                                    return (
                                        <div
                                            key={item.id}
                                            className={`relative flex-1 max-w-[75px] h-8 sm:h-8 rounded-full border-2 cursor-pointer 
                                              ${isActive ? 'border-black ' : ''}
                                                `}
                                            onClick={() => {
                                                if (!dis) {
                                                    handleActive(e.attribute, item.id);
                                                }
                                            }}
                                            style={_styles}
                                        >

                                            {e.attribute.toLowerCase() == 'color' ? (
                                                <div
                                                    className="absolute inset-0.5 rounded-full overflow-hidden"
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
            )
            }
            <Button
                onClick={() => handleConfirm(idCart)}
                className=" relative right-2 h-14 w-64 inline-flex items-center justify-center rounded-full text-sm sm:text-base font-medium sm:py-3.5 sm:px-2 lg:px-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 focus:animate-none hover:animate-none text-md mt-8 ml-28 border bg-[#56cfe1] text-white"
            >
                <span className="xl:ml-3 ml-1 lg:text-base xl:text-lg">Xác nhận</span>
            </Button>
        </AntModal >
    );
};

export default ModalCart;
