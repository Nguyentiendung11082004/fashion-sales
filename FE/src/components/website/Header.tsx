/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Flag, Logo } from "../icons";
import PhoneHome from "../icons/headerWebsite/PhoneHome";
import EmailHome from "../icons/headerWebsite/EmailHome";
import MapHome from "../icons/headerWebsite/MapHome";
import MenuHome from "../icons/headerWebsite/MenuHome";
import UserHome from "../icons/headerWebsite/UserHome";
import HeartHome from "../icons/headerWebsite/HeartHome";
import CartHome from "../icons/headerWebsite/CartHome";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <div>
        <section className="bg-[#F6F6F8] text-xs">
          <div className="text-[#878787] flex items-center lg:justify-between lg:items-center flex-wrap sm:justify-center md:justify-center py-4 lg:mx-4 h-[auto] lg:h-[48px] md:h-[48px]">
            <div className="hidden lg:flex">
              <div className="flex mr-4">
                <PhoneHome />
                <span> +0123456789 </span>
              </div>
              <div className="flex">
                <EmailHome />
                <span className="text-[#878787]"> Kalle@domain.com </span>
              </div>
            </div>
            <div className="mx-auto lg:mx-0">
              <span>
              Giảm giá mùa hè<span className="text-[red] px-[2px]">50%</span>
                !<span className="text-black pl-[2px]">Mua ngay</span>
              </span>
            </div>
            <div className="flex items-center mx-auto lg:mx-0">
              <div className="flex items-center">
                <MapHome />
                <span>Vị trí</span>
              </div>
              <div className="mx-5">
                <select className="bg-[#F6F6F8]">
                <option>Viet nam</option>
                  <option>English</option>
                  
                </select>
              </div>
              <div className="flex items-center">
                <img src={Flag} className="w-4 h-3 object-cover" />
                <select className="bg-[#F6F6F8]">
                  <option>VND</option>
                  <option>USA</option>
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
              <img src={Logo} className="h-9" alt="Logo" />
            </div>
            <div className="col-span-4 flex items-center justify-start md:items-center md:justify-start lg:hidden  order-1  ">
              <MenuHome />
            </div>
            <div className="lg:col-span-8  lg:flex lg:items-center lg:justify-center md:hidden  hidden lg:order-2">
              <ul className="flex space-x-16 lg:space-x-12 ml-10 text-[14px]">
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
                  <UserHome />
                </Link>
                <Link to="" className="relative">
                  <span className="absolute text-xs right-[-5px] top-[-5px] bg-[#000] text-white px-1 rounded-full">
                    0
                  </span>
                  <HeartHome />
                </Link>
                <Link to="" className="relative">
                  <span className="absolute text-xs right-[-5px] top-[-5px] bg-[#000] text-white px-1 rounded-full">
                    3
                  </span>
                  <CartHome />
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
