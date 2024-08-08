import { Product, ProductNext } from "../../../components/icons";
import user1 from "@/assets/images/user1.jpg";
import pro1 from "../../../assets/images/product1.webp";
import CartDetail from "../../../components/icons/detail/CartDetail";
import Eye from "../../../components/icons/detail/Eye";
import HeartWhite from "../../../components/icons/detail/HeartWhite";
import Less from "../../../components/icons/detail/Less";
import { Link } from "react-router-dom";
import { useRef } from "react";
// import SliderDetail from "./SliderDetail";

const ProductDetail = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const img = imgRef.current;
    if (img) {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    }
  };
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      containerRef.current.scrollTop += e.deltaY;
    }
  };
  return (
    <>
      <div>
        {/* <div className="w-full"> */}

        <div className="hd-detail-head bg-[#f6f6f6]">
          <div className="container h-[55px] flex items-center">
            <span className="text-[13px]">Trang chủ</span>
            <Less />
            <span className="text-[13px] text-[#222]">Mũ</span>
            <Less />
            <span className="text-[13px] text-gray-500">Blush Beanie</span>
          </div>
        </div>

        <div className="container py-10 lg:flex">
          <div className="w-full lg:w-[55%]">
            <div className="flex gap-3">
              <div
                className="hd-img-soft w-1/5 max-h-[394px] sm:max-h-[608px] xl:max-h-[688px] lg:max-h-[535px] overflow-y-auto"
                onWheel={handleWheel}
                ref={containerRef}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox and IE/Edge
              >
                <style>
                  {`.hd-img-soft::-webkit-scrollbar {display: none; // Hide scrollbar for Chrome, Safari, and Opera}`}
                </style>
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className=""
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className=""
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className=""
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className=""
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className=""
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className=""
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className=""
                  sizes=""
                  src={pro1}
                />
              </div>
              <div className="w-4/5">
                {/* <Zomdetail /> */}
                <div
                  className="group w-full relative overflow-hidden"
                  onMouseMove={handleMouseMove}
                >
                  <img
                    ref={imgRef}
                    alt="product detail 1"
                    loading="lazy"
                    decoding="async"
                    data-nimg="fill"
                    className="w-full h-full object-cover transition-transform ease-in-out duration-300 group-hover:scale-150"
                    sizes=""
                    src={pro1}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            <div className="space-y-7 2xl:space-y-8">
              <div>
                <h2 className="text-2xl xl:text-start sm:text-center sm:text-3xl font-semibold">
                  Blush Beanie
                </h2>
                <div className="flex items-center mt-5 lg:mx-[15%] sm:mx-[42%] xl:mx-0 sm:mt-2 space-x-4">
                  <div className="">
                    <span className="lg:text-2xl  sm:text-[25px] text-sm text-[#747474] my-2">
                      385.000₫
                    </span>
                  </div>
                  <div className="h-7 border-l border-slate-300 dark:border-slate-700 lg:block xl:block block sm:hidden"></div>
                  <div className="flex items-center lg:block xl:block sm:hidden">
                    <a
                      href="#reviews"
                      className="flex items-center text-sm font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="w-5 h-5 pb-[1px] text-yellow-400"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <div className="ml-1.5 flex">
                        <span>4.9</span>
                        <span className="block mx-2">·</span>
                        <span className="hd-all-textgrey underline hd-all-hover-bluelight">
                          142 reviews
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <p className="mt-4 hd-all-textgrey text-sm">
                  Hãy đến Kalles vào mùa hè này với chiếc áo phông cổ chữ V sọc
                  trắng xanh navy cổ điển của Nike. Hoàn hảo khi kết hợp với
                  quần denim và giày trắng để có phong cách Kalles sành điệu.
                </p>
              </div>
              <div className="">
                <div>
                  <label>
                    <span className="font-medium">
                      Màu sắc:
                      <span className="ml-1 font-semibold">Xám</span>
                    </span>
                  </label>
                  <div className="flex mt-3 gap-2">
                    <div className="relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer border-primary-6000 dark:border-primary-500">
                      <div className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover bg-gray-300"></div>
                    </div>
                    <div className="relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer border-primary-6000 dark:border-primary-500">
                      <div className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover bg-pink-200"></div>
                    </div>
                    <div className="relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer border-primary-6000 dark:border-primary-500">
                      <div className="absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover bg-cover bg-black"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div>
                  <div className="flex justify-between font-medium">
                    <label>
                      <span className="">
                        Kích thước:
                        <span className="ml-1 font-semibold">XS</span>
                      </span>
                    </label>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="##"
                      className="text-primary-6000 hover:text-primary-500 text-sm"
                    >
                      Xem bảng kích thước
                    </a>
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3 ">
                    <div
                      className="relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-slate-300 dark:border-slate-600 text-slate-900 dark:hover:bg-black hover:text-white"
                    >
                      XS
                    </div>
                    <div
                      className="relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-slate-300 dark:border-slate-600 text-slate-900 dark:hover:bg-black hover:text-white"
                    >
                      S
                    </div>
                    <div
                      className="relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-slate-300 dark:border-slate-600 text-slate-900 dark:hover:bg-black hover:text-white"
                    >
                      M
                    </div>
                    <div
                      className="relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-slate-300 dark:border-slate-600 text-slate-900 dark:hover:bg-black hover:text-white"
                    >
                      L
                    </div>
                    <div
                      className="relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer border-slate-300 dark:border-slate-600 text-slate-900 dark:hover:bg-black hover:text-white"
                    >
                      XL
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3.5 items-center lg:ml-0 sm:ml-[40px]">
                <div className="flex items-center justify-center sm:p-3.5 rounded-full">
                  <div className="nc-NcInputNumber flex items-center justify-between space-x-5 w-full border border-black px-2 py-3 rounded-full">
                    <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                      <button
                        className="flex items-center justify-center bg-slate-100/70 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="w-4 h-4"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <span className="select-none block flex-1 text-center font-semibold">
                        1
                      </span>
                      <button
                        className="flex items-center justify-center bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="w-4 h-4"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <button className="nc-Button relative right-2 h-14 w-64 inline-flex items-center justify-center rounded-full text-sm sm:text-base font-medium sm:py-3.5 sm:px-2 lg:px-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0  animate-bounce focus:animate-none hover:animate-none text-md  mt-3  border bg-[#56cfe1] text-white">
                  <svg
                    className="hidden lg:hidden xl:block sm:inline-block w-5 h-5 mb-0.5"
                    viewBox="0 0 9 9"
                    fill="none"
                  >
                    <path
                      d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z"
                      fill="currentColor"
                    ></path>

                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="xl:ml-3 ml-1 lg:text-base xl:text-lg">Thêm vào giỏ hàng</span>
                </button>
                <div className="flex border border-slate-600 rounded-full items-center px-3 h-12 hover:border-red-500 hover:text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative text-sm lg:hidden xl:block hidden">
                <p className="hd-all-textgrey">
                  Mã sản phẩm: <span className="text-black">A1</span>
                </p>
                <p className="hd-all-textgrey">
                  Tình trạng: <span className="text-black">Còn hàng</span>
                </p>
                <p className="hd-all-textgrey">
                  Danh mục: <span className="text-black">Mũ</span>
                </p>
                <p className="">
                  Nhà cung cấp <span>H&M</span>
                </p>
              </div>
              {/* <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700" /> */}
            </div>
          </div>
        </div>

        {/* Desc&Review */}
        <div className="container sm:mt-10 mt-12 space-y-10 sm:space-y-16">

          <div className="">
            <h2 className="text-2xl font-semibold">Chi tiết sản phẩm</h2>
            <div className="relative text-sm lg:block xl:hidden block mt-3">
                <p className="hd-all-textgrey">
                  Mã sản phẩm: <span className="text-black">A1</span>
                </p>
                <p className="hd-all-textgrey">
                  Tình trạng: <span className="text-black">Còn hàng</span>
                </p>
                <p className="hd-all-textgrey">
                  Danh mục: <span className="text-black">Mũ</span>
                </p>
                <p className="">
                  Nhà cung cấp <span>H&M</span>
                </p>
              </div>
            <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
              <p>The patented eighteen-inch hardwood Arrowhead deck --- finely mortised in, makes this the strongest and most rigid canoe ever built. You cannot buy a canoe that will afford greater satisfaction.</p>
              <p>The St. Louis Meramec Canoe Company was founded by Alfred Wickett in 1922. Wickett had previously worked for the Old Town Canoe Co from 1900 to 1914. Manufacturing of the classic wooden canoes in Valley Park, Missouri ceased in 1978.</p>
              <ul>
                <li>Regular fit, mid-weight t-shirt</li>
                <li>Natural color, 100% premium combed organic cotton</li>
                <li>Quality cotton grown without the use of herbicides or pesticides - GOTS certified</li>
                <li>Soft touch water based printed in the USA</li>
              </ul>
            </div>
          </div>
          <hr className="border-slate-200 dark:border-slate-700"/>
          <div className="">
            <h2 className="text-2xl font-semibold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-7 h-7 mb-0.5">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
              </svg>
              <span className="ml-1.5"> 4,87 · 142 Reviews</span>
            </h2>
            <div className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
                <div className="nc-ReviewItem flex flex-col " data-nc-id="ReviewItem">
                  <div className=" flex space-x-4 ">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white dark:ring-neutral-900">
                        <img src={user1} alt="Cody Fisher" loading="lazy" decoding="async" data-nimg="fill" className="absolute inset-0 w-full h-full object-cover rounded-full"  sizes="100px"/>
                        <span className="wil-avatar__name">C</span>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div className="text-sm sm:text-base">
                        <span className="block font-semibold">Cody Fisher</span>
                        <span className="block mt-0.5 hd-all-textgrey text-sm">May 20,2021</span>
                      </div>
                      <div className="mt-0.5 flex text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
                    <p className="text-slate-600">Very nice feeling sweater. I like it better than a regular hoody because it is tailored to be a slimmer fit. Perfect for going out when you want to stay comfy.The head opening is a little tight which makes it a little.</p>
                  </div>
                </div>
                <div className="nc-ReviewItem flex flex-col " data-nc-id="ReviewItem">
                  <div className=" flex space-x-4 ">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white dark:ring-neutral-900">
                        <img alt="Stiven Hokinhs" loading="lazy" decoding="async" data-nimg="fill" className="absolute inset-0 w-full h-full object-cover rounded-full" sizes="100px" src={user1}/>
                        <span className="wil-avatar__name">S</span>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div className="text-sm sm:text-base">
                        <span className="block font-semibold">Stiven Hokinhs</span>
                        <span className="block mt-0.5 hd-all-textgrey text-sm">December 22,2021</span>
                      </div>
                      <div className="mt-0.5 flex text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
                    <p className="text-slate-600 ">I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. If you’re unsure which hoodie to pick.</p>
                  </div>
                </div>
                <div className="nc-ReviewItem flex flex-col " data-nc-id="ReviewItem">
                  <div className=" flex space-x-4 ">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white dark:ring-neutral-900">
                        <img alt="Gropishta keo" loading="lazy" decoding="async" data-nimg="fill" className="absolute inset-0 w-full h-full object-cover rounded-full" sizes="100px" src={user1}/>
                        <span className="wil-avatar__name">G</span>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div className="text-sm sm:text-base">
                        <span className="block font-semibold">Gropishta keo</span>
                        <span className="block mt-0.5 hd-all-textgrey text-sm">August 15,2022</span>
                      </div>
                      <div className="mt-0.5 flex text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
                    <p className="text-slate-600">The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. </p>
                  </div>
                </div>
                <div className="nc-ReviewItem flex flex-col " data-nc-id="ReviewItem">
                  <div className=" flex space-x-4 ">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white dark:ring-neutral-900">
                        <img alt="Dahon Stiven" loading="lazy" decoding="async" data-nimg="fill" className="absolute inset-0 w-full h-full object-cover rounded-full" sizes="100px"  src={user1}/>
                        <span className="wil-avatar__name">D</span>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div className="text-sm sm:text-base">
                        <span className="block font-semibold">Dahon Stiven</span>
                        <span className="block mt-0.5 hd-all-textgrey text-sm">December 12,2022</span>
                      </div>
                      <div className="mt-0.5 flex text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
                    <p className="text-slate-600 ">Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. The material is super soft and comfortable and the sweatshirt also has a good weight to it.</p>
                  </div>
                </div>
              </div>
              <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonSecondary bg-black text-white  mt-10 border border-slate-300 dark:border-slate-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 ">Hiển thị tất cả <span className="px-1">142</span> đánh giá</button>
            </div>
          </div>
          <hr className="border-slate-200 dark:border-slate-700"/>
        </div>

        
        <div className="container m-auto mb-[50px] mt-10">
          <p className="lg:text-2xl sm:text-xl text-base mb-[30px] font-semibold m-auto text-center">
            Bạn cũng có thể thích
          </p>
          <div>
            {/* <SliderDetail /> */}
            <div className="grid xl:grid-cols-4 grid-cols-2 lg:grid-cols-3 gap-3 sm:mx-7 sm:gap-x-10 xl:gap-8 border-b border-gray-200 relative">
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
        <div className="container m-auto mb-[50px]">
          <p className="lg:text-2xl sm:text-xl text-base mb-[30px] font-semibold m-auto text-center">
          Sản phẩm đã xem gần đây
          </p>
          <div>
            <div className="grid xl:grid-cols-4 grid-cols-2 lg:grid-cols-3 gap-3 sm:mx-7 sm:gap-x-10 xl:gap-8 relative">
              {/* item 1 */}
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

export default ProductDetail;
