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
import User from "@/components/icons/checkout/User";
import instance from "@/configs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Checkout = () => {
  const { token } = useAuth();
  const location = useLocation();
  const { cartIds } = location.state || {};
  const { cartId } = location.state || {};
  const [idTinh, setIdTinh] = useState<number | null>(0)
  const [idQuanHuyen, setIdQuanHuyen] = useState<number | null>(0)
  const { data: dataCheckout, isFetching } = useQuery({
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
    setIdTinh(Number(e.target.value));
  }

  const handleChangeQuanHuyen = (e: any) => {
    const value = parseInt(e.target.value, 10);
    console.log("Raw Value:", e.target.value, "Converted Integer Value:", value);
    setIdQuanHuyen(value);
  };

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
      console.log("res", res)
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
  // console.log("phuongXa", phuongXa)
  // useEffect(() => {
  //   getTinhThanh()
  // }, [])
  if (isFetching) return <div></div>;

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
                          <span className="hidden sm:block">
                            <User />
                          </span>
                          <div className="sm:ml-8">
                            <h3 className="text-black flex">
                              <span className="uppercase tracking-tight">
                                Thông tin liên lạc
                              </span>
                              <Completed />
                            </h3>
                            <div className="font-semibold mt-1 text-sm">
                              <span>{dataCheckout?.user?.name}</span>
                              <span className="ml-3 tracking-tighter">
                                {dataCheckout?.user?.phone_number}
                              </span>
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
                        <div className="hd-top-ShippingAddress p-6 flex flex-col sm:flex-row items-start">
                          <span className="hidden sm:block">
                            <AddressCheckout />
                          </span>
                          <div className="sm:ml-8">
                            <h3 className="text-black flex">
                              <span className="uppercase">Địa chỉ giao hàng</span>
                              <Completed />
                            </h3>
                            <div className="font-semibold mt-1 text-sm">
                              <span>
                                {dataCheckout?.user?.address}
                              </span>
                            </div>
                          </div>
                          <button className="py-2 px-4 bg-slate-50 hover:bg-slate-100 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg">
                            Thay đổi
                          </button>
                        </div>
                        {/*end hd-top-ShippingAddress*/}
                        <div className="hd-body-ShippingAddress border-t border-slate-200 px-6 py-7 space-y-4 sm:space-y-6 block">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
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
                          </div>
                          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                            <div className="flex-1">
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Địa chỉ
                              </label>
                              <input
                                className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                type="text"
                                defaultValue="80 Xuân Phương, Bắc Từ Liêm"
                              />
                            </div>
                            <div className="sm:w-1/3">
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Số nhà/Số căn *
                              </label>
                              <input
                                className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                type="text"
                                defaultValue="sn10 - 5/101/80"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                            {/* <div>
                            <label
                              className="hd-Label text-base font-medium text-neutral-900"
                              data-nc-id="Label"
                            >
                              Thành phố
                            </label>
                            <input
                              className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                              type="text"
                              defaultValue="Hà Nội"
                            />
                          </div> */}
                            <div>
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Thành phố
                              </label>

                              <select onChange={handleChangeTinh} className="hd-Select pl-[13px] outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                {
                                  tinhThanh?.provinces?.map((e: any) => (
                                    <option value={`${e?.ProvinceID}`}>{e?.ProvinceName}</option>
                                  ))
                                }
                                <option value=""></option>
                              </select>
                            </div>
                            <div>
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Xã
                              </label>
                              <select className="hd-Select pl-[13px] outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">

                                {
                                  phuongXa?.wards?.map((e: any) => (
                                    <option value={`${e?.WardsId}`}>{e?.WardName}</option>
                                  ))
                                }

                              </select>
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
                              <select onChange={handleChangeQuanHuyen} className="hd-Select pl-[13px] outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                {
                                  quanHuyen?.districts?.map((quan: any) => (
                                    <option key={quan.DistrictID} value={quan.DistrictID}>
                                      {quan.DistrictName}
                                    </option>
                                  ))
                                }
                                <option value=""></option>
                              </select>
                            </div>
                            <div>
                              <label
                                className="hd-Label text-base font-medium text-neutral-900"
                                data-nc-id="Label"
                              >
                                Mã bưu cục
                              </label>
                              <input
                                className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                                type="text"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              className="hd-Label text-base font-medium text-neutral-900"
                              data-nc-id="Label"
                            >
                              Đến:
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
                                />
                                <label
                                  htmlFor="Address-type-home"
                                  className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                                >
                                  <span className="text-sm font-medium">
                                    Nhà riêng
                                    <span className="font-light">
                                      (Giao hàng cả ngày)
                                    </span>
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
                                />
                                <label
                                  htmlFor="Address-type-office"
                                  className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                                >
                                  <span className="text-sm font-medium">
                                    Văn phòng
                                    <span className="font-light">
                                      (Giao hàng từ
                                      <span className="font-medium">
                                        9:00 - 17:00
                                      </span>
                                      )
                                    </span>
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row pt-6">
                            <button className="hd-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-[#00BADB] hover:bg-[#23b6cd] text-white sm:!px-7 shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                              Lưu &amp; tiếp tục Thanh toán
                            </button>
                            <button className="hd-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonSecondary bg-slate-50 text-black hover:bg-gray-100 mt-3 sm:mt-0 sm:ml-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                              Hủy
                            </button>
                          </div>
                        </div>
                        {/*end hd-body-ShippingAddress*/}
                      </div>
                    </div>
                    {/*end hd-ShippingAddress*/}
                    <button onClick={() => handleVnPay()} id="hd-PaymentMethod" className="scroll-mt-24">
                      <div className="border border-slate-200 rounded-xl">
                        <div className="p-6 flex flex-col sm:flex-row items-start">
                          <span className="hidden sm:block">
                            <IconPay />
                          </span>
                          <div className="sm:ml-8">
                            <h3 className="text-black flex">
                              <span className="uppercase tracking-tight">
                                Phương thức thanh toán
                              </span>
                              <Completed />
                            </h3>
                            <div className="font-semibold mt-1 text-sm">
                              <span>Ví MOMO / VNPay </span>
                              <span className="ml-3"> xxx-xxx-xx55 </span>
                            </div>
                          </div>
                          <button className="py-2 px-4 bg-slate-50 hover:bg-slate-100 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg">
                            Thay đổi
                          </button>
                        </div>
                        {/*end*/}
                        <div className="border-t border-slate-200 px-6 py-7 space-y-6 hidden">
                          <div>
                            <div className="flex items-start space-x-4 sm:space-x-6">
                              <div className="flex items-center text-sm sm:text-base pt-3.5">
                                <input
                                  id="Credit-Card"
                                  className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                                  type="radio"
                                  defaultValue="Credit-Card"
                                  defaultChecked
                                  name="payment-method"
                                />
                              </div>
                              <div className="flex-1">
                                <label
                                  htmlFor="Credit-Card"
                                  className="flex items-center space-x-4 sm:space-x-6"
                                >
                                  <div className="p-2.5 rounded-xl border-2 border-slate-600 ">
                                    <CheckoutIcon7 />
                                  </div>
                                  <p className="font-medium">
                                    Debit / Credit Card
                                  </p>
                                </label>
                                <div className="mt-6 mb-4 space-y-3 sm:space-y-5 block">
                                  <div className="max-w-lg">
                                    <label
                                      className="hd-Label text-base font-medium text-neutral-900"
                                      data-nc-id="Label"
                                    >
                                      Card number
                                    </label>
                                    <input
                                      className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                                      autoComplete="off"
                                      type="text"
                                    />
                                  </div>
                                  <div className="max-w-lg">
                                    <label
                                      className="hd-Label text-base font-medium text-neutral-900 "
                                      data-nc-id="Label"
                                    >
                                      Name on Card
                                    </label>
                                    <input
                                      className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                                      autoComplete="off"
                                      type="text"
                                    />
                                  </div>
                                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                    <div className="sm:w-2/3">
                                      <label
                                        className="nc-Label text-base font-medium text-neutral-900 "
                                        data-nc-id="Label"
                                      >
                                        Expiration date (MM/YY)
                                      </label>
                                      <input
                                        className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                                        autoComplete="off"
                                        placeholder="MM/YY"
                                        type="text"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <label
                                        className="hd-Label text-base font-medium text-neutral-900 "
                                        data-nc-id="Label"
                                      >
                                        CVC
                                      </label>
                                      <input
                                        className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                                        autoComplete="off"
                                        placeholder="CVC"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start space-x-4 sm:space-x-6">
                              <div className="flex items-center text-sm sm:text-base pt-3.5">
                                <input
                                  id="Internet-banking"
                                  className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                                  type="radio"
                                  defaultValue="Internet-banking"
                                  name="payment-method"
                                />
                              </div>
                              <div className="flex-1">
                                <label
                                  htmlFor="Internet-banking"
                                  className="flex items-center space-x-4 sm:space-x-6"
                                >
                                  <div className="p-2.5 rounded-xl border-2 border-gray-200 dark:border-slate-600">
                                    <CheckoutIcon8 />
                                  </div>
                                  <p className="font-medium">Internet banking</p>
                                </label>
                                <div className="mt-6 mb-4 hidden">
                                  <p className="text-sm dark:text-slate-300">
                                    Your order will be delivered to you after you
                                    transfer to:
                                  </p>
                                  <ul className="mt-3.5 text-sm text-slate-500 dark:text-slate-400 space-y-2">
                                    <li>
                                      <h3 className="text-base text-slate-800 dark:text-slate-200 font-semibold mb-1">
                                        ChisNghiax
                                      </h3>
                                    </li>
                                    <li>
                                      Bank name:
                                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                                        Example Bank Name
                                      </span>
                                    </li>
                                    <li>
                                      Account number:
                                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                                        555 888 777
                                      </span>
                                    </li>
                                    <li>
                                      Sort code:
                                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                                        999
                                      </span>
                                    </li>
                                    <li>
                                      IBAN:
                                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                                        IBAN
                                      </span>
                                    </li>
                                    <li>
                                      BIC:
                                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                                        BIC/Swift
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start space-x-4 sm:space-x-6">
                              <div className="flex items-center text-sm sm:text-base pt-3.5">
                                <input
                                  id="Wallet"
                                  className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6"
                                  type="radio"
                                  defaultValue="Wallet"
                                  name="payment-method"
                                />
                              </div>
                              <div className="flex-1">
                                <label
                                  htmlFor="Wallet"
                                  className="flex items-center space-x-4 sm:space-x-6"
                                >
                                  <div className="p-2.5 rounded-xl border-2 border-gray-200 dark:border-slate-600">
                                    <CheckoutIcon9 />
                                  </div>
                                  <p className="font-medium">
                                    Google / Apple Wallet
                                  </p>
                                </label>
                                <div className="mt-6 mb-4 space-y-6 hidden">
                                  <div className="text-sm prose dark:prose-invert">
                                    <p>
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Itaque dolore quod quas
                                      fugit perspiciatis architecto, temporibus
                                      quos ducimus libero explicabo?
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex pt-6">
                            <button className="hd-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl w-full max-w-[240px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                              Confirm order
                            </button>
                            <button className="hd-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonSecondary bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 ml-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                              Cancel
                            </button>
                          </div>
                        </div>
                        {/*end hd-form-change-PaymentMethod-none*/}
                      </div>
                    </button>
                    {/*end hd-PaymentMethod*/}
                  </div>
                </div>
                {/*end-left*/}
                <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16" />
                <div className="w-full lg:w-[36%]">
                  <h3 className="text-lg font-semibold mb-4">Đặt hàng</h3>
                  {isFetching ? <Loading /> :
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
                      <span className="font-semibold text-slate-900">5.000.000đ</span>
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
                  <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-[#00BADB] hover:bg-[#23b6cd] text-white shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
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
