import React from "react";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <>
      <div>
        <section className="w-full">
          <div className="text-[#ffff] h-[214px] border bg-gray-300 lg:bg-[#80847e] flex items-center justify-center flex-col overlay relative w-[100%] bg-no-repeat bg-cover bg-center bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQa4p71Kd6nd8GhBT8sOCGRn7NvHmyMxJMg&s')]">
            <p className="text-xl font-weight">Products</p>
            <p className="text-sm flex justify-center items-center">
              <span className="hover:text-[#F2F2F2]">Home</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 w-[12px] h-[12px] mx-2 text-[#fff]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
              <span className="hover:text-[#F2F2F2]">Products</span>
            </p>
          </div>
        </section>
        {/* main */}
        <section className="  ">
          <div className="container text-sm flex mt-10">
            <div className="w-[20%] lg:block hidden">
              <div className="mb-[20px]">
                <p className="font-bold text-xl flex items-center mb-[20px]">
                  Danh mục
                </p>
                <ul className="text-base">
                  <li className="block py-3">
                    <Link to="" className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 w-6 h-6 mr-3 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                      </svg>
                      Quần dài
                    </Link>
                  </li>
                  <li className="block py-3">
                    <Link to="" className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 w-6 h-6 mr-3 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                      </svg>
                      Quần dài
                    </Link>
                  </li>
                  <li className="block py-3">
                    <Link to="" className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 w-6 h-6 mr-3 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                      </svg>
                      Quần dài
                    </Link>
                  </li>
                  <li className="block py-3">
                    <Link to="" className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 w-6 h-6 mr-3 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                      </svg>
                      Quần dài
                    </Link>
                  </li>
                  <li className="block py-3">
                    <Link to="" className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 w-6 h-6 mr-3 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                      </svg>
                      Quần dài
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mb-[20px]">
                <p className="font-bold text-xl flex items-center mb-[20px]">
                  Giá sản phẩm
                </p>
                <div className="text-base">
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Dưới 100.000</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Từ 100.000 - 200.000</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Từ 200.000 - 300.000</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Trên 500.000</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Trên 1000.000</label>
                  </div>
                </div>
              </div>
              <div className="mb-[20px]">
                <p className="font-bold text-xl flex items-center mb-[20px]">
                  Màu sắc
                </p>
                <div className="text-base">
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Hồng</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Ghi</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Đỏ</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Đen</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Cam</label>
                  </div>
                </div>
              </div>
              <div className="mb-[20px]">
                <p className="font-bold text-xl flex items-center mb-[20px]">
                  Kích thước
                </p>
                <div className="text-base">
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>S</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>M</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>L</label>
                  </div>
                  <div className="py-3">
                    <input type="radio" className="mr-4" />
                    <label>Free</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[80%] w-full">
              <div className="items-center justify-between text-base mb-[20px] lg:flex hidden">
                <p className="font-medium text-xl">Sort :</p>
                <div className="flex items-center">
                  <input name="check" type="radio" className="mr-2 check" />
                  <label>Tên A -&gt; Z</label>
                </div>
                <div className="flex items-center">
                  <input name="check" type="radio" className="mr-2 check" />
                  <label>Tên Z -&gt; A</label>
                </div>
                <div className="flex items-center">
                  <input name="check" type="radio" className="mr-2 check" />
                  <label>Giá từ thấp đến cao</label>
                </div>
                <div className="flex items-center">
                  <input name="check" type="radio" className="mr-2 check" />
                  <label>Giá từ cao đến thấp</label>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 grid-cols-2 w-full gap-8 border-b border-gray-200">
                {/* item 1 */}
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
                    <p className="text-sm text-black mb-1">
                      Analogue Resin Strap
                    </p>
                    <del className="mr-1">12.000.000đ</del>
                    <span className="text-[red]">776.000₫</span>
                  </div>
                </div>
                <div className="lg:mb-[25px] mb-[20px]">
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
                  <div className="lg:mb-[15px] mb-[10px] group group/image relative h-[250px] !w-full lg:h-[345px] lg:w-[290px] overflow-hidden">
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
            {/* gr_item */}
          </div>
        </section>
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
