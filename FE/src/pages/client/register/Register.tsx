import { Logo } from "@/components/icons";
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <section className="bg-white">
        <div className="xl:grid xl:min-h-screen xl:grid-cols-12">
          <aside className="relative hidden xl:block  h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6 bg-black bg-opacity-55">
            <div className="hd-page-head">
              <div className="hd-header-banner bg-[url('https://cdn.mos.cms.futurecdn.net/whowhatwear/posts/311736/gen-z-fashion-trends-2024-311736-1705592248484-main-768-80.jpg.webp')] bg-no-repeat bg-cover bg-center">
                <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55">
                  <div className="z-[100] relative hd-container">
                    <h1 className="text-white text-6xl font-medium py-[335px]">
                        KALLES
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <img
                src={Logo}
                className="h-10 mb-10"
                alt="Logo"
              />
              <p className="mt-6 text-2xl font-medium text-gray-900">
                Chào mừng bạn đến với Kalles
              </p>
              <h1 className="font-bold text-4xl text-center mt-10">
                Đăng ký tài khoản
              </h1>
              <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Họ
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    name="first_name"
                    className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên
                  </label>
                  <input
                    type="text"
                    id="LastName"
                    name="last_name"
                    className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                   
                    Eamil của bạn
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu{" "}
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nhập lại mật khẩu
                  </label>
                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="password_confirmation"
                    className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                </div>
                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />
                    <span className="text-sm text-gray-700">
                      Tôi muốn nhận email về các sự kiện, cập nhật sản phẩm và
                      thông báo của công ty.
                    </span>
                  </label>
                </div>
                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    Bằng cách tạo một tài khoản, bạn đồng ý với chúng tôi
                    <Link to="#" className="text-gray-700 underline">
                      {" "}
                      các điều khoản và điều kiện
                    </Link>
                    and
                    <Link to="#" className="text-gray-700 underline">
                      Chính sách bảo mật
                    </Link>
                    .
                  </p>
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Tạo tài khoản
                  </button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Bạn đã có tài khoản
                    <Link to="#" className="text-gray-700 underline">
                      Đăng nhập
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Register;
