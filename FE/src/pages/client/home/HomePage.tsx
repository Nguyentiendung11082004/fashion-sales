/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BannerIntro1, BannerIntro2 } from "@/components/icons";
import CartDetail from "@/components/icons/detail/CartDetail";
import Eye from "@/components/icons/detail/Eye";
import HeartRed from "@/components/icons/detail/HeartRed";
import HeartWhite from "@/components/icons/detail/HeartWhite";
import CartPopup from "@/components/ModalPopup/CartPopup";
import DetailPopup from "@/components/ModalPopup/DetailPopup";
import { Button } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../../common/context/Wishlist/WishlistContext";
import Banner from "./Banner/Banner";
import Post from "./Post";
import CategoryCarousel from "./SampleSlider/CategorySlider";
import Slideshow from "./SampleSlider/SampleSlider";

const HomePage = () => {
  const [trendProducts, setTrendProducts] = useState<any[]>([]);
  const [homeProducts, setHomeProducts] = useState<any[]>([]);
  const { handleAddToWishlist, isInWishlist } = useWishlist();
  const [slugProduct, setSlugProduct] = useState();
  const [idProduct, setIdProduct] = useState();
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [visProducts, setVisProducts] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  const loadMore = () => {
    if (isExpanded) {
      setVisibleProducts((prev) => prev - 8);
    } else {
      setVisibleProducts((prev) => prev + 8);
    }
    setIsExpanded(!isExpanded);
  };
  const loadMoreVis = () => {
    if (isExpand) {
      setVisProducts((prev) => prev - 8);
    } else {
      setVisProducts((prev) => prev + 8);
    }
    setIsExpand(!isExpand);
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/product-home")
      .then((response) => {
        setTrendProducts(response.data.trend_products);
        setHomeProducts(response.data.home_show_products);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy sản phẩm", error);
      });
  }, []);

  const modalRef = useRef<HTMLDialogElement>(null);

  const [productSeeMore, setProductSeeMore] = useState({});
  const [visiable, setVisible] = useState(false);
  const handleOpenSeeMore = (product: any) => {
    setVisible(true);
    setProductSeeMore(product);
  };
  const closeModal = () => {
    setVisible(false);
  };
  useEffect(() => {
    console.log("idProduct updated:", idProduct);
  }, [idProduct]);

  return (
    <>
      <div>
        <Banner />
        <CategoryCarousel />
        <section className="container mt-28">
          <div className="custom-heading ">
            <div className="flex items-center mx-auto">
              <hr className="flex-auto h-0.5 bg-gray-400 " />
              <div className="mx-4 text-2xl font-bold text-gray-900">
                XU HƯỚNG
              </div>
              <hr className="flex-auto h-0.5 bg-gray-400 w-2" />
            </div>
          </div>
          <div className="text-center mx-auto italic mt-2 custom-heading-sub mb-10">
            <i>Sản phẩm xu hướng hiện nay</i>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:ml-2.5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 xl:gap-8 md:grid-cols-3 md:gap-6 mx-auto">
            {trendProducts.slice(0, visibleProducts).map((product) => (
              <div key={product.id} className="product-item">
                <div className="lg:mb-[25px] mb-[20px]">
                  <div className="cursor-pointer lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
                    <Link
                      to={`/products/${product?.slug}.html`}
                      className="absolute inset-0"
                    >
                      <img
                        className="group-hover:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover:opacity-0 object-cover"
                        src={product.img_thumbnail}
                        alt="Product"
                      />
                      <img
                        className="group-hover:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100 object-cover"
                        src={product.img_thumbnail}
                        alt="Product"
                      />
                    </Link>
                    <div className="image-overlay"></div>
                    {/* <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-10"></div> */}
                    <div>
                      <button
                        className="absolute left-5 top-5 cursor-pointer"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        {isInWishlist(product.id) ? (
                          <HeartRed />
                        ) : (
                          <HeartWhite />
                        )}
                      </button>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button
                          className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]"
                          onClick={() => handleOpenSeeMore(product)}
                        >
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Mua ngay
                          </p>
                          <Eye />
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button
                          className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]"
                          onClick={() => {
                            modalRef.current?.showModal(),
                              setSlugProduct(product?.slug);
                            setIdProduct(product?.id);
                          }}
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
                          {product.unique_attributes &&
                            Object.entries(product.unique_attributes)
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
                                if (
                                  typeof value === "object" &&
                                  value !== null
                                ) {
                                  return Object.values(value).every(
                                    isSizeValue
                                  ); // Nếu là object, kiểm tra từng giá trị
                                }
                                return isSizeValue(value); // Nếu là giá trị đơn lẻ
                              })
                              .map(([key, value]) => (
                                <li key={key}>
                                  {Array.isArray(value)
                                    ? value.join(", ") // Nếu là mảng
                                    : typeof value === "object" &&
                                        value !== null
                                      ? Object.values(value).join(", ") // Nếu là object
                                      : String(value)}{" "}
                                  {/* Nếu là giá trị đơn lẻ*/}
                                </li>
                              ))}
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
                                ((product.price_regular - product.price_sale) /
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
                    <Link
                      to={`/products/${product?.slug}.html`}
                      className="text-base font-medium text-black mb-1 cursor-pointer hd-all-hover-bluelight"
                    >
                      {product.name.charAt(0).toUpperCase() +
                        product.name.slice(1).toLowerCase()}
                    </Link>
                    {(product?.price_regular || product?.variants?.length) && (
                      <div>
                        {(() => {
                          const variants = product?.variants || [];
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
                          const productPriceSale = product?.price_sale;
                          const productPriceRegular = product?.price_regular;

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
                    {product.unique_attributes &&
                      Object.entries(product.unique_attributes)
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
            <CartPopup
              slugProduct={slugProduct}
              idProduct={idProduct}
              setIdProduct={setIdProduct}
              ref={modalRef}
              setSlugProduct={setSlugProduct}
            />
          </div>
          <DetailPopup
            open={visiable}
            onClose={closeModal}
            trendProducts={trendProducts}
            productSeeMore={productSeeMore}
          />
        </section>
        <section className="container my-16 text-center">
          {trendProducts.length > 8 && (
            <Button className="btn-load" onClick={loadMore}>
              {isExpanded ? "Thu gọn" : "Tải Thêm"}
            </Button>
          )}
        </section>
        <section className="container">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 md:gap-4 lg:gap-8 ">
            <div className="w-[100%] relative overflow-hidden">
              <img
                className="w-full hover:scale-[1.2] transition ease-in-out duration-500"
                src={BannerIntro1}
              />
              <div>
                <p className="absolute left-[15%] sm:left-[27%] xl:left-[30%] lg:left-[22%] top-[40%] text-2xl text-white font-semibold tracking-wider">
                  BỘ SƯU TẬP ẢNH 2024
                </p>
                <span className="absolute left-[22%] sm:left-[32%] xl:left-[35%] lg:left-[28%] top-[55%] xl:top-[50%] lg:top-[55%] text-white font-semibold">
                  YÊU THÍCH BỘ SƯU TẬP NÀY
                </span>
              </div>
            </div>
            <div className="w-[100%] relative overflow-hidden mt-5 lg:mt-0 md:mt-0">
              <img
                className="w-[full] hover:scale-y-[1.2] transition ease-in-out duration-500"
                src={BannerIntro2}
              />
              <div>
                <p className="absolute xl:left-[32%] lg:left-[27%] lg:top-[34%] sm:left-[35%] sm:top-[35%] left-[22%] top-[35%]  text-xl text-white font-semibold tracking-wider">
                  KHUYẾN MẠI MÙA HÈ
                </p>
                <span className="absolute sm:left-[30%] xl:left-[15%] lg:left-[13%] xl:top-[44%] left-[15%] top-[48%] sm:top-[48%] xl:text-5xl lg:text-4xl text-3xl text-white font-semibold tracking-wider">
                  TIẾT KIỆM TỚI 70%
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="container mt-28">
          <div className="custom-heading ">
            <div className="flex items-center mx-auto">
              <hr className="flex-auto h-0.5 bg-gray-400 " />
              <div className="mx-4 text-2xl font-bold text-gray-900">
                NỔI BẬT
              </div>
              <hr className="flex-auto h-0.5 bg-gray-400 w-2" />
            </div>
          </div>
          <div className="text-center mx-auto italic mt-2 custom-heading-sub mb-10">
            <i>Sản phẩm nổi bật </i>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:ml-2.5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 xl:gap-8 md:grid-cols-3 md:gap-6 mx-auto">
            {homeProducts.slice(0, visProducts).map((product) => (
              <div key={product.id} className="product-item">
                <div className="lg:mb-[25px] mb-[20px]">
                  <div className="cursor-pointer lg:mb-[15px] mb-[10px] group group/image relative h-[250px] w-full lg:h-[345px] lg:w-[290px] sm:h-[345px] overflow-hidden">
                    <Link
                      to={`/products/${product?.slug}.html`}
                      className="absolute inset-0"
                    >
                      <img
                        className="group-hover:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-100 group-hover:opacity-0 object-cover"
                        src={product.img_thumbnail}
                        alt="Product"
                      />
                      <img
                        className="group-hover:scale-125 absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100 object-cover"
                        src={product.img_thumbnail}
                        alt="Product"
                      />
                    </Link>
                    <div className="image-overlay"></div>
                    {/* <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-10"></div> */}
                    <div>
                      <button
                        className="absolute left-5 top-5 cursor-pointer"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        {isInWishlist(product.id) ? (
                          <HeartRed />
                        ) : (
                          <HeartWhite />
                        )}
                      </button>
                    </div>
                    <div className="mb-[15px] absolute top-[50%] flex flex-col justify-between left-[50%] -translate-x-1/2 -translate-y-1/2 h-[40px] transform transition-all duration-500 ease-in-out group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <Link to="" className="group/btn relative m-auto">
                        <button
                          className="lg:h-[40px] lg:w-[136px] lg:rounded-full bg-[#fff] text-base text-[#000] lg:hover:bg-[#000]"
                          onClick={() => handleOpenSeeMore(product)}
                        >
                          <p className="text-sm lg:block hidden translate-y-2 transform transition-all duration-300 ease-in-out group-hover/btn:-translate-y-2 group-hover/btn:opacity-0">
                            Mua ngay
                          </p>
                          <Eye />
                        </button>
                      </Link>
                      <Link to="" className="group/btn relative">
                        <button
                          className="mt-2 h-[40px] w-[136px] rounded-full bg-[#fff] text-base text-[#000] hover:bg-[#000]"
                          onClick={() => {
                            modalRef.current?.showModal(),
                              setSlugProduct(product?.slug);
                            setIdProduct(product?.id);
                          }}
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
                          {product.unique_attributes &&
                            Object.entries(product.unique_attributes)
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
                                if (
                                  typeof value === "object" &&
                                  value !== null
                                ) {
                                  return Object.values(value).every(
                                    isSizeValue
                                  ); // Nếu là object, kiểm tra từng giá trị
                                }
                                return isSizeValue(value); // Nếu là giá trị đơn lẻ
                              })
                              .map(([key, value]) => (
                                <li key={key}>
                                  {Array.isArray(value)
                                    ? value.join(", ") // Nếu là mảng
                                    : typeof value === "object" &&
                                        value !== null
                                      ? Object.values(value).join(", ") // Nếu là object
                                      : String(value)}{" "}
                                  {/* Nếu là giá trị đơn lẻ*/}
                                </li>
                              ))}
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
                                ((product.price_regular - product.price_sale) /
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
                    <Link
                      to={`/products/${product?.slug}.html`}
                      className="text-base font-medium text-black mb-1 cursor-pointer hd-all-hover-bluelight"
                    >
                      {product.name.charAt(0).toUpperCase() +
                        product.name.slice(1).toLowerCase()}
                    </Link>
                    {(product?.price_regular || product?.variants?.length) && (
                      <div>
                        {(() => {
                          const variants = product?.variants || [];
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
                          const productPriceSale = product?.price_sale;
                          const productPriceRegular = product?.price_regular;

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
                    {product.unique_attributes &&
                      Object.entries(product.unique_attributes)
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
        </section>
        <section className="container my-16 text-center">
          {homeProducts.length > 8 && (
            <Button className="btn-load" onClick={loadMoreVis}>
              {isExpand ? "Thu gọn" : "Tải Thêm"}
            </Button>
          )}
        </section>

        <Post />

        <Slideshow />

        <div className="container max-w-6xl mx-auto py-10 px-4 sm:px-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex gap-6">
              <svg
                className="w-[90px] h-[45px] hover:origin-bottom-left hover:-rotate-12 hover:scale-105 transition-all ease-in-out duration-300"
                viewBox="0 0 29 32"
                width="32"
                height="32"
              >
                <path d="M 5.867 15.467 c -1.173 0 -2.133 0.96 -2.133 2.133 s 0.96 2.133 2.133 2.133 s 2.133 -0.96 2.133 -2.133 s -0.96 -2.133 -2.133 -2.133 Z M 5.867 18.667 c -0.587 0 -1.067 -0.48 -1.067 -1.067 s 0.48 -1.067 1.067 -1.067 c 0.587 0 1.067 0.48 1.067 1.067 s -0.48 1.067 -1.067 1.067 Z"></path>
                <path d="M 22.933 15.467 c -1.173 0 -2.133 0.96 -2.133 2.133 s 0.96 2.133 2.133 2.133 c 1.173 0 2.133 -0.96 2.133 -2.133 s -0.96 -2.133 -2.133 -2.133 Z M 22.933 18.667 c -0.587 0 -1.067 -0.48 -1.067 -1.067 s 0.48 -1.067 1.067 -1.067 c 0.587 0 1.067 0.48 1.067 1.067 s -0.48 1.067 -1.067 1.067 Z"></path>
                <path d="M 25.12 11.2 l -0.907 -4.267 c -0.373 -1.387 -1.44 -2.133 -2.88 -2.133 h -13.867 c -1.493 0 -2.347 0.747 -2.773 2.133 l -0.96 4.267 h -3.733 v 1.067 h 3.467 v 0.053 c -1.653 0.107 -2.933 1.493 -2.933 3.2 v 7.413 h 1.6 v 1.6 c 0 1.493 1.173 2.667 2.667 2.667 s 2.667 -1.173 2.667 -2.667 v -1.6 h 13.867 v 1.6 c 0 1.493 1.173 2.667 2.667 2.667 s 2.667 -1.173 2.667 -2.667 v -1.6 h 1.6 v -7.413 c 0 -1.653 -1.28 -3.04 -2.88 -3.2 v -0.053 h 3.413 v -1.067 h -3.68 Z M 5.707 7.253 c 0.32 -0.96 0.8 -1.387 1.76 -1.387 h 13.867 c 1.013 0 1.6 0.427 1.867 1.333 l 1.067 5.12 h -19.733 l 1.173 -5.067 Z M 6.4 24.533 c 0 0.907 -0.693 1.6 -1.6 1.6 s -1.6 -0.693 -1.6 -1.6 v -1.6 h 3.2 v 1.6 Z M 25.6 24.533 c 0 0.907 -0.693 1.6 -1.6 1.6 s -1.6 -0.693 -1.6 -1.6 v -1.6 h 3.2 v 1.6 Z M 27.2 15.52 v 6.347 h -25.6 v -6.347 c 0 -1.173 0.96 -2.133 2.133 -2.133 h 21.333 c 1.173 0 2.133 0.96 2.133 2.133 Z"></path>
              </svg>
              <div>
                <h3 className="text-lg font-semibold">MIỄN PHÍ VẬN CHUYỂN</h3>
                <p className="mt-1 text-gray-600">
                  Miễn phí vận chuyển cho tất cả các đơn hàng tại Hà Nội
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <svg
                className="w-[90px] h-[45px] hover:origin-bottom-left hover:-rotate-12 hover:scale-105 transition-all ease-in-out duration-300"
                viewBox="0 0 32 32"
                width="32"
                height="32"
              >
                <path d="M 16 3.205 c -7.066 0 -12.795 5.728 -12.795 12.795 s 5.729 12.794 12.795 12.795 c 7.067 -0.001 12.795 -5.729 12.795 -12.795 s -5.729 -12.795 -12.795 -12.795 Z M 15.999 21.864 c -3.233 0 -5.863 -2.631 -5.863 -5.864 s 2.631 -5.864 5.864 -5.864 h 0.001 c 3.233 0 5.863 2.631 5.863 5.864 s -2.631 5.864 -5.865 5.864 Z M 22.395 13.327 l 4.028 -2.693 c 0.832 1.609 1.305 3.433 1.305 5.366 c 0 1.909 -0.461 3.71 -1.273 5.305 l -4.035 -2.699 c 0.327 -0.805 0.511 -1.683 0.511 -2.606 c 0 -0.948 -0.191 -1.85 -0.535 -2.673 Z M 25.89 9.708 l -3.99 2.668 c -0.58 -0.942 -1.377 -1.733 -2.325 -2.305 l 2.669 -3.991 c 1.466 0.926 2.712 2.167 3.645 3.629 Z M 21.316 5.55 l -2.698 4.034 c -0.808 -0.33 -1.69 -0.515 -2.617 -0.515 h -0.001 c -0.927 0 -1.809 0.185 -2.617 0.515 l -2.698 -4.034 c 1.597 -0.816 3.402 -1.279 5.315 -1.279 s 3.719 0.463 5.316 1.279 Z M 9.756 6.078 l 2.67 3.992 c -0.95 0.574 -1.748 1.367 -2.329 2.311 l -3.991 -2.669 c 0.934 -1.464 2.182 -2.707 3.65 -3.634 Z M 5.574 10.639 l 4.029 2.694 c -0.343 0.822 -0.533 1.722 -0.533 2.667 c 0 0.92 0.183 1.797 0.509 2.599 l -4.036 2.7 c -0.81 -1.593 -1.27 -3.393 -1.27 -5.299 c 0 -1.931 0.472 -3.753 1.303 -5.361 Z M 6.069 22.229 l 3.992 -2.669 c 0.576 0.959 1.377 1.766 2.331 2.35 l -2.669 3.99 c -1.473 -0.937 -2.724 -2.193 -3.654 -3.671 Z M 10.65 26.432 l 2.695 -4.03 c 0.818 0.34 1.713 0.529 2.654 0.529 c 0.001 0 0.001 0 0.001 0 c 0.941 0 1.838 -0.189 2.656 -0.529 l 2.695 4.03 c -1.606 0.827 -3.424 1.297 -5.351 1.297 s -3.745 -0.47 -5.35 -1.297 Z M 22.278 25.899 l -2.669 -3.991 c 0.952 -0.583 1.751 -1.387 2.327 -2.344 l 3.992 2.67 c -0.93 1.475 -2.179 2.729 -3.65 3.665 Z"></path>
              </svg>
              <div>
                <h3 className="text-lg font-semibold">HỖ TRỢ 24/7</h3>
                <p className="mt-1 text-gray-600">
                  Liên hệ với chúng tôi 24 giờ một ngày, 7 ngày một tuần
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <svg
                className="w-[90px] h-[45px] hover:origin-bottom-left hover:-rotate-12 hover:scale-105 transition-all ease-in-out duration-300"
                viewBox="0 0 32 32"
                width="32"
                height="32"
              >
                <path d="M 27.729 18.664 c 0 6.467 -5.261 11.729 -11.729 11.729 s -11.729 -5.261 -11.729 -11.729 c 0 -6.452 5.237 -11.703 11.684 -11.728 v 5.333 l 10.129 -5.865 l -10.129 -5.864 v 5.33 c -7.047 0.024 -12.751 5.741 -12.751 12.794 c 0 7.065 5.727 12.795 12.795 12.795 c 7.066 0 12.795 -5.73 12.795 -12.795 h -1.066 Z M 17.022 2.39 l 6.935 4.015 l -6.935 4.016 v -8.03 Z"></path>
              </svg>
              <div>
                <h3 className="text-lg font-semibold">TRẢ HÀNG NHANH</h3>
                <p className="mt-1 text-gray-600">
                  Chỉ cần trả lại trong vòng 30 ngày để đổi hàng
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <svg
                className="w-[90px] h-[45px] hover:origin-bottom-left hover:-rotate-12 hover:scale-105 transition-all ease-in-out duration-300"
                viewBox="0 0 27 32"
                width="32"
                height="32"
              >
                <path d="M 13.333 2.667 c -7.36 0 -13.333 5.973 -13.333 13.333 s 5.973 13.333 13.333 13.333 c 7.36 0 13.333 -5.973 13.333 -13.333 s -5.973 -13.333 -13.333 -13.333 Z M 13.333 28.267 c -6.773 0 -12.267 -5.493 -12.267 -12.267 s 5.493 -12.267 12.267 -12.267 c 6.773 0 12.267 5.493 12.267 12.267 s -5.493 12.267 -12.267 12.267 Z"></path>
                <path d="M 17.6 12.8 c 0 -2.347 -1.92 -4.267 -4.267 -4.267 s -4.267 1.92 -4.267 4.267 c 0 1.6 0.907 3.04 2.24 3.733 l -2.24 6.4 h 8.533 l -2.187 -6.4 c 1.28 -0.747 2.187 -2.133 2.187 -3.733 Z M 16.107 21.867 h -5.547 l 1.707 -4.96 l 0.32 -0.853 l -0.8 -0.427 c -1.013 -0.587 -1.653 -1.653 -1.653 -2.827 c 0 -1.76 1.44 -3.2 3.2 -3.2 s 3.2 1.44 3.2 3.2 c 0 1.173 -0.64 2.24 -1.653 2.773 l -0.8 0.427 l 0.267 0.853 l 1.76 5.013 Z"></path>
              </svg>
              <div>
                <h3 className="text-lg font-semibold">100% AN TOÀN</h3>
                <p className="mt-1 text-gray-600">
                  Chúng tôi đảm bảo thanh toán an toàn
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <LiveChat /> */}
      </div>
    </>
  );
};

export default HomePage;
