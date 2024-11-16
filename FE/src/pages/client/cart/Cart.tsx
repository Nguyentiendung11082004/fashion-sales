/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useAuth } from "@/common/context/Auth/AuthContext";
import AddCount from "@/components/icons/cart/AddCount";

import { useAuth } from "@/common/context/Auth/AuthContext";
import Loading from "@/common/Loading/Loading";
import { FormatMoney } from "@/common/utils/utils";
import Car from "@/components/icons/cart/Car";
import Gift from "@/components/icons/cart/Gift";
import Note from "@/components/icons/cart/Note";
import instance from "@/configs/axios";
import { MinusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalCart from "./_components/Modal";
const MySwal = withReactContent(Swal);
const Cart = () => {
  const [visiable, setVisible] = useState(false);
  const [idCart, setIdCart] = useState<any>("");
  const [updatedAttributes, setUpdatedAttributes] = useState<any>({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const closeModal = () => {
    setIdCart("");
    setVisible(false);
  };
  const { token } = useAuth();
  const { data, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await instance.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const pusher = new Pusher("4d3e0d70126f2605977e", {
    cluster: "ap1",
    authEndpoint: "http://localhost:8000/broadcasting/auth", // Thay bằng URL backend của bạn
    auth: {
      headers: {
        Authorization: `${token}`, // Thay thế bằng token của người dùng hiện tại
      },
    },
  });
  useEffect(() => {
    const channel = pusher.subscribe(`private-cart.${9}`);
    // Lắng nghe sự kiện 'CartEvent'
    channel.bind("CartEvent", (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    });

    pusher.connection.bind("connected", () => {});

    pusher.connection.bind("error", (err: any) => {});

    // Giả sử cartId là id của giỏ hàng hiện tại

    // Đăng ký vào kênh 'private-cart.{idCart}'

    // Huỷ đăng ký kênh khi component bị unmount hoặc khi `idCart` thay đổi
    return () => {
      pusher.unsubscribe(`private-cart.${idCart}`);
    };
  }, [data, queryClient]); // Cập nhật khi idCart hoặc token thay đổi
  // Đảm bảo rằng cartId không thay đổi khi component mount/unmount

  const updateQuantity = useMutation({
    mutationFn: async ({
      idCart,
      newQuantity,
      qtyProductVarinat,
    }: {
      idCart: number;
      newQuantity: number;
      qtyProductVarinat: any;
    }) => {
      await instance.put(
        `/cart/${idCart}`,
        {
          quantity: newQuantity,
          product_variant: qtyProductVarinat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (message: any) => {
      toast.error(message?.response?.data?.message, {
        autoClose: 5000,
      });
    },
  });
  const handleIncrease = (
    idCart: number,
    currentQuantity: number,
    qtyProductVarinat: any
  ) => {
    const newQuantity = currentQuantity + 1;
    updateQuantity.mutate({ idCart, newQuantity, qtyProductVarinat });
  };
  const handleDecrease = (
    idCart: number,
    currentQuantity: number,
    qtyProductVarinat: any
  ) => {
    const newQuantity = currentQuantity - 1;
    updateQuantity.mutate({ idCart, newQuantity, qtyProductVarinat });
  };
  const deleteCart = useMutation({
    mutationFn: async ({ idCarts }: { idCarts: number[] }) => {
      await Promise.all(
        idCarts.map((idCart) =>
          instance.delete(`/cart/[${idCart}]`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
  const handleDeleteCart = (idCarts: number[]) => {
    deleteCart.mutate(
      { idCarts },
      {
        onSuccess: () => {
          const updatedCheckedItems = { ...checkedItems };
          idCarts.forEach((id) => {
            delete updatedCheckedItems[id];
          });
          setCheckedItems(updatedCheckedItems);
          localStorage.setItem(
            "checkedItems",
            JSON.stringify(updatedCheckedItems)
          );

          const updatedIdCart = Object.keys(updatedCheckedItems)
            .filter((key) => updatedCheckedItems[Number(key)])
            .map(Number);
          setIdCart(updatedIdCart);
          localStorage.setItem("idCart", JSON.stringify(updatedIdCart));
          const isAllCheckedNow = updatedIdCart.length === carts.length;
          setIsAllChecked(isAllCheckedNow);
          if (updatedIdCart.length === 0) {
            setIsAllChecked(false);
          }
        },
        onError: (message: any) => {
          toast.error(message?.response?.data?.message, {
            autoClose: 5000,
          });
        },
      }
    );
  };

  const handleAttribute = (idCart: any, variants: any) => {
    setIdCart([idCart]);
    setVisible(true);
    setUpdatedAttributes((prev: any) => ({
      ...prev,
      [idCart]: variants,
    }));
  };
  const handleUpdateAttributes = (idCart: any, attributes: any) => {
    setUpdatedAttributes({
      ...updatedAttributes,
      [idCart]: attributes,
    });
  };
  const carts = data?.cart?.cartitems;
  carts?.map((cartItem: any) => {
    const {
      id,
      product_id,
      product_variant_id,
      quantity,
      total_price,
      product,
      productvariant,
    } = cartItem;
    const attributesObject = productvariant?.attributes.reduce(
      (acc: any, attribute: any) => {
        acc[attribute.name] = attribute.pivot.attribute_item_id;
        return acc;
      },
      {}
    );
    return {
      id,
      product_id,
      product_variant_id,
      quantity,
      total_price,
      product_name: product.name,
      product_image: product.img_thumbnail,
      attributes: attributesObject,
    };
  });

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const handleCheckAll = () => {
    const newChecked = !isAllChecked;
    setIsAllChecked(newChecked);
    const newCheckedItems: { [key: number]: boolean } = {};
    const allIdCarts: number[] = [];
    carts.forEach((item: any) => {
      newCheckedItems[item.id] = newChecked;
      if (newChecked) {
        allIdCarts.push(item.id);
      }
    });
    setCheckedItems(newCheckedItems);
    localStorage.setItem("checkedItems", JSON.stringify(newCheckedItems));
    setIdCart(newChecked ? allIdCarts : []);
  };

  const handleCheckBoxChange = (cartId: number) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [cartId]: !checkedItems[cartId],
    };
    setCheckedItems(updatedCheckedItems);
    localStorage.setItem("checkedItems", JSON.stringify(updatedCheckedItems));
    const updatedIdCarts = Object.keys(updatedCheckedItems)
      .filter((key) => updatedCheckedItems[Number(key)])
      .map(Number);
    setIdCart(updatedIdCarts);
    setIsAllChecked(updatedIdCarts.length === carts.length);
  };
  const handleCheckout = () => {
    if (!idCart || idCart.length === 0) {
      MySwal.fire({
        title: <strong>Cảnh báo</strong>,
        icon: "error",
        text: "Bạn chưa chọn sản phẩm nào để thanh toán",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      navigate("/checkout", { state: { cartIds: idCart } });
    }
  };
  useEffect(() => {
    const storedCheckedItems = localStorage.getItem("checkedItems");
    if (storedCheckedItems) {
      const parsedCheckedItems = JSON.parse(storedCheckedItems);
      setCheckedItems(parsedCheckedItems);
      setIsAllChecked(Object.values(parsedCheckedItems).every(Boolean));
      const updatedIdCarts = Object.keys(parsedCheckedItems)
        .filter((key) => parsedCheckedItems[Number(key)])
        .map(Number);
      setIdCart(updatedIdCarts);
    }
  }, []);
  return (
    <>
      <main
        id="main-content"
        className="min-h-fit !shadow-none !outline-0 block isolate *:box-border"
      >
        <div className="hd-page-head">
          <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center">
            <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
              <div className="z-[100] relative hd-container">
                <h1 className="text-white text-xl font-medium leading-5">
                  Giỏ hàng
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/*end hd-page-head*/}
        <section className="hd-page-body text-[14px] lg:mt-[60px] mt-[30px] block m-0 p-0 border-0 isolate *:box-border">
          <div className="hd-container block">
            <form className="hd-form-cart overflow-hidden relative">
              <div className="hd-pagecart-header text-sm uppercase font-semibold pt-5 pb-1.5 border-solid border-b-2">
                <div className="flex flex-wrap mt-0 !items-center">
                  <div className="w-[5%] flex-grow-0 flex-shrink-0 basis-auto hd-col-item">
                    <input
                      type="checkbox"
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className="lg:w-[40%] w-full flex-grow-0 flex-shrink-0 basis-auto hd-col-item">
                    Sản phẩm
                  </div>
                  <div className="w-[20%] flex-grow-0 flex-shrink-0 basis-auto hd-col-item !text-center hidden lg:block">
                    Giá
                  </div>
                  <div className="w-[20%] flex-grow-0 flex-shrink-0 basis-auto hd-col-item !text-center hidden lg:block">
                    Số lượng
                  </div>
                  <div className="w-[15%] flex-grow-0 flex-shrink-0 basis-auto hd-col-item lg:text-end text-right hidden lg:block">
                    Tổng
                  </div>
                </div>
              </div>
              <div className="hd-pagecart-items">
                <div className="hd-item relative overflow-hidden">
                  {isFetching ? (
                    <Loading />
                  ) : carts && carts.length > 0 ? (
                    carts?.map((e: any) => {
                      const { productvariant } = e;
                      const attributesObject =
                        productvariant?.attributes.reduce(
                          (acc: any, attribute: any) => {
                            acc[attribute.name] =
                              attribute.pivot.attribute_item_id;
                            return acc;
                          },
                          {}
                        );
                      return (
                        <>
                          <div className="hd-item-row lg:py-[2rem] py-[1rem] !items-center flex flex-wrap border-solid border-b-2">
                            <div className="hd-infor-item lg:w-5/12 w-full hd-col-item">
                              <div className="hd-infor !items-center !flex">
                                <div className="mr-10">
                                  <input
                                    type="checkbox"
                                    checked={checkedItems[e?.id] || false}
                                    onChange={() => handleCheckBoxChange(e?.id)}
                                  />
                                </div>
                                <Link
                                  to=""
                                  className="min-w-[120px] max-w-[120px] block overflow-hidden relative w-full touch-manipulation pb-[10px] lg:pb-0"
                                >
                                  <img
                                    src={`${e?.product?.img_thumbnail}`}
                                  ></img>
                                </Link>
                                <div className="hd-infor-text ms-4">
                                  <Link
                                    to=""
                                    className="text-sm font-semibold block mb-[5px] touch-manipulation hd-all-hover-bluelight"
                                  >
                                    {e?.product?.name}
                                  </Link>
                                  {/*end hd-price-item*/}
                                  {updatedAttributes.dataAttributes &&
                                  Object.entries(
                                    updatedAttributes.dataAttributes
                                  ).length > 0
                                    ? Object.entries(
                                        updatedAttributes.dataAttributes
                                      ).map(
                                        ([attributeName, attributeValue]) => {
                                          const attributeItem =
                                            updatedAttributes.find(
                                              (item: any) =>
                                                item.name === attributeName
                                            );
                                          return (
                                            <div
                                              className="hd-infor-text-meta text-[13px] text-[#878787]"
                                              key={attributeName}
                                            >
                                              <p>
                                                {attributeName}:{" "}
                                                <strong>
                                                  {attributeItem
                                                    ? attributeItem.pivot.value
                                                    : attributeValue}
                                                </strong>
                                              </p>
                                            </div>
                                          );
                                        }
                                      )
                                    : e?.productvariant?.attributes?.map(
                                        (item: any) => (
                                          <div
                                            className="hd-infor-text-meta text-[13px] text-[#878787]"
                                            key={item.id}
                                          >
                                            <p>
                                              {item?.name}:{" "}
                                              <strong>
                                                {item?.pivot?.value}
                                              </strong>
                                            </p>
                                          </div>
                                        )
                                      )}

                                  <div className="hd-infor-text-tools mt-[10px]">
                                    {e.productvariant && (
                                      <Button
                                        onClick={() =>
                                          handleAttribute(
                                            e?.id,
                                            e?.productvariant?.attributes
                                          )
                                        }
                                        className="inline-flex mr-[-15px] border-none"
                                      >
                                        <Note />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <ModalCart
                                open={visiable}
                                onClose={closeModal}
                                idCart={idCart}
                                onUpdateAttributes={handleUpdateAttributes}
                                attributes={updatedAttributes[idCart] || []}
                              />

                              <div className="hd-qty-total block lg:hidden">
                                <div className="flex items-center justify-between border-2 border-slate-200 rounded-full py-[10px] px-[10px]">
                                  <div className="hd-quantity-item relative hd-col-item">
                                    <div className="hd-quantity relative block min-w-[100px] w-[100px] h-8 mx-auto hd-all-btn">
                                      <button
                                        type="button"
                                        className="hd-btn-item left-0 text-left pl-[15px] pb-[10px] text-sm cursor-pointer shadow-none transform-none touch-manipulation"
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
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                          />
                                        </svg>
                                      </button>
                                      <span className="select-none leading-8 cursor-text font-semibold text-sm">
                                        1
                                      </span>
                                      <button
                                        type="button"
                                        className="hd-btn-item pb-[10px] right-0 text-right pr-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                                      >
                                        <AddCount />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/*end hd-infor-item*/}
                            <div className="hd-price-item !text-center w-3/12 hd-col-item lg:block hidden">
                              <div className="hs-prices">
                                <div className="hd-text-price">
                                  <del className="text-[#696969]">
                                    {FormatMoney(
                                      e?.productvariant?.price_regular ||
                                        e?.product?.price_regular
                                    )}
                                  </del>
                                  <ins className="ms-[6px] no-underline text-[#ec0101]">
                                    {FormatMoney(
                                      e?.productvariant?.price_sale ||
                                        e?.product?.price_sale
                                    )}
                                  </ins>
                                </div>
                              </div>
                            </div>
                            {/*end hd-price-item*/}
                            <div className="hd-quantity-item !text-center w-2/12 hd-col-item lg:block hidden">
                              <div className="hd-quantity relative block min-w-[120px] w-[120px] h-10 mx-auto hd-all-btn">
                                <button
                                  type="button"
                                  className="hd-btn-item left-0 text-left pl-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                                  onClick={() =>
                                    handleDecrease(
                                      e?.id,
                                      e?.quantity,
                                      attributesObject
                                    )
                                  }
                                >
                                  <MinusOutlined />
                                </button>
                                <span className="select-none leading-9 cursor-text font-semibold text-base">
                                  {e?.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleIncrease(
                                      e?.id,
                                      e?.quantity,
                                      attributesObject
                                    )
                                  }
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
                            </div>
                            {/*end hd-quantity-item*/}
                            <div className="hd-total-item hd-col-item text-end w-2/12 lg:block hidden">
                              <span className="font-medium">
                                {FormatMoney(e?.total_price)}
                              </span>
                            </div>
                            {/*end hd-total-item*/}
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <p className="text-center mt-12 text-base">
                      Giỏ hàng trống
                    </p>
                  )}
                  {/*end-item-1*/}
                </div>
              </div>
              <Button
                onClick={() => handleDeleteCart([idCart])}
                className="btn-danger mt-5 ml-auto"
                style={{ float: "right", padding: "20px 10px" }}
              >
                Xoá sản phẩm trong giỏ hàng
              </Button>
              {/*end hd-pagecart-items*/}
              <div className="hd-pagecart-footer lg:my-[60px]">
                <div className="hd-footer lg:flex lg:flex-wrap mt-[30px]">
                  <div className="hd-note-text text-start lg:w-[50%] !order-2 hd-col-item mt-8 lg:max-w-full">
                    <div className="hd-node-gift mb-6 lg:items-center lg:flex">
                      {/* <div class="hd-text-gift w-2/3"> */}
                      <div className="flex items-center lg:w-2/3 mb-[5px] lg:text-start">
                        <Gift />
                        <span className="my-3 mx-2">
                          Bạn có muốn một gói quà không?
                          <span className="hd-all-textgrey">
                            Chỉ từ 130.000₫
                          </span>
                        </span>
                        {/* </div> */}
                      </div>
                      {/* <div class="w-1/3"> */}
                      <div className="hd-btn-gift lg:w-1/3 lg:text-end my-[15px]">
                        <Link
                          to=""
                          className="hd-all-btn px-4 py-2 font-semibold min-h-10 hd-all-hoverblue-btn"
                        >
                          <span>Thêm</span>
                        </Link>
                      </div>
                      {/* </div> */}
                    </div>
                    <label className="mb-3 !block">
                      <span>Ghi chú đơn hàng</span>
                      <span className="hidden">Chỉnh sửa ghi chú đơn hàng</span>
                    </label>
                    <textarea
                      className="min-h-28 px-3 py-2 resize-none !w-full hd-cart-note"
                      placeholder="Chúng tôi có thể giúp bạn?"
                      defaultValue={""}
                    />
                    <label className="mt-5 mb-3 !block"> Mã giảm giá: </label>
                    <p className="mb-5 hd-all-textgrey">
                      Kiểm tra mã phiếu giảm giá sẽ hoạt động trên trang thanh
                      toán
                    </p>
                    <input
                      className="px-4 w-full hd-cart-note"
                      type="text"
                      placeholder="Mã giảm giá"
                    />
                  </div>
                  {/*end hd-note-text*/}
                  <div className="hd-sub-total text-end !order-4 lg:w-[50%] hd-col-item my-[30px] hd-all-textgrey">
                    <div className="border-b-0 shadow-none pt-[10px] pb-[4px] pl-[20px] text-[13px] leading-normal">
                      <div className="hd-cart-ship">
                        <div className="hd-ship-text1">
                          Gần xong rồi, mua thêm nhiều hơn
                          <span className="font-semibold text-[#00BADB]">
                            485.000₫
                          </span>
                          để nhận được
                          <span className="uppercase text-black font-semibold">
                            Miễn phí vận chuyển!
                          </span>
                        </div>
                        <div className="hd-ship-text2 hidden">
                          <span className="text-green-600">Chúc mừng!</span>
                          Bạn đã nhận được mã
                          <span className="uppercase text-black font-semibold">
                            Miễn phí vận chuyển.
                          </span>
                        </div>
                      </div>
                      <div className="hd-ship-icon relative max-w-[420px] inline-block w-full h-[9px] bg-zinc-100 rounded-[5px] mt-[20px] mb-[10px]">
                        <span
                          className="!block relative h-full"
                          style={{ width: "90.05802707930367%" }}
                        >
                          <Car />
                        </span>
                      </div>
                    </div>
                    <div className="hd-cart-total uppercase mb-[10px] text-black lg:text-[20px] text-[18px]">
                      <div className="flex-wrap !items-center !justify-between !inline-flex gap-[30px]">
                        <div className="hd-col-item w-auto">
                          <strong className="font-semibold">Tổng:</strong>
                        </div>
                        <div className="hd-col-item w-auto">
                          <div className="text-right font-semibold">
                            {
                              // isFetching ? <Skeleton /> :
                              FormatMoney(data?.sub_total)
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mb-[10px]">
                      Thuế và phí vận chuyển được tính khi thanh toán
                    </p>
                    <div className="relative inline-block mb-[20px]">
                      <input
                        type="checkbox"
                        className="size-3.5 absolute rounded-md shadow-sm top-1 -left-6"
                      />
                      <label>Tôi đồng ý với các điều khoản và điều kiện.</label>
                    </div>
                    <div className=" ">
                      <Button
                        onClick={handleCheckout}
                        className="bg-[#00BADB] text-base h-[50px] w-auto px-[45px] font-semibold rounded-full text-white inline-flex items-center relative overflow-hidden hover:bg-[#23b6cd] transition-all ease-in-out duration-300"
                      >
                        Thanh Toán
                      </Button>
                    </div>
                  </div>
                  {/*end hd-sub-total*/}
                </div>
              </div>
              {/*end hd-pagecart-footer*/}
            </form>
            {/*end hd-form-cart*/}
          </div>
        </section>
        {/*end hd-page-body*/}
      </main>
    </>
  );
};

export default Cart;
