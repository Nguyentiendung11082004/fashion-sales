/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Iproduct } from "@/common/types/products";
import { useQuery } from "@tanstack/react-query";
import { productShow_client } from "@/services/api/client/productClient.api";
import { Link, useParams } from "react-router-dom";
import CartDetail from "@/components/icons/detail/CartDetail";
import Eye from "@/components/icons/detail/Eye";
import HeartWhite from "@/components/icons/detail/HeartWhite";
import { ProductNext } from "@/components/icons";
import { useState } from "react";
import Loading from "@/common/Loading/Loading";

const RelatedProducts = () => {
  const { slug } = useParams<{ slug: string }>();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      try {
        return await productShow_client(`${slug}`);
      } catch (error) {
        throw new Error("Không có sản phẩm nào phù hợp");
      }
    },
  });

  const { product, productRelated } = data || {};
  console.log("data sp liên quan: ", data);
  if (!productRelated || productRelated.length === 0) {
    return (
      <p className="container m-auto mb-[50px] mt-10">
        Không có sản phẩm nào liên quan.
      </p>
    );
  }

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.message}</p>;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productRelated.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productRelated.length / productsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="container m-auto mb-[50px] mt-10">
        <p className="lg:text-2xl sm:text-xl text-base mb-[30px] font-semibold m-auto text-center">
          Các sản phẩm liên quan
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((relatedProduct: any) => (
            <div key={relatedProduct.id} className="product-item">
              <div className="lg:mb-[25px] mb-[20px]">
                <div className="cursor-pointer lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
                  <Link
                    to={`/products/${relatedProduct?.slug}.html`}
                    className="absolute inset-0"
                  >
                    <img
                      className="group-hover:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover:opacity-0 object-cover"
                      src={relatedProduct.img_thumbnail}
                      alt="Product"
                    />
                    <img
                      className="group-hover:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100 object-cover"
                      src={relatedProduct.img_thumbnail}
                      alt="Product"
                    />
                  </Link>
                  <div className="image-overlay"></div>
                  {/* <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-10"></div> */}
                  <div>
                    {/* <button
                      className="absolute left-5 top-5 cursor-pointer"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      {isInWishlist(relatedProduct.id) ? <HeartRed /> : <HeartWhite />}
                    </button> */}
                  </div>
                  <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                    {/* <Link to="" className="group/btn relative m-auto">
                      <button
                        className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]"
                        // onClick={() => handleOpenSeeMore(product)}
                      >
                        <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                          Mua ngay
                        </p>
                        <Eye />
                      </button>
                    </Link> */}
                    <Link to="" className="group/btn relative">
                      <button
                        className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]"
                        // onClick={() => {
                        //   modalRef.current?.showModal(),
                        //     setSlugProduct(product?.slug);
                        //   setIdProduct(product?.id);
                        // }}
                      >
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
                        {relatedProduct.product_related_attributes &&
                          Object.entries(
                            relatedProduct.product_related_attributes
                          )
                            .filter(([key, value]) => {
                              // Hàm kiểm tra xem giá trị có phải là kích thước hay không
                              const isSizeValue = (v: any) => {
                                return (
                                  /^[SMLX]{1,3}$/.test(v) ||
                                  /^[0-9]+(\.\d+)?\s?(cm|inch|mm|kg)?$/.test(
                                    v
                                  ) ||
                                  /^[0-9]+$/.test(v)
                                );
                              };

                              if (Array.isArray(value)) {
                                return value.every(isSizeValue); // Nếu là mảng, kiểm tra từng phần tử
                              }
                              if (typeof value === "object" && value !== null) {
                                return Object.values(value).every(isSizeValue); // Nếu là object, kiểm tra từng giá trị
                              }
                              return isSizeValue(value); // Nếu là giá trị đơn lẻ
                            })
                            .map(([key, value]) => (
                              <li key={key}>
                                {Array.isArray(value)
                                  ? value.join(", ") // Nếu là mảng
                                  : typeof value === "object" && value !== null
                                    ? Object.values(value).join(", ") // Nếu là object
                                    : String(value)}{" "}
                                {/* Nếu là giá trị đơn lẻ*/}
                              </li>
                            ))}
                      </ul>
                    </div>
                  </div>

                  {relatedProduct.price_regular && (
                    <div>
                      {relatedProduct.price_sale > 0 &&
                      relatedProduct.price_sale < relatedProduct.price_regular ? (
                        <>
                          <div className="flex justify-center items-center text-white absolute right-2 top-2 lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] lg:text-sm text-[12px] rounded-full bg-red-400">
                            -
                            {Math.round(
                              ((relatedProduct.price_regular - relatedProduct.price_sale) /
                              relatedProduct.price_regular) *
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
                  <Link
                    to={`/products/${relatedProduct?.slug}.html`}
                    className="text-base font-medium text-black mb-1 cursor-pointer hd-all-hover-bluelight"
                  >
                    {relatedProduct.name.charAt(0).toUpperCase() +
                      relatedProduct.name.slice(1).toLowerCase()}
                  </Link>
                  {(relatedProduct?.price_regular || relatedProduct?.variants?.length) && (
                    <div>
                      {(() => {
                        const variants = relatedProduct?.variants || [];
                        // Tính toán giá bán và giá gốc từ các biến thể
                        const minPriceSale = Math.min(
                          ...variants
                            .map((variant: any) => variant.price_sale)
                            .filter((price: any) => price >= 0)
                        );
                        const minPriceRegular = Math.min(
                          ...variants
                            .map((variant: any) => variant.price_regular)
                            .filter((price: any) => price >= 0)
                        );
                        const maxPriceRegular = Math.max(
                          ...variants
                            .map((variant: any) => variant.price_regular)
                            .filter((price: any) => price > 0)
                        );
                        const productPriceSale = relatedProduct?.price_sale;
                        const productPriceRegular = relatedProduct?.price_regular;

                        const pricesSaleVar = variants.map(
                          (variant: any) => variant.price_sale
                        );
                        const pricesRegularVar = variants.map(
                          (variant: any) => variant.price_regular
                        );
                        const allSaleEqual = pricesSaleVar.every(
                          (price: any) => price === pricesSaleVar[0]
                        );
                        const allRegularEqual = pricesRegularVar.every(
                          (price: any) => price === pricesRegularVar[0]
                        );

                        if (minPriceSale > 0) {
                          // Nếu có giá sale
                          if (
                            (productPriceSale &&
                              productPriceSale < productPriceRegular) ||
                            productPriceSale === 0
                          ) {
                            return (
                              <>
                                <del className="mr-1">
                                  {new Intl.NumberFormat("vi-VN").format(
                                    productPriceRegular
                                  )}
                                  VNĐ
                                </del>
                                <span className="text-[red]">
                                  {new Intl.NumberFormat("vi-VN").format(
                                    productPriceSale
                                  )}
                                  VNĐ
                                </span>
                              </>
                            );
                          } else if (
                            productPriceSale &&
                            productPriceSale === productPriceRegular
                          ) {
                            return (
                              <span>
                                {new Intl.NumberFormat("vi-VN").format(
                                  productPriceRegular
                                )}
                                VNĐ
                              </span>
                            );
                          } else {
                            if (allSaleEqual && allRegularEqual) {
                              // Nếu tất cả giá sale và giá regular giống nhau
                              return (
                                <>
                                  <del className="mr-1">
                                    {new Intl.NumberFormat("vi-VN").format(
                                      pricesRegularVar[0]
                                    )}{" "}
                                    VNĐ
                                  </del>
                                  <span className="text-[red]">
                                    {new Intl.NumberFormat("vi-VN").format(
                                      pricesSaleVar[0]
                                    )}{" "}
                                    VNĐ
                                  </span>
                                </>
                              );
                            } else {
                              return (
                                <span>
                                  {new Intl.NumberFormat("vi-VN").format(
                                    minPriceSale
                                  )}
                                  VNĐ -{" "}
                                  {new Intl.NumberFormat("vi-VN").format(
                                    maxPriceRegular
                                  )}
                                  VNĐ
                                </span>
                              );
                            }
                          }
                        } else {
                          return (
                            <span>
                              {new Intl.NumberFormat("vi-VN").format(
                                minPriceRegular
                              )}
                              VNĐ -{" "}
                              {new Intl.NumberFormat("vi-VN").format(
                                maxPriceRegular
                              )}
                              VNĐ
                            </span>
                          );
                        }
                      })()}
                    </div>
                  )}
                </div>
                <div className="t4s-product-colors flex">
                  {relatedProduct.product_related_attributes &&
                    Object.entries(relatedProduct.product_related_attributes)
                      .filter(([key, value]) => {
                        // Hàm kiểm tra xem giá trị có phải là màu sắc không
                        const isColorValue = (v: any) => {
                          // Kiểm tra tên màu hợp lệ bằng cách tạo một phần tử DOM
                          const isValidColorName = (color: string) => {
                            const s = new Option().style;
                            s.color = color;
                            return s.color !== ""; // Nếu gán thành công và không rỗng thì là màu hợp lệ
                          };

                          // Kiểm tra mã hex
                          const isHexColor = (color: string) =>
                            /^#[0-9A-F]{3}$|^#[0-9A-F]{6}$/i.test(color);

                          // Kiểm tra mã RGB/RGBA
                          const isRgbColor = (color: string) =>
                            /^rgba?\(\s?(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})(,\s?([01](\.\d+)?))?\)$/.test(
                              color
                            );

                          // Kiểm tra mã HSL
                          const isHslColor = (color: string) =>
                            /^hsla?\(\s?(\d{1,3}),\s?(\d{1,3})%,\s?(\d{1,3})%(,\s?([01](\.\d+)?))?\)$/.test(
                              color
                            );

                          return (
                            isValidColorName(v) ||
                            isHexColor(v) ||
                            isRgbColor(v) ||
                            isHslColor(v)
                          );
                        };

                        return Array.isArray(value)
                          ? value.every(isColorValue)
                          : typeof value === "object" && value !== null
                            ? Object.values(value).every(isColorValue)
                            : isColorValue(value);
                      })

                      .map(([key, value]) => {
                        // console.log(value);
                        const colors = Array.isArray(value)
                          ? value
                          : typeof value === "object" && value !== null
                            ? Object.values(value)
                            : [value];

                        return (
                          <div key={key} className="mt-1 flex">
                            {colors.map((color, index) => (
                              <span
                                key={index}
                                className="t4s-pr-color__item flex flex-col items-center cursor-pointer mr-1"
                              >
                                <span
                                  style={{
                                    backgroundColor: color.toLowerCase(),
                                  }}
                                  className="t4s-pr-color__value border border-gray-400 w-5 h-5 hover:border-black hover:border-2 rounded-full p-[5px]"
                                ></span>
                              </span>
                            ))}
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* phân trang */}
      <div className="container text-center mt-[20px] text-gray-500 lg:text-sm text-xs">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`hover:text-[red] px-4 ${currentPage === 1 ? "text-gray-300" : ""}`}
        >
          Pre
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-4 py-2 border border-gray-400 
        ${currentPage === index + 1 ? "bg-gray-200 font-bold" : ""}
        hover:bg-gray-100 hover:text-red-500 transition-all`}
            style={{ width: "40px", height: "40px", borderRadius: "4px" }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`hover:text-[red] px-4 ${currentPage === totalPages ? "text-gray-300" : ""}`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default RelatedProducts;
