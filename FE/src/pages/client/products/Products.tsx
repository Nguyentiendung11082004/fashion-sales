import { Product, ProductNext } from "@/components/icons";
import Less from "@/components/icons/detail/Less";
import IconMenu from "@/components/icons/products/IconMenu";
import React from "react";
import { Link } from "react-router-dom";
import HeartWhite from "@/components/icons/detail/HeartWhite";
import Eye from "@/components/icons/detail/Eye";
import CartDetail from "@/components/icons/detail/CartDetail";

const Products = () => {
  return (
    <>
      <div>
        <section className="w-full">
          <div className="text-[#ffff] h-[214px] border bg-gray-300 lg:bg-[#80847e] flex items-center justify-center flex-col overlay relative w-[100%] bg-no-repeat bg-cover bg-center bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQa4p71Kd6nd8GhBT8sOCGRn7NvHmyMxJMg&s')]">
            <p className="text-xl font-weight">Products</p>
            <p className="text-sm flex justify-center items-center">
              <span className="hover:text-[#F2F2F2]">Home</span>
              <Less />
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
                      <IconMenu />
                      Quần dài
                    </Link>
                  </li>
                  <li className="block py-3">
                    <Link to="" className="flex">
                      <IconMenu />
                      Quần dài
                    </Link>
                  </li>
                  <li className="block py-3">
                    <Link to="" className="flex">
                      <IconMenu />
                      Quần dài
                    </Link>
                  </li>
                  <li className="block py-3">
                    <Link to="" className="flex">
                      <IconMenu />
                      Quần dài
                    </Link>
                  </li>
                  <li className="block py-3">
                    <Link to="" className="flex">
                      <IconMenu />
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
                      src={Product}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100"
                      src={ProductNext}
                    />
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartWhite/>
                      </Link>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]">
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Xem thêm
                          </p>
                        <Eye/>
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]">
                          <p className="text-sm block translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Thêm vào giỏ hàng
                          </p>
                         <CartDetail/>
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
