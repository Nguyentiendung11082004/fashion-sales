/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUser } from "@/common/context/User/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Flag, LogoClient } from "../icons";
import CartHome from "../icons/headerWebsite/CartHome";
import EmailHome from "../icons/headerWebsite/EmailHome";
import HeartHome from "../icons/headerWebsite/HeartHome";
import MapHome from "../icons/headerWebsite/MapHome";
import MenuHome from "../icons/headerWebsite/MenuHome";
import PhoneHome from "../icons/headerWebsite/PhoneHome";
import UserHome from "../icons/headerWebsite/UserHome";
import { useAuth } from "@/common/context/Auth/AuthContext";
import { Button } from "antd";
import { useWishlist } from "@/common/context/Wishlist/WishlistContext";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/common/Loading/Loading";
import { useEffect } from "react";

type Props = {};
const Header = (props: Props) => {
  const location = useLocation();
  const navigator = useNavigate();
  const { data: wishlist = [] } = useWishlist();
  const { user, urlImage } = useUser();
  let infoUser;
  if (user) {
    infoUser = user?.InforUser;
  }
  const { logout } = useAuth();
  const logoutUser = () => {
    logout();
    navigator("/login");
  };
  const wishlistCount = wishlist.length;
  const { token } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await instance.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  let qty = 0;
  const cartItems = data?.cart?.cartitems;
  if (Array.isArray(cartItems)) {
    cartItems.forEach((item: any) => {
      qty += item.quantity;
    });
  } else if (cartItems && typeof cartItems === "object") {
    qty += cartItems.quantity;
  }

  if (isLoading) return <Loading />;
  return (
    <>
      <div>
        <section className="bg-[#F6F6F8] text-xs">
          <div className="text-[#878787] flex items-center lg:justify-between lg:items-center flex-wrap sm:justify-center md:justify-center py-4 lg:mx-4 h-[auto] lg:h-[48px] md:h-[48px]">
            <div className="hidden lg:flex">
              <div className="flex mr-4">
                <PhoneHome />
                <span> +84879202919 </span>
              </div>
              <div className="flex">
                <EmailHome />
                <span className="text-[#878787]">
                  {" "}
                  mixmatchfashionbrand@gmail.com{" "}
                </span>
              </div>
            </div>
            <div className="mx-auto lg:mx-0">
              <span>
                Giảm giá mùa hè<span className="text-[red] px-[2px]">50%</span>!
                <span className="text-black pl-[2px]">Mua ngay</span>
              </span>
            </div>
            <div className="flex items-center mx-auto lg:mx-0">
              <div
                className="flex items-center cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8050738736556!2d105.73874749999999!3d21.040484100000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134550ab1db2433%3A0x9febb50e17509deb!2zMTMgUC4gVHLhu4tuaCBWxINuIELDtCwgWHXDom4gUGjGsMahbmcsIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2sus!4v1732869902634!5m2!1svi!2sus",
                    "_blank"
                  )
                }
              >
                <MapHome />
                <span>Vị trí</span>
              </div>

              <div className="mx-5">
                <select className="bg-[#F6F6F8]">
                  <option>Viet nam</option>
                  <option>English</option>
                </select>
              </div>
              <div className="flex items-center">
                <img src={Flag} className="w-4 h-3 object-cover" />
                <select className="bg-[#F6F6F8]">
                  <option>VND</option>
                  <option>USA</option>
                  <option>France</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="w-[100%] bg-[#fff]">
          <header className="lg:mx-10 bg-[#fff] h-[70px] grid grid-cols-12 gap-4 top-0 z-40">
            <div className="lg:col-span-2 col-span-4 flex justify-center items-center md:items-center md:justify-center lg:justify-start  order-2 lg:order-1">
              <Link to="/">
                <img src={LogoClient} className="h-[40px]" alt="Logo" />
              </Link>
            </div>
            <div className="col-span-4 flex items-center justify-start md:items-center md:justify-start lg:hidden  order-1  ">
              <MenuHome />
            </div>
            <div className="lg:col-span-8  lg:flex lg:items-center lg:justify-center md:hidden  hidden lg:order-2">
              <ul className="flex space-x-16 lg:space-x-12 ml-10 text-[14px]">
                <li>
                  <Link
                    to="/"
                    className={`font-medium text-hover uppercase ${location.pathname === "/" ? "text-[#00BADB]" : ""
                      }`}
                  >
                    Trang Chủ
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    to="/products"
                    className={`font-medium text-hover uppercase ${location.pathname === "/products" && !location.state?.sale
                      ? "text-[#00BADB]"
                      : ""
                      }`}
                  >
                    <p className="uppercase">Sản Phẩm</p>
                    <span className="absolute text-xs rounded-full px-2 py-[2px] text-white bg-primary top-[-16px] left-16">
                      Mới
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/products",
                    }}
                    state={{ sale: true }}
                    className={`font-medium text-hover uppercase ${location.pathname === "/products" && location.state?.sale
                      ? "text-[#00BADB]"
                      : ""
                      }`}
                  >
                    Sale
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className={`font-medium text-hover uppercase ${location.pathname === "/contact" ? "text-[#00BADB]" : ""
                      }`}
                  >
                    Liên Hệ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`font-medium text-hover uppercase ${location.pathname === "/about" ? "text-[#00BADB]" : ""
                      }`}
                  >
                    Giới thiệu
                  </Link>
                </li>
                {!token && (
                  <li>
                    <Link
                      to="/order_lookup"
                      className={`font-medium text-hover uppercase ${location.pathname === "/order_lookup"
                        ? "text-[#00BADB]"
                        : ""
                        }`}
                    >
                      Tra cứu đơn hàng
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="lg:col-span-2 col-span-4 flex items-center justify-end order-3 z">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <Link to="/account">
                    {user ? (
                      <img
                        src={urlImage || infoUser?.avatar}
                        className="h-10 w-10 rounded-full object-cover"
                        alt={infoUser?.name}
                      />
                    ) : (
                      <UserHome />
                    )}
                  </Link>
                  <div className="absolute left-[-50px] hidden group-hover:flex flex-col items-start mt-0 space-y-2 p-4 bg-white shadow-lg rounded-lg transition-all duration-300 z-20">
                    {user ? (
                      <>
                        <Button
                          onClick={() => logoutUser()}
                          className="py-2 w-[150px] text-center text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
                        >
                          Đăng Xuất
                        </Button>
                        {
                          user?.InforUser?.role_id === 4 ? <Link
                            to={`/admin`}
                          >
                            <Button
                              className="py-2 w-[150px] text-center text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                            >
                              Chuyển sang admin
                            </Button>
                          </Link> : ''
                        }

                      </>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Link
                          to="/register"
                          className="py-2 w-[150px] text-center text-white bg-orange-400 rounded-md hover:bg-orange-500 transition duration-200 ease-in-out"
                        >
                          Đăng Ký
                        </Link>
                        <Link
                          to="/login"
                          className="py-2 w-[150px] text-center text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-200 ease-in-out"
                        >
                          Đăng Nhập
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <Link to="/wishlist" className="relative">
                  <span className="absolute text-xs right-[-5px] top-[-5px] bg-[#000] text-white px-1 rounded-full">
                    {wishlistCount}
                  </span>
                  <HeartHome />
                </Link>
                <Link to="/cart" className="relative">
                  <span className="absolute text-xs right-[-5px] top-[-5px] bg-[#000] text-white px-1 rounded-full">
                    {qty}
                  </span>
                  <CartHome />
                </Link>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};
export default Header;
