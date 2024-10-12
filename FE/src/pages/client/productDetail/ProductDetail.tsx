import { Product, ProductNext } from "../../../components/icons";
import pro1 from "../../../assets/images/product1.webp";
import CartDetail from "../../../components/icons/detail/CartDetail";
import Eye from "../../../components/icons/detail/Eye";
import HeartWhite from "../../../components/icons/detail/HeartWhite";
import Less from "../../../components/icons/detail/Less";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import Star from "@/components/icons/detail/Star";

const ProductDetail = () => {
  // slideshow
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

  const [activeButton, setActiveButton] = useState("details");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
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
            <div className="lg:flex lg:gap-3">
              <div className="lg:w-4/5 w-full lg:order-2">
                {/* <Zomdetail /> */}
                <div
                  className="group lg:w-full h-full relative overflow-hidden mb-[10px] "
                  onMouseMove={handleMouseMove}
                >
                  <img
                    ref={imgRef}
                    alt="product detail 1"
                    loading="lazy"
                    decoding="async"
                    data-nimg="fill"
                    className="w-full lg:h-full object-cover transition-transform ease-in-out duration-300 group-hover:scale-150"
                    sizes=""
                    src={pro1}
                  />
                </div>
              </div>
              <div
                className="lg:order-1 hd-img-soft lg:w-1/5 w-full max-h-[394px] sm:max-h-[608px] xl:max-h-[688px] lg:max-h-[535px] overflow-x-auto lg:overflow-y-auto flex lg:flex-col flex-row"
                onWheel={handleWheel}
                ref={containerRef}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox and IE/Edge
              >
                <style>
                  {`.hd-img-soft::-webkit-scrollbar {display: none;}`} {/* Hide scrollbar for Chrome, Safari, and Opera */}
                </style>
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="w-24 lg:w-auto flex-shrink-0"
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="w-24 lg:w-auto flex-shrink-0"
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="w-24 lg:w-auto flex-shrink-0"
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="w-24 lg:w-auto flex-shrink-0"
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="w-24 lg:w-auto flex-shrink-0"
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="w-24 lg:w-auto flex-shrink-0"
                  sizes=""
                  src={pro1}
                />
                <img
                  alt="product detail 1"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="w-24 lg:w-auto flex-shrink-0"
                  sizes=""
                  src={pro1}
                />
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
                    <Link
                      to="#reviews"
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
                    </Link>
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
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to="##"
                      className="text-primary-6000 hover:text-primary-500 text-sm"
                    >
                      Xem bảng kích thước
                    </Link>
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
                  <span className="xl:ml-3 ml-1 lg:text-base xl:text-lg">
                    Thêm vào giỏ hàng
                  </span>
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

        {/* chi tiết */}

        <div className="w-full bg-[#f6f6f8]">
          <div className="container py-[45px]">
            <div className="w-[100%] text-center m-auto flex justify-center">
              <button
                onClick={() => handleButtonClick("details")}
                className={`${activeButton === "details"
                  ? "border-black text-black border-2"
                  : " text-[#8e8e8e]"
                  } font-medium cursor-pointer lg:text-base text-[10px] lg:py-2 lg:px-6 px-2 py-2 rounded-full`}
              >
                Chi tiết sản phẩm
              </button>
              <button
                onClick={() => handleButtonClick("reviews")}
                className={`${activeButton === "reviews"
                  ? "border-black text-black border-2"
                  : "border-black text-[#8e8e8e]"
                  } btn_cmt text-[10px] lg:text-base font-medium cursor-pointer lg:py-2 lg:px-6 px-2 py-2 rounded-full`}
              >
                Xem đánh giá sản phẩm
              </button>
              <button
                onClick={() => handleButtonClick("comment")}
                className={`${activeButton === "comment"
                  ? "border-black text-black border-2"
                  : "border-black text-[#8e8e8e]"
                  } btn_cmt text-[10px] lg:text-base font-medium cursor-pointer lg:py-2 lg:px-6 px-2 py-2 rounded-full`}
              >
                Viết bình luận
              </button>
            </div>

            <div className="mt-[20px] w-full">
              {activeButton === "details" && (
                <div className="detail_pageDetail flex flex-col lg:text-base text-[10px]">
                  <p className="py-2 relative">
                    <span className="text-[#9b9791] mr-[200px]">Danh mục:</span>
                    <span className="absolute left-[200px] font-medium">
                      Váy nữ
                    </span>
                  </p>
                  <p className="py-2 relative">
                    <span className="text-[#9b9791] mr-[200px]">
                      Thương hiệu :
                    </span>
                    <span className="absolute left-[200px] font-medium">
                      Chanel
                    </span>
                  </p>
                  <p className="py-2 relative">
                    <span className="text-[#9b9791] mr-[200px]">
                      Chất liệu :
                    </span>
                    <span className="absolute left-[200px] font-medium">
                      Cotton lạnh
                    </span>
                  </p>
                  <p className="py-2 relative">
                    <span className="text-[#9b9791] mr-[200px]">
                      Phong cách :
                    </span>
                    <span className="absolute left-[200px] font-medium">
                      Thể thao
                    </span>
                  </p>
                  <p className="py-2 relative">
                    <span className="text-[#9b9791] mr-[200px]">Xuất xứ :</span>
                    <span className="absolute left-[200px] font-medium">
                      Trung Quốc
                    </span>
                  </p>
                  <div className="w-full mt-4">
                    <h1 className="font-semibold text-xl pb-2">
                      Mô tả sản phẩm:
                    </h1>
                    <p>
                      🎈Cuối cùng đang chờ bạn: cửa hàng của chúng tôi có các
                      sản phẩm chất lượng cao và nhiều loại quần áo, chào mừng
                      bạn đến cửa hàng để mua <br />
                      💚Khi bạn đặt hàng, nó sẽ được chuyển trong vòng 10 ngày,
                      và toàn bộ gói hàng sẽ được giao cho bạn <br />
                      💚Cửa hàng của chúng tôi là kích thước tiêu chuẩn, nếu bạn
                      muốn có một sự vừa vặn hơn, vui lòng mua một kích thước
                      lên.
                    </p>
                  </div>
                </div>
              )}
              {activeButton === "reviews" && (
                <div className="w-full">
                  <div>
                    {/* box đánh giá của khách hàng */}
                    <div className="border py-4">
                      <div className="flex ">
                        <img
                          className="w-[60px] h-[60px] rounded-full mr-4"
                          src="data:image/jpeg;base64,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"
                          alt=""
                        />
                        <div>
                          <span className="">Phạm Kim Huệ</span>
                          <div className="mt-2 flex">
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                          </div>
                          <p className="text-xs mt-2">21/8/2024 10:30</p>
                        </div>
                      </div>
                      <div className="mt-4 ml-[75px]">
                        <p>
                          Phân loại hàng:
                          <span>Chân váy Jean ngắn , size: S</span>
                        </p>
                        <p>
                          Màu sắc: <span>Đúng với mô tả</span>
                        </p>
                        <p>
                          Chất liệu: <span>dày dặn</span>
                        </p>
                        <p>
                          Nhận xét chung: Chân váy Jean dày dặn đúng form rất
                          đẹp nha
                        </p>
                        <img
                          className="my-4"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdfKDCkaIX-YZGUaKS_kurggq409OrjxrefA&s"
                          alt="hình ảnh từ người mua đánh giá"
                        />
                      </div>
                      <div className="bg-gray-200 ml-[75px]">
                        <p className="text-base font-medium my-4 pt-4">
                          Phản hồi của người bán
                        </p>
                        <p>
                          cảm ơn bạn đã đánh giá sản phẩm của chúng tôi, nếu có
                          điểm nào ko hài lòng vui lòng liên hệ với chúng tôi!!!
                        </p>
                      </div>
                    </div>
                    <div className="border py-4 lg:text-base text-sm">
                      <div className="flex ">
                        <img
                          className="w-[60px] h-[60px] rounded-full mr-4"
                          src="data:image/jpeg;base64,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"
                          alt=""
                        />
                        <div>
                          <span className="">Phạm Kim Huệ</span>
                          <div className="mt-2 flex">
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                          </div>
                          <p className="text-xs mt-2">21/8/2024 10:30</p>
                        </div>
                      </div>
                      <div className="mt-4 ml-[75px]">
                        <p>
                          Phân loại hàng:
                          <span>Chân váy Jean ngắn , size: S</span>
                        </p>
                        <p>
                          Màu sắc: <span>Đúng với mô tả</span>
                        </p>
                        <p>
                          Chất liệu: <span>dày dặn</span>
                        </p>
                        <p>
                          Nhận xét chung: Chân váy Jean dày dặn đúng form rất
                          đẹp nha
                        </p>
                        <img
                          className="my-4"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdfKDCkaIX-YZGUaKS_kurggq409OrjxrefA&s"
                          alt="hình ảnh từ người mua đánh giá"
                        />
                      </div>
                      <div className="bg-gray-200 ml-[75px]">
                        <p className="text-base font-medium my-4 pt-4">
                          Phản hồi của người bán
                        </p>
                        <p>
                          cảm ơn bạn đã đánh giá sản phẩm của chúng tôi, nếu có
                          điểm nào ko hài lòng vui lòng liên hệ với chúng tôi!!!
                        </p>
                      </div>
                    </div>
                    <div className="border py-4">
                      <div className="flex ">
                        <img
                          className="w-[60px] h-[60px] rounded-full mr-4"
                          src="data:image/jpeg;base64,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"
                          alt=""
                        />
                        <div>
                          <span className="">Phạm Kim Huệ</span>
                          <div className="mt-2 flex">
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                          </div>
                          <p className="text-xs mt-2">21/8/2024 10:30</p>
                        </div>
                      </div>
                      <div className="mt-4 ml-[75px]">
                        <p>
                          Phân loại hàng:
                          <span>Chân váy Jean ngắn , size: S</span>
                        </p>
                        <p>
                          Màu sắc: <span>Đúng với mô tả</span>
                        </p>
                        <p>
                          Chất liệu: <span>dày dặn</span>
                        </p>
                        <p>
                          Nhận xét chung: Chân váy Jean dày dặn đúng form rất
                          đẹp nha
                        </p>
                        <img
                          className="my-4"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdfKDCkaIX-YZGUaKS_kurggq409OrjxrefA&s"
                          alt="hình ảnh từ người mua đánh giá"
                        />
                      </div>
                      <div className="bg-gray-200 ml-[75px]">
                        <p className="text-base font-medium my-4 pt-4">
                          Phản hồi của người bán
                        </p>
                        <p>
                          cảm ơn bạn đã đánh giá sản phẩm của chúng tôi, nếu có
                          điểm nào ko hài lòng vui lòng liên hệ với chúng tôi!!!
                        </p>
                      </div>
                    </div>
                    <button className="px-2 py-2 border-2 border-black rounded-full text-white bg-black ml-[75px]">
                      Hiển thị thêm bình luận
                    </button>
                  </div>
                </div>
              )}
              {activeButton === "comment" && (
                <form className="m-auto w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
                  <h1 className="font-semibold lg:text-2xl text-base mb-4 text-center">
                    Đánh giá sản phẩm
                  </h1>

                  <div className="mb-4">
                    <label
                      className="block lg:text-sm text-[10px] font-medium text-gray-700"
                      htmlFor="rating"
                    >
                      Chất lượng sản phẩm:
                    </label>
                    <div className="flex items-center mt-2">
                      <input
                        type="radio"
                        id="star5"
                        name="rating"
                        value="5"
                        className="hidden"
                      />
                      <label
                        htmlFor="star5"
                        className="cursor-pointer text-yellow-500"
                      >
                        ★
                      </label>
                      <input
                        type="radio"
                        id="star4"
                        name="rating"
                        value="4"
                        className="hidden"
                      />
                      <label
                        htmlFor="star4"
                        className="cursor-pointer text-yellow-500"
                      >
                        ★
                      </label>
                      <input
                        type="radio"
                        id="star3"
                        name="rating"
                        value="3"
                        className="hidden"
                      />
                      <label
                        htmlFor="star3"
                        className="cursor-pointer text-yellow-500"
                      >
                        ★
                      </label>
                      <input
                        type="radio"
                        id="star2"
                        name="rating"
                        value="2"
                        className="hidden"
                      />
                      <label
                        htmlFor="star2"
                        className="cursor-pointer text-yellow-500"
                      >
                        ★
                      </label>
                      <input
                        type="radio"
                        id="star1"
                        name="rating"
                        value="1"
                        className="hidden"
                      />
                      <label
                        htmlFor="star1"
                        className="cursor-pointer text-yellow-500"
                      >
                        ★
                      </label>
                    </div>
                  </div>

                  {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="color">
                  Màu sắc:
                </label>
                <input
                  id="color"
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nhập màu sắc sản phẩm"
                />
              </div> */}

                  <div className="mb-4">
                    <label
                      className="block lg:text-sm text-[10px] font-medium text-gray-700"
                      htmlFor="review"
                    >
                      Nhận xét:
                    </label>
                    <textarea
                      id="review"
                      rows={4}
                      className="px-2 py-2 placeholder:lg:text-sm text-[10px] mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Nhập nhận xét của bạn"
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block lg:text-sm text-[10px] font-medium text-gray-700"
                      htmlFor="image"
                    >
                      Tải hình ảnh lên:
                    </label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block lg:text-sm text-[10px] font-medium text-gray-700"
                      htmlFor="video"
                    >
                      Tải video lên:
                    </label>
                    <input
                      id="video"
                      type="file"
                      accept="video/*"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent lg:text-base text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Gửi đánh giá
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
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
