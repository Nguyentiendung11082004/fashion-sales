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
  Product,
  ProductNext,
} from "@/components/icons";
import CartDetail from "@/components/icons/detail/CartDetail";
import Eye from "@/components/icons/detail/Eye";
import HeartWhite from "@/components/icons/detail/HeartWhite";
import React from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner/Banner";
import Slideshow from "./SampleSlider/SampleSlider";

const HomePage = () => {
  return (
    <>
      <div>
        <Banner />

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
          <div className="grid grid-cols-2 gap-4 lg:ml-2.5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 xl:gap-8 md:grid-cols-3 md:gap-6 mx-auto">
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
                className="w-full hover:scale-[1.2] transition ease-in-out duration-500"
                src={BannerIntro1}
              />
              <div>
                <p className="absolute left-[15%] sm:left-[27%] xl:left-[30%] lg:left-[22%] top-[40%] text-2xl text-white font-semibold tracking-wider">
                  BỘ SƯU TẬP ẢNH 2024
                </p>
                <span className="absolute left-[22%] sm:left-[32%] xl:left-[35%] lg:left-[28%] top-[55%] xl:top-[50%] lg:top-[55%] text-white font-semibold">
                  YÊU THÍCH BỘ SƯU TẬP NÀY
                </span>
              </div>
            </div>
            <div className="w-[100%] relative overflow-hidden mt-5 lg:mt-0 md:mt-0">
              <img
                className="w-[full] hover:scale-y-[1.2] transition ease-in-out duration-500"
                src={BannerIntro2}
              />
              <div>
                <p className="absolute xl:left-[32%] lg:left-[27%] lg:top-[34%] sm:left-[35%] sm:top-[35%] left-[22%] top-[35%]  text-xl text-white font-semibold tracking-wider">
                  KHUYẾN MẠI MÙA HÈ
                </p>
                <span className="absolute sm:left-[30%] xl:left-[15%] lg:left-[13%] xl:top-[44%] left-[15%] top-[48%] sm:top-[48%] xl:text-5xl lg:text-4xl text-3xl text-white font-semibold tracking-wider">
                  TIẾT KIỆM TỚI 70%
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
          <div className="grid grid-cols-2 gap-4 lg:ml-2.5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 xl:gap-8 md:grid-cols-3 md:gap-6 mx-auto">
            <div className="lg:mb-[25px] mb-[20px]">
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
              <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
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
            <div className="">
              <div className="overflow-hidden ">
                <img
                  src={Blog1}
                  className="hd-animation-border hover:scale-[1.2] hover:translate-2  transition-all ease-in-out duration-500"
                />
              </div>
              <h3 className="mt-4 font-semibold text-xl text-hover transition-all ease-in-out duration-200">
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
                  className="hd-animation-border hover:scale-[1.2] hover:translate-2 transition-all ease-in-out duration-500"
                />
              </div>
              <h3 className="mt-4 font-semibold text-xl text-hover transition-all ease-in-out duration-200">
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
                  className="hd-animation-border hover:scale-[1.2] hover:translate-2  transition-all ease-in-out duration-500"
                />
              </div>
              <h3 className="mt-4 font-semibold text-xl text-hover transition-all ease-in-out duration-200">
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

        <Slideshow />

        <div className="container max-w-6xl mx-auto py-10 px-4 sm:px-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex gap-6">
              <svg
                className="w-[90px] h-[45px] hover:origin-bottom-left hover:-rotate-12 hover:scale-105 transition-all ease-in-out duration-300"
                viewBox="0 0 29 32"
                width="32"
                height="32"
              >
                <path d="M 5.867 15.467 c -1.173 0 -2.133 0.96 -2.133 2.133 s 0.96 2.133 2.133 2.133 s 2.133 -0.96 2.133 -2.133 s -0.96 -2.133 -2.133 -2.133 Z M 5.867 18.667 c -0.587 0 -1.067 -0.48 -1.067 -1.067 s 0.48 -1.067 1.067 -1.067 c 0.587 0 1.067 0.48 1.067 1.067 s -0.48 1.067 -1.067 1.067 Z"></path>
                <path d="M 22.933 15.467 c -1.173 0 -2.133 0.96 -2.133 2.133 s 0.96 2.133 2.133 2.133 c 1.173 0 2.133 -0.96 2.133 -2.133 s -0.96 -2.133 -2.133 -2.133 Z M 22.933 18.667 c -0.587 0 -1.067 -0.48 -1.067 -1.067 s 0.48 -1.067 1.067 -1.067 c 0.587 0 1.067 0.48 1.067 1.067 s -0.48 1.067 -1.067 1.067 Z"></path>
                <path d="M 25.12 11.2 l -0.907 -4.267 c -0.373 -1.387 -1.44 -2.133 -2.88 -2.133 h -13.867 c -1.493 0 -2.347 0.747 -2.773 2.133 l -0.96 4.267 h -3.733 v 1.067 h 3.467 v 0.053 c -1.653 0.107 -2.933 1.493 -2.933 3.2 v 7.413 h 1.6 v 1.6 c 0 1.493 1.173 2.667 2.667 2.667 s 2.667 -1.173 2.667 -2.667 v -1.6 h 13.867 v 1.6 c 0 1.493 1.173 2.667 2.667 2.667 s 2.667 -1.173 2.667 -2.667 v -1.6 h 1.6 v -7.413 c 0 -1.653 -1.28 -3.04 -2.88 -3.2 v -0.053 h 3.413 v -1.067 h -3.68 Z M 5.707 7.253 c 0.32 -0.96 0.8 -1.387 1.76 -1.387 h 13.867 c 1.013 0 1.6 0.427 1.867 1.333 l 1.067 5.12 h -19.733 l 1.173 -5.067 Z M 6.4 24.533 c 0 0.907 -0.693 1.6 -1.6 1.6 s -1.6 -0.693 -1.6 -1.6 v -1.6 h 3.2 v 1.6 Z M 25.6 24.533 c 0 0.907 -0.693 1.6 -1.6 1.6 s -1.6 -0.693 -1.6 -1.6 v -1.6 h 3.2 v 1.6 Z M 27.2 15.52 v 6.347 h -25.6 v -6.347 c 0 -1.173 0.96 -2.133 2.133 -2.133 h 21.333 c 1.173 0 2.133 0.96 2.133 2.133 Z"></path>
              </svg>
              <div>
                <h3 className="text-lg font-semibold">MIỄN PHÍ VẬN CHUYỂN</h3>
                <p className="mt-1 text-gray-600">
                  Miễn phí vận chuyển cho tất cả các đơn hàng tại Hà Nội
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 7l9-5-9-5-9 5 9 5z" />
                    </svg> */}
              <svg
                className="w-[90px] h-[45px] hover:origin-bottom-left hover:-rotate-12 hover:scale-105 transition-all ease-in-out duration-300"
                viewBox="0 0 32 32"
                width="32"
                height="32"
              >
                <path d="M 16 3.205 c -7.066 0 -12.795 5.728 -12.795 12.795 s 5.729 12.794 12.795 12.795 c 7.067 -0.001 12.795 -5.729 12.795 -12.795 s -5.729 -12.795 -12.795 -12.795 Z M 15.999 21.864 c -3.233 0 -5.863 -2.631 -5.863 -5.864 s 2.631 -5.864 5.864 -5.864 h 0.001 c 3.233 0 5.863 2.631 5.863 5.864 s -2.631 5.864 -5.865 5.864 Z M 22.395 13.327 l 4.028 -2.693 c 0.832 1.609 1.305 3.433 1.305 5.366 c 0 1.909 -0.461 3.71 -1.273 5.305 l -4.035 -2.699 c 0.327 -0.805 0.511 -1.683 0.511 -2.606 c 0 -0.948 -0.191 -1.85 -0.535 -2.673 Z M 25.89 9.708 l -3.99 2.668 c -0.58 -0.942 -1.377 -1.733 -2.325 -2.305 l 2.669 -3.991 c 1.466 0.926 2.712 2.167 3.645 3.629 Z M 21.316 5.55 l -2.698 4.034 c -0.808 -0.33 -1.69 -0.515 -2.617 -0.515 h -0.001 c -0.927 0 -1.809 0.185 -2.617 0.515 l -2.698 -4.034 c 1.597 -0.816 3.402 -1.279 5.315 -1.279 s 3.719 0.463 5.316 1.279 Z M 9.756 6.078 l 2.67 3.992 c -0.95 0.574 -1.748 1.367 -2.329 2.311 l -3.991 -2.669 c 0.934 -1.464 2.182 -2.707 3.65 -3.634 Z M 5.574 10.639 l 4.029 2.694 c -0.343 0.822 -0.533 1.722 -0.533 2.667 c 0 0.92 0.183 1.797 0.509 2.599 l -4.036 2.7 c -0.81 -1.593 -1.27 -3.393 -1.27 -5.299 c 0 -1.931 0.472 -3.753 1.303 -5.361 Z M 6.069 22.229 l 3.992 -2.669 c 0.576 0.959 1.377 1.766 2.331 2.35 l -2.669 3.99 c -1.473 -0.937 -2.724 -2.193 -3.654 -3.671 Z M 10.65 26.432 l 2.695 -4.03 c 0.818 0.34 1.713 0.529 2.654 0.529 c 0.001 0 0.001 0 0.001 0 c 0.941 0 1.838 -0.189 2.656 -0.529 l 2.695 4.03 c -1.606 0.827 -3.424 1.297 -5.351 1.297 s -3.745 -0.47 -5.35 -1.297 Z M 22.278 25.899 l -2.669 -3.991 c 0.952 -0.583 1.751 -1.387 2.327 -2.344 l 3.992 2.67 c -0.93 1.475 -2.179 2.729 -3.65 3.665 Z"></path>
              </svg>
              <div>
                <h3 className="text-lg font-semibold">HỖ TRỢ 24/7</h3>
                <p className="mt-1 text-gray-600">
                  Liên hệ với chúng tôi 24 giờ một ngày, 7 ngày một tuần
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <svg
                className="w-[90px] h-[45px] hover:origin-bottom-left hover:-rotate-12 hover:scale-105 transition-all ease-in-out duration-300"
                viewBox="0 0 32 32"
                width="32"
                height="32"
              >
                <path d="M 27.729 18.664 c 0 6.467 -5.261 11.729 -11.729 11.729 s -11.729 -5.261 -11.729 -11.729 c 0 -6.452 5.237 -11.703 11.684 -11.728 v 5.333 l 10.129 -5.865 l -10.129 -5.864 v 5.33 c -7.047 0.024 -12.751 5.741 -12.751 12.794 c 0 7.065 5.727 12.795 12.795 12.795 c 7.066 0 12.795 -5.73 12.795 -12.795 h -1.066 Z M 17.022 2.39 l 6.935 4.015 l -6.935 4.016 v -8.03 Z"></path>
              </svg>
              <div>
                <h3 className="text-lg font-semibold">TRẢ HÀNG NHANH</h3>
                <p className="mt-1 text-gray-600">
                  Chỉ cần trả lại trong vòng 30 ngày để đổi hàng
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <svg
                className="w-[90px] h-[45px] hover:origin-bottom-left hover:-rotate-12 hover:scale-105 transition-all ease-in-out duration-300"
                viewBox="0 0 27 32"
                width="32"
                height="32"
              >
                <path d="M 13.333 2.667 c -7.36 0 -13.333 5.973 -13.333 13.333 s 5.973 13.333 13.333 13.333 c 7.36 0 13.333 -5.973 13.333 -13.333 s -5.973 -13.333 -13.333 -13.333 Z M 13.333 28.267 c -6.773 0 -12.267 -5.493 -12.267 -12.267 s 5.493 -12.267 12.267 -12.267 c 6.773 0 12.267 5.493 12.267 12.267 s -5.493 12.267 -12.267 12.267 Z"></path>
                <path d="M 17.6 12.8 c 0 -2.347 -1.92 -4.267 -4.267 -4.267 s -4.267 1.92 -4.267 4.267 c 0 1.6 0.907 3.04 2.24 3.733 l -2.24 6.4 h 8.533 l -2.187 -6.4 c 1.28 -0.747 2.187 -2.133 2.187 -3.733 Z M 16.107 21.867 h -5.547 l 1.707 -4.96 l 0.32 -0.853 l -0.8 -0.427 c -1.013 -0.587 -1.653 -1.653 -1.653 -2.827 c 0 -1.76 1.44 -3.2 3.2 -3.2 s 3.2 1.44 3.2 3.2 c 0 1.173 -0.64 2.24 -1.653 2.773 l -0.8 0.427 l 0.267 0.853 l 1.76 5.013 Z"></path>
              </svg>
              <div>
                <h3 className="text-lg font-semibold">100% AN TOÀN</h3>
                <p className="mt-1 text-gray-600">
                  Chúng tôi đảm bảo thanh toán an toàn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
