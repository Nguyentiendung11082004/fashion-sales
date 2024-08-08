import { Product, ProductNext } from "@/components/icons";
import Less from "@/components/icons/detail/Less";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeartWhite from "@/components/icons/detail/HeartWhite";
import Eye from "@/components/icons/detail/Eye";
import CartDetail from "@/components/icons/detail/CartDetail";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Products = () => {
  const [growboxDropdownOpen, setGrowboxDropdownOpen] = useState(false);
  const [toepfeDropdownOpen, setToepfeDropdownOpen] = useState(false);
  // const [menuOpen, setMenuOpen] = useState(false);

  const toggleGrowboxDropdown = () => {
    setGrowboxDropdownOpen(!growboxDropdownOpen);
  };

  const toggleToepfeDropdown = () => {
    setToepfeDropdownOpen(!toepfeDropdownOpen);
  };

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  return (
    <>
      <div>
        <section className="w-full">
          <div className="hd-page-head">
            <div className="hd-header-banner bg-[url('https://demo-kalles-4-1.myshopify.com/cdn/shop/files/shop-banner.jpg?v=1651829187&width=3024')] bg-no-repeat bg-cover bg-center">
              <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
                <div className="z-[100] relative hd-container text-white">
                  <h1 className="text-xl font-medium leading-5 mb-3">
                    Sản phẩm
                  </h1>
                  <p className=" text-sm flex justify-center items-center">
                    <span className="hover:text-[#F2F2F2]">Trang chủ</span>
                    <Less />
                    <span className="hover:text-[#F2F2F2]">Sản phẩm</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* search */}
        <div className="container">
          <header className="max-w-2xl mx-auto -mt-5 flex flex-col lg:-mt-7 lg:pb-10">
            <form className="relative w-full " method="post">
              <label htmlFor="search-input" className="text-neutral-500 ">
                <span className="sr-only">Search all icons</span>
                <input className="block w-full outline-0 border border-neutral-200 bg-white dark:bg-neutral-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-50 focus:border-neutral-200 rounded-full font-normal  pl-14 py-5 pr-5 md:pl-16 shadow-lg dark:border" id="search-input" placeholder="Nhập từ khóa của bạn" type="search" />
                <button className="ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-slate-900 hd-all-hoverblue-btn
        text-slate-50 absolute right-2.5 top-1/2 transform -translate-y-1/2  w-11 h-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M22 22L20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>
              </label>
            </form>
          </header>
        </div>
        {/* end-search */}

        {/* main */}
        <div className="container lg:space-x-4 lg:mt-10  xl:-mb-3 -mb-14 mt-10 lg:-mb-[9px]">
          <div className={`lg:flex flex sm:flex flex-1 space-x-4 lg:ml-[385px] xl:ml-[370px] `}>
            
              <button className="flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                border-neutral-300 text-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500
                " type="button" data-headlessui-state="" id="headlessui-popover-button-:rc:"
                onClick={toggleGrowboxDropdown}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M16 2V5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M7 13H15" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M7 17H12" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <span className="ml-2">Hãng</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="w-4 h-4 ml-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                </svg>
              </button>
              {growboxDropdownOpen && (
                <div className="absolute z-40 max-w-sm px-4 mt-10 -left-4 sm:left-0 lg:left-[385px] xl:mt-12 xl:left-[490px] sm:px-0 lg:max-w-sm opacity-100 translate-y-0 w-[300px] sm:w-[350px]" id="headlessui-popover-panel-:r26:" tabIndex={-1} data-headlessui-state="open" data-open="" >
                  <div className="overflow-hidden rounded-2xl shadow-xl bg-white border border-neutral-200">
                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                      <div className="flex text-sm sm:text-base ">
                      <input id="All-Categories" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Tất cả" name="radioNameSort"/>
                        <label htmlFor="All Categories" className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none">
                          <span className="text-slate-900 ">Tất cả</span>
                        </label>
                      </div>
                      <div className="w-full border-b border-neutral-200"></div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input id="Most-Popular" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Resbon" name="radioNameSort"/>
                        <label htmlFor="Most-Popular" className="pl-2.5 sm:pl-3 block text-slate-900 select-none">Resbon</label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input id="Best-Rating" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Bycamcam" name="radioNameSort"/>
                        <label htmlFor="Best-Rating" className="pl-2.5 sm:pl-3 block text-slate-900 select-none">Bycamcam</label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input id="Newest" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Choice" name="radioNameSort"/>
                        <label htmlFor="Newest" className="pl-2.5 sm:pl-3 block text-slate-900  select-none">Choice</label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input id="Price-low-hight" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Hiin" name="radioNameSort"/>
                        <label htmlFor="Price-low-hight" className="pl-2.5 sm:pl-3 block text-slate-900  select-none">Hiin</label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input id="Price-hight-low" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Tobi" name="radioNameSort"/>
                        <label htmlFor="Price-hight-low" className="pl-2.5 sm:pl-3 block text-slate-900  select-none">Tobi</label>
                      </div>
                    </div>
                    <div className="p-5 bg-neutral-50 dark:border-t dark:border-neutral-200 flex items-center justify-between">
                      <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonThird text-neutral-700 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Xóa</button>
                      <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 text-slate-50 shadow-xl hd-all-hoverblue-btn">Áp dụng</button>
                    </div>
                  </div>
                </div>
              )}
              
  
              <button className="flex items-center justify-center px-4 py-2 text-sm border rounded-full focus:outline-none select-none           
                border-neutral-300 text-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500
                " type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rl:"
                onClick={toggleToepfeDropdown}>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                    <path d="M11.5166 5.70834L14.0499 8.24168" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M11.5166 14.2917V5.70834" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M8.48327 14.2917L5.94995 11.7583" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M8.48315 5.70834V14.2917" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6025 1.66667 10.0001 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <span className="ml-2">Thứ tự</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="w-4 h-4 ml-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                  </svg>
              </button>
              {toepfeDropdownOpen && (
                <div className="absolute z-40 max-w-sm px-4 mt-10 left-[120px] sm:left-[134px] lg:left-[520px] xl:mt-12 xl:left-[625px] sm:px-0 lg:max-w-sm opacity-100 translate-y-0 w-[300px] sm:w-[350px]" id="headlessui-popover-panel-:r26:" tabIndex={-1} data-headlessui-state="open" data-open="" >
                  <div className="overflow-hidden rounded-2xl shadow-xl bg-white border border-neutral-200">
                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                      <div className="flex items-center text-sm sm:text-base ">
                        <input id="Most-Popular" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Phổ biên nhất" name="radioNameSort"/>
                        <label htmlFor="Most-Popular" className="pl-2.5 sm:pl-3 block text-slate-900 select-none">Phổ biến nhất</label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input id="Best-Rating" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Đánh giá tốt nhất" name="radioNameSort"/>
                        <label htmlFor="Best-Rating" className="pl-2.5 sm:pl-3 block text-slate-900 select-none">Đánh giá tốt nhất</label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input id="Newest" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Mới nhất" name="radioNameSort"/>
                        <label htmlFor="Newest" className="pl-2.5 sm:pl-3 block text-slate-900  select-none">Mới nhất</label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input id="Price-low-hight" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Giá thấp - cao" name="radioNameSort"/>
                        <label htmlFor="Price-low-hight" className="pl-2.5 sm:pl-3 block text-slate-900  select-none">Giá thấp - cao</label>
                      </div>
                      <div className="flex items-center text-sm sm:text-base ">
                        <input id="Price-hight-low" className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-6 h-6" type="radio" value="Price-hight-low" name="radioNameSort"/>
                        <label htmlFor="Price-hight-low" className="pl-2.5 sm:pl-3 block text-slate-900  select-none">Giá cao - thấp</label>
                      </div>
                    </div>
                    <div className="p-5 bg-neutral-50 dark:border-t dark:border-neutral-200 flex items-center justify-between">
                      <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonThird text-neutral-700 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">Xóa</button>
                      <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-2 sm:px-5  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 text-slate-50 shadow-xl hd-all-hoverblue-btn">Áp dụng</button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        <div className="container py-12 flex flex-col lg:flex-row">
          <div className="lg:w-1/3 xl:w-1/4 pr-4 lg:-mt-20 mt-10">
            <div className="divide-y divide-slate-200">
              
              <div className="relative flex flex-col pb-8 space-y-4">
                <h3 className="font-semibold mb-2.5 ">Danh mục</h3>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="Backpacks"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="Backpacks"
                    />
                    <label
                      htmlFor="Backpacks"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        Áo phông
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="Travel Bags"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="Travel Bags"
                    />
                    <label
                      htmlFor="Travel Bags"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        Áo khoác
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="Laptop Sleeves"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="Laptop Sleeves"
                    />
                    <label
                      htmlFor="Laptop Sleeves"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        Quần bò
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="Organization"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="Organization"
                    />
                    <label
                      htmlFor="Organization"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        Váy                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="Accessories"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="Accessories"
                    />
                    <label
                      htmlFor="Accessories"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        Mũ
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col py-8 space-y-4">
                <h3 className="font-semibold mb-2.5">Màu sắc</h3>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="White"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="White"
                    />
                    <label
                      htmlFor="White"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        Trắng
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="Beige"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="Beige"
                    />
                    <label
                      htmlFor="Beige"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        Hồng
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="Blue"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="Blue"
                    />
                    <label
                      htmlFor="Blue"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        Xanh biển
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="Black"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="Black"
                    />
                    <label
                      htmlFor="Black"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        Đen
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="Navy"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="Navy"
                    />
                    <label
                      htmlFor="Navy"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        Vàng
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col py-8 space-y-4">
                <h3 className="font-semibold mb-2.5">Kích thước</h3>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="S"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="S"
                    />
                    <label
                      htmlFor="S"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        S
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="M"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="M"
                    />
                    <label
                      htmlFor="M"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        M
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="L"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="L"
                    />
                    <label
                      htmlFor="L"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        L
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="XL"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="XL"
                    />
                    <label
                      htmlFor="XL"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        XL
                      </span>
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="flex text-sm sm:text-base ">
                    <input
                      id="2XL"
                      className="focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                      type="checkbox"
                      name="2XL"
                    />
                    <label
                      htmlFor="2XL"
                      className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
                    >
                      <span className="text-slate-900 text-sm font-normal ">
                        2XL
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col py-8 space-y-5 pr-3">
                <Slider min={1} max={20000000} defaultValue={100000}/>
                <div className="flex justify-between space-x-5">
                  <div>
                    <label
                      htmlFor="minPrice"
                      className="block text-sm font-medium text-neutral-700"
                    >
                      Giá nhỏ nhất
                    </label>
                    <div className="mt-1 relative rounded-md">
                      <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                        đ
                      </span>
                      <input
                        id="minPrice"
                        className="block w-32 pr-10 pl-4 py-[6px] text-xs lg:text-sm border border-neutral-300 rounded-full bg-transparent"
                        type="text"
                        value="100.000"
                        name="minPrice"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="maxPrice"
                      className="block text-sm font-medium text-neutral-700"
                    >
                      Giá lớn nhất
                    </label>
                    <div className="mt-1 relative rounded-md">
                      <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                        đ
                      </span>
                      <input
                        id="maxPrice"
                        className="block w-32 pr-10 pl-4 py-[6px] text-xs lg:text-sm border border-neutral-300 rounded-full bg-transparent"
                        type="text"
                        value="20.000.000"
                        name="maxPrice"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-8 pr-2">
                <div className="MySwitch flex justify-between items-center space-x-2 ">
                  <div>
                    <label
                      className="nc-Label text-base font-medium text-neutral-900"
                      data-nc-id="Label"
                    >
                      Đang giảm giá!
                    </label>
                    <p className="text-neutral-500 dark:text-neutral-400  text-xs">
                      Sản phảm hiện đang được bán
                    </p>
                  </div>
                  <label className="hd-switch relative">
                      <input className="relative w-[65px] h-[30px] bg-[#c6c6c6] rounded-[20px] checked:bg-[#00BADB] before:content-[''] before:absolute before:top-[2.5px] before:left-[2.5px] before:scale-[1.1] before:w-[25px] before:h-[25px] before:bg-white before:rounded-[20px] before:transition-all before:duration-500 checked:before:left-[38px] hd-ok" type="checkbox"/>
                  </label>
                </div>
              </div>
              {/* <div className="relative flex flex-col py-8 space-y-4">
                <h3 className="font-semibold mb-2.5">Thứ tự sắp xếp</h3>
                <div className="flex items-center sm:text-base !text-sm">
                  <input
                    id="Most-Popular"
                    className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                    type="radio"
                    value="Most-Popular"
                    name="radioNameSort"
                  />
                  <label
                    htmlFor="Most-Popular"
                    className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                  >
                    Most Popular
                  </label>
                </div>
                <div className="flex items-centersm:text-base !text-sm">
                  <input
                    id="Best-Rating"
                    className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                    type="radio"
                    value="Best-Rating"
                    name="radioNameSort"
                  />
                  <label
                    htmlFor="Best-Rating"
                    className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                  >
                    Best Rating
                  </label>
                </div>
                <div className="flex items-center sm:text-base !text-sm">
                  <input
                    id="Newest"
                    className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                    type="radio"
                    value="Newest"
                    name="radioNameSort"
                  />
                  <label
                    htmlFor="Newest"
                    className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                  >
                    Newest
                  </label>
                </div>
                <div className="flex items-center sm:text-base !text-sm">
                  <input
                    id="Price-low-hight"
                    className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                    type="radio"
                    value="Price-low-hight"
                    name="radioNameSort"
                  />
                  <label
                    htmlFor="Price-low-hight"
                    className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                  >
                    Price Low - Hight
                  </label>
                </div>
                <div className="flex items-center sm:text-base !text-sm">
                  <input
                    id="Price-hight-low"
                    className="focus:ring-action-primary text-primary-500 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 w-5 h-5"
                    type="radio"
                    value="Price-hight-low"
                    name="radioNameSort"
                  />
                  <label
                    htmlFor="Price-hight-low"
                    className="pl-2.5 sm:pl-3 block text-slate-900 select-none"
                  >
                    Price Hight - Low
                  </label>
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
          {/* products */}
          <div className="flex-1 ">
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:mx-7 sm:gap-x-10 xl:gap-8 gap-y-8 ">
              <div className="nc-ProductCard relative flex flex-col bg-transparent ">
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
                    <p className="text-sm text-black mb-1">
                      Analogue Resin Strap
                    </p>
                    <del className="mr-1">12.000.000đ</del>
                    <span className="text-[red]">776.000₫</span>
                  </div>
                </div>
              </div>
              <div className="nc-ProductCard relative flex flex-col bg-transparent ">
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
                    <p className="text-sm text-black mb-1">
                      Analogue Resin Strap
                    </p>
                    <del className="mr-1">12.000.000đ</del>
                    <span className="text-[red]">776.000₫</span>
                  </div>
                </div>
              </div>
              <div className="nc-ProductCard relative flex flex-col bg-transparent ">
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
                    <p className="text-sm text-black mb-1">
                      Analogue Resin Strap
                    </p>
                    <del className="mr-1">12.000.000đ</del>
                    <span className="text-[red]">776.000₫</span>
                  </div>
                </div>
              </div>
              <div className="nc-ProductCard relative flex flex-col bg-transparent ">
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
                    <p className="text-sm text-black mb-1">
                      Analogue Resin Strap
                    </p>
                    <del className="mr-1">12.000.000đ</del>
                    <span className="text-[red]">776.000₫</span>
                  </div>
                </div>
              </div>
              <div className="nc-ProductCard relative flex flex-col bg-transparent ">
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
                    <p className="text-sm text-black mb-1">
                      Analogue Resin Strap
                    </p>
                    <del className="mr-1">12.000.000đ</del>
                    <span className="text-[red]">776.000₫</span>
                  </div>
                </div>
              </div>
              <div className="nc-ProductCard relative flex flex-col bg-transparent ">
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
                    <p className="text-sm text-black mb-1">
                      Analogue Resin Strap
                    </p>
                    <del className="mr-1">12.000.000đ</del>
                    <span className="text-[red]">776.000₫</span>
                  </div>
                </div>
              </div>
              <div className="nc-ProductCard relative flex flex-col bg-transparent ">
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
                    <p className="text-sm text-black mb-1">
                      Analogue Resin Strap
                    </p>
                    <del className="mr-1">12.000.000đ</del>
                    <span className="text-[red]">776.000₫</span>
                  </div>
                </div>
              </div>
              <div className="nc-ProductCard relative flex flex-col bg-transparent ">
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
                    <p className="text-sm text-black mb-1">
                      Analogue Resin Strap
                    </p>
                    <del className="mr-1">12.000.000đ</del>
                    <span className="text-[red]">776.000₫</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          {/* end-products */}
        </div>

        {/* phân trang */}
        <div className="container text-center mt-[20px] text-gray-500 lg:text-sm text-xs">
          <Link to="" className="hover:text-[red] px-4">
            Pre
          </Link>
          <Link to="" className="hover:text-[red] px-4">
            1
          </Link>
          <Link to="" className="hover:text-[red] px-4">
            2
          </Link>
          <Link to="" className="hover:text-[red] px-4">
            3
          </Link>
          <Link to="" className="hover:text-[red] px-4">
            ...
          </Link>
          <Link to="" className="hover:text-[red] px-4">
            100
          </Link>
          <Link to="" className="hover:text-[red] px-4">
            Next
          </Link>
        </div>
      </div>
    </>
  );
};

export default Products;
