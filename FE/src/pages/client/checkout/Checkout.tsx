import React from "react";

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
                          <svg
                            className="w-6 h-6 text-slate-700 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <div className="sm:ml-8">
                          <h3 className="text-black flex">
                            <span className="uppercase tracking-tight">
                              Thông tin liên lạc
                            </span>
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2.5"
                              stroke="currentColor"
                              className="w-5 h-5 ml-3 text-slate-900 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
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
                            <a
                              href="##"
                              className="text-primary-500 font-medium"
                            >
                              Đăng nhập
                            </a>
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
                          <svg
                            className="w-6 h-6 text-slate-700 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <div className="sm:ml-8">
                          <h3 className="text-black flex">
                            <span className="uppercase">
                              {" "}
                              Địa chỉ giao hàng{" "}
                            </span>
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2.5"
                              stroke="currentColor"
                              className="w-5 h-5 ml-3 text-slate-900"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
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
                                      {" "}
                                      9:00 - 17:00{" "}
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
                          <svg
                            className="w-6 h-6 text-slate-700 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.92969 15.8792L15.8797 3.9292"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.1013 18.2791L12.3013 17.0791"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.793 15.5887L16.183 13.1987"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit={10}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3.60127 10.239L10.2413 3.599C12.3613 1.479 13.4213 1.469 15.5213 3.569L20.4313 8.479C22.5313 10.579 22.5213 11.639 20.4013 13.759L13.7613 20.399C11.6413 22.519 10.5813 22.529 8.48127 20.429L3.57127 15.519C1.47127 13.419 1.47127 12.369 3.60127 10.239Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 21.9985H22"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <div className="sm:ml-8">
                          <h3 className="text-black flex">
                            <span className="uppercase tracking-tight">
                              Phương thức thanh toán
                            </span>
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2.5"
                              stroke="currentColor"
                              className="w-5 h-5 ml-3 text-slate-900"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
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
                                  <svg
                                    className="w-6 h-6 sm:w-7 sm:h-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M2 12.6101H19"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeMiterlimit={10}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M19 10.28V17.43C18.97 20.28 18.19 21 15.22 21H5.78003C2.76003 21 2 20.2501 2 17.2701V10.28C2 7.58005 2.63 6.71005 5 6.57005C5.24 6.56005 5.50003 6.55005 5.78003 6.55005H15.22C18.24 6.55005 19 7.30005 19 10.28Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M22 6.73V13.72C22 16.42 21.37 17.29 19 17.43V10.28C19 7.3 18.24 6.55 15.22 6.55H5.78003C5.50003 6.55 5.24 6.56 5 6.57C5.03 3.72 5.81003 3 8.78003 3H18.22C21.24 3 22 3.75 22 6.73Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M5.25 17.8101H6.96997"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeMiterlimit={10}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M9.10986 17.8101H12.5499"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeMiterlimit={10}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
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
                                  <svg
                                    className="w-6 h-6 sm:w-7 sm:h-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M15 3C16.95 8.84 16.95 15.16 15 21"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
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
                                  <svg
                                    className="w-6 h-6 sm:w-7 sm:h-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7 12H14"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
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
                        src="./src/assets/images/product1.webp"
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: 0,
                          color: "transparent",
                        }}
                      />
                      <a className="absolute inset-0" href="/product-detail" />
                    </div>
                    <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between">
                          <div className="flex-[1.5]">
                            <h3 className="text-base font-semibold">
                              <a href="/product-detail">Rey Nylon Backpack</a>
                            </h3>
                            <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600">
                              <div className="flex items-center space-x-1.5">
                                <svg
                                  className="w-4 h-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8.35 1.94995L9.69 3.28992"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2.07 11.92L17.19 11.26"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 22H16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>Black</span>
                              </div>
                              <span className="mx-4 border-l border-slate-200" />
                              <div className="flex items-center space-x-1.5">
                                <svg
                                  className="w-4 h-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M21 9V3H15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 15V21H9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M21 3L13.5 10.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10.5 13.5L3 21"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
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
                            <div className="mt-0.5">
                              <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                                <span className="text-green-500 !leading-none">
                                  $74
                                </span>
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
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="w-4 h-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <span className="select-none block flex-1 text-center leading-none">
                                1
                              </span>
                              <button
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="w-4 h-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <a
                          href="##"
                          className="relative z-10 flex items-center mt-3 font-medium hover:text-[#00BADB] text-sm"
                        >
                          <span>Xóa</span>
                        </a>
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
                        src="./src/assets/images/product1.webp"
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: 0,
                          color: "transparent",
                        }}
                      />
                      <a className="absolute inset-0" href="/product-detail" />
                    </div>
                    <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between">
                          <div className="flex-[1.5]">
                            <h3 className="text-base font-semibold">
                              <a href="/product-detail">Rey Nylon Backpack</a>
                            </h3>
                            <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600">
                              <div className="flex items-center space-x-1.5">
                                <svg
                                  className="w-4 h-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8.35 1.94995L9.69 3.28992"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2.07 11.92L17.19 11.26"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 22H16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>Black</span>
                              </div>
                              <span className="mx-4 border-l border-slate-200" />
                              <div className="flex items-center space-x-1.5">
                                <svg
                                  className="w-4 h-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M21 9V3H15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 15V21H9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M21 3L13.5 10.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10.5 13.5L3 21"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
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
                            <div className="mt-0.5">
                              <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                                <span className="text-green-500 !leading-none">
                                  $74
                                </span>
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
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="w-4 h-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <span className="select-none block flex-1 text-center leading-none">
                                1
                              </span>
                              <button
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="w-4 h-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <a
                          href="##"
                          className="relative z-10 flex items-center mt-3 font-medium hover:text-[#00BADB] text-sm"
                        >
                          <span>Xóa</span>
                        </a>
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
                        src="./src/assets/images/product1.webp"
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: 0,
                          color: "transparent",
                        }}
                      />
                      <a className="absolute inset-0" href="/product-detail" />
                    </div>
                    <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between">
                          <div className="flex-[1.5]">
                            <h3 className="text-base font-semibold">
                              <a href="/product-detail">Rey Nylon Backpack</a>
                            </h3>
                            <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600">
                              <div className="flex items-center space-x-1.5">
                                <svg
                                  className="w-4 h-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8.35 1.94995L9.69 3.28992"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2.07 11.92L17.19 11.26"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 22H16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>Black</span>
                              </div>
                              <span className="mx-4 border-l border-slate-200" />
                              <div className="flex items-center space-x-1.5">
                                <svg
                                  className="w-4 h-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M21 9V3H15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M3 15V21H9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M21 3L13.5 10.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10.5 13.5L3 21"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
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
                            <div className="mt-0.5">
                              <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                                <span className="text-green-500 !leading-none">
                                  $74
                                </span>
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
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="w-4 h-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              <span className="select-none block flex-1 text-center leading-none">
                                1
                              </span>
                              <button
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                                type="button"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="w-4 h-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <a
                          href="##"
                          className="relative z-10 flex items-center mt-3 font-medium hover:text-[#00BADB] text-sm"
                        >
                          <span>Xóa</span>
                        </a>
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
                      $249.00
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span>Phí vận chuyển</span>
                    <span className="font-semibold text-slate-900">$5.00</span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span>Thuế</span>
                    <span className="font-semibold text-slate-900">$24.90</span>
                  </div>
                  <div className="flex justify-between font-semibold text-slate-900 text-base pt-4">
                    <span>Tổng tiền</span>
                    <span>$276.00</span>
                  </div>
                </div>
                {/*end hd-checkout-text-count*/}
                <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-[#00BADB] hover:bg-[#23b6cd] text-white shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
                  Xác nhận đơn hàng
                </button>
                {/*end hd-checkout-btn*/}
                <div className="hd-checkout-text-note mt-5 text-sm text-slate-500 flex items-center justify-center">
                  <p className="block relative pl-5">
                    <svg
                      className="w-4 h-4 absolute -left-1 top-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9945 16H12.0035"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Tìm hiểu thêm thông tin về
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="##"
                      className="text-slate-900 underline font-medium"
                    >
                      Thuế
                    </a>
                    <span> và </span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="##"
                      className="text-slate-900 underline font-medium"
                    >
                      Vận chuyển
                    </a>
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
