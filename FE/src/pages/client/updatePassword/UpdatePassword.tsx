import React from "react";
import { Link } from "react-router-dom";

const UpdatePassword = () => {
  return (
    <main
      id="main-content"
      className="min-h-fit !shadow-none !outline-0 block isolate *:box-border"
    >
      <div className="hd-page-head">
        <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center">
          <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
            <div className="z-[100] relative hd-container text-white">
              <h1 className="text-xl font-medium leading-5 mb-3">Tài khoản</h1>
              <p className="text-sm">Đổi mật khẩu</p>
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
            <div className="hd-account-menu overflow-x-auto flex uppercase font-medium">
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
            <h2 className="mb-[50px] mt-[25px] text-2xl font-semibold uppercase">
              Đổi mật khẩu
            </h2>
            <div className=" max-w-xl space-y-6">
              <div>
                <label
                  className="nc-Label text-base font-medium"
                  data-nc-id="Label"
                >
                  Mật khẩu hiện tại
                </label>
                <input
                  className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                  type="text"
                />
              </div>
              <div className="mt-5 ">
                <label
                  className="nc-Label text-base font-medium"
                  data-nc-id="Label"
                >
                  Mật khẩu mới
                </label>
                <input
                  className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                  type="text"
                />
              </div>
              <div className="mt-5 ">
                <label
                  className="nc-Label text-base font-medium"
                  data-nc-id="Label"
                >
                  Nhập lại mật khẩu mới
                </label>
                <input
                  className="block w-full outline-0 border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-2xl font-normal h-11 px-4 py-3 mt-1.5"
                  type="text"
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
          </div>
        </div>
        {/*end hd-account-content*/}
      </div>
      {/*end hd-account-body*/}
    </main>
  );
};

export default UpdatePassword;
