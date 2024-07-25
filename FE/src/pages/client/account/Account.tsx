import { User1 } from "@/components/icons";
import AddImage from "@/components/icons/about/AboutInfo";
import React from "react";
import { Link } from "react-router-dom";
import Email from "@/components/icons/account/Email";
import DateBirth from "@/components/icons/account/DateBirdth";
import Address from "@/components/icons/account/Address";
import Phone from "@/components/icons/account/Phone";

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
              <Link to="account.html" className="hd-account-menu-item">
                Thông tin tài khoản
              </Link>
              <Link to="#" className="hd-account-menu-item">
                Yêu thích
              </Link>
              <Link to="history-order.html" className="hd-account-menu-item">
                Lịch sử mua hàng
              </Link>
              <Link
                to="updatepass-account.html"
                className="hd-account-menu-item"
              >
                Đổi mật khẩu
              </Link>
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
                    src={User1}
                    style={{ color: "transparent" }}
                  />
                  <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-35">
                    <AddImage />
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
                        <Email />
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
                        <DateBirth />
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
                        <Address />
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
                        <Phone />
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
