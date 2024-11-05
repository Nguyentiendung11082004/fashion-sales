import Loading from "@/common/Loading/Loading";
import { useAuth } from "@/common/context/Auth/AuthContext";
import { FormatMoney } from "@/common/utils/utils";
import AddressCheckout from "@/components/icons/checkout/AddressCheckout";
import CheckoutIcon12 from "@/components/icons/checkout/CheckoutIcon12";
import CheckoutIcon13 from "@/components/icons/checkout/CheckoutIcon13";
import CheckoutIcon22 from "@/components/icons/checkout/CheckoutIcon22";
import CheckoutIcon7 from "@/components/icons/checkout/CheckoutIcon7";
import CheckoutIcon8 from "@/components/icons/checkout/CheckoutIcon8";
import CheckoutIcon9 from "@/components/icons/checkout/CheckoutIcon9";
import Completed from "@/components/icons/checkout/Completed";
import IconPay from "@/components/icons/checkout/IconPay";
import Map from "@/components/icons/checkout/Map";
import User from "@/components/icons/checkout/User";
import instance from "@/configs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Select } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Checkout = () => {
  const { Option } = Select;
  const { token } = useAuth();
  const location = useLocation();
  const { cartIds } = location.state || {};

  const { cartId } = location.state || {};
  const [idTinh, setIdTinh] = useState<number | null>(0)
  const [idQuanHuyen, setIdQuanHuyen] = useState<number | null>(0)
  const [idXa, setIdXa] = useState<number | null>(0)
  const [paymentMethhod, setPaymentMethod] = useState('1');
  const [shiping, setShipPing] = useState('1');

  const handleChangeMethod = (e: any) => {
    const newPaymentMethod = e.target.value;
    setPaymentMethod(newPaymentMethod);
    setOrder((prev) => ({
      ...prev,
      payment_method_id: newPaymentMethod,
    }));
  };

  const { data: dataCheckout, isLoading } = useQuery({
    queryKey: ['checkout'],
    queryFn: async () => {
      const payload = cartIds ? { cart_item_ids: cartIds || [] } : { product_id: cartId, quantity: 1, };
      const { data } = await instance.post(`/checkout`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return data;
    }
  })
  const { data: tinhThanh } = useQuery({
    queryKey: ['tinhThanh'],
    queryFn: async () => {
      const res = await instance.get(`/getprovinces`);
      return res.data;
    }
  })

  const handleChangeTinh = (e: any) => {
    setIdTinh(Number(e));
  }

  const handleChangeQuanHuyen = (e: any) => {
    const value = parseInt(e, 10);
    setIdQuanHuyen(value);
  };
  const handleChangeXa = (e: any) => {
    const value = parseInt(e, 10);
    setIdXa(value)
  }
  const handleChangeShiping = (e:any) => {
    setShipPing(e)
  }

  const { data: quanHuyen } = useQuery<any>({
    queryKey: ['quanHuyen', idTinh],
    queryFn: async () => {
      const res = await instance.post(`/getdistricts`, { province_id: idTinh });
      return res?.data;
    },
    enabled: !!tinhThanh
  });
  const { data: phuongXa } = useQuery({
    queryKey: ['phuongXa', idQuanHuyen],
    queryFn: async () => {
      const res = await instance.post(`/getwards`, { district_id: idQuanHuyen });
      return res.data;
    },
    enabled: !!quanHuyen
  });
  const mutationVnPay = useMutation({
    mutationFn: async () => {
      const res = await instance.post(`/payment/vnpay`, {
        total_amount: "",
        order_id: ""
      })
    }
  })
  const [voucher, setVoucher] = useState<any>();
  const [subTotal, setSubTotal] = useState();
  const [totalDiscount, setTotalDiscount] = useState();
  const mutationVoucher = useMutation({
    mutationFn: async () => {
      const res = await instance.post(`/checkout`, {
        cart_item_ids: cartIds || cartId,
        voucher_code: voucher,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      setTotalDiscount(res?.data?.total_discount)
      setSubTotal(res?.data?.sub_total)
      return res.data;
    }
  })

  const handleVnPay = () => {
    mutationVnPay.mutate()
  }
  const handleVoucher = () => {
    mutationVoucher.mutate();
  }
  // console.log("dataCheckout",dataCheckout)

  const cartItemIds = dataCheckout?.order_items?.map((e:any) => e);
  const qty = dataCheckout?.order_items?.map((e:any)=> e.quantity);
  console.log("cartItemIds",cartItemIds)
  console.log("qty",qty)
  const quantityOfCart = cartItemIds?.reduce((acc: any, id: any, index: number) => {
    acc[id] = qty[index]; 
    return acc;
  }, {});
  console.log("cartItemIds",cartItemIds)

  const [order, setOrder] = useState({
    payment_method_id: 1,
    payment_status: "pending",
    user_note: "",
    ship_user_email: dataCheckout?.user?.email,
    ship_user_name: dataCheckout?.user?.name,
    ship_user_phonenumber: dataCheckout?.user?.phone_number,
    ship_user_address: dataCheckout?.user?.address,
    shipping_method: shiping,
    voucher_code: voucher,
    cart_item_ids: cartIds,
    quantityOfCart: quantityOfCart, 
    // id_product: 1,
    // product_variant_id: 1,
    // quantity: 1
  })
  const setForm = (props: any, value: any) => {
    setOrder((prev) => ({
      ...prev,
      [props]: value
    }))
  }
  const orderMutation = useMutation({
    mutationFn: async () => {
      const res = await instance.post(`/order`, order);
      return res?.data;
    }
  })
  const handleOrder = () => {
    orderMutation.mutate();
  }
  if (isLoading) return <div></div>;

  return (
    <>
      <main
        id="main-content"
        className="min-h-fit !shadow-none !outline-0 block isolate *:box-border"
      >
        <div className="hd-page-head">
          <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center ">
            <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 py-[50px] mb-0">
              <div className="relative hd-container">
                <h1 className="text-white text-xl font-medium leading-5">
                  Thanh toán
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/*end hd-page-head*/}
        <div className="hd-CheckoutPage">
          <main className="container py-16 lg:pb-28 lg:pt-20">
            {
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1">
                  <div className="space-y-8">
                    <div id="hd-ContactInfo" className="scroll-mt-24">
                      <div className="border border-slate-200 rounded-xl overflow-hidden z-0">
                        <div className="flex flex-col sm:flex-row items-start p-6">
                          <span className="hidden sm:block mt-4 ">
                            <Map />
                          </span>
                          <div className="sm:ml-8">
                            <h3 className="text-black flex">
                              <span className="uppercase tracking-tight">
                                Địa chỉ nhận hàng
                              </span>
                              <Completed />
                            </h3>
                            <div className="font-semibold mt-1 text-sm">
                              <span>{dataCheckout?.user?.name}</span>
                              <span className="ml-3 tracking-tighter">
                                {dataCheckout?.user?.phone_number}
                              </span>
                            </div>
                            <div className="mt-2">
                              Miêu Nha, Tây Mỗ ,Nam Từ Liêm , Hà Nội
                            </div>
                          </div>
                          <button className="py-2 px-4 bg-slate-50 hover:bg-slate-100 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg">
                            Thay đổi
                          </button>
                        </div>
                        {/*end*/}
                        <div className="hd-no-account border-t border-slate-200 px-6 py-7 space-y-4 sm:space-y-6 hidden">
                          <div className="flex justify-between flex-wrap items-baseline">
                            <h3 className="text-lg font-semibold">
                              Thông tin liên lạc
                            </h3>
                            <span className="block text-sm my-1 md:my-0">
                              Bạn chưa có tài khoản?
                              <Link
                                to="##"
                                className="text-primary-500 font-medium"
                              >
                                Đăng nhập
                              </Link>
                            </span>
                          </div>
                          <div className="max-w-lg">
                            <label
                              className="nc-Label font-medium text-neutral-900 text-sm"
                              data-nc-id="Label"
                            >
                              Số điện thoại
                            </label>
                            <input
                              className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                              type="text"
                              defaultValue="+84 xxx"
                            />
                          </div>
                          <div className="max-w-lg">
                            <label
                              className="nc-Label font-medium text-neutral-900 text-sm"
                              data-nc-id="Label"
                            >
                              Email
                            </label>
                            <input
                              className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                              type="email"
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row pt-6">
                            <button className="hd-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 sm:!px-7 shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                              Lưu &amp; Tiếp tục mua sắm
                            </button>
                            <button className="hd-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 mt-3 sm:mt-0 sm:ml-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                              Hủy
                            </button>
                          </div>
                        </div>
                        {/*end hd-form-change-account-none*/}
                      </div>
                    </div>
                    {/*end ContactInfo*/}
                    <div id="hd-ShippingAddress" className="scroll-mt-24">
                      <div className="border border-slate-200 rounded-xl">

                        {/*end hd-top-ShippingAddress*/}
                        <div className="hd-body-ShippingAddress border-t border-slate-200 px-6 py-7 space-y-4 sm:space-y-6 block">
                          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                            <div>
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Họ
                              </label>
                              <input
                                className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                type="text"
                                defaultValue="Thu"
                              />
                            </div>
                            <div>
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Tên
                              </label>
                              <input
                                className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                type="text"
                                defaultValue="Hằng"
                              />
                            </div>
                          </div> */}
                          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                            <div className="flex-1">
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Họ và tên
                              </label>
                              <input
                                className="block w-full outline-0 border border-neutral-200 focus:border-primary-300
                                 focus:ring focus:ring-primary-200 focus:ring-opacity-50
                                  bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25
                                   dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50
                                    focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                type="text"
                                placeholder="Nhập họ và tên"
                              />
                            </div>

                          </div>
                          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                            <div className="flex-1">
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Shiping
                              </label>
                              <Select onChange={handleChangeShiping} className="hd-Select  outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                <Option value="1">
                                  Tiêu chuẩn
                                </Option>
                                <Option value="2">
                                  Hoả tốc
                                </Option>
                                <Option value="3">
                                  Nhận tại cửa hàng
                                </Option>
                              </Select>
                            </div>

                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                            <div>
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Thành phố
                              </label>
                              <Select
                                onChange={handleChangeTinh}
                                // showSearch
                                className="hd-Select  outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                {
                                  tinhThanh?.provinces?.map((e: any) => (
                                    <Option value={e?.ProvinceID}>{e?.ProvinceName}</Option>
                                  ))
                                }

                              </Select>

                            </div>
                            <div>
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Xã
                              </label>
                              <Select
                                onChange={handleChangeXa}
                                className="hd-Select outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                {
                                  phuongXa?.wards?.map((e: any) => (
                                    <Option key={e?.WardCode} value={`${e?.WardCode}`}>{e?.WardName}</Option>
                                  ))
                                }
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                            <div>
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Quận/Huyện
                              </label>
                              <Select onChange={handleChangeQuanHuyen} className="hd-Select  outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                {
                                  quanHuyen?.districts?.map((quan: any) => (
                                    <Option key={quan.DistrictID} value={quan.DistrictID}>
                                      {quan.DistrictName}
                                    </Option>
                                  ))
                                }
                                <option value=""></option>
                              </Select>
                            </div>
                            <div>
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Địa chỉ cụ thể
                              </label>
                              <input
                                className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                type="text"
                                onChange={(e) => setForm("ship_user_address", e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                            <div className="flex-1">
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Ghi chú
                              </label>
                              <input
                                className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                type="text"
                                onChange={(e) => setForm("user_note", e.target.value)}
                                placeholder="Ghi chú"
                              />
                            </div>

                          </div>

                        </div>
                        {/*end hd-body-ShippingAddress*/}
                      </div>
                    </div>
                    {/*end hd-ShippingAddress*/}
                    <div>
                      <label
                        className="hd-Label text-base font-medium text-neutral-900"
                        data-nc-id="Label"
                      >
                        Phương thức thanh toán
                      </label>
                      <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div className="flex items-center text-sm sm:text-base">
                          <input
                            id="Address-type-home"
                            className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-600 dark:hover:border-slate-400 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                            type="radio"
                            defaultValue="Address-type-home"
                            defaultChecked
                            name="Address-type"
                            value={'1'}
                            checked={paymentMethhod == '1'}
                            onChange={handleChangeMethod}
                          />
                          <label
                            htmlFor="Address-type-home"
                            className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                          >
                            <span className="text-sm font-medium">
                              Thanh toán khi nhận hàng

                            </span>
                          </label>
                        </div>
                        <div className="flex items-center text-sm sm:text-base">
                          <input
                            id="Address-type-office"
                            className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-600 dark:hover:border-slate-400 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                            type="radio"
                            defaultValue="Address-type-office"
                            name="Address-type"
                            value={'2'}
                            checked={paymentMethhod == '2'}
                            onChange={handleChangeMethod}
                          />
                          <label
                            htmlFor="Address-type-office"
                            className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                          >
                            <span className="text-sm font-medium">
                              Thanh toán online
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/*end hd-PaymentMethod*/}
                  </div>
                </div>
                {/*end-left*/}
                <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16" />
                <div className="w-full lg:w-[36%]">
                  <h3 className="text-lg font-semibold mb-4">Đặt hàng</h3>
                  {isLoading ? <Loading /> :
                    dataCheckout?.order_items.map((e: any) => (
                      <>
                        <div className="relative flex  first:pt-0 last:pb-0">
                          <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden  ">
                            <img
                              alt={e?.product?.name || "Product Image"}
                              loading="lazy"
                              decoding="async"
                              data-nimg="fill"
                              className="w-full object-contain object-center rounded-xl"
                              sizes="150px"
                              src={e?.variant?.image ? e?.variant?.image : e?.product?.img_thumbnail}

                            />
                            <Link className="absolute inset-0" to="/product-detail" />
                          </div>
                          <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between">
                                <div className="">
                                  <h3 className="text-base font-semibold">
                                    <Link to="/product-detail">
                                      {e?.product?.name}
                                    </Link>
                                  </h3>
                                  <div className="mt-1.5  flex text-sm text-slate-600">
                                    <div className="flex items-center ">

                                      {
                                        e?.variant?.attributes?.map((z: any, index: number) => (
                                          <span >
                                            {z.pivot.value}
                                            {index < e.variant.attributes.length - 1 && <span className="mx-2">/</span>}
                                          </span>
                                        ))
                                      }
                                    </div>


                                  </div>
                                  <div className="mt-3 flex justify-between w-full sm:hidden relative">
                                    <select
                                      name="qty"
                                      id="qty"
                                      className="form-select text-sm rounded-md py-1 border-slate-200 relative z-10"
                                    >
                                      <option value={1}>1</option>
                                      <option value={2}>2</option>
                                      <option value={3}>3</option>
                                      <option value={4}>4</option>
                                      <option value={5}>5</option>
                                      <option value={6}>6</option>
                                      <option value={7}>7</option>
                                    </select>
                                    <div>
                                      <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full">
                                        <span className="text-green-500 !leading-none">
                                          $74
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {/*end-form-change-qty*/}
                                </div>
                                <div className="hidden flex-1 sm:flex justify-end">
                                  <div className="mt-[1.7px]">
                                    <div className="flex items-center text-sm font-medium">
                                      {/* <del className="mr-1">{FormatMoney(e.variant.price_regular)}</del> */}
                                      <span className="text-[red]">{e?.variant?.price_sale ? FormatMoney(e.variant.price_sale) : FormatMoney(e?.product?.price_sale)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-end mt-6 justify-between text-sm">
                              <div className="hidden sm:block text-center relative">
                                <div className="flex items-center">
                                  <span>Số lượng:  </span><p className="font-bold ml-2 text-base">{e?.quantity}</p>
                                </div>
                              </div>
                              <Link
                                to="##"
                                className="relative z-10 flex items-center mt-3 font-medium hover:text-[#00BADB] text-sm"
                              >

                              </Link>
                            </div>
                          </div>
                        </div>

                      </>
                    ))}

                  <div className="hd-checkout-pro mt-8 divide-y divide-slate-200/70">


                  </div>
                  {/*end hd-checkout-pro*/}
                  <div className="hd-checkout-text-count mt-10 pt-6 text-sm text-slate-500 border-t border-slate-200/70 dark:border-slate-700">
                    <div>
                      <label
                        className="nc-Label text-base font-medium text-neutral-900"
                        data-nc-id="Label"
                      >
                        Mã giảm giá
                      </label>
                      <div className="flex mt-1.5">
                        <input
                          className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl text-sm font-normal h-10 px-4 py-3 flex-1"
                          type="text"
                          onChange={(e) => setVoucher(e.target.value)}
                        />
                        <button onClick={() => handleVoucher()} className="text-gray-800 outline-0 border border-neutral-200 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:hover:bg-neutral-100 w-24 flex justify-center items-center transition-colors">
                          Áp dụng
                        </button>
                      </div>
                    </div>
                    {/* <div className="mt-4 flex justify-between py-2.5">
                      <span>Tổng phụ</span>
                      <span className="font-semibold text-slate-900">
                        5.000.000đ
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span>Phí vận chuyển</span>
                      <span className="font-semibold text-slate-900">5.000.000đ</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span>Thuế</span>
                      <span className="font-semibold text-slate-900">5.000.000đ</span>
                    </div> */}
                    <div className="flex justify-between py-2.5 mt-2">
                      <span>Phí ship</span>
                      <span className="font-semibold text-slate-900">0đ</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span>Voucher</span>
                      <span className="font-semibold text-slate-900">{totalDiscount || 0}đ</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-900 text-base pt-4">
                      <span>Tổng tiền</span>
                      <span>{FormatMoney(subTotal ? subTotal : dataCheckout?.sub_total)}</span>
                    </div>
                  </div>
                  {/*end hd-checkout-text-count*/}
                  <button onClick={handleOrder} className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-[#00BADB] hover:bg-[#23b6cd] text-white shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                    Xác nhận đơn hàng
                  </button>
                  {/*end hd-checkout-btn*/}
                  <div className="hd-checkout-text-note mt-5 text-sm text-slate-500 flex items-center justify-center">
                    <p className="block relative pl-5">
                      <CheckoutIcon22 />
                      Tìm hiểu thêm thông tin về
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to="##"
                        className="text-slate-900 underline font-medium"
                      >
                        Thuế
                      </Link>
                      <span> và </span>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to="##"
                        className="text-slate-900 underline font-medium"
                      >
                        Vận chuyển
                      </Link>
                    </p>
                  </div>
                  {/*end hd-checkout-text-note*/}
                </div>
                {/*end-right*/}
              </div>
            }

          </main>
        </div>
        {/*end hd-CheckoutPage*/}
      </main>
    </>
  );
};

export default Checkout;
