import React, { useState } from 'react';
import {
  AreaChartOutlined,
  BellOutlined,
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { AvatarUserAdmin } from '@/assets';

const { Header, Sider, Content } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={250} >
        <div className="flex items-center justify-center h-[25px]">
          <div className="demo-logo-vertical" />
        </div>
        <h1 className='text-white text-center font-bold mb-4 text-lg'>
          Xin chào admin
        </h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          className="space-y-2"
          items={[
            {
              key: '1',
              icon: <AreaChartOutlined />,
              label: <NavLink to='/admin' className='text-white'>Thống kê</NavLink>,
              children: new Array(4).fill(null).map((index, j) => {
                const subKey = index * 4 + j + 10;
                return {
                  key: subKey,
                  label: `option${subKey}`,
                };
              }),
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: <NavLink to='/admin/products'>Sản phẩm</NavLink>,
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: <NavLink to='/admin/category'>Danh mục</NavLink>,
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: <NavLink to='/admin/user'>Người dùng</NavLink>,
            },
            {
              key: '5',
              icon: <CommentOutlined />,
              label: <NavLink to='/admin/comment'>Bình luận</NavLink>,
            },
            {
              key: '6',
              icon: <ShoppingCartOutlined />,
              label: <NavLink to='/admin/order'>Đơn hàng</NavLink>,
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
         <div className='flex justify-between'>
         <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
         <div className='flex items-center mx-5'>
         <BellOutlined className='w-10 h-10 text-2xl' />
          <img src={AvatarUserAdmin}  className="w-10 h-10 rounded-full object-cover"  alt="" />
         </div>
         </div>

        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            height: '1200px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
       <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;