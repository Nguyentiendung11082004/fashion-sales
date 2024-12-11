import React, { memo, useState } from "react";
import {
  AreaChartOutlined,
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  TagsOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faExpand,
  faMagnifyingGlass,
  faMoon,
  faShoppingBag,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { LogoAdmin, LogoM } from "@/components/icons";
import { Content } from "antd/es/layout/layout";
import { useUser } from "@/common/context/User/UserContext";

const { Sider } = Layout;

const SidebarMenu = memo(({ selectedKey }: { selectedKey: string }) => (
  <Menu
    theme="dark"
    mode="inline"
    selectedKeys={[selectedKey]}
    className="space-y-2 bg-[black]"
    items={[
      {
        key: "1",
        icon: <AreaChartOutlined />,
        label: (
          <NavLink to="/admin" className="text-white">
            Thống kê
          </NavLink>
        ),
      },
      {
        key: "2",
        icon: <VideoCameraOutlined />,
        label: (
          <NavLink className="text-white" to="/admin/products">
            Sản phẩm
          </NavLink>
        ),
      },
      {
        key: "12",
        icon: <ShoppingCartOutlined />,
        label: (
          <NavLink className="text-white" to="/admin/orders">
            Đơn hàng
          </NavLink>
        ),
      },
      {
        key: "16",
        icon: <ShoppingCartOutlined />,
        label: (
          <NavLink className="text-white" to="/admin/returnRequests">
            Hoàn hàng
          </NavLink>
        ),
      },
      {
        key: "17",
        icon: <ShoppingCartOutlined />,
        label: (
          <NavLink className="text-white" to="/admin/fastDelivery">
            Giao hàng nhanh
          </NavLink>
        ),
      },
      {
        key: "3",
        icon: <UploadOutlined />,
        label: (
          <NavLink className="text-white" to="/admin/categories">
            Danh mục
          </NavLink>
        ),
      },
      {
        key: "18",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
        ),
        label: (
          <NavLink className="text-white" to="/admin/banners">
            Banners
          </NavLink>
        ),
      },

      {
        key: "4",
        icon: <OrderedListOutlined />,
        label: (
          <NavLink className="text-white" to="/admin">
            Biến thể
          </NavLink>
        ),
        children: [
          {
            key: "5",
            label: (
              <NavLink className="text-white" to="/admin/attributes">
                Thuộc tính
              </NavLink>
            ),
          },
          {
            key: "6",
            label: (
              <NavLink className="text-white" to="/admin/attribute-values">
                Giá trị thuộc tính
              </NavLink>
            ),
          },
        ],
      },
      {
        key: "7",
        icon: <UserOutlined />,
        label: (
          <NavLink to={""} className="text-white">
            Tài khoản
          </NavLink>
        ),
        children: [
          {
            key: "8",
            label: (
              <NavLink to="/admin/clients" className="text-white">
                Khách hàng
              </NavLink>
            ),
          },
          {
            key: "9",
            label: (
              <NavLink to="/admin/employees" className="text-white">
                Nhân viên
              </NavLink>
            ),
          },
        ],
      },
      {
        key: "15",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
        ),
        label: (
          <NavLink to="/admin/posts" className="text-white">
            Bài viết
          </NavLink>
        ),
      },
      {
        key: "19",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        ),
        label: (
          <NavLink to="/admin/vouchers" className="text-white">
            Voucher
          </NavLink>
        ),
      },

      {
        key: "10",
        icon: <CommentOutlined />,
        label: (
          <NavLink className="text-white" to="/admin/comments">
            Bình luận
          </NavLink>
        ),
      },
      // {
      //   key: "11",
      //   icon: <CommentOutlined />,
      //   label: (
      //     <NavLink className="text-white" to="/admin/chatbox">
      //       Tin nhắn
      //     </NavLink>
      //   ),
      // },

      {
        key: "13",
        icon: <TagsOutlined />,
        label: (
          <NavLink className="text-white" to="/admin/tags">
            Tags
          </NavLink>
        ),
      },
      {
        key: "14",
        icon: <TagsOutlined />,
        label: (
          <NavLink className="text-white" to="/admin/brands">
            Brands
          </NavLink>
        ),
      },
    ]}
  />
));

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const { user } = useUser();
  const location = useLocation();
  // Map đường dẫn thành key
  const pathToKeyMap = (pathname: string): string => {
    // "/admin": "1",
    // "/admin/products": "2",
    // "/admin/products/create": "2",
    // "/admin/products/:id": "2",
    // "/admin/products/edit/:id": "2",
    // "/admin/orders": "12",
    // "/admin/categories": "3",
    // "/admin/banners": "20",
    // "/admin/attributes": "5",
    // "/admin/attribute-values": "6",
    // "/admin/clients": "8",
    // "/admin/employees": "9",
    // "/admin/posts": "15",
    // "/admin/vouchers": "30",
    // "/admin/comments": "10",
    // "/admin/chatbox": "11",
    // "/admin/tags": "13",
    // "/admin/brands": "14",
    if (pathname === "/admin") {
      return "1";
    }
    if (pathname === "/admin/products" || pathname.startsWith("/admin/products/")) {
      return "2";
    }
    if (pathname === "/admin/products/create") {
      return "2";
    }
    if (pathname.startsWith("/admin/products/edit/")) {
      return "2";
    }

    if (pathname === "/admin/orders" || pathname.startsWith("/admin/orders/")) {
      return "12";
    }
    if (pathname === "/admin/orders/create") {
      return "12";
    }
    if (pathname.startsWith("/admin/orders/edit/")) {
      return "12";
    }

    if (pathname === "/admin/categories" || pathname.startsWith("/admin/categories/")) {
      return "3";
    }
    if (pathname === "/admin/categories/create") {
      return "3";
    }
    if (pathname.startsWith("/admin/categories/edit/")) {
      return "3";
    }

    if (pathname === "/admin/banners" || pathname.startsWith("/admin/banners/")) {
      return "20";
    }
    if (pathname === "/admin/banners/create") {
      return "20";
    }
    if (pathname.startsWith("/admin/banners/edit/")) {
      return "20";
    }

    if (pathname === "/admin/attributes" || pathname.startsWith("/admin/attributes/")) {
      return "5";
    }
    if (pathname === "/admin/attributes/create") {
      return "5";
    }
    if (pathname.startsWith("/admin/attributes/edit/")) {
      return "5";
    }

    if (pathname === "/admin/attribute-values" || pathname.startsWith("/admin/attribute-values/")) {
      return "6";
    }
    if (pathname === "/admin/attribute-values/create") {
      return "6";
    }
    if (pathname.startsWith("/admin/attribute-values/edit/")) {
      return "6";
    }

    if (pathname === "/admin/clients" || pathname.startsWith("/admin/clients/")) {
      return "8";
    }
    if (pathname === "/admin/clients/create") {
      return "8";
    }
    if (pathname.startsWith("/admin/clients/edit/")) {
      return "8";
    }

    if (pathname === "/admin/employees" || pathname.startsWith("/admin/employees/")) {
      return "9";
    }
    if (pathname === "/admin/employees/create") {
      return "9";
    }
    if (pathname.startsWith("/admin/employees/edit/")) {
      return "9";
    }

    if (pathname === "/admin/posts" || pathname.startsWith("/admin/posts/")) {
      return "15";
    }
    if (pathname === "/admin/posts/create") {
      return "15";
    }
    if (pathname.startsWith("/admin/posts/edit/")) {
      return "15";
    }

    if (pathname === "/admin/vouchers" || pathname.startsWith("/admin/vouchers/")) {
      return "30";
    }
    if (pathname === "/admin/vouchers/create") {
      return "30";
    }
    if (pathname.startsWith("/admin/vouchers/edit/")) {
      return "30";
    }

    if (pathname === "/admin/comments" || pathname.startsWith("/admin/comments/")) {
      return "10";
    }
    if (pathname === "/admin/comments/create") {
      return "10";
    }
    if (pathname.startsWith("/admin/comments/edit/")) {
      return "10";
    }

    if (pathname === "/admin/tags" || pathname.startsWith("/admin/tags/")) {
      return "13";
    }
    if (pathname === "/admin/tags/create") {
      return "13";
    }
    if (pathname.startsWith("/admin/tags/edit/")) {
      return "13";
    }

    if (pathname === "/admin/brands" || pathname.startsWith("/admin/brands/")) {
      return "14";
    }
    if (pathname === "/admin/brands/create") {
      return "14";
    }
    if (pathname.startsWith("/admin/brands/edit/")) {
      return "14";
    }

    if (pathname === "/admin/returnRequests" || pathname.startsWith("/admin/returnRequests/")) {
      return "16";
    }

    if (pathname === "/admin/return-item" || pathname.startsWith("/admin/return-item/")) {
      return "16";
    }

    if (pathname === "/admin/fastDelivery" || pathname.startsWith("/admin/fastDelivery/")) {
      return "17";
    }

    return "1"; // Mặc định nếu không khớp`
  };

  // Tính toán selectedKeys ngay lập tức
  const currentKey = pathToKeyMap(location.pathname);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        className="bg-[black] min-h-screen"
      >
        <div className="flex items-center justify-center h-[25px] bg-[black]">
          <div className="demo-logo-vertical" />
        </div>

        {collapsed ? (
          <div className="w-[50px] mt-3 mb-11 m-auto">
            <img src={LogoM} alt="" className="" />
          </div>
        ) : (
          <div className="w-[150px] -mt-8 -mb-3 m-auto">
            <img src={LogoAdmin} alt="" className="" />
          </div>
        )}
        <SidebarMenu selectedKey={currentKey} />
      </Sider>
      <Layout>
        <div className="header flex justify-between items-center border-b border-gray-200 bg-white h-[60px]">
          <div className="header__left flex items-center ">
            <div className="flex align-center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            {/* <div className="search relative flex items-center align-center">
              <FontAwesomeIcon
                className="icon-search absolute left-2 text-gray-500"
                icon={faMagnifyingGlass}
              />
              <input
                type="text"
                placeholder="Search..."
                className=" bg-[#f3f3f9] pl-8 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
          </div>
          <div className="header__right flex mr-6 items-center space-x-6">
            {/* <div>
              <img
                className="icon w-6 h-6"
                src="data:image/png;base64,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"
                alt="US Flag"
              />
            </div>
            <div>
              <FontAwesomeIcon className="icon text-gray-600" icon={faTable} />
            </div>
            <div className="icon-shopbag relative">
              <FontAwesomeIcon
                className="icon text-gray-600"
                icon={faShoppingBag}
              />
              <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                5
              </span>
            </div>
            <div>
              <FontAwesomeIcon className="icon text-gray-600" icon={faExpand} />
            </div>
            <div>
              <FontAwesomeIcon className="icon text-gray-600" icon={faMoon} />
            </div>
            <div className="icon-bell relative">
              <FontAwesomeIcon className="icon text-gray-600" icon={faBell} />
              <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                3
              </span>
            </div> */}
            <div className="info flex items-center space-x-2">
              <div className="avatar w-8 h-8 rounded-full overflow-hidden relative group">
                <img
                  src={`${user?.InforUser?.avatar}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                {/* Nút hiển thị khi hover vào ảnh */}

              </div>
              <div className="name">
                {/* <p className="text-sm font-medium">{user?.InforUser?.name}</p> */}
                <Link
                  to="/"
                >
                  <Button
                    className=" inset-0 bg-opacity-70 text-xs flex items-center justify-center transition-opacity duration-200"
                  >
                    Chuyển sang client
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
