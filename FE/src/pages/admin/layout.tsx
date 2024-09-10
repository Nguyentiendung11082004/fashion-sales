import React, { useState } from "react";
import {
  AreaChartOutlined,
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faExpand,
  faMagnifyingGlass,
  faMoon,
  faShoppingBag,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { Logo } from "@/components/icons";

const { Sider } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        className="bg-[black]"
      >
        <div className="flex items-center justify-center h-[25px] bg-[black]">
          <div className="demo-logo-vertical" />
        </div>
        <img src={Logo} alt="" className="w-[80px] h-[80px] m-auto mb-4" />
        {/* <h1 className="text-white text-center font-bold mb-4 text-lg">
          Xin chào admin
        </h1> */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
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
              children: new Array(4).fill(null).map((index, j) => {
                const subKey = index * 4 + j + 10;
                return {
                  key: subKey,
                  label: `option${subKey}`,
                };
              }),
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
              key: "3",
              icon: <UploadOutlined />,
              label: (
                <NavLink className="text-white" to="/admin/category">
                  Danh mục
                </NavLink>
              ),
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: (
                <NavLink className="text-white" to="/admin/user">
                  Người dùng
                </NavLink>
              ),
            },
            {
              key: "5",
              icon: <CommentOutlined />,
              label: (
                <NavLink className="text-white" to="/admin/comment">
                  Bình luận
                </NavLink>
              ),
            },
            {
              key: "6",
              icon: <ShoppingCartOutlined />,
              label: (
                <NavLink className="text-white" to="/admin/order">
                  Đơn hàng
                </NavLink>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <div className="header flex justify-between items-center border-b border-gray-200 bg-white">
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
            <div className="search relative flex items-center align-center">
              <FontAwesomeIcon
                className="icon-search absolute left-2 text-gray-500"
                icon={faMagnifyingGlass}
              />
              <input
                type="text"
                placeholder="Search..."
                className=" bg-[#f3f3f9] pl-8 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="header__right flex items-center space-x-6">
            <div>
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
            </div>
            <div className="info flex items-center space-x-2">
              <div className="avatar w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYABwj/xAA9EAABAwMDAQYEAwYFBAMAAAABAAIDBBEhBRIxQQYTIlFhcTKBkaEHFEIjM1JywdEVgrHC4WOy8PEWJGL/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAJBEAAgIBBQABBQEAAAAAAAAAAAECEQMEEiExQSIFEzNRoTL/2gAMAwEAAhEDEQA/APHddi7nWKxn/Vcfrn+qIo3baeJ3ln7oztjT212V3HeMa77W/og6JtoC09CspP4l1Uj1mnd3kDH+bAf9FPEMKLsrR1mp6RTPpoHzWiAcWharSOydbLUM/OxOih5cQRc+i4pxkraR0qaKunOLIxkUjrbY3fIXWyp9ApoAGxxRi3Ui5P1RraFoFr8Lhc9XJ1DH/RPJExMcTwfEwgjzFkQR6WWw/IsPxZHkoJtHppnhx3tt0BsunDj1MvyRoPvRMw0KQBWOpaayk2OicS1xsQUA0YCucXF0y4yUlaOATrJwCWygoj2qNzcogBRvbykBU1Lf2hUJb0R1YzI9lFGzCABxFblPbGp9mbJ7YtuUAQthBPAUgjA6BTWuENUVMMWHSMB9XAK0hjymOeq2fWdPi+KriHs5BS9pdNbxMT/KCVoosnci8L0wuWck7W0LfgZM4+gCFf2wjv4Ka/q56e1huRqy5duWLk7YSfpp4x7uJUR7YVfRsQ/yn+6rYxb0ZXt9FaqpJbfFGRcehx/qVUaeS+Nw4IK0/bqHfQ08oFy2Sx9AVltPuHOB5K6Iv4nLPiR9EfgjK2TsaWD4oql7HfYj7EL0JeU/gHUbtO1elJ/dzxyAfzNt/tXqy0j0Qzly5cqEcuXLigCs11t6K/8AC4FUICvtWqIe7fSue0SuAc1pxexVGPay8/UP5nVh6FaEtglCdZc5qNsmOaprJjggASeO4F+ig2o2YeFZTtTrv+Gxfl6V4/NOGTbDB/dNK3wDdIs9R1Wh0xhNXMGv6Mblx+X91la/t08u20VK1gHD5HXP0CyVRUyTPL5ZHOcTclxuSg3v5XTHGkZObLit7SanV37yreB5MO0H6KrkqZJMySFzul8oYuTXONlqooncyd0ya6RQ3KVVSJtkodjF0hcbZKj3HgJASQPROgsk3YXXUd7LtyBWaDtYwSaNKR+hzT9CsRRm01j5FehaxF3+lVcXR0Z+2V51Tk99HfGVMegydnsf4Czlus6pATiWmY8D+VxB/wC4L2teAfgxOYe2sTcgTU0sYHnw7/avf/RawM2cuXLlYjly5IUAYXtiyT/F94vbYC30SadqIlcIqhw3DAf5+6uO00V5IZXAWF23WNqGGN2BYHqvLy8TZ6GJKUEavg2Sqp0/UXsh2y+K3B6otmoRk2fH81G0GgxIVCKmN/BTu8HQ5SoQLq9XHQUE1TL8LG49T0C8h1GqfVVD55XXfJ4it129q7U8NOLluXuHQnyXnUpJu4jnoFviXplJsHkKhJFlM9riBjBPKhcCH7bLp4Mht3dCmnIzyeiLodOqtQl7umjLja5ceG+5WkpdCoKHY6oLqyUZLThgP9UnNIuMJSMkyGV8bpGtuxuSeiZda7XpGT6bJG2IRgEGzBYeyyJPkMpxlaCUdrGn0SghIbjp80nX1VED93NkxzrGx+yad31Tw3fnywmAFNrla5joxUS3cLG7+iAjLi4EmxBWrp+yFOHA1dW9+eGANH9VndRp2UupVNOw+GN9m3ybJWukRJP09J/CplINY06ua58lUKp0Tmg2EbS2wNvW5Xv7V8sdjqt1JrWnTsdttUR7rG1wHDlfU49E4cMGKuXLlqScuXJCUAVuuxCWgff9B3LzyebvXEQ5Zf438fILSdr9SrRP+QNOI6OXmbdl4AuR88D6rJy1Gb2A9LLwfqGo2TqJ6Wjg3HkNo+9IDGuaST8JZj+/3VlLG2KQxO/ettuHSx8lRwTNc5ln7LnLuUdHWHvC1je+33AJHPquTDqpbqZ0ZMXqLFoFrYCeAW5ObcoBhrJruD2QsafC0tuT7ofUtTfHCyKIBlTLyW5DB1K9SU1FWzFK3SC6o0nw1Jj/AJXC5+irX6PpFTKHMpY93S1xdDROMYw0gnJc43cfcoulrjTytlcA/ab2PVeevqFyrw1eCkKdN00OZuo4iWGwwm6npOlyxbpadjPWMWKl1nUIXxmqjYGhhBc0eRxb1zb6rKV2tmqdaxsMWB4XpQnvVowUf2GS1EEMXcUe2CEfpHX1KEc53xMd4T81XPlNxstY+bkveyNcNv3CdFql0N1SUmmmsRxZZV3Iz0ur3WJx3Qj+FxNyqJ18hdGJUjkzO5CdeceS44yE25BwEviPIWhidcnrZKXnoecrrX45S93frxhMDXNcsN2s/Y61IbZla19/lb+i2XfNHUrJ9tg11VTStGXRkE+x/wCVGP8A0Xk5iQ6VUiMskB/dvB+i+udNmFTQU87TcSRNdf3C+NdNd4ZW+i+puwWsx1PZLS3vcA8U7A73sqlNQfJklZrVyD/xCH+ILm1rHXN8DqpepgPZIJklbG0uc4ABU1VrJBPc7TbzQOrak+VxjjPhCq++xbF1jkyyl10bwxJdjO0lbJWsiLwBsuPr/wClnXWKu6hokY5juD9lWS0ku47Q19zyDZeVrNNPJLdE9DBJRVAbWhttuLdEXQskfMNrnNcRyDawT6ej35c5oPle6s6aKOBpIN7m5J6qNPo5KW6ZeTKqpDpz3cLWjNhZZ+d7pa53eAXYwNBAthX8rt3Cqqulf3hfG25tx5rp1sHLE1EyxNbuQcWyFG+/monyv3W2/JLFuvd+G9SV4MccrOxvgkrKh8unS0j4+97yMxxAYs64dcnn9P8Aosn3TqOsEZpnOa7l2f7LUSAh26zuCGjy8z87D6IeSORxG5xZ7dV9DpbUaZwz7KmaOJ0ZcwkHysg2E3uARbzV5NRd4wgC983PRBSUmw3e8E+YC60Z2ZquqDLM4PABZ59UBcn6qx1zaKiwbk8OVYTe9uq6I9HJLsWxvy1KCQeiaevsCkvbKogW+LpXPIOCm824SlpNvbKAL/vj1Cpe11n0cMgabtkt9Qrossq3tHDu0qQ/w2d91nB0y59GVoTabb5hezfh9qTv/jsDA/MZcw58ivFKY2mbm3Rejfh9UE09VCHfC8OHsR/wqzRtE43yeoiveQPErMah/wDUAbycFZBkjgB4r3V3AQ2lj8yuPZR0Lsnlf4cjKE35wkmk8ZQ7pMq0jVIJc8WVbU6jDvdDFOwuby1ruPRR6nUOEL2xOLZHNs0t6eq8vr9D1wVj5oGySPc6/esOT6lVFJ8Dk3E9SppmuyJPurIz3jasV2ZptVY3bqDHNDRh5wXH2WkdMW7Q4Zus6pju+Q78wGDc4+EcoCo1B00myM2aOq6rDpIHBpsSLBZCo1dtDIRIT3gNrWTavgODYMBncBI+xPXaDdEjTzcftQQPRYA9vYac7PycjtuCQ8DPstd2e12PWNPbVRsdGdxa5juQs3p0uaD7l8FsymjZfG/zuEPUU4GWDlT99ddu3ZVpUJsFjpi3n4UlRRRSsIc0382o6NJKW5VCMD2j7OlrDPTEu2ctdkrI7bOzixIsvXK1t4yPNeYa7GIa+QANGb4K2xvw58sfQAk45StuDkfRJySRzdI3dY9VqYkhOOvzXA8+6Zk8iycHWv65QM0jmYUOpUz6mgnija5z3Ms1rRclF9bcI1tW6CHZSfsb/FKP3jvn0Cxs1Zi6TsRq5a2euNLpsZsQ6smDSf8AKLu+y0Oh02maDPJK7U56+RzQCymptjMf/pxTnxsc8veSTyXE3JUbwwnAIVOe4zSSLun7RUr7d5FNGegcAbfRbGlqGzwRva4FpaLFeXAN3L0DTHj8jEGn4WgLKSNochsx8RKHc64TX1FzZML78KToiJ3TZJgXdAjGssA2JjQLZPVCMuHXKMhePNKhtnGEQjdI8Z5zwujlpnksDQRb3UVbG2rgewFzJCbh7Twh6OGKNhZHKJJG/EQ4H6+SKFYTUNDhduLZVJX9l6LUKh9U/c2Z1vEDxb0V2WnrwuBINuifXRJiJPw/glrO8nrXFnVrWWv87rU6dp9Pp8XdUsYYzGB1R4DeUxzh7WRul6NRj4OvZOYUPvuVK04QNhAemvkUT3tEbjfhCioBF7oZNi1drXuV5r2oYG6kS3Nxc2XoUsrHtsb3WN7X0v7Ns7GnBFz6LTH2ZZOjM7sp27JUQIPBCVbnMSXykPA9kjSE/H0TA0zngiyjBDXfqufVRFxvjKRznWtz6+SxouyZzgOqjL7i7fuori3qkfIAMIoLHukHULS6FqLX0rYg7xN6LHvnte2Cp9PrjBUXsNh5RJcBGVM3TXb3XuiIrearNPqGzjDgSB0RBkIdYLKjqTD9wT+8sMIMP6Jd6AA9V1B24+LbGOnAVXpVRedzon5Dr4xdWEemtmmk78l9jx0Ukumd2A+CzHDo0IKLaKcOjZnKfuQFNdjA1zrnqiWk+aQkEbh5JpuTzhMDlIxOirO2Zwuc2yk9lHPJHDE+V7rW6FAmwHUZxFCWB3idwEC2VxbYISrnM9UZDcdAPRSMkFhdIke+odG3c7xBV+qvjqdPkbJe5GFJUSZI6BZ/W61sdO9jXeI9FpBGc3wUBLWPcASRdPaQhmOvkqdpFl0Wcw/CcCM+6Z1t7pRhAFuXvJsw5Tt7gCDz1UL32Fhx5KMyG2bn3UUUSuffAKY6S7r+nChLycppcUUIWR1+ijDhm4xZc42TRnnDeqdCDtO1GekdGIXE3+Fv9VtNMkfUutKNsjWhz7ZGVmuyOkS6hWPrHs2wRYZfgu8vktZsNJM/ux4Rhw8/ZZTo6cMXVsnkPyUYf5pHTMf8BufJNLJX8Ru+WVmbUFQy2UrpdwsgLPizJ4Gjq5M/xGnD7OebHyCQw+46YTw6wQ7HMkbuheHjyGUri5rb4+qYqCgVK12MIBtRboVKaxkcfePNgAmINkmjii3yu2tVFqVWapwFrMbwLqKerdWOAcbAHwjyULwbdSVLYyA33FO3bW3K4G192LIOvqmRREkoSJbIqutZG2SRxtZY7Uqz81Ulw+HyTtW1M1Em2O4b9iq6PGAumMKRyTlYTHxZENvZDxm3XKnBNuVRBJe5+q7cmjn6rjzZAyyeUw4xkribppcLWHKCrOTSVw4yutlAqEOU+jpZa2qjpYG7nyu2geXqonOAwBlbT8ONLd3smpVDCAPBHj6lTJ0ioR3So2Ol6eyg0+Glib4WAdOT5p1TRte4ua3JRzA4kn1Ugj9Vz2eiopKjI11I+J9mtO30QzDWw/uy8LY1FG2QXNr/AOqBlDo/iZ9kFbSnbT1VaA6W4HmeFK/SY7WLgSFYRbpPIBSflRk7sdeqBUjOy6aYXEgkerTZTw1bYtrJzeO+fMK+/JsLPEG+lmqsraFpvs5SDaLU1NFDGHMmY++Q1uSs7X1L537tu0dGgp74u7md5phaPK5KZm4lVV1FVDE50W4u5s1t0g1aq2sL4XYFnE4Vp3Dn5IsEj6MSNLBlpVKv0ZuLK2TUnEX2+A/qKzGv1FUZfESIzwQtjLQthYfCHeira+gElNKyUeHbduOq0i0mZ5IujD7ieVLGfEPdRAWwpGLdnKghpyD6Ilvw5QrCESw4UAiQWuM3SPdY/JKLeXmmu2k5HRMYemlucJD4srr2ykM7dbBSE2FkvOU0j69Ex2dHG6aVkMQvJK4NaLXuTwvbdLpI6GihpY2gNjYGgewXmvYCkNRrZmLNzIWE38nH/wAK9UiFhccEnKxyHTgjxZMGAcmydsb5pAlJWR1oQ248lDM1kmDYqVxxnhQF4vhIYz8rCfhFvZN/LlvwyY9QkfM6L2/lStnbILBxymIQNcCB3oII4AUM8Qa02de/UcqQxzE2L2FvoNpHzTe5mvgxW9XOJQMoK+kHfjuwTdovhQR0jr/CtO2hJJfO9pJwAxtgPuoaiCOCNz39OEia5KCSldua0WufJTx0bGs3OPRGUFO6cd8eHHHsinU7ThAUZ+eCMndfHRV1eGiJzQBa2FqKijjItcKordPJ4OOitGc4nlOtUv5bUZGtG1jvG32KDafJa7tnQWpWVG3xRut7g/8ANllIxkey6k7VnnzW1kjb34wiGdVC3hSs+JKySYcJwAzgJjThq53KACmuv4RwlLs2KTcRwAuOfdIo4pCbfNdmyJ02mFbqFNTE2Ejxc+nJ+wKYJWeh9gdPdDorJS0B05L/AHHAWvZGGjxHPkh9KhEEDBtAAADWj9I6Kws03wuaTtnowjUURBrv0ltvdIQ/39k91h6Jjn24UmiI5Q7uzcqvEhEzR5FGzTDaWlV0MgdWbbevySGHOjc+TYf1ZTJaN4+CymbKGEOIztStlLzjI6oACBmjd+0ttCmZUN9AiiGOGW3UEtO3kBAHGW4wVT65UudtiBtvNj7Kyd4AVQalLeo3HhpQFFzBUQwQxtLiMW8IuUZFtcL9y5oPVxVVo7hsExG5xvb0CtxC6UXfLsaf4UBRFJFG4W2s+ir6qlA+AW9jdWn5Omvi5PmXFB1ctLTXuwvt/BlAmjK63QtqqOWB4+Jp+q8pLXxSvY4DcwkL2KvroZ32ijLW+q827V0jaXWC5jbNnaHj+q6MUvDg1EfSrbhvupWKIKRis5yYHCcDymDhOB5TA//Z"
                  alt="Avatar"
                />
              </div>
              <div className="name">
                <p className="text-sm font-medium">Kim Huệ</p>
                <span className="text-xs text-gray-500">Super admin</span>
              </div>
            </div>
          </div>
        </div>

        <Outlet />
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
