import { LogoClient } from "@/components/icons";
import instance from "@/configs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState<any>('')
  const { mutate } = useMutation({
    mutationFn: async (user: any) => {
      const { data } = await instance.post(`/register`, user);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setError('')
    },
    onError: (error: any) => {
      setError(error.response.data)
      toast.error("Đăng ký thất bại")
    }
  })
  const onFinish = (data: any) => {
    mutate(data)
  }
  return (
    <>
      <section className="bg-white">
        <div className="xl:grid xl:min-h-screen xl:grid-cols-12">
          <aside className="relative hidden xl:block  h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6 bg-black bg-opacity-55">
            <div className="hd-page-head">
              <div className="hd-header-banner bg-[url('https://cdn.mos.cms.futurecdn.net/whowhatwear/posts/311736/gen-z-fashion-trends-2024-311736-1705592248484-main-768-80.jpg.webp')] bg-no-repeat bg-cover bg-center">
                <div className="hd-bg-banner overflow-hidden relative !text-center bg-black bg-opacity-55">
                  <div className="z-[100] relative hd-container">
                    <h1 className="text-white text-6xl font-medium py-[340px]">
                      MIX & MATCH
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <img
                src={LogoClient}
                className="h-10 mb-10"
                alt="Logo"
              />
              <p className="mt-6 text-2xl font-medium text-gray-900">
                Chào mừng bạn đến với Mix & Match
              </p>
              <h1 className="font-bold text-4xl text-center mt-10">
                Đăng ký tài khoản
              </h1>
              <Form className="mt-8 grid grid-cols-6 gap-6" layout="vertical" onFinish={onFinish}>
                <div className="col-span-6 sm:col-span-3">
                  <Form.Item name="name" label="Tên">
                    <Input placeholder="Nhập tên "
                      className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    ></Input>
                  </Form.Item>
                  {error && error.errors && error.errors.name && error.errors.name.length > 0 ? (
                    <div className="text-red-600">{error.errors.name[0]}</div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Form.Item name="phone_number" label="Số điện thoại">
                    <Input placeholder="Nhập số điện thoại"
                      className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    ></Input>
                  </Form.Item>
                  {error && error.errors && error.errors.phone_number && error.errors.phone_number.length > 0 ? (
                    <div className="text-red-600">{error.errors.phone_number[0]}</div>
                  ) : null}

                </div>
                <div className="col-span-6">
                  <Form.Item name="email" label="Email">
                    <Input placeholder="Nhập Email"
                      className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    ></Input>
                  </Form.Item>
                  {error && error.errors && error.errors.email && error.errors.email.length > 0 ? (
                    <div className="text-red-600">{error.errors.email[0]}</div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <Form.Item name="password" label="Mật khẩu">
                    <Input placeholder="Nhập mật khẩu"
                      className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    ></Input>
                  </Form.Item>
                  {error && error.errors && error.errors.password && error.errors.password.length > 0 ? (
                    <div className="text-red-600">{error.errors.password[0]}</div>
                  ) : null}
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <Form.Item name="address" label="Địa chỉ">
                    <Input placeholder="Nhập địa chỉ"
                      className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    ></Input>
                  </Form.Item>
                  {error && error.errors && error.errors.address && error.errors.address.length > 0 ? (
                    <div className="text-red-600">{error.errors.address[0]}</div>
                  ) : null}
                </div>
                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />
                    <span className="text-sm text-gray-700">
                      Tôi muốn nhận email về các sự kiện, cập nhật sản phẩm và
                      thông báo của công ty.
                    </span>
                  </label>
                </div>
                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    Bằng cách tạo một tài khoản, bạn đồng ý với chúng tôi
                    <Link to="#" className="text-gray-700 underline">
                      {" "}
                      các điều khoản và điều kiện
                    </Link>
                    and
                    <Link to="#" className="text-gray-700 underline">
                      Chính sách bảo mật
                    </Link>
                    .
                  </p>
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <Button htmlType="submit" className=" shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-6 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Tạo tài khoản
                  </Button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Bạn đã có tài khoản
                    <Link to="/login" className="text-gray-700 underline">
                      Đăng nhập
                    </Link>
                    .
                  </p>
                </div>
              </Form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Register;
