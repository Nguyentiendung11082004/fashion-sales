import React from "react";
import CheckoutIcon7 from "@/components/icons/checkout/CheckoutIcon7";
import CheckoutIcon8 from "@/components/icons/checkout/CheckoutIcon8";
import CheckoutIcon9 from "@/components/icons/checkout/CheckoutIcon9";
import { Link } from "react-router-dom";
import { Product1 } from "@/components/icons";
import CheckoutIcon10 from "@/components/icons/checkout/CheckoutIcon10";
import CheckoutIcon11 from "@/components/icons/checkout/CheckoutIcon11";
import CheckoutIcon13 from "@/components/icons/checkout/CheckoutIcon13";
import CheckoutIcon14 from "@/components/icons/checkout/CheckoutIcon14";
import CheckoutIcon15 from "@/components/icons/checkout/CheckoutIcon15";
import CheckoutIcon16 from "@/components/icons/checkout/CheckoutIcon16";
import CheckoutIcon17 from "@/components/icons/checkout/CheckoutIcon17";
import CheckoutIcon18 from "@/components/icons/checkout/CheckoutIcon18";
import CheckoutIcon19 from "@/components/icons/checkout/CheckoutIcon19";
import CheckoutIcon20 from "@/components/icons/checkout/CheckoutIcon20";
import CheckoutIcon21 from "@/components/icons/checkout/CheckoutIcon21";
import CheckoutIcon22 from "@/components/icons/checkout/CheckoutIcon22";
import User from "@/components/icons/checkout/User";
import Completed from "@/components/icons/checkout/Completed";
import AddressCheckout from "@/components/icons/checkout/AddressCheckout";
import CheckoutIcon12 from "@/components/icons/checkout/CheckoutIcon12";
import IconPay from "@/components/icons/checkout/IconPay";

