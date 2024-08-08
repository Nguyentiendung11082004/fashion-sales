import { Logo } from "@/components/icons";
import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div>
        <img
          src={Logo}
          className="h-10 lg:ml-[140px] mt-[30px] mx-auto"
          alt="Logo"
        />
        <section
          className="bg-[url('../src/assets/images/loginpage.svg')] 
             hidden lg:block  bg-no-repeat bg-cover bg-center text-white  lg:min-h-[620px] md:min-h-[420px]   lg:items-center lg:py-0 mt-16"
        ></section>
        <div className="absolute lg:right-[12%] lg:top-[20%] top-[10%]  ">
          <form>
            <div className="w-full m-9 p-[50px] lg:w-[450px] shadow-2xl border">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Forgot password
              </h2>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email của bạn
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                />
              </div>
              <div className="mt-8">
                <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                  Gửi
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4" />
                <Link to="#" className="text-xs text-gray-500 uppercase">
                  {" "}
                  Đăng nhập
                </Link>
                <span className="border-b w-1/5 md:w-1/4" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
