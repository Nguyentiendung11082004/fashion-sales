import { convertColorNameToClass } from "@/common/colors/colorUtils";
import { useAuth } from "@/common/context/Auth/AuthContext";
import { ResponseWishlist } from "@/common/types/responseDataFilter";
import CartDetail from "@/components/icons/detail/CartDetail";
import Eye from "@/components/icons/detail/Eye";
import HeartRed from "@/components/icons/detail/HeartRed";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const queryClient = useQueryClient();

  const { token } = useAuth(); // Lấy token
  const { data, isFetching } = useQuery<ResponseWishlist[]>({
    queryKey: ["productsData", token],
    queryFn: async () => {
      const response = await instance.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header của request
        },
      });
      return response.data;
    },
  });
  // console.log(data);

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const productsPerPage = 12; // Mỗi trang có 12 sản phẩm
  const totalProducts = data?.length || 0; // Tổng số sản phẩm
  // Tính toán các sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);
  // Tính số trang
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  // Hàm để chuyển trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const mutationDel = useMutation({
    mutationFn: async ({
      wishlist_id,
      token,
    }: {
      wishlist_id: number;
      token: any;
    }) => {
      const response = await instance.delete(`/wishlist/${wishlist_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsData", token] });
    },
    onError: (error) => {
      console.error("Xóa thất bại:", error);
    },
  });

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
            {isFetching ? (
              // Hiển thị Skeleton khi đang load dữ liệu
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse flex flex-col space-y-4 bg-gray-200 w-[290px] rounded-lg p-4"
                  >
                    <div className="bg-gray-300 h-[250px] w-full lg:h-[330px] lg:w-[260px] sm:h-[345px]"></div>
                    <div className="bg-gray-300 h-6 w-3/4"></div>
                    <div className="bg-gray-300 h-6 w-1/2"></div>
                  </div>
                ))
            ) : data?.length ? (
              currentProducts?.map(
                ({ wishlist_id, product, getUniqueAttributes }) => (
                  <div className="product-item" key={wishlist_id}>
                    <div className="lg:mb-[25px] mb-[20px]">
                      <div className="cursor-pointer lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
                        <img
                          className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover/image:opacity-0 object-cover "
                          src={product.img_thumbnail}
                        />
                        <img
                          className="group-hover/image:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover/image:opacity-100 object-cover"
                          src={product.img_thumbnail}
                        />
                        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-10"></div>
                        <div>
                          <Link to="" className="absolute left-5 top-5">
                            <HeartRed />
                          </Link>
                          <button
                            type="submit"
                            className="absolute left-[18px] top-12 bg-white hover:bg-black hover:text-white w-[28px] h-[28px] rounded-full transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center p-0 m-0"
                            onClick={() => {
                              mutationDel.mutate({ wishlist_id, token });
                            }}
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
                              {getUniqueAttributes?.size && (
                                <li>
                                  {Object.values(getUniqueAttributes.size).join(
                                    ", "
                                  )}
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                        {product.price_regular && (
                          <div>
                            {product.price_sale > 0 &&
                            product.price_sale < product.price_regular ? (
                              <>
                                <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                                  -
                                  {Math.round(
                                    ((product.price_regular -
                                      product.price_sale) /
                                      product.price_regular) *
                                      100
                                  )}
                                  %
                                </div>
                              </>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-base font-medium text-black mb-1 cursor-pointer hd-all-hover-bluelight">
                          {product.name.charAt(0).toUpperCase() +
                            product.name.slice(1).toLowerCase()}
                        </p>
                        {product.price_regular && (
                          <div>
                            {product.price_sale > 0 &&
                            product.price_sale < product.price_regular ? (
                              <>
                                <del className="mr-1">
                                  {new Intl.NumberFormat("vi-VN").format(
                                    product.price_regular
                                  )}
                                  ₫{/* Dạng tiền tệ VN */}
                                </del>
                                <span className="text-[red]">
                                  {new Intl.NumberFormat("vi-VN").format(
                                    product.price_sale
                                  )}
                                  ₫
                                </span>
                              </>
                            ) : (
                              <span className="">
                                {new Intl.NumberFormat("vi-VN").format(
                                  product.price_regular
                                )}
                                ₫
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="t4s-product-colors flex">
                        {getUniqueAttributes?.color &&
                          Object.values(getUniqueAttributes.color)
                            .filter((color) => typeof color === "string")
                            .map((color, index) => (
                              <div key={index} className="mr-2 mt-1">
                                <span className="t4s-pr-color__item flex flex-col items-center cursor-pointer">
                                  <span className="t4s-pr-color__value border border-gray-400 w-5 h-5 hover:border-black hover:border-2 rounded-full p-[5px]">
                                    <div
                                      className={` w-[17px] h-[17px] rounded-full ml-[-4.25px] mt-[-4px] hover:mt-[-5px] hover:ml-[-5px] ${convertColorNameToClass(color)}`}
                                    ></div>
                                  </span>
                                </span>
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              // Hiển thị thông báo nếu không có sản phẩm trong danh sách yêu thích
              <div className="w-[1250px] py-20 text-center flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="#D3D3D3"
                  width="200"
                  height="200"
                >
                  <path d="M298.7 97.64L257 143.7L213.5 97.91C173.6 57.42 110 52.6 70.71 86.82L70.53 86.97C21.8 128.7 19.4 203.3 62.71 248.2L62.73 248.2L256.4 447.9C256.5 447.9 256.6 447.8 256.7 447.7L269.1 434.8C273.4 445.3 278.7 455.3 284.9 464.6L279.4 470.3C266.4 483.2 245.5 483.2 233.5 470.3L39.71 270.5C-16.22 212.5-13.23 116.6 49.7 62.68C102.8 16.41 184.1 24.47 234.3 73.46C235 74.19 235.7 74.92 236.5 75.67L256.4 96.64L275.4 75.67C276.3 74.76 277.2 73.87 278.1 72.99C328.3 24.42 408.3 16.56 463.2 62.68C506.1 100.1 520.7 157.6 507 208.7C497.4 204.2 487.3 200.5 476.8 197.8C486.3 158.8 474.8 115.3 442.4 87C400.9 52.33 338.2 57.7 298.7 97.64V97.64zM454.6 368L491.3 404.7C497.6 410.9 497.6 421.1 491.3 427.3C485.1 433.6 474.9 433.6 468.7 427.3L432 390.6L395.3 427.3C389.1 433.6 378.9 433.6 372.7 427.3C366.4 421.1 366.4 410.9 372.7 404.7L409.4 368L372.7 331.3C366.4 325.1 366.4 314.9 372.7 308.7C378.9 302.4 389.1 302.4 395.3 308.7L432 345.4L468.7 308.7C474.9 302.4 485.1 302.4 491.3 308.7C497.6 314.9 497.6 325.1 491.3 331.3L454.6 368zM576 368C576 447.5 511.5 512 432 512C352.5 512 288 447.5 288 368C288 288.5 352.5 224 432 224C511.5 224 576 288.5 576 368zM432 256C370.1 256 320 306.1 320 368C320 429.9 370.1 480 432 480C493.9 480 544 429.9 544 368C544 306.1 493.9 256 432 256z"></path>
                </svg>
                <h4 className="text-3xl font-medium mt-8">
                  Danh sách yêu thích đang trống.
                </h4>
                <div className="text-gray-500 mt-7">
                  Bạn chưa có sản phẩm nào trong danh sách yêu thích.
                  <br /> Bạn sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang
                  "Cửa hàng" của chúng tôi.
                </div>
              </div>
            )}
          </div>
          {/* phân trang  */}
          {totalProducts > productsPerPage && (
            <div className="pagination flex justify-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-100 rounded"
              >
                Quay lại
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 mx-1 ${
                      currentPage === pageNumber
                        ? "text-black"
                        : "text-gray-300"
                    } rounded`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-gray-100 rounded"
              >
                Chuyển tiếp
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