const Checkout = () => {
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
                            <span>Thu Hằng</span>
                            <span className="ml-3 tracking-tighter">
                              0921 735 576
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
                              80 Xuân Phương, Bắc Từ Liêm, Hà Nội, Việt Nam
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
                          <div>
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
                          </div>
                          <div>
                            <label
                              className="hd-Label text-base font-medium text-neutral-900"
                              data-nc-id="Label"
                            >
                              Quốc gia
                            </label>
                            <select className="hd-Select pl-[13px] outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                              <option value="Vietnam">Vietnam</option>
                              <option value="Vietnam">Canada</option>
                              <option value="Vietnam">Mexico</option>
                              <option value="Vietnam">Israel</option>
                              <option value="Vietnam">France</option>
                              <option value="Vietnam">England</option>
                              <option value="Vietnam">Laos</option>
                              <option value="Vietnam">China</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                          <div>
                            <label
                              className="hd-Label text-base font-medium text-neutral-900"
                              data-nc-id="Label"
                            >
                              Tỉnh
                            </label>
                            <input
                              className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                              type="text"
                            />
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
                  <div id="hd-PaymentMethod" className="scroll-mt-24">
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
                  </div>
                  {/*end hd-PaymentMethod*/}
                </div>
              </div>
              {/*end-left*/}
              <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16" />
              <div className="w-full lg:w-[36%]">
                <h3 className="text-lg font-semibold">Đặt hàng</h3>
                <div className="hd-checkout-pro mt-8 divide-y divide-slate-200/70">
                  <div className="relative flex py-7 first:pt-0 last:pb-0">
                    <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img
                        alt="Rey Nylon Backpack"
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        className="h-full w-full object-contain object-center"
                        sizes="150px"
                        src={Product1}
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: 0,
                          color: "transparent",
                        }}
                      />
                      <Link className="absolute inset-0" to="/product-detail" />
                    </div>
                    <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between">
                          <div className="flex-[1.5]">
                            <h3 className="text-base font-semibold">
                              <Link to="/product-detail">
                                Rey Nylon Backpack
                              </Link>
                            </h3>
                            <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600">
                              <div className="flex items-center space-x-1.5">
                                <CheckoutIcon10 />
                                <span>Black</span>
                              </div>
                              <span className="mx-4 border-l border-slate-200" />
                              <div className="flex items-center space-x-1.5">
                                <CheckoutIcon11 />
                                <span>2XL</span>
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
                                <del className="mr-1">12.000.000đ</del>
                                <span className="text-[red]">776.000₫</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-auto pt-4 items-end justify-between text-sm">
                        <div className="hidden sm:block text-center relative">
                          <div className="nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10">
                            <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                              <button
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                                disabled
                              >
                                <CheckoutIcon12 />
                              </button>
                              <span className="select-none block flex-1 text-center leading-none">
                                1
                              </span>
                              <button
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                              >
                                <CheckoutIcon13 />
                              </button>
                            </div>
                          </div>
                        </div>
                        <Link
                          to="##"
                          className="relative z-10 flex items-center mt-3 font-medium hover:text-[#00BADB] text-sm"
                        >
                          <span>Xóa</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex py-7 first:pt-0 last:pb-0">
                    <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img
                        alt="Rey Nylon Backpack"
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        className="h-full w-full object-contain object-center"
                        sizes="150px"
                        src={Product1}
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: 0,
                          color: "transparent",
                        }}
                      />
                      <Link className="absolute inset-0" to="/product-detail" />
                    </div>
                    <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between">
                          <div className="flex-[1.5]">
                            <h3 className="text-base font-semibold">
                              <Link to="/product-detail">
                                Rey Nylon Backpack
                              </Link>
                            </h3>
                            <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600">
                              <div className="flex items-center space-x-1.5">
                                <CheckoutIcon14 />
                                <span>Black</span>
                              </div>
                              <span className="mx-4 border-l border-slate-200" />
                              <div className="flex items-center space-x-1.5">
                                <CheckoutIcon15 />
                                <span>2XL</span>
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
                                <del className="mr-1">12.000.000đ</del>
                                <span className="text-[red]">776.000₫</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-auto pt-4 items-end justify-between text-sm">
                        <div className="hidden sm:block text-center relative">
                          <div className="nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10">
                            <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                              <button
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                                disabled
                              >
                                <CheckoutIcon16 />
                              </button>
                              <span className="select-none block flex-1 text-center leading-none">
                                1
                              </span>
                              <button
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                              >
                                <CheckoutIcon17 />
                              </button>
                            </div>
                          </div>
                        </div>
                        <Link
                          to="##"
                          className="relative z-10 flex items-center mt-3 font-medium hover:text-[#00BADB] text-sm"
                        >
                          <span>Xóa</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex py-7 first:pt-0 last:pb-0">
                    <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img
                        alt="Rey Nylon Backpack"
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        className="h-full w-full object-contain object-center"
                        sizes="150px"
                        src={Product1}
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: 0,
                          color: "transparent",
                        }}
                      />
                      <Link className="absolute inset-0" to="/product-detail" />
                    </div>
                    <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between">
                          <div className="flex-[1.5]">
                            <h3 className="text-base font-semibold">
                              <Link to="/product-detail">
                                Rey Nylon Backpack
                              </Link>
                            </h3>
                            <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600">
                              <div className="flex items-center space-x-1.5">
                                <CheckoutIcon18 />
                                <span>Black</span>
                              </div>
                              <span className="mx-4 border-l border-slate-200" />
                              <div className="flex items-center space-x-1.5">
                                <CheckoutIcon19 />
                                <span>2XL</span>
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
                                <del className="mr-1">12.000.000đ</del>
                                <span className="text-[red]">776.000₫</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-auto pt-4 items-end justify-between text-sm">
                        <div className="hidden sm:block text-center relative">
                          <div className="nc-NcInputNumber flex items-center justify-between space-x-5 relative z-10">
                            <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                              <button
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                                disabled
                              >
                                <CheckoutIcon20 />
                              </button>
                              <span className="select-none block flex-1 text-center leading-none">
                                1
                              </span>
                              <button
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                              >
                                <CheckoutIcon21 />
                              </button>
                            </div>
                          </div>
                        </div>
                        <Link
                          to="##"
                          className="relative z-10 flex items-center mt-3 font-medium hover:text-[#00BADB] text-sm"
                        >
                          <span>Xóa</span>
                        </Link>
                      </div>
                    </div>
                  </div>
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
                      />
                      <button className="text-gray-800 outline-0 border border-neutral-200 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:hover:bg-neutral-100 w-24 flex justify-center items-center transition-colors">
                        Áp dụng
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between py-2.5">
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
                  </div>
                  <div className="flex justify-between font-semibold text-slate-900 text-base pt-4">
                    <span>Tổng tiền</span>
                    <span>15.000.000đ</span>
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
          </main>
        </div>
        {/*end hd-CheckoutPage*/}
      </main>
    </>
  );
};

export default Checkout;
