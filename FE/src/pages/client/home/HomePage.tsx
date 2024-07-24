import { Icon10, Icon9 } from "@/components/icons";
import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <div>
        <section
          className="bg-[url('./src/assets/images/slider-01.webp')] 
   relative bg-no-repeat bg-cover bg-center text-white min-h-[220px] lg:min-h-[720px] md:min-h-[420px]  flex py-10 lg:items-center lg:py-0 mb-10"
        >
          <div className="container">
            <p className=" text-[#222222] text-xl lg:text-3xl md:text-2xl font-medium tracking-wider leading-tight animate-text-move ">
              MÙA HÈ 2023
            </p>
            <h1 className="text-black text-3xl lg:text-6xl md:text-4xl font-bold mb-4 mt-2 animate-text-move">
              Bộ sưu tập Arival mới
            </h1>
            <button className="animate-text-move custom-btn">
              Khám Phá Ngay
            </button>
          </div>
        </section>
        <section className="container grid lg:grid-cols-12 lg:gap-8 md:gap-2 md:grid-cols-12 gap-2  mb-10">
          <div className="lg:col-span-6 md:col-span-6 col-span-12 overflow-hidden">
            <Link to="" className="relative overflow-hidden">
              <img
                src={Icon9}
                className="h-[100%] hover:scale-110 transition-all duration-700 ease-in-out "
              />
              <button className="shadow-sm absolute bottom-[4%] left-[50%] -translate-x-[50%] lg:left-[50%] lg:-translate-x-[50%] bg-[#fff] text-[#000] hover:bg-[#000] hover:text-[#fff] transition ease-in duration-300 w-[150px] h-[40px] font-bold text-lg">
                Phụ Nữ
              </button>
            </Link>
          </div>
          <div className="lg:col-span-3 md:col-span-3 col-span-6">
            <div className="w-[100%] h-[50%] overflow-hidden">
              <Link to="" className="relative  ">
                <img
                  src={Icon10}
                  className="h-full w-full hover:scale-110 transition-all duration-700 ease-in-out "
                />
                <button className="shadow-sm absolute bottom-[4%] left-[50%] -translate-x-[50%] lg:left-[50%] lg:-translate-x-[50%] md:left-[10%] bg-[#fff] text-[#000] hover:bg-[#000] hover:text-[#fff] transition ease-in duration-300 w-[150px] h-[40px] font-bold text-lg">
                  Phụ Kiện
                </button>
              </Link>
            </div>
            <div className="w-[100%] h-[50%] overflow-hidden">
              <Link to="" className="relative">
                <img
                  src="./src/assets/images/category-shore.jpg"
                  className="h-[full] hover:scale-x-110 transition-all duration-700 ease-in-out mt-2 lg:mt-9"
                />
                <button className="shadow-sm absolute bottom-[15%] left-[50%] -translate-x-[50%] lg:left-[50%] lg:-translate-x-[50%] md:left-[10%] bg-[#fff] text-[#000] hover:bg-[#000] hover:text-[#fff] transition ease-in duration-300 w-[150px] h-[40px] font-bold text-lg">
                  Giày Dép
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-3 md:relative lg:relative col-span-6 overflow-hidden">
            <Link to="" className="relative ">
              <img
                src="./src/assets/images/category-watch.webp"
                className="h-[100%] scale-x-[1.8] hover:scale-x-[1.9] hover:scale-y-[1.1]   transition-all duration-700 ease-in-out "
              />
              <button className="shadow-sm absolute bottom-[4%] left-[50%] -translate-x-[50%] lg:left-[50%] lg:-translate-x-[50%] bg-[#fff] text-[#000] hover:bg-[#000] hover:text-[#fff] transition ease-in duration-300 w-[150px] h-[40px] font-bold text-lg">
                Đồng Hồ
              </button>
            </Link>
          </div>
        </section>
        <section className="container mt-28">
          <div className="custom-heading ">
            <div className="flex items-center mx-auto">
              <hr className="flex-auto h-0.5 bg-gray-400 " />
              <div className="mx-4 text-2xl font-bold text-gray-900">
                XU HƯỚNG
              </div>
              <hr className="flex-auto h-0.5 bg-gray-400 w-2" />
            </div>
          </div>
          <div className="text-center mx-auto italic mt-2 custom-heading-sub mb-10">
            <i>Lượt xem hàng đầu trong tuần này</i>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8 md:grid-cols-3 md:gap-6 mx-auto">
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
   -translate-y-7 transform 
    transition-all duration-500 ease-in-out 
    group-hover:translate-y-0
    opacity-0
    group-hover:opacity-100
  "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
   -translate-y-7 transform 
    transition-all duration-500 ease-in-out 
    group-hover:translate-y-0
    opacity-0
    group-hover:opacity-100
  "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
   -translate-y-7 transform 
    transition-all duration-500 ease-in-out 
    group-hover:translate-y-0
    opacity-0
    group-hover:opacity-100
  "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
   -translate-y-7 transform 
    transition-all duration-500 ease-in-out 
    group-hover:translate-y-0
    opacity-0
    group-hover:opacity-100
  "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
   -translate-y-7 transform 
    transition-all duration-500 ease-in-out 
    group-hover:translate-y-0
    opacity-0
    group-hover:opacity-100
  "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
   -translate-y-7 transform 
    transition-all duration-500 ease-in-out 
    group-hover:translate-y-0
    opacity-0
    group-hover:opacity-100
  "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
   -translate-y-7 transform 
    transition-all duration-500 ease-in-out 
    group-hover:translate-y-0
    opacity-0
    group-hover:opacity-100
  "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
   -translate-y-7 transform 
    transition-all duration-500 ease-in-out 
    group-hover:translate-y-0
    opacity-0
    group-hover:opacity-100
  "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
          </div>
        </section>
        <section className="container my-16 text-center">
          <Link to="">
            <button className="btn-load">Tải Thêm</button>
          </Link>
        </section>
        <section className="container">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 md:gap-4 lg:gap-8 ">
            <div className="w-[100%] relative overflow-hidden">
              <img
                className="w-full hover:scale-[1.2] transition ease-in-out"
                src="./src/assets/images/banner-introduce1.webp"
              />
              <div>
                <p className="absolute left-[32%] top-[35%] text-2xl text-white font-semibold tracking-wider">
                  LOOKBOOK 2023
                </p>
                <span className="absolute left-[35%] top-[44%] text-white font-semibold">
                  MAKE LOVE THIS LOOK
                </span>
              </div>
            </div>
            <div className="w-[100%] relative overflow-hidden mt-5 lg:mt-0 md:mt-0">
              <img
                className="w-[full] hover:scale-y-[1.2] transition ease-in-out"
                src="./src/assets/images/banner-introduce2.webp"
              />
              <div>
                <p className="absolute lg:left-[40%] lg:top-[34%] left-[35%] top-[35%]  text-xl text-white font-semibold tracking-wider">
                  SUMMER SALE
                </p>
                <span className="absolute lg:left-[26%] lg:top-[44%] left-[35%] top-[44%] lg:text-6xl text-3xl text-white font-semibold tracking-wider">
                  UP TO 70%
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="container mt-28">
          <div className="custom-heading ">
            <div className="flex items-center mx-auto">
              <hr className="flex-auto h-0.5 bg-gray-400 " />
              <div className="mx-4 text-2xl font-bold text-gray-900">
                Sản phẩm đang SALE
              </div>
              <hr className="flex-auto h-0.5 bg-gray-400 w-2" />
            </div>
          </div>
          <div className="text-center mx-auto italic mt-2 custom-heading-sub mb-10">
            <i>Bán chạy nhất trong tuần này</i>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8 md:grid-cols-3 md:gap-6 mx-auto">
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
     -translate-y-7 transform 
      transition-all duration-500 ease-in-out 
      group-hover:translate-y-0
      opacity-0
      group-hover:opacity-100
    "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
     -translate-y-7 transform 
      transition-all duration-500 ease-in-out 
      group-hover:translate-y-0
      opacity-0
      group-hover:opacity-100
    "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
     -translate-y-7 transform 
      transition-all duration-500 ease-in-out 
      group-hover:translate-y-0
      opacity-0
      group-hover:opacity-100
    "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
     -translate-y-7 transform 
      transition-all duration-500 ease-in-out 
      group-hover:translate-y-0
      opacity-0
      group-hover:opacity-100
    "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
     -translate-y-7 transform 
      transition-all duration-500 ease-in-out 
      group-hover:translate-y-0
      opacity-0
      group-hover:opacity-100
    "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
     -translate-y-7 transform 
      transition-all duration-500 ease-in-out 
      group-hover:translate-y-0
      opacity-0
      group-hover:opacity-100
    "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
     -translate-y-7 transform 
      transition-all duration-500 ease-in-out 
      group-hover:translate-y-0
      opacity-0
      group-hover:opacity-100
    "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0"
                  src="./src/assets/images/product.webp"
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src="./src/assets/images/product-next.webp"
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="hidden h-6 w-6 text-white group-hover:block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 lg:translate-y-5 lg:transform lg:text-white lg:opacity-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover/btn:-translate-y-3 lg:group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mx-auto size-6 translate-y-1 transform text-white opacity-0 transition-all duration-300 ease-in-out group-hover/btn:-translate-y-3 group-hover/btn:opacity-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div
                  className="absolute bottom-2 left-[35%] text-white
     -translate-y-7 transform 
      transition-all duration-500 ease-in-out 
      group-hover:translate-y-0
      opacity-0
      group-hover:opacity-100
    "
                >
                  <ul className="flex">
                    <li>
                      <Link to="">XS,</Link>
                    </li>
                    <li>
                      <Link to="">S,</Link>
                    </li>
                    <li>
                      <Link to="">M,</Link>
                    </li>
                    <li>
                      <Link to="">L,</Link>
                    </li>
                    <li>
                      <Link to="">XL</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                  -15%
                </div>
              </div>
              <div>
                <p className="text-sm text-black mb-1">Analogue Resin Strap</p>
                <del className="mr-1">12.000.000đ</del>
                <span className="text-[red]">776.000₫</span>
              </div>
            </div>
          </div>
        </section>
        <section className="container mt-28">
          <div className="custom-heading ">
            <div className="flex-auto items-center mx-auto">
              <div className="mx-4 text-2xl font-bold text-gray-900">
                BÀI VIẾT MỚI NHẤT
              </div>
            </div>
          </div>
          <div className="text-center mx-auto italic mt-2 custom-heading-sub mb-10">
            <i>Tin tức mới nhất và thú vị nhất</i>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 md:grid-cols-3 md:gap-4">
            <div className=" ">
              <div className="overflow-hidden ">
                <img
                  src="./src/assets/images/blog1.webp"
                  className="hover:scale-[1.2] hover:translate-2  transition-all ease-in-out 0.2s"
                />
              </div>
              <h3 className="mt-4 font-semibold text-xl text-hover transition-all ease-in-out">
                Xu Hướng Xuân – Hè 2020
              </h3>
              <p className="mt-2 mb-4">Thêm vào ngày 11 tháng 5 năm 2022</p>
              <span className="text-[#909090] ">
                Kiểu chữ là công việc của người sắp chữ, người soạn nhạc, người
                đánh máy, người đồ họa nhà thiết kế, giám đốc nghệ thuật, manga
                nghệ sĩ,...
              </span>
            </div>
            <div>
              <div className="overflow-hidden mt-4 lg:mt-0 md:mt-0">
                <img
                  src="./src/assets/images/blog2.webp"
                  className="hover:scale-[1.2] hover:translate-2 transition-all ease-in-out 0.2s"
                />
              </div>
              <h3 className="mt-4 font-semibold text-xl text-hover transition-all ease-in-out">
                Cách dễ nhất để đột phá Đứng đầu
              </h3>
              <p className="mt-2 mb-4">Thêm vào ngày 11 tháng 5 năm 2022</p>
              <span className="text-[#909090] ">
                Kiểu chữ là công việc của người sắp chữ, người soạn nhạc, người
                đánh máy, người đồ họa nhà thiết kế, giám đốc nghệ thuật, manga
                nghệ sĩ,...
              </span>
            </div>
            <div>
              <div className="overflow-hidden mt-4 lg:mt-0 md:mt-0">
                <img
                  src="./src/assets/images/blog3.webp"
                  className="hover:scale-[1.2] hover:translate-2  transition-all ease-in-out 0.2s"
                />
              </div>
              <h3 className="mt-4 font-semibold text-xl text-hover transition-all ease-in-out">
                Phong cách dành cho cặp đôi
              </h3>
              <p className="mt-2 mb-4">Thêm vào ngày 11 tháng 5 năm 2022</p>
              <span className="text-[#909090] ">
                Kiểu chữ là công việc của người sắp chữ, người soạn nhạc, người
                đánh máy, người đồ họa nhà thiết kế, giám đốc nghệ thuật, manga
                nghệ sĩ,...
              </span>
            </div>
          </div>
        </section>
        <div className=" mt-28">
          <div className="custom-heading ">
            <div className="flex-auto items-center mx-auto">
              <div className="mx-4 text-2xl font-bold text-gray-900">
                @ THEO DÕI CHÚNG TÔI TRÊN INSTAGRAM
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 place-items-center mt-10 relative overflow-hidden">
            <button className="z-10 absolute left-1 top-[46%] w-10 h-10 border-2 border-[#878787] hover:bg-[#000] hover:border-hidden group/icon rounded-full ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 ml-[5px] text-[#878787] group-hover/icon:text-[#fff] "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src="./src/assets/images/is1.webp"
            />
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src="./src/assets/images/is2.jpg"
            />
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src="./src/assets/images/is3.webp"
            />
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src="./src/assets/images/is4.jpg"
            />
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src="./src/assets/images/is5.webp"
            />
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src="./src/assets/images/is6.jpg"
            />
            <button className="absolute right-1 top-[46%] w-10 h-10 border-2 border-[#878787] hover:bg-[#000] hover:border-hidden group/icon rounded-full ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 ml-2 text-[#878787] group-hover/icon:text-[#fff] "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
