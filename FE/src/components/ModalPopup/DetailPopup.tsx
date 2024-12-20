/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import HeartBlack from "@/components/icons/detail/HeartBlack";
import { CloseOutlined, MinusOutlined } from "@ant-design/icons";
import { Modal as AntModal, Button } from "antd";
import { useEffect, useState } from "react";

import { FormatMoney } from "@/common/utils/utils";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useWishlist } from "@/common/context/Wishlist/WishlistContext";
import HeartRedPopup from "../icons/detail/HeartRedPopup";
import { toast } from "react-toastify";
type Props = {
  open: boolean;
  onClose: () => void;
  trendProducts: any;
  productSeeMore: any;
};
const MySwal = withReactContent(Swal);
const DetailPopup = ({ open, onClose, productSeeMore }: Props) => {
  const navigate = useNavigate();
  const { handleAddToWishlist, isInWishlist } = useWishlist();
  const attributes = productSeeMore?.variants;
  const image = productSeeMore?.variants;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImage = (e: any) => {
    const selectedProduct = image.find((item: any) =>
      item.attributes.some((attr: any) => attr.pivot.attribute_item_id.toString() === e)
    );
    if (selectedProduct) {
      setSelectedImage(selectedProduct.image);
    }
  };
  const transformAttributes = (variants: any) => {
    return (Array.isArray(variants) ? variants : []).reduce(
      (acc: any, variant: any) => {
        variant?.attributes?.forEach((attribute: any) => {
          acc[attribute.name.toLowerCase()] =
            attribute.pivot.attribute_item_id.toString();
        });
        return acc;
      },
      {}
    );
  };

  const [dataAttribute, setDataAttribute] = useState<any>(
    transformAttributes(attributes)
  );
  const resultDataAttribute = Object.entries(
    productSeeMore?.unique_attributes ?? {}
  ).map(([key, value]) => ({
    attribute: key,
    attributeValue: Object.entries(value ?? {}).map(([id, name]) => ({
      id,
      name,
    })),
  }));

  const priceProduct = productSeeMore?.variants?.map((e: any) => e?.price_sale);
  const minPrice =
    priceProduct && priceProduct.length > 0 ? Math.min(...priceProduct) : null;
  const maxPrice =
    priceProduct && priceProduct.length > 0 ? Math.max(...priceProduct) : null;
  const [selectedVariantId, setSelectedVariantId] = useState<any>(null);
  const [error, setError] = useState("");

  const getSelectedVariantId = () => {
    // Duyệt qua tất cả variants trong productSeeMore
    const matchingVariant = productSeeMore?.variants?.find((variant: any) => {
      // Kiểm tra sự kết hợp giữa các thuộc tính trong dataAttribute và attributes của variant
      return variant.attributes.every((attribute: any) => {
        // Lấy id của attribute trong dataAttribute
        const attributeName = attribute.name.toLowerCase();
        const attributeItemId = attribute.pivot.attribute_item_id;

        // Kiểm tra nếu dataAttribute có giá trị và nó trùng với attribute_item_id của pivot
        return (
          dataAttribute[attributeName] &&
          dataAttribute[attributeName] === attributeItemId.toString()
        );
      });
    });

    // Nếu tìm thấy variant phù hợp, cập nhật state với product_variant_id
    if (matchingVariant) {
      setSelectedVariantId(matchingVariant.id); // Lưu product_variant_id vào state
    } else {
      setSelectedVariantId(null); // Nếu không tìm thấy variant, set null
    }
  };
  useEffect(() => {
    getSelectedVariantId();
  }, [dataAttribute]);
  const getAttribute = (attribute: any, id: any) => {
    setDataAttribute((prev: any) => ({
      ...prev,
      [attribute]: id,
    }));
  };
  const result = productSeeMore?.variants
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
      return Object.keys(dataAttribute?.product_variant || {}).every((key) => {
        if (key !== attribute) {
          return (
            x[key] &&
            x[key].toString() ===
            dataAttribute?.product_variant[key]?.toString()
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
  const [qty, setQty] = useState(1);
  const _payload = {
    product_id: productSeeMore.id,
    product_variant_id: selectedVariantId,
    quantity: qty,
  };
  const styles = {
    disable: {
      opacity: 0.2,
    },
  };
  const handleClose = () => {
    setDataAttribute({});
    setError("");
    setSelectedVariantId(null);
    onClose();
  };
  console.log("_payload", _payload)
  console.log("productSeeMore", productSeeMore)

  const handleCheckout = () => {
    if (_payload.product_variant_id) {
      const selectedVariant = productSeeMore?.variants.find(
        (variant: any) => variant.id === _payload.product_variant_id
      );
      if (selectedVariant) {
        if (_payload.quantity > selectedVariant.quantity) {
          toast.error("Số lượng yêu cầu vượt quá số lượng còn lại trong kho");
          return;
        }
      } else {
        toast.error("Sản phẩm không hợp lệ");
        return;
      }
    } else if (_payload.product_id) {
      // const selectedProduct = productSeeMore?.find(
      //   (variant: any) => variant.product_id === _payload.product_id
      // );
      // console.log("selectedProduct", selectedProduct)
      if (productSeeMore) {
        if (_payload.quantity > productSeeMore.quantity) {
          toast.error("Số lượng yêu cầu vượt quá số lượng còn lại trong kho");
          return;
        }
      }
    }
    navigate("/checkout", { state: { _payload: _payload } });
  };

  useEffect(() => {
    if (open && productSeeMore?.variants?.length > 0) {
      const firstVariant = productSeeMore.variants[0];
      setSelectedVariantId(firstVariant.id);
      const initialAttributes = firstVariant.attributes.reduce(
        (acc: any, attr: any) => {
          acc[attr.name.toLowerCase()] =
            attr.pivot.attribute_item_id.toString();
          return acc;
        },
        {}
      );
      setDataAttribute(initialAttributes);
    }
  }, [open, productSeeMore]);
  useEffect(() => {
    if (selectedVariantId !== null) {
      const matchingVariant = productSeeMore?.variants?.find((variant: any) => {
        return Object.keys(dataAttribute).every((attrKey) => {
          const attribute = variant.attributes.find(
            (attr: any) =>
              attr.name.toLowerCase() === attrKey &&
              attr.pivot.value === dataAttribute[attrKey]
          );
          return attribute !== undefined;
        });
      });
      if (matchingVariant) {
        setSelectedVariantId(matchingVariant.id);
      }
    }
  }, [dataAttribute, productSeeMore?.variants]);
  return (
    <AntModal
      open={open}
      onCancel={handleClose}
      footer={false}
      closable={false}
      maskClosable={false}
      className="rounded-xl"
      width={1100}
    >
      <div className="flex">
        {/* Nút đóng ở góc phải */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 text-white hover:bg-[#56cfe1] bg-black px-3 pt-3 pb-2"
        >
          <CloseOutlined className="text-lg" />
        </button>
        {/* Khung chứa ảnh */}
        <div className="w-1/2 h-[450px] relative">
          <img
            src={`${selectedImage ? selectedImage : productSeeMore.img_thumbnail}`}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-1/2 p-2 ml-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {productSeeMore?.name}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-xl text-[#696969]">
              {minPrice !== null && maxPrice !== null
                ? minPrice === maxPrice
                  ? `${new Intl.NumberFormat("vi-VN").format(minPrice)} ₫`
                  : `${new Intl.NumberFormat("vi-VN").format(minPrice)} - ${new Intl.NumberFormat("vi-VN").format(maxPrice)} ₫`
                : `${new Intl.NumberFormat("vi-VN").format(productSeeMore?.price_sale || 0)} ₫`}
            </span>
            <div className="flex items-center">
              <Link
                to="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="w-5 h-5 pb-[1px] text-yellow-400"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {/* Other stars */}
              </Link>
            </div>
          </div>
          <p className="mt-4 hd-all-text grey  mb-3">
            {productSeeMore?.description}
          </p>
          {resultDataAttribute?.map((e, index) => {
            return (
              <div className="my-4" key={e?.attribute}>
                <p className="font-medium">{e?.attribute}</p>
                <div className="flex mt-3 gap-2">
                  {e?.attributeValue?.map((item: any, index: number) => {
                    const isDisabled = checkDisable(e.attribute, item.id);

                    // Kiểm tra nếu item bị active (trạng thái đã được chọn hoặc chưa chọn nhưng là lựa chọn đầu tiên)
                    const isActive =
                      dataAttribute[e.attribute.toLowerCase()] === item.id ||
                      (index === 0 &&
                        !dataAttribute[e.attribute.toLowerCase()]);

                    return (
                      <div
                        key={item.id}
                        className={`relative flex-1 max-w-[75px] h-8 sm:h-8 rounded-full border-2 cursor-pointer p-2
                          ${isActive
                            ? "border-black"
                            : isDisabled
                              ? "border-gray-200 opacity-50 cursor-not-allowed"
                              : "border-2"
                          }`}
                        style={
                          isActive
                            ? { backgroundColor: item.name.toLowerCase() }
                            : {}
                        }
                        onClick={() => {
                          if (isDisabled) return;
                          getAttribute(e.attribute.toLowerCase(), item.id);
                          handleImage(item.id)
                        }}
                      >
                        {e.attribute.toLowerCase() === "color" ? (
                          <div
                            className="absolute inset-0.5 rounded-full overflow-hidden"
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
            );
          })}
          <span style={{ color: "red" }}>{error ? error : ""}</span>
          <div className="hd-quantity-item flex items-center">
            <div className="hd-quantity relative block min-w-[120px] w-[120px] h-10 hd-all-btn">
              <button
                type="button"
                onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
                className="hd-btn-item left-0 text-left pl-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
              >
                <MinusOutlined />
              </button>
              <span className="select-none leading-9 cursor-text font-semibold text-base">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((prev) => prev + 1)}
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
            <div className="mx-3">
              <Button
                onClick={handleCheckout}
                style={{ width: "200px" }}
                className=" h-11 rounded-full bg-[#56cfe1] text-white text-base font-medium hover:bg-[#4bc3d5]"
              >
                Mua Ngay
              </Button>
            </div>
            <div className="mt-2">
              <button onClick={() => handleAddToWishlist(productSeeMore)}>
                {isInWishlist(productSeeMore.id) ? (
                  <HeartRedPopup />
                ) : (
                  <HeartBlack />
                )}
              </button>
            </div>
          </div>
          <Link to={`/products/${productSeeMore?.slug}.html`} className="flex mt-2">
            <p className="mr-1 font-medium text-black">Xem chi tiết</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 text-black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </AntModal>
  );
};

export default DetailPopup;
