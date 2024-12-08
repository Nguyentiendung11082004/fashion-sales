/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCart } from "@/common/context/Cart/CartContext";
import { useWishlist } from "@/common/context/Wishlist/WishlistContext";
import HeartBlack from "@/components/icons/detail/HeartBlack";
import {
  findProductVariant,
  productShow_client,
} from "@/services/api/client/productClient.api";
import { CloseOutlined, MinusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Modal as AntModal, Button } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import HeartRedPopup from "../icons/detail/HeartRedPopup";

const CartPopup = forwardRef((props: any, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { idProduct, setIdProduct }: any = props;
  const [product, setProduct] = useState<any>();
  const { handleAddToWishlist, isInWishlist } = useWishlist();

  const [selectedAttributes, setSelectedAttributes] = useState<{
    product_variant: Record<string, string | number>;
  }>({
    product_variant: {},
  });
  const { data, isLoading } = useQuery({
    queryKey: ["product", idProduct],
    queryFn: async () => {
      if (!idProduct) {
        return;
      }
      try {
        return await productShow_client(`${idProduct}`);
      } catch (error) {
        throw new Error("Không có sản phẩm nào phù hợp");
      }
    },
    enabled: !!idProduct,
  });

  const getUniqueAttributes = data?.getUniqueAttributes;

  console.log("data", data);
  useEffect(() => {
    if (data && data.product) {
      setProduct(data.product);
    }
  }, [data]);

  useEffect(() => {
    setSelectedAttributes({ product_variant: {} });
    setQuantity(1);
    setProduct(undefined);
  }, [idProduct]);

  const handleAttributeSelect = (attribute: any, id: any) => {
    setSelectedAttributes((prev: any) => ({
      ...prev,
      [attribute]: id,
    }));
  };

  const result = product?.variants
    ?.filter(
      (variant: any) =>
        variant.attributes &&
        variant.attributes.length > 0 &&
        variant.quantity > 0
    )
    .map((variant: any) => {
      const attributeObj = variant.attributes.reduce(
        (acc: { [key: string]: string }, attribute: any) => {
          acc[attribute.name] = attribute.pivot.attribute_item_id.toString();
          return acc;
        },
        {}
      );
      return attributeObj;
    });
  const checkDisable = (attribute: string, value: any) => {
    let res = false;

    let matchingItems = result?.filter((x: any) => {
      return Object.keys(selectedAttributes.product_variant).every((key) => {
        if (key !== attribute) {
          return (
            x[key] &&
            x[key].toString() ===
              selectedAttributes?.product_variant[key].toString()
          );
        }
        return true;
      });
    });

    let isAttributeValid = matchingItems?.some(
      (x: any) => x[attribute] && x[attribute].toString() === value.toString()
    );

    res = !isAttributeValid;

    return res;
  };

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    setIsInitialLoad(true);
  }, [idProduct]);
  console.log("kiểm tra result[0]: ", result);
  useEffect(() => {
    if (result && result.length > 0 && isInitialLoad) {
      setSelectedAttributes({ product_variant: result[0] });
      setIsInitialLoad(false);
    }
  }, [result, isInitialLoad, idProduct]);

  useEffect(() => {
    const fetchProductVariant = async () => {
      if (!idProduct) {
        return;
      }
      try {
        const variant = await findProductVariant(idProduct, selectedAttributes);
        if (variant.findProductVariant) {
          setProduct((prevProduct: any) => ({
            ...prevProduct,
            ...variant.findProductVariant,
          }));
        }
      } catch (error) {
        console.log("Call api thất bại", error);
      }
    };
    fetchProductVariant();
  }, [selectedAttributes]);

  const resultGetUniqueAttribute = Object.entries(
    getUniqueAttributes ?? {}
  ).map(([key, value]) => ({
    attribute: key,
    attributeValue: Object.entries(value ?? {}).map(([id, name]) => ({
      id,
      name,
    })),
  }));

  // Thêm vào giỏ hàng

  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const { addToCart } = useCart();
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const onHandleAddToCart = (
    idProduct: any,
    idProductVariant: any,
    quantity: any
  ) => {
    if (data.getUniqueAttributes == 0) {
      idProductVariant = undefined;
    }
    addToCart(idProduct, idProductVariant, quantity);
  };

  const showModal = () => {
    setIsModalOpen(true);
    // setSelectedAttributes({ product_variant: result[0] });
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setIdProduct("");
  };
  useImperativeHandle(ref, () => ({
    showModal,
  }));

  return (
    // <AntModal
    //   open={isModalOpen}
    //   onCancel={handleClose}
    //   footer={false}
    //   closable={false}
    //   maskClosable={false}
    //   className="rounded-xl"
    //   width={400}
    // >
    //   <div className="p-2">
    //     <button
    //       onClick={handleClose}
    //       className="absolute -top-2 -right-2 text-white hover:bg-[#56cfe1] bg-black px-3 pt-3 pb-2"
    //     >
    //       <CloseOutlined className="text-lg" />
    //     </button>
    //     {data?.product && (
    //       <div>
    //         <h2 className="text-2xl font-bold text-gray-800 mb-2">
    //           {data?.product?.name}
    //         </h2>
    //         <span className="text-2xl text-[#696969]">
    //           {product?.price_sale} VNĐ
    //         </span>
    //         {/* Chọn màu */}
    //         {resultGetUniqueAttribute?.map((value: any) => (
    //           <div className="my-4" key={value.attribute}>
    //             <p className="font-medium">{value.attribute}</p>
    //             <div className="flex mt-3 gap-2">
    //               {value.attributeValue?.map((item: any) => {
    //                 const isDisabled = checkDisable(value.attribute, item.id);
    //                 const isSelected =
    //                   selectedAttributes.product_variant[value.attribute] ===
    //                   item.id;

    //                 return (
    //                   <div
    //                     key={item.id}
    //                     className={`${isSelected
    //                       ? "border-black "
    //                       : isDisabled
    //                         ? "border-gray-200 opacity-50 cursor-not-allowed"
    //                         : "border-2"
    //                       } rounded-full cursor-pointer border-2`}
    //                   >
    //                     <div
    //                       className="flex items-center justify-center w-[60px] h-8"
    //                       onClick={() => {
    //                         if (!isDisabled) {
    //                           handleAttributeSelect(value.attribute, item.id);
    //                           setSelectedAttributes((prev) => ({
    //                             ...prev,
    //                             product_variant: {
    //                               ...prev.product_variant,
    //                               [value.attribute]: item.id,
    //                             },
    //                           }));
    //                         }
    //                       }}
    //                     >
    //                       {value.attribute !== "color" ? (
    //                         <span className="text-center text-sm">
    //                           {item.name}
    //                         </span>
    //                       ) : (
    //                         <div
    //                           style={{
    //                             backgroundColor: item.name.toLowerCase(),
    //                           }}
    //                           className="w-full h-full rounded-full"
    //                         >
    //                           <span className="text-center"></span>
    //                         </div>
    //                       )}
    //                     </div>
    //                   </div>
    //                 );
    //               })}
    //             </div>
    //           </div>
    //         ))}

    //         <div className="hd-quantity-item flex items-center">
    //           <div className="hd-quantity mb-2 relative block min-w-[120px] w-[120px] h-10 hd-all-btn">
    //             <button
    //               onClick={decreaseQuantity}
    //               type="button"
    //               className="hd-btn-item left-0 text-left pl-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
    //             >
    //               <MinusOutlined />
    //             </button>
    //             <span className="select-none leading-9 cursor-text font-semibold text-base">
    //               {quantity}
    //             </span>
    //             <button
    //               onClick={increaseQuantity}
    //               type="button"
    //               className="hd-btn-item right-0 text-right pr-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 strokeWidth={2}
    //                 stroke="currentColor"
    //                 className="size-3 hd-all-hover-bluelight"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   d="M12 4.5v15m7.5-7.5h-15"
    //                 />
    //               </svg>
    //             </button>
    //           </div>
    //           <div className="mx-5 mb-[2px]">
    //             <button>
    //               <HeartBlack />
    //             </button>
    //           </div>
    //         </div>

    //         <Button
    //           onClick={() => {
    //             handleClose();
    //             console.log("số lượng : ", quantity);
    //             onHandleAddToCart(idProduct, product?.id, quantity);
    //           }}
    //           className="h-12 w-full mt-4 rounded-full bg-[#56cfe1] text-white text-lg font-medium hover:bg-[#4bc3d5]"
    //         >
    //           Thêm vào giỏ hàng
    //         </Button>
    //       </div>
    //     )}
    //   </div>
    // </AntModal>
    <AntModal
      open={isModalOpen}
      onCancel={handleClose}
      footer={false}
      closable={false}
      maskClosable={false}
      className="rounded-xl"
      width={400}
    >
      <div className="p-4">
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 text-white bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-full"
        >
          <CloseOutlined className="text-lg" />
        </button>

        {data?.product && (
          <div>
            {/* Tên sản phẩm */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {data?.product?.name}
            </h2>

            {/* Giá sản phẩm */}
            <div className="text-2xl text-[#ff4d4f] font-semibold mb-6">
              {Number(product?.price_sale).toLocaleString("vi-VN")} VNĐ
            </div>

            {/* Thuộc tính sản phẩm */}
            {resultGetUniqueAttribute?.map((value: any) => (
              <div className="my-6" key={value.attribute}>
                <p className="font-medium text-gray-800">{value.attribute}</p>
                <div className="flex mt-3 gap-3">
                  {value.attributeValue?.map((item: any) => {
                    const isDisabled = checkDisable(value.attribute, item.id);
                    const isSelected =
                      selectedAttributes.product_variant[value.attribute] ===
                      item.id;

                    return (
                      <div
                        key={item.id}
                        className={`cursor-pointer border rounded-lg p-2 text-center ${
                          isSelected
                            ? "border-black bg-gray-200"
                            : isDisabled
                              ? "border-gray-300 opacity-50 cursor-not-allowed"
                              : "border-gray-300 hover:border-black"
                        }`}
                        onClick={() => {
                          if (!isDisabled) {
                            handleAttributeSelect(value.attribute, item.id);
                            setSelectedAttributes((prev) => ({
                              ...prev,
                              product_variant: {
                                ...prev.product_variant,
                                [value.attribute]: item.id,
                              },
                            }));
                          }
                        }}
                      >
                        {value.attribute !== "color" ? (
                          <span className="text-sm">{item.name}</span>
                        ) : (
                          <div
                            style={{
                              backgroundColor: item.name.toLowerCase(),
                            }}
                            className="w-6 h-6 rounded-full mx-auto"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Số lượng */}
            <div className="flex items-center mt-6">
              <div className="flex items-center border rounded-lg w-[120px] h-10">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 text-gray-700 hover:bg-gray-100"
                >
                  <MinusOutlined />
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 text-gray-700 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
              {/* <button className="ml-4 text-gray-500 hover:text-gray-800">
                <HeartBlack />
              </button> */}
            </div>

            {/* Thêm vào giỏ hàng */}
            <Button
              onClick={() => {
                handleClose();
                onHandleAddToCart(idProduct, product?.id, quantity);
              }}
              className="h-12 w-full mt-6 rounded-lg bg-[#56cfe1] text-white text-lg font-semibold hover:bg-[#4bc3d5]"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        )}
      </div>
    </AntModal>
  );
});

export default CartPopup;
