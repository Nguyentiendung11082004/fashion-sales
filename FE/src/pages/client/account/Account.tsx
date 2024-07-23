import React from "react";

const Account = () => {
  return (
    <main
      id="main-content"
      className="min-h-fit !shadow-none !outline-0 block isolate *:box-border"
    >
      <div className="hd-page-head">
        <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center">
          <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
            <div className="z-[100] relative hd-container">
              <h1 className="text-white text-xl font-medium leading-5">
                Tài khoản
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/*end hd-page-head*/}
      <div className="hd-account-body max-w-5xl w-full mx-auto px-4 text-[14px] lg:my-[80px] my-[50px]">
        <div className="hd-account-head">
          <div className="max-w-auto">
            <div className="max-w-[42rem]">
              <span className="hd-all-textgrey block mt-4">
                <span className="text-black font-semibold">Thu Hằng,</span>
                ha9671889@gmail.com · Hà Nội, Việt Nam
              </span>
            </div>
            <hr className="mt-[1rem] h-0 border-solid border-b-2" />
            <div className="hd-account-menu overflow-x-auto flex uppercase font-medium ">
              <a href="account.html" className="hd-account-menu-item">
                Thông tin tài khoản
              </a>
              <a href="#" className="hd-account-menu-item">
                Yêu thích
              </a>
              <a href="history-order.html" className="hd-account-menu-item">
                Lịch sử mua hàng
              </a>
              <a
                href="updatepass-account.html"
                className="hd-account-menu-item"
              >
                Đổi mật khẩu
              </a>
            </div>
            <hr className="h-0 border-solid border-b-2" />
          </div>
        </div>
        {/*end hd-account-head*/}
        <div className="hd-account-content pt-[30px] mx-auto">
          <div className="hd-ct-text">
            <h2 className="lg:mb-[50px] mb-[30px] lg:mt-[25px] lg:text-2xl text-xl font-semibold uppercase">
              Thông tin tài khoản
            </h2>
            <div className="lg:flex">
              <div className="lg:w-1/4 items-start flex-shrink-0 flex mb-[25px] justify-center lg:justify-start">
                <div className="rounded-full overflow-hidden flex relative text-white">
                  <img
                    alt="avatar"
                    loading="lazy"
                    width={128}
                    height={128}
                    decoding="async"
                    data-nimg={1}
                    className="w-32 h-32 rounded-full object-cover z-0"
                    src="./src/assets/images/z5513883787421_7d1f10db8a5171d1da722feb02185edd.jpg"
                    style={{ color: "transparent" }}
                  />
                  <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-35">
                    <svg
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </div>
              {/*end item-start*/}
              <div className="lg:w-3/4 max-w-full">
                <div>
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Họ &amp; tên
                  </label>
                  <input
                    className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                    type="text"
                    defaultValue="Thu Hằng"
                  />
                </div>
                <div className="mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Email
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:bg-neutral-50 text-neutral-500 dark:text-neutral-400">
                      <i className="text-2xl las la-envelope">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                      </i>
                    </span>
                    <input
                      className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 !rounded-l-none"
                      placeholder="ha9671889@email.com"
                      type="text"
                    />
                  </div>
                </div>
                <div className="max-w-lg mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Ngày sinh
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:bg-neutral-50 text-neutral-500 dark:text-neutral-400">
                      <i className="text-2xl las la-calendar">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                          />
                        </svg>
                      </i>
                    </span>
                    <input
                      className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 !rounded-l-none"
                      type="date"
                      defaultValue="2004-12-18"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Địa chỉ
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:bg-neutral-50 text-neutral-500 dark:text-neutral-400">
                      <i className="text-2xl las la-envelope">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                          />
                        </svg>
                      </i>
                    </span>
                    <input
                      className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 !rounded-l-none"
                      defaultValue="Hà Nội, Việt Nam"
                      type="text"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Giới tính
                  </label>
                  <select className="nc-Select h-11 mt-1.5 px-[10px] block w-full outline-0 rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div className="mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Số điện thoại
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:bg-neutral-50 text-neutral-500 dark:text-neutral-400">
                      <i className="text-2xl las la-phone-volume">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                          />
                        </svg>
                      </i>
                    </span>
                    <input
                      className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 rounded-2xl font-normal h-11 px-4 py-3 !rounded-l-none"
                      defaultValue="0921 735 576"
                      type="text"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    className="nc-Label text-base font-medium"
                    data-nc-id="Label"
                  >
                    Về bạn
                  </label>
                  <textarea
                    className="block w-full outline-0 px-[10px] rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 mt-1.5"
                    rows={4}
                    defaultValue={"..."}
                  />
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="text-base bg-[#00BADB] h-[50px] w-auto px-[45px] font-semibold rounded-full text-white inline-flex items-center relative overflow-hidden hover:bg-[#23b6cd] transition-all ease-in-out duration-300"
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
              {/*end item-end*/}
            </div>
          </div>
        </div>
        {/*end hd-account-content*/}
      </div>
      {/*end hd-account-body*/}
    </main>
  );
};

export default Account;
