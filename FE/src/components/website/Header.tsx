/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Icon7 } from "../icons";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <div>
        <section className="bg-[#F6F6F8] text-xs">
          <div className="text-[#878787] flex lg:justify-between lg:items-center flex-wrap sm:justify-center md:justify-center py-4 lg:mx-4 h-[auto] lg:h-[48px] md:h-[48px]">
            <div className="hidden lg:flex">
              <div className="flex mr-4">
                <svg
                  className="size-6 w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                {/* test */}
                <span> +0123456789 </span>
              </div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <span className="text-[#878787]"> Kalle@domain.com </span>
              </div>
            </div>
            <div className="mx-auto lg:mx-0">
              <span>
                Summer sale discount off <span className="text-[red]">50%</span>
                !<span className="text-black">Shop Now</span>
              </span>
            </div>
            <div className="flex mx-auto lg:mx-0">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span>Location</span>
              </div>
              <div className="mx-5">
                <select className="bg-[#F6F6F8]">
                  <option>English</option>
                  <option>Viet nam</option>
                </select>
              </div>
              <div className="flex items-center">
                <img src={Icon7} className="w-4 h-3 object-cover" />
                <select className="bg-[#F6F6F8] mt-[-2px]">
                  <option>VND</option>
                  <option>Canada</option>
                  <option>France</option>
                </select>
              </div>
              {/* <div></div> */}
            </div>
          </div>
        </section>
        <div className="w-[100%] bg-[#fff] sticky top-0 left-0 right-0  z-20 ">
          <header className="container bg-[#fff] h-[70px] grid grid-cols-12 gap-4 ">
            <div className="lg:col-span-2 col-span-4 flex justify-center items-center md:items-center md:justify-center lg:justify-start  order-2 lg:order-1">
              <img
                src="./src/assets/images/logo.png"
                className="h-10 "
                alt="Logo"
              />
            </div>
            <div className="col-span-4 flex items-center justify-start md:items-center md:justify-start lg:hidden  order-1  ">
              <svg
                className=" "
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={16}
                viewBox="0 0 30 16"
                fill="currentColor"
              >
                <rect width={30} height="1.5" />
                <rect y={7} width={20} height="1.5" />
                <rect y={14} width={30} height="1.5" />
              </svg>
            </div>
            <div className="lg:col-span-8  lg:flex lg:items-center lg:justify-center md:hidden  hidden lg:order-2">
              <ul className="flex space-x-16 ml-10 text-[14px]">
                <li>
                  <Link to="" className=" font-normal text-hover">
                    Trang Chủ
                  </Link>
                </li>
                <li className="relative">
                  <Link to="" className=" font-normal text-hover">
                    Sản Phẩm
                    <span className="absolute text-xs rounded-full px-2 py-[2px] text-white bg-primary top-[-10px] left-16 ">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="" className=" font-normal text-hover">
                    Phụ Kiện
                  </Link>
                </li>
                <li>
                  <Link to="" className=" font-normal text-hover">
                    Giày
                  </Link>
                </li>
                <li>
                  <Link to="" className=" font-normal text-hover">
                    Bài Viết
                  </Link>
                </li>
                <li>
                  <Link to="" className=" font-normal text-hover">
                    Liên Hệ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 col-span-4 flex items-center justify-end order-3">
              <div className="flex items-center space-x-4">
                <Link to="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </Link>
                <Link to="" className="relative">
                  <span className="absolute text-xs right-[-5px] top-[-5px] bg-[#000] text-white px-1 rounded-full">
                    0
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </Link>
                <Link to="" className="relative">
                  <span className="absolute text-xs right-[-5px] top-[-5px] bg-[#000] text-white px-1 rounded-full">
                    3
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
