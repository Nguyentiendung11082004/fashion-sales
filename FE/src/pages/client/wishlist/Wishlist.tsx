import { ProductNext } from "@/components/icons";
import CartDetail from "@/components/icons/detail/CartDetail";
import Eye from "@/components/icons/detail/Eye";
import HeartRed from "@/components/icons/detail/HeartRed";
import HeartWhite from "@/components/icons/detail/HeartWhite";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
// import HeartWhite from "@/components/icons/detail/HeartWhite";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["productsData"],
    queryFn: async () => {
      const response = await instance.get("/wishlist");
      return response.data;
    },
  });
  console.log(data);
  

  return (
    <>
      <div>
        <div className="hd-page-head">
          <div className="hd-header-banner bg-[url('./src/assets/images/shopping-cart-head.webp')] bg-no-repeat bg-cover bg-center">
            <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55 lg:py-[50px] mb-0 py-[30px]">
              <div className="z-[100] relative hd-container text-white">
                <h1 className="text-xl font-medium leading-5 mb-3">
                  Yêu thích
                </h1>
                <p className="text-sm">Sản phẩm yêu thích của bạn</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-20">
          <div className="grid grid-cols-2 gap-4 lg:ml-2.5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 xl:gap-8 md:grid-cols-3 md:gap-6 mx-auto">
            {data.map((item) => (
              <div className="product-item" key={item.wishlist_id}>
                <div className="lg:mb-[25px] mb-[20px]">
                  <div className="cursor-pointer lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0 object-cover "
                      src={ProductNext}
                    />
                    <img
                      className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100 object-cover"
                      src={ProductNext}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-10"></div>
                    <div>
                      <Link to="" className="absolute left-5 top-5">
                        <HeartRed />
                      </Link>
                      <button
                        type="submit"
                        className="absolute left-[18px] top-12 bg-white hover:bg-black hover:text-white w-[28px] h-[28px] rounded-full transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center p-0 m-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
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
                    <div className="flex justify-center">
                      <div
                        className="absolute bottom-2 text-center text-white
        -translate-y-7 transform 
          transition-all duration-500 ease-in-out 
          group-hover:translate-y-0
          opacity-0
          group-hover:opacity-100
        "
                      >
                        <ul className="flex">
                          {/* {product.unique_attributes.size && (
                              <li>
                                {Object.values(product.unique_attributes.size).join(
                                  ", "
                                )}
                              </li>
                            )} */}
                          S, M, L
                        </ul>
                      </div>
                    </div>
                    {/* {product.price_regular && (
                        <div>
                          {product.price_sale > 0 &&
                          product.price_sale < product.price_regular ? (
                            <> */}
                    <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                      -
                      {/* {Math.round(
                                  ((product.price_regular - product.price_sale) /
                                    product.price_regular) *
                                    100
                                )} */}
                      50%
                    </div>
                    {/* </>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      )} */}
                  </div>
                  <div>
                    <p className="text-base font-medium text-black mb-1 cursor-pointer hd-all-hover-bluelight">
                      {/* {product.name.charAt(0).toUpperCase() +
                          product.name.slice(1).toLowerCase()} */}
                      Sản phẩm 1
                    </p>
                    {/* {product.price_regular && (
                        <div>
                          {product.price_sale > 0 &&
                          product.price_sale < product.price_regular ?  
                          (
                            <> */}
                    <del className="mr-1">
                      {/* {new Intl.NumberFormat("vi-VN").format(
                                  product.price_regular
                                )} */}
                      100.000₫{/* Dạng tiền tệ VN */}
                    </del>
                    <span className="text-[red]">
                      {/* {new Intl.NumberFormat("vi-VN").format(
                                  product.price_sale
                                )} */}
                      50.000₫
                    </span>
                    {/* </>
                          ) : (
                            <span className="">
                              {new Intl.NumberFormat("vi-VN").format(
                                product.price_regular
                              )}
                              ₫
                            </span>
                          )}
                        </div>
                      )} */}
                  </div>

                  <div className="t4s-product-colors flex">
                    {/* {product.unique_attributes.color &&
                        Object.values(product.unique_attributes.color)
                          .filter((color) => typeof color === "string")
                          .map((color, index) => (
                            <div key={index} className="mr-2 mt-1">
                              <span className="t4s-pr-color__item flex flex-col items-center cursor-pointer">
                                <span className="t4s-pr-color__value border border-gray-400 w-5 h-5 hover:border-black hover:border-2 rounded-full">
                                  <div
                                    className={`w-[17px] h-[17px] rounded-full mt-[1px] ml-[0.5px] lg:mt-[0.5px] lg:hover:mt-[-0.5px] lg:hover:ml-[-0.25px] 
                                      ${convertColorNameToClass(color)}`}
                                  ></div>
                                </span>
                              </span>
                            </div>
                          ))} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
