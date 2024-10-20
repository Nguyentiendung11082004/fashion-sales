/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUser } from "@/common/context/User/UserContext";
import { Link, useNavigate } from "react-router-dom";
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
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
type Props = {};
const Header = (props: Props) => {
  const navigator = useNavigate();
  const { user } = useUser();
  const { logout } = useAuth();
  const logoutUser = () => {
    logout();
    navigator("/login")
  }
  const { token } = useAuth();
  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await instance.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
  
  let qty = 0;
  let cartItems = data?.cart?.cartitems;
  if (Array.isArray(cartItems)) {
    cartItems.forEach((item: any) => {
      qty += item.quantity;
    });
  } else if (cartItems && typeof cartItems === 'object') {
    qty += cartItems.quantity;
  }
  return (
    <>
      <div>
        <section className="bg-[#F6F6F8] text-xs">
          <div className="text-[#878787] flex items-center lg:justify-between lg:items-center flex-wrap sm:justify-center md:justify-center py-4 lg:mx-4 h-[auto] lg:h-[48px] md:h-[48px]">
            <div className="hidden lg:flex">
              <div className="flex mr-4">
                <PhoneHome />
                <span> +0123456789 </span>
              </div>
              <div className="flex">
                <EmailHome />
                <span className="text-[#878787]"> Kalle@domain.com </span>
              </div>
            </div>
            <div className="mx-auto lg:mx-0">
              <span>
                Giảm giá mùa hè<span className="text-[red] px-[2px]">50%</span>!
                <span className="text-black pl-[2px]">Mua ngay</span>
              </span>
            </div>
            <div className="flex items-center mx-auto lg:mx-0">
              <div className="flex items-center">
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
        <div className="w-[100%] bg-[#fff] sticky top-0 left-0 right-0  z-20 ">
          <header className="lg:mx-10 bg-[#fff] h-[70px] grid grid-cols-12 gap-4 ">
            <div className="lg:col-span-2 col-span-4 flex justify-center items-center md:items-center md:justify-center lg:justify-start  order-2 lg:order-1">
              <img src={LogoClient} alt="" className="h-[40px]" />
            </div>
            <div className="col-span-4 flex items-center justify-start md:items-center md:justify-start lg:hidden  order-1  ">
              <MenuHome />
            </div>
            <div className="lg:col-span-8  lg:flex lg:items-center lg:justify-center md:hidden  hidden lg:order-2">
              <ul className="flex space-x-16 lg:space-x-12 ml-10 text-[14px]">
                <li>
                  <Link to="" className=" font-normal text-hover">
                    Trang Chủ
                  </Link>
                </li>
                <li className="relative">
                  <Link to="/products" className=" font-normal text-hover">
                    Sản Phẩm
                    <span className="absolute text-xs rounded-full px-2 py-[2px] text-white bg-primary top-[-10px] left-16 ">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="" className=" font-normal text-hover">
                    Phụ Kiện
                  </Link>
                </li>
                <li>
                  <Link to="" className=" font-normal text-hover">
                    Giày
                  </Link>
                </li>
                <li>
                  <Link to="" className=" font-normal text-hover">
                    Bài Viết
                  </Link>
                </li>
                <li>
                  <Link to="" className=" font-normal text-hover">
                    Liên Hệ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 col-span-4 flex items-center justify-end order-3">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <Link to="">
                    {
                      user ? (<img src={`${user?.avatar}`} className="h-10 w-10 rounded-full object-cover" alt={`${user?.name}`} />) : <UserHome />
                    }
                  </Link>
                  <div className="absolute left-[-20px] hidden group-hover:flex mt-0 space-x-2">
                    {
                      user ? (
                        <Button onClick={() => logoutUser()} className="w-32 px-4 py-2 text-white bg-black rounded hover:bg-gray-800">
                          Đăng Xuất
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Link to="/signup" className="w-24 px-4 py-2 text-white bg-black rounded hover:bg-gray-800">
                            Đăng Ký
                          </Link>
                          <Link to="/login" className="w-32 px-4 py-2 text-white bg-black rounded hover:bg-gray-800">
                            Đăng Nhập
                          </Link>
                        </div>
                      )
                    }
                  </div>

                </div>
                <Link to="" className="relative">
                  <span className="absolute text-xs right-[-5px] top-[-5px] bg-[#000] text-white px-1 rounded-full">
                    0
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
