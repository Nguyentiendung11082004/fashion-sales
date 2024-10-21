/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Modal as AntModal, Skeleton } from "antd";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/common/context/Auth/AuthContext";

type Props = {
  open: boolean;
  onClose: () => void;
  idCart: any;
  onUpdateAttributes: (idCart: any, attributes: any) => void;
  attributes: any;
};
const ModalCart = ({
  open,
  onClose,
  idCart,
  onUpdateAttributes,
  attributes,
}: Props) => {
  const { token } = useAuth();
  const [activeAttributes, setActiveAttributes] = useState<any>({});
  const [dataAttributes, setAttribute] = useState<any>([]);
  const handleActive = (attribute: any, id: any) => {
    console.log("attribute:", attribute);
    console.log("id:", id);
    setAttribute((prev: any) => ({
      ...prev,
      [attribute]: id,
    }));
  };
  console.log("dataAttributes", dataAttributes);
  const handleConfirm = () => {
    onUpdateAttributes(idCart, activeAttributes);
    setAttribute({});
    onClose();
  };
  useEffect(() => {
    if (open && attributes) {
      setActiveAttributes(attributes);
    } else {
      setActiveAttributes({});
    }
  }, [open, attributes]);
  const { data: cartAttribute, isFetching } = useQuery({
    queryKey: ["cartAttribute", idCart],
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
  const formattedAttributes = cartAttribute
    ? cartAttribute.cart_item.product.variants?.map((item: any) => {
        const attributeObj: { [key: string]: number } = {};
        item.attributes.forEach((attribute: any) => {
          attributeObj[attribute.name] = attribute.pivot.attribute_item_id;
        });
        return attributeObj;
      })
    : [];
  console.log("sản phẩm biến thể: ", formattedAttributes);
  const dataAttribute = cartAttribute?.getuniqueattributes;

  console.log("danh sách biến thể:", dataAttribute);
  const checkDisable = (attribute: string, value: any) => {
    let result = false;
    // formattedAttributes : sản phẩm biến thể
    console.log("attributecheckDisable", attribute);
    let matchingItems = formattedAttributes.filter((x: any) => {
      return Object.keys(dataAttributes).every((key) => {
        console.log("0");
        if (key !== attribute) {
          return x[key] && x[key].toString() === dataAttributes[key].toString();
        }
        return true;
      });
    });
    console.log("matchingItems", matchingItems);

    let isAttributeValid = matchingItems.some(
      (x: any) => x[attribute] && x[attribute].toString() === value.toString()
    );
    console.log("isAttributeValid", isAttributeValid);
    if (!isAttributeValid) {
      result = true;
    }
    return result;
  };
  const styles = {
    disable: {
      opacity: 0.5,
    },
  };
  const resultDataAttribute = Object.entries(dataAttribute ?? {}).map(
    ([key, value]) => ({
      attribute: key,
      attributeValue: Object.entries(value ?? {}).map(([id, name]) => ({
        id,
        name,
      })),
    })
  );
  return (
    <AntModal
      open={open}
      onCancel={onClose}
      footer={false}
      closable={false}
      maskClosable={false}
    >
      {isFetching ? (
        <Skeleton />
      ) : (
        <div>
          <h2>Tên sản phẩm: {cartAttribute?.cart_item?.product?.name}</h2>
          <span>
            Giá: {cartAttribute?.cart_item?.productvariant?.price_sale}
          </span>
          {resultDataAttribute.map((e) => (
            <div key={e.attribute}>
              <p>{e.attribute}</p>
              <div
                className={`flex mt-3 gap-2 ${e.attribute === "Color" ? "flex-wrap" : "grid grid-cols-5 sm:grid-cols-7"}`}
              >
                {e.attributeValue.map((item) => {
                  const isActive = dataAttributes[e.attribute] === item.id;
                  let dis = false;
                  if (e.attribute) {
                    dis = checkDisable(e.attribute, item.id);
                  }
                  const _styles = dis ? styles.disable : {};
                  return (
                    <div
                      key={item.id}
                      className={`relative flex-1 max-w-[75px] h-8 sm:h-8 rounded-full  cursor-pointer 
                                            border-primary-6000 border-2 
                                            ${isActive ? "border-black" : ""}`}
                      onClick={() => !dis && handleActive(e.attribute, item.id)}
                      style={_styles}
                    >
                      {e.attribute === "Color" ? (
                        <div
                          className={`absolute inset-0.5 rounded-full overflow-hidden`}
                          style={{ backgroundColor: item.name.toLowerCase() }}
                        ></div>
                      ) : (
                        <p className="flex items-center justify-center h-full text-sm">
                          {item.name}
                        </p>
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
