import {
  BannerIntro1,
  BannerIntro2,
  Blog1,
  Blog2,
  Blog3,
  CatoryAccess,
  CatoryShore,
  CatoryWatch,
  CatoryWomen,
  Is1,
  Is2,
  Is3,
  Is4,
  Is5,
  Is6,
  Product,
  ProductNext,
} from "@/components/icons";
import CartDetail from "@/components/icons/detail/CartDetail";
import Eye from "@/components/icons/detail/Eye";
import HeartWhite from "@/components/icons/detail/HeartWhite";
import HomeIcon5 from "@/components/icons/homeWebsite/HomeIcon5";
import HomeIcon6 from "@/components/icons/homeWebsite/HomeIcon6";
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
                src={CatoryWomen}
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
                  src={CatoryAccess}
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
                  src={CatoryShore}
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
                src={CatoryWatch}
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                src={BannerIntro1}
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
                src={BannerIntro2}
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Product}
                />
                <img
                  className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                  src={ProductNext}
                />
                <div>
                  <Link to="" className="absolute left-5 top-5">
                    <HeartWhite />
                  </Link>
                </div>
                <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <Link to="" className="group/btn relative m-auto">
                    <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                      <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Xem thêm
                      </p>
                      <Eye />
                    </button>
                  </Link>
                  <Link to="" className="group/btn relative">
                    <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                      <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                        Thêm vào giỏ hàng
                      </p>
                      <CartDetail />
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
                  src={Blog1}
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
                  src={Blog2}
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
                  src={Blog3}
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
              <HomeIcon5 />
            </button>
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src={Is1}
            />
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src={Is2}
            />
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src={Is3}
            />
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src={Is4}
            />
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src={Is5}
            />
            <img
              className="hover:translate-y-2 hover:scale-[1.3] transition-all ease-in-out 0.2s"
              src={Is6}
            />
            <button className="absolute right-1 top-[46%] w-10 h-10 border-2 border-[#878787] hover:bg-[#000] hover:border-hidden group/icon rounded-full ">
              <HomeIcon6 />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
