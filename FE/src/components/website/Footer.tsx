/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-[#f6f6f8] mt-5 py-16 ">
      <div className="container grid lg:grid-cols-12 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
        <div className=" mt-5 lg:col-span-3 md:col-span-6 md:order-1 lg:order-1">
          <img
            src="./src/assets/images/logo.png"
            className="h-10  mb-10"
            alt="Logo"
          />
          <div className="flex mb-5">
            <div className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7 text-[#878787]"
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
            </div>
            <p>184 Nam Từ Liêm , Hà Nội</p>
          </div>
          <div className="flex mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 w-7 h-7 mr-2 text-[#878787]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <p>contact@company.com</p>
          </div>
          <div className="flex mb-5">
            <div className="mr-2">
              {" "}
              <svg
                className="w-7 h-7 text-[#878787] "
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </div>
            <p>+001 2233 456</p>
          </div>
          <ul className="flex">
            <li className="mr-6">
              <Link to="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 320 512"
                >
                  <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                </svg>
              </Link>
            </li>
            <li className="mr-6">
              <Link to="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 512 512"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </Link>
            </li>
            <li className="mr-6">
              <Link to="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 448 512"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </Link>
            </li>
            <li className="mr-6">
              <Link to="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 448 512"
                >
                  <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                </svg>
              </Link>
            </li>
            <li className="mr-6">
              <Link to="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 384 512"
                >
                  <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <div className=" mt-5 lg:col-span-6 md:col-span-12 md:order-3  lg:order-2 flex lg:justify-around md:justify-between justify-center text-center lg:text-start">
          <div>
            <h1 className="font-semibold mb-10 mt-2 text-xl text-[#222222]">
              Danh Mục
            </h1>
            <ul>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Đàn Ông
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Phụ Nữ
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Phụ Kiện
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Giày
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Đồng Hồ{" "}
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Đầm
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-semibold mb-10 mt-2 text-xl text-[#222222] ">
              Thông Tin
            </h1>
            <ul>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Về chúng tôi
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Liên hệ chúng tôi
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Điều khoản và điều kiện
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Trả lại và trao đổi
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Vận chuyển và giao hàng
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-semibold mb-10 mt-2 text-xl text-[#222222]">
              Liên Kết Hữu Ích
            </h1>
            <ul>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Tin mới nhất
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Tài khoản của tôi
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Hướng dãn chọn kích thước
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li className="mb-1">
                <Link to="" className="text-lg text-[#878787] text-hover">
                  Câu hỏi thường gặp 2
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className=" mt-5 lg:col-span-3 md:col-span-6 md:order-2  lg:order-3">
          <div>
            <h4 className="font-semibold mb-10 mt-2 text-xl text-[#222222] ">
              Đăng ký bản tin
            </h4>
            <span className="text-lg text-[#878787] ">
              Đăng ký nhận bản tin của chúng tôi và được giảm giá 10% cho lần
              đầu tiên của bạn mua
            </span>
            <form className="max-w-md w-full my-5 rounded-lg flex">
              <div className="relative flex-1">
                <input
                  type="email"
                  className="w-full border-gray-300 border rounded-full py-4 px-3 focus:outline-none focus:ring-2 focus:border-transparent"
                  placeholder="Emai của bạn"
                  required
                />
                <button
                  type="submit"
                  className="absolute rounded-full right-[5px] top-[5px] bottom-[5px] bg-black text-white px-6"
                >
                  Đặt mua
                </button>
              </div>
            </form>
            <img src="./src/assets/images/footer-method.png" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;