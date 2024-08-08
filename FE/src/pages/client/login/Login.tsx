import { Logo } from "@/components/icons";
import LoginIcon1 from "@/components/icons/login/LoginIcon1";
import React from "react";
import { Link } from "react-router-dom";
// import loginpage from "@/assets/images/"

const Login = () => {
  return (
    <>
      <div>
        <img
          src={Logo}
          className="h-10 lg:ml-[140px] mt-[30px] mx-auto"
          alt="Logo"
        />
        <section className="bg-[url('../src/assets/images/loginpage.svg')] hidden lg:block bg-no-repeat bg-cover bg-center text-white lg:min-h-[620px] md:min-h-[420px] lg:items-center lg:py-0 mt-16" />
        <div className="absolute lg:right-[12%] top-[10%]">
          <div className="w-full m-9 p-[50px] lg:w-[450px] shadow-2xl border">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Đăng nhập
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Chào mừng trở lại
            </p>
            <Link
              to=""
              className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="px-1 py-3">
                <LoginIcon1 />
              </div>
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                Đăng nhập với google
              </h1>
            </Link>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4" />
              <Link
                to=""
                className="text-xs text-center text-gray-500 uppercase"
              >
                hoặc với email
              </Link>
              <span className="border-b w-1/5 lg:w-1/4" />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email của bạn
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mật khẩu
                </label>
                <Link to="" className="text-xs text-gray-500">
                  Quên mật khẩu
                </Link>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
              />
            </div>
            <div className="mt-8">
              <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                Đăng nhập
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4" />
              <Link to="" className="text-xs text-gray-500 uppercase">
                Đăng ký
              </Link>
              <span className="border-b w-1/5 md:w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
