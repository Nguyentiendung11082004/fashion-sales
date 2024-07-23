import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <>
      <main
        id="main-content"
        className="min-h-fit !shadow-none !outline-0 block isolate *:box-border"
      >
        <div className="hd-page-head">
          <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center">
            <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
              <div className="z-[100] relative hd-container">
                <h1 className="text-white text-xl font-medium leading-5">
                  Giỏ hàng
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/*end hd-page-head*/}
        <section className="hd-page-body text-[14px] lg:mt-[60px] mt-[30px] block m-0 p-0 border-0 isolate *:box-border">
          <div className="hd-container block">
            <form className="hd-form-cart overflow-hidden relative">
              <div className="hd-pagecart-header text-sm uppercase font-semibold pt-5 pb-1.5 border-solid border-b-2">
                <div className="flex flex-wrap mt-0 !items-center">
                  <div className="lg:w-5/12 w-full flex-grow-0 flex-shrink-0 basis-auto hd-col-item">
                    Sản phẩm
                  </div>
                  <div className="w-3/12 flex-grow-0 flex-shrink-0 basis-auto hd-col-item !text-center hidden lg:block">
                    Giá
                  </div>
                  <div className="w-2/12 flex-grow-0 flex-shrink-0 basis-auto hd-col-item !text-center hidden lg:block">
                    Số lượng
                  </div>
                  <div className="w-2/12 flex-grow-0 flex-shrink-0 basis-auto hd-col-item lg:text-end text-right hidden lg:block">
                    Tổng
                  </div>
                </div>
              </div>
              {/*end hd-pagecart-header*/}
              <div className="hd-pagecart-items">
                <div className="hd-item relative overflow-hidden">
                  <div className="hd-item-row lg:py-[2rem] py-[1rem] !items-center flex flex-wrap border-solid border-b-2">
                    <div className="hd-infor-item lg:w-5/12 w-full hd-col-item">
                      <div className="hd-infor !items-center !flex">
                        <Link
                          to=""
                          className="min-w-[120px] max-w-[120px] block overflow-hidden relative w-full touch-manipulation pb-[10px] lg:pb-0"
                        >
                          <img src="./src/assets/images/product3.webp" />
                        </Link>
                        <div className="hd-infor-text ms-4">
                          <Link
                            to=""
                            className="text-sm font-semibold block mb-[5px] touch-manipulation hd-all-hover-bluelight"
                          >
                            Cluse La Boheme Rose Gold
                          </Link>
                          <div className="hd-price-item mb-[5px] !text-center w-3/12 hd-col-item lg:hidden block">
                            <div className="hs-prices">
                              <div className="hd-text-price flex">
                                <del className="text-[#696969]">1.551.000₫</del>
                                <ins className="ms-[6px] no-underline text-[#ec0101]">
                                  1.163.000₫
                                </ins>
                              </div>
                            </div>
                          </div>
                          {/*end hd-price-item*/}
                          <div className="hd-infor-text-meta text-[13px] text-[#878787]">
                            <p className="mb-[5px]">
                              Màu sắc: <strong>Xanh</strong>
                            </p>
                            <p className="mb-[5px]">
                              Size: <strong>M</strong>
                            </p>
                          </div>
                          <div className="hd-infor-text-tools mt-[10px]">
                            <Link to="" className="inline-flex me-[10px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                            </Link>
                            <Link to="" className="inline-flex me-[10px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="hd-qty-total block lg:hidden">
                        <div className="flex items-center justify-between border-2 border-slate-200 rounded-full py-[10px] px-[10px]">
                          <div className="hd-quantity-item relative hd-col-item">
                            <div className="hd-quantity relative block min-w-[100px] w-[100px] h-8 mx-auto hd-all-btn">
                              <button
                                type="button"
                                className="hd-btn-item left-0 text-left pl-[15px] pb-[10px] text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="size-3 hd-all-hover-bluelight"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
                              <span className="select-none leading-8 cursor-text font-semibold text-sm">
                                1
                              </span>
                              <button
                                type="button"
                                className="hd-btn-item pb-[10px] right-0 text-right pr-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="size-3 hd-all-hover-bluelight"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {/*end hd-quantity-item*/}
                          <div className="hd-total-item hd-col-item flex">
                            <p className="mr-3">Tổng:</p>
                            <span className="font-medium">1.163.000₫</span>
                          </div>
                          {/*end hd-total-item*/}
                        </div>
                      </div>
                    </div>
                    {/*end hd-infor-item*/}
                    <div className="hd-price-item !text-center w-3/12 hd-col-item lg:block hidden">
                      <div className="hs-prices">
                        <div className="hd-text-price">
                          <del className="text-[#696969]">1.551.000₫</del>
                          <ins className="ms-[6px] no-underline text-[#ec0101]">
                            1.163.000₫
                          </ins>
                        </div>
                      </div>
                    </div>
                    {/*end hd-price-item*/}
                    <div className="hd-quantity-item !text-center w-2/12 hd-col-item lg:block hidden">
                      <div className="hd-quantity relative block min-w-[120px] w-[120px] h-10 mx-auto hd-all-btn">
                        <button
                          type="button"
                          className="hd-btn-item left-0 text-left pl-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-3 hd-all-hover-bluelight"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                        <span className="select-none leading-9 cursor-text font-semibold text-base">
                          1
                        </span>
                        <button
                          type="button"
                          className="hd-btn-item right-0 text-right pr-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-3 hd-all-hover-bluelight"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/*end hd-quantity-item*/}
                    <div className="hd-total-item hd-col-item text-end w-2/12 lg:block hidden">
                      <span className="font-medium">1.163.000₫</span>
                    </div>
                    {/*end hd-total-item*/}
                  </div>
                  {/*end-item-1*/}
                  <div className="hd-item-row lg:py-[2rem] py-[1rem] !items-center flex flex-wrap border-solid border-b-2">
                    <div className="hd-infor-item lg:w-5/12 w-full hd-col-item">
                      <div className="hd-infor !items-center !flex">
                        <Link
                          to=""
                          className="min-w-[120px] max-w-[120px] block overflow-hidden relative w-full touch-manipulation pb-[10px] lg:pb-0"
                        >
                          <img src="./src/assets/images/product3.webp" />
                        </Link>
                        <div className="hd-infor-text ms-4">
                          <Link
                            to=""
                            className="text-sm font-semibold block mb-[5px] touch-manipulation hd-all-hover-bluelight"
                          >
                            Cluse La Boheme Rose Gold
                          </Link>
                          <div className="hd-price-item mb-[5px] !text-center w-3/12 hd-col-item lg:hidden block">
                            <div className="hs-prices">
                              <div className="hd-text-price flex">
                                <del className="text-[#696969]">1.551.000₫</del>
                                <ins className="ms-[6px] no-underline text-[#ec0101]">
                                  1.163.000₫
                                </ins>
                              </div>
                            </div>
                          </div>
                          {/*end hd-price-item*/}
                          <div className="hd-infor-text-meta text-[13px] text-[#878787]">
                            <p className="mb-[5px]">
                              Màu sắc: <strong>Xanh</strong>
                            </p>
                            <p className="mb-[5px]">
                              Size: <strong>M</strong>
                            </p>
                          </div>
                          <div className="hd-infor-text-tools mt-[10px]">
                            <Link to="" className="inline-flex me-[10px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                            </Link>
                            <Link to="" className="inline-flex me-[10px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="hd-qty-total block lg:hidden">
                        <div className="flex items-center justify-between border-2 border-slate-200 rounded-full py-[10px] px-[10px]">
                          <div className="hd-quantity-item relative hd-col-item">
                            <div className="hd-quantity relative block min-w-[100px] w-[100px] h-8 mx-auto hd-all-btn">
                              <button
                                type="button"
                                className="hd-btn-item left-0 text-left pl-[15px] pb-[10px] text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="size-3 hd-all-hover-bluelight"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
                              <span className="select-none leading-8 cursor-text font-semibold text-sm">
                                1
                              </span>
                              <button
                                type="button"
                                className="hd-btn-item pb-[10px] right-0 text-right pr-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="size-3 hd-all-hover-bluelight"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {/*end hd-quantity-item*/}
                          <div className="hd-total-item hd-col-item flex">
                            <p className="mr-3">Tổng:</p>
                            <span className="font-medium">1.163.000₫</span>
                          </div>
                          {/*end hd-total-item*/}
                        </div>
                      </div>
                    </div>
                    {/*end hd-infor-item*/}
                    <div className="hd-price-item !text-center w-3/12 hd-col-item lg:block hidden">
                      <div className="hs-prices">
                        <div className="hd-text-price">
                          <del className="text-[#696969]">1.551.000₫</del>
                          <ins className="ms-[6px] no-underline text-[#ec0101]">
                            1.163.000₫
                          </ins>
                        </div>
                      </div>
                    </div>
                    {/*end hd-price-item*/}
                    <div className="hd-quantity-item !text-center w-2/12 hd-col-item lg:block hidden">
                      <div className="hd-quantity relative block min-w-[120px] w-[120px] h-10 mx-auto hd-all-btn">
                        <button
                          type="button"
                          className="hd-btn-item left-0 text-left pl-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-3 hd-all-hover-bluelight"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                        <span className="select-none leading-9 cursor-text font-semibold text-base">
                          1
                        </span>
                        <button
                          type="button"
                          className="hd-btn-item right-0 text-right pr-[15px] p-0 top-0 text-sm cursor-pointer shadow-none transform-none touch-manipulation"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-3 hd-all-hover-bluelight"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/*end hd-quantity-item*/}
                    <div className="hd-total-item hd-col-item text-end w-2/12 lg:block hidden">
                      <span className="font-medium">1.163.000₫</span>
                    </div>
                    {/*end hd-total-item*/}
                  </div>
                  {/*end-item-2*/}
                </div>
              </div>
              {/*end hd-pagecart-items*/}
              <div className="hd-pagecart-footer lg:my-[60px]">
                <div className="hd-footer lg:flex lg:flex-wrap mt-[30px]">
                  <div className="hd-note-text text-start lg:w-[50%] !order-2 hd-col-item mt-8 lg:max-w-full">
                    <div className="hd-node-gift mb-6 lg:items-center lg:flex">
                      {/* <div class="hd-text-gift w-2/3"> */}
                      <div className="flex items-center lg:w-2/3 mb-[5px] lg:text-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6 lg:size-7 relative"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                          />
                        </svg>
                        <span className="my-3 mx-2">
                          Bạn có muốn một gói quà không?
                          <span className="hd-all-textgrey">
                            Chỉ từ 130.000₫
                          </span>
                        </span>
                        {/* </div> */}
                      </div>
                      {/* <div class="w-1/3"> */}
                      <div className="hd-btn-gift lg:w-1/3 lg:text-end my-[15px]">
                        <Link
                          to=""
                          className="hd-all-btn px-4 py-2 font-semibold min-h-10 hd-all-hoverblue-btn"
                        >
                          <span>Thêm</span>
                        </Link>
                      </div>
                      {/* </div> */}
                    </div>
                    <label className="mb-3 !block">
                      <span>Ghi chú đơn hàng</span>
                      <span className="hidden">Chỉnh sửa ghi chú đơn hàng</span>
                    </label>
                    <textarea
                      className="min-h-28 px-3 py-2 resize-none !w-full hd-cart-note"
                      placeholder="Chúng tôi có thể giúp bạn?"
                      defaultValue={""}
                    />
                    <label className="mt-5 mb-3 !block"> Mã giảm giá: </label>
                    <p className="mb-5 hd-all-textgrey">
                      Kiểm tra mã phiếu giảm giá sẽ hoạt động trên trang thanh
                      toán
                    </p>
                    <input
                      className="px-4 w-full hd-cart-note"
                      type="text"
                      placeholder="Mã giảm giá"
                    />
                  </div>
                  {/*end hd-note-text*/}
                  <div className="hd-sub-total text-end !order-4 lg:w-[50%] hd-col-item my-[30px] hd-all-textgrey">
                    <div className="border-b-0 shadow-none pt-[10px] pb-[4px] pl-[20px] text-[13px] leading-normal">
                      <div className="hd-cart-ship">
                        <div className="hd-ship-text1">
                          Gần xong rồi, mua thêm nhiều hơn
                          <span className="font-semibold text-[#00BADB]">
                            485.000₫
                          </span>
                          để nhận được
                          <span className="uppercase text-black font-semibold">
                            Miễn phí vận chuyển!
                          </span>
                        </div>
                        <div className="hd-ship-text2 hidden">
                          <span className="text-green-600">Chúc mừng!</span>
                          Bạn đã nhận được mã
                          <span className="uppercase text-black font-semibold">
                            Miễn phí vận chuyển.
                          </span>
                        </div>
                      </div>
                      <div className="hd-ship-icon relative max-w-[420px] inline-block w-full h-[9px] bg-zinc-100 rounded-[5px] mt-[20px] mb-[10px]">
                        <span
                          className="!block relative h-full"
                          style={{ width: "90.05802707930367%" }}
                        >
                          <svg
                            className="hd-svg absolute -top-[12px] right-0 w-[22px] p-0 rounded-xl"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            width={22}
                          >
                            <path
                              className="fa-primary"
                              d="M64 48C64 21.49 85.49 0 112 0H368C394.5 0 416 21.49 416 48V96H466.7C483.7 96 499.1 102.7 512 114.7L589.3 192C601.3 204 608 220.3 608 237.3V352C625.7 352 640 366.3 640 384C640 401.7 625.7 416 608 416H574.9C567.1 361.7 520.4 320 464 320C407.6 320 360.9 361.7 353.1 416H286.9C279.1 361.7 232.4 320 176 320C127.9 320 86.84 350.4 70.99 392.1C66.56 385.7 64 377.1 64 368V256H208C216.8 256 224 248.8 224 240C224 231.2 216.8 224 208 224H64V192H240C248.8 192 256 184.8 256 176C256 167.2 248.8 160 240 160H64V128H272C280.8 128 288 120.8 288 112C288 103.2 280.8 96 272 96H64L64 48zM544 256V237.3L466.7 160H416V256H544z"
                            />
                            <path
                              className="t4s-ship-secondary fill-white"
                              d="M272 128H16C7.164 128 0 120.8 0 112C0 103.2 7.164 96 16 96H272C280.8 96 288 103.2 288 112C288 120.8 280.8 128 272 128zM240 160C248.8 160 256 167.2 256 176C256 184.8 248.8 192 240 192H48C39.16 192 32 184.8 32 176C32 167.2 39.16 160 48 160H240zM208 224C216.8 224 224 231.2 224 240C224 248.8 216.8 256 208 256H16C7.164 256 0 248.8 0 240C0 231.2 7.164 224 16 224H208zM256 432C256 476.2 220.2 512 176 512C131.8 512 96 476.2 96 432C96 387.8 131.8 352 176 352C220.2 352 256 387.8 256 432zM544 432C544 476.2 508.2 512 464 512C419.8 512 384 476.2 384 432C384 387.8 419.8 352 464 352C508.2 352 544 387.8 544 432z"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="hd-cart-total uppercase mb-[10px] text-black lg:text-[20px] text-[18px]">
                      <div className="flex-wrap !items-center !justify-between !inline-flex gap-[30px]">
                        <div className="hd-col-item w-auto">
                          <strong className="font-semibold">Tổng:</strong>
                        </div>
                        <div className="hd-col-item w-auto">
                          <div className="text-right font-semibold">
                            1.552.000₫
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mb-[10px]">
                      Thuế và phí vận chuyển được tính khi thanh toán
                    </p>
                    <div className="relative inline-block mb-[20px]">
                      <input
                        type="checkbox"
                        className="size-3.5 absolute rounded-md shadow-sm top-1 -left-6"
                      />
                      <label>Tôi đồng ý với các điều khoản và điều kiện.</label>
                    </div>
                    <div className=" ">
                      <button
                        type="submit"
                        className="bg-[#00BADB] text-base h-[50px] w-auto px-[45px] font-semibold rounded-full text-white inline-flex items-center relative overflow-hidden hover:bg-[#23b6cd] transition-all ease-in-out duration-300"
                      >
                        Thanh Toán
                      </button>
                    </div>
                  </div>
                  {/*end hd-sub-total*/}
                </div>
              </div>
              {/*end hd-pagecart-footer*/}
            </form>
            {/*end hd-form-cart*/}
          </div>
        </section>
        {/*end hd-page-body*/}
      </main>
    </>
  );
};

export default Cart;
