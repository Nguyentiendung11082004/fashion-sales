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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalCart from "./_components/Modal";
const MySwal = withReactContent(Swal);
const Cart = () => {
  const [visiable, setVisible] = useState(false);
  const [idCart, setIdCart] = useState<number[]>([]); // Chắc chắn idCart luôn là một mảng
  const [updatedAttributes, setUpdatedAttributes] = useState<any>({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const closeModal = () => {
    // setIdCart("");
    setVisible(false);
  };
  const { token } = useAuth();
  const { data, isLoading, isFetching } = useQuery({
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
    staleTime: 0,
  });

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
      console.log("message", message)
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
  const handleDeleteCart = (idCarts: any) => {
    deleteCart.mutate(
      { idCarts },
      {
        onSuccess: () => {
          const updatedCheckedItems = { ...checkedItems };
          idCarts.forEach((id: any) => {
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
          // localStorage.setItem("idCart", JSON.stringify(updatedIdCart));
          const isAllCheckedNow = updatedIdCart.length === carts.length;
          setIsAllChecked(isAllCheckedNow);
          if (updatedIdCart.length === 0) {
            setIsAllChecked(false);
          }
        },
        onError: (message: any) => {
          console.log("message", message)
          toast.error(message?.response?.data?.message, {
            autoClose: 5000,
          });
        },
      }
    );
  };

  const handleAttribute = (idCart: any, variants: any) => {
    setIdCart(idCart);
    setVisible(true);
    setUpdatedAttributes((prev: any) => ({
      ...prev,
      [idCart]: variants,
    }));
  };

  const handleUpdateAttributes = (idCart: number, attributes: any) => {
    setUpdatedAttributes((prev: any) => ({
      ...prev,
      [idCart]: attributes,
    }));
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = {
        ...prevCheckedItems,
        [idCart]: true,
      };
      localStorage.setItem("checkedItems", JSON.stringify(updatedCheckedItems));
      return updatedCheckedItems;
    });
    setIdCart((prevIdCart) => {
      const currentIdCart = Array.isArray(prevIdCart) ? prevIdCart : [];
      const updatedIdCarts = [...currentIdCart, idCart].filter(
        (value, index, self) => self.indexOf(value) === index
      );
      return updatedIdCarts;
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
  // const saveCheckedItems = (userId: string, checkedItems: any) => {
  //   localStorage.setItem(`checkedItems_${userId}`, JSON.stringify(checkedItems));
  // };

  // const getCheckedItems = (userId: string) => {
  //   const stored = localStorage.getItem(`checkedItems_${userId}`);
  //   return stored ? JSON.parse(stored) : {};
  // };
  // useEffect(() => {
  //   if (user?.id) {
  //     const userCheckedItems = getCheckedItems(user.id);
  //     setCheckedItems(userCheckedItems);
  //   }
  // }, [user]);

  const handleCheckout = async () => {
    try {
      const res = await instance.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedCartItems = res?.data.cart.cartitems;
      // Lọc lại idCart và kiểm tra số lượng từng sản phẩm
      const validIdCart = idCart?.filter((id: number) => {
        const cartItem = updatedCartItems.find((item: any) => item.id === id);
        return cartItem && cartItem.quantity > 0; // Kiểm tra số lượng > 0
      });
      // await refetch();
      if (!validIdCart || validIdCart.length === 0) {
        MySwal.fire({
          title: <strong>Cảnh báo</strong>,
          icon: "error",
          text: "Bạn chưa chọn sản phẩm nào để thanh toán",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        navigate("/checkout", { state: { cartIds: validIdCart } });
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      MySwal.fire({
        title: <strong>Cảnh báo</strong>,
        icon: "error",
        text: "Có lỗi xảy ra khi tải giỏ hàng",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  // const handleCheckout = () => {
  //   console.log("idCart", idCart)
  //   if (!idCart || idCart.length === 0) {
  //     MySwal.fire({
  //       title: <strong>Cảnh báo</strong>,
  //       icon: "error",
  //       text: "Bạn chưa chọn sản phẩm nào để thanh toán",
  //       timer: 1500,
  //       timerProgressBar: true,
  //       showConfirmButton: false,
  //     });
  //   } else {
  //     navigate("/checkout", { state: { cartIds: idCart } });
  //   }
  // };
  useEffect(() => {
    const updatedIdCarts = Object.keys(checkedItems)
      .filter((key) => checkedItems[Number(key)])
      .map(Number);
    setIdCart(updatedIdCarts);
    // localStorage.setItem("idCart", JSON.stringify(updatedIdCarts));
  }, [checkedItems]);

  useEffect(() => {
    const storedCheckedItems = localStorage.getItem("checkedItems");
    if (storedCheckedItems) {
      const parsedCheckedItems = JSON.parse(storedCheckedItems);
      setCheckedItems(parsedCheckedItems);

      const updatedIdCarts = Object.keys(parsedCheckedItems)
        .filter((key) => parsedCheckedItems[Number(key)])
        .map(Number);
      setIdCart(updatedIdCarts);
      const isAllCheckedNow = carts?.every((item: any) =>
        parsedCheckedItems[item.id]
      );
      setIsAllChecked(isAllCheckedNow);
    }
  }, [carts]);

  useEffect(() => {
    if (carts && carts.length > 0) {
      const storedCheckedItems = localStorage.getItem("checkedItems");
      if (storedCheckedItems) {
        const parsedCheckedItems = JSON.parse(storedCheckedItems);
        setCheckedItems(parsedCheckedItems);
        const isAllCheckedNow = carts.every(
          (item: any) => parsedCheckedItems[item.id]
        );
        setIsAllChecked(isAllCheckedNow);
      }
    } else {
      setIsAllChecked(false);
    }
  }, [carts]);

  return (
    <>
      <main
        id="main-content"
        className="min-h-fit !shadow-none !outline-0 block isolate *:box-border"
      >
        <div className="hd-page-head">
          <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center">
            <div className="hd-bg-banner overflow-hidden relative !text-center bg-pink bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
              <div className="z-[100] relative hd-container">
                <h1 className="text-white text-xl font-medium leading-5">
                  Giỏ hàng
                </h1>
              </div>
            </div>
          </div>
        </div>

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
                  {isLoading ? (
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
                                attributes={updatedAttributes[idCart as unknown as string | number] || []}
                              />

                              {/* <div className="hd-qty-total block lg:hidden">
                                <div className="flex items-center justify-between border-2 border-slate-200 rounded-full py-[10px] px-[10px]">
                                  <div className="hd-quantity-item relative hd-col-item">
                                    <div className="hd-quantity relative block min-w-[100px] w-[100px] h-8 mx-auto hd-all-btn">
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
                                </div>
                              </div> */}

                            </div>
                            {/* Cột giá */}
                            <div className="hd-price-item !text-center w-3/12 hd-col-item lg:block mt-4 block">
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

                            {/* Cột số lượng */}
                            <div className="hd-quantity-item !text-center w-2/12 hd-col-item lg:block mt-4 block">
                              <div className="hd-quantity relative block min-w-[120px] w-[120px] h-10 mx-auto hd-all-btn">
                                <button
                                  type="button"
                                  className="hd-btn-item left-0 text-left pl-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                                  onClick={() => handleDecrease(e?.id, e?.quantity, attributesObject)}
                                >
                                  <MinusOutlined />
                                </button>
                                <span className="select-none leading-9 cursor-text font-semibold text-base">
                                  {e?.quantity}
                                </span>
                                <button
                                  onClick={() => handleIncrease(e?.id, e?.quantity, attributesObject)}
                                  type="button"
                                  className="hd-btn-item right-0 text-right pr-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3 hd-all-hover-bluelight">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* Cột tổng tiền */}
                            <div className="hd-total-item hd-col-item text-end w-2/12 lg:block mt-4 block">
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

                  </div>
                  {/*end hd-note-text*/}
                  <div className="hd-sub-total text-end !order-4 lg:w-[50%] hd-col-item my-[30px] hd-all-textgrey">
                    <div className="border-b-0 shadow-none pt-[10px] pb-[4px] pl-[20px] text-[13px] leading-normal">
                    </div>
                    <div className="hd-cart-total uppercase mb-[10px] text-black lg:text-[20px] text-[18px]">
                      <div className="flex-wrap !items-center !justify-between !inline-flex gap-[30px]">
                        <div className="hd-col-item w-auto ">
                          <strong className="font-semibold">Tổng:</strong>
                        </div>
                        <div className="hd-col-item w-auto">
                          <div className="text-right font-semibold">
                            {
                              FormatMoney(data?.sub_total)
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mb-[10px]">
                      Phí vận chuyển được tính khi thanh toán
                    </p>
                    {/* <div className="relative inline-block mb-[20px]">
                      <input
                        type="checkbox"
                        className="size-3.5 absolute rounded-md shadow-sm top-1 -left-6"
                      />
                      <label>Tôi đồng ý với các điều khoản và điều kiện.</label>
                    </div> */}
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

        {/*end hd-page-head*/}
        {/*end hd-page-body*/}
      </main>
    </>
  );
};

export default Cart;