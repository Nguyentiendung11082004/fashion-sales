/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCart } from "@/common/context/Cart/CartContext";
import HeartBlack from "@/components/icons/detail/HeartBlack";
import instance from "@/configs/axios";
import { productShow_client } from "@/services/api/client/productClient.api";
import { CloseOutlined, MinusOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal as AntModal, Button } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const CartPopup = forwardRef((props: any, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { idProduct }: any = props;

  const [selectedAttributes, setSelectedAttributes] = useState<{
    product_variant: Record<string, string | number>;
  }>({
    product_variant: {},
  });

  const { data, isLoading } = useQuery({
    queryKey: ["product", idProduct],
    queryFn: async () => {
      try {
        return await productShow_client(`${idProduct}`);
      } catch (error) {
        throw new Error("Không có sản phẩm nào phù hợp");
      }
    },
  });

  console.log("product data:", data);
  console.log("id product:", idProduct);

  const handleAttributeSelect = (attribute: any, id: any) => {
    setSelectedAttributes((prev: any) => ({
      ...prev,
      [attribute]: id,
    }));
  };
  console.log("setSelectedAttributes 12345  ", selectedAttributes);
  const resultGetUniqueAttribute = Object.entries(
    data?.getUniqueAttributes ?? {}
  ).map(([key, value]) => ({
    attribute: key,
    attributeValue: Object.entries(value ?? {}).map(([id, name]) => ({
      id,
      name,
    })),
  }));
  const productVariant = data?.product?.variants;
  console.log("productVarriant: ", productVariant);

  console.log("resultGetUniqueAttribute", resultGetUniqueAttribute);
  const formattedAttributes = data?.product?.variants
    ? data.product.variants
        .filter((item: any) => item.quantity > 0)
        .map((item: any) => {
          const attributeObj: { [key: string]: number } = {};
          item.attributes.forEach((attribute: any) => {
            attributeObj[attribute.name] =
              attribute.pivot.attribute_item_id.toString();
          });
          return {
            ...attributeObj,
            price_sale: item.price_sale,
          };
        })
    : [];
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsInitialLoad(true);
  }, [idProduct]);

  useEffect(() => {
    if (
      formattedAttributes &&
      formattedAttributes.length > 0 &&
      isInitialLoad
    ) {
      setSelectedAttributes({ product_variant: formattedAttributes[0] });
      setIsInitialLoad(false);
    }
  }, [formattedAttributes, isInitialLoad]);

  console.log("formattedAttributes", formattedAttributes);
  // const checkDisable = (attribute: string, value: any) => {
  //   let res = false;

  //   let matchingItems = formattedAttributes?.filter((x: any) => {
  //     return Object.keys(selectedAttributes?.product_variant).every((key) => {
  //       if (key !== attribute) {
  //         return (
  //           x[key] &&
  //           x[key].toString() ===
  //             selectedAttributes?.product_variant[key].toString()
  //         );
  //       }
  //       return true;
  //     });
  //   });

  //   let isAttributeValid = matchingItems?.some(
  //     (x: any) => x[attribute] && x[attribute].toString() === value.toString()
  //   );

  //   res = !isAttributeValid;

  //   return res;
  // };

  // thêm vào giỏ hàng
  const { addToCart } = useCart();
  const checkDisable = (attribute: string, value: any) => {
    const matchingItems = formattedAttributes?.filter((item: any) => {
      return Object.keys(selectedAttributes.product_variant).every((key) => {
        if (key !== attribute && key !== "price_sale") {
          return (
            item[key] &&
            item[key].toString() ===
              selectedAttributes.product_variant[key].toString()
          );
        }
        return true;
      });
    });

    const isAttributeValid = matchingItems?.some(
      (item: any) =>
        item[attribute] && item[attribute].toString() === value.toString()
    );

    return !isAttributeValid;
  };

  const onHandleAddToCart = (
    idProduct: any,
    idProductVariant: any,
    quantity: any
  ) => {
    console.log("add to cart: ");
    console.log("idProduct: ", idProduct);
    console.log("idProductVariant: ", idProductVariant);
    console.log("quantity: ", quantity);
    if (data?.getUniqueAttributes == 0) {
      idProductVariant = undefined;
    }
    addToCart(idProduct, idProductVariant, quantity);
  };

  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    showModal,
  }));

  console.log("thêm giỏ hàng: ", selectedAttributes);
  console.log("id variant  12345: : ", selectedAttributes?.product_variant);

  return (
    <AntModal
      open={isModalOpen}
      onCancel={handleClose}
      footer={false}
      closable={false}
      maskClosable={false}
      className="rounded-xl"
      width={400}
    >
      <div className="p-2">
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 text-white hover:bg-[#56cfe1] bg-black px-3 pt-3 pb-2"
        >
          <CloseOutlined className="text-lg" />
        </button>
        {data?.product && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {data?.product?.name}
            </h2>
            <span className="text-2xl text-[#696969]">
              {selectedAttributes?.product_variant?.price_sale ||
                data?.product?.price_sale}
            </span>
            {/* Chọn màu */}
            {resultGetUniqueAttribute?.map((value: any) => (
              <div className="my-4" key={value.attribute}>
                <p className="font-medium">{value.attribute}</p>
                <div className="flex mt-3 gap-2">
                  {value.attributeValue?.map((item: any) => {
                    const isDisabled = checkDisable(value.attribute, item.id);
                    const isSelected =
                      selectedAttributes.product_variant[value.attribute] ===
                      item.id;

                    return (
                      <div
                        key={item.id}
                        className={`${
                          isSelected
                            ? "border-black "
                            : isDisabled
                              ? "border-gray-200 opacity-50 cursor-not-allowed"
                              : "border-2"
                        } rounded-full cursor-pointer border-2`}
                      >
                        <div
                          className="flex items-center justify-center w-[60px] h-8"
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
                            <span className="text-center text-sm">
                              {item.name}
                            </span>
                          ) : (
                            <div
                              style={{
                                backgroundColor: item.name.toLowerCase(),
                              }}
                              className="w-full h-full rounded-full"
                            >
                              <span className="text-center"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="hd-quantity-item flex items-center">
              <div className="hd-quantity mb-2 relative block min-w-[120px] w-[120px] h-10 hd-all-btn">
                <button
                  onClick={decreaseQuantity}
                  type="button"
                  className="hd-btn-item left-0 text-left pl-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                >
                  <MinusOutlined />
                </button>
                <span className="select-none leading-9 cursor-text font-semibold text-base">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  type="button"
                  className="hd-btn-item right-0 text-right pr-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-3 hd-all-hover-bluelight"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
              <div className="mx-5 mb-[2px]">
                <button>
                  <HeartBlack />
                </button>
              </div>
            </div>

            <Button
              onClick={() => {
                handleClose();
                console.log(
                  "Selected variant ID: ",
                  selectedAttributes?.product_variant?.id
                );
                onHandleAddToCart(idProduct, productVariant?.id, quantity);
              }}
              className="h-12 w-full mt-4 rounded-full bg-[#56cfe1] text-white text-lg font-medium hover:bg-[#4bc3d5]"
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
