/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import { LogoClient } from "@/components/icons";
import BackgroundLogin from "@/components/icons/login/Background";
import LoginIcon1 from "@/components/icons/login/LoginIcon1";
import instance from "@/configs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const { login } = useAuth();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (user) => {
      const { data } = await instance.post("/login", user);
      return data;
    },
    onMutate: () => {
      setLoading(true);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onSuccess: (data) => {
      toast.success("Đăng nhập thành công");
      login(data);
      navigator("/");
    },
    onError: (error: any) => {
      setError(error.response.data);
      toast.error('Thông tin tài khoản hoặc mật khẩu không đúng!');
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onFinish = (data: any) => {
    setError("");
    mutate(data);
    // login(data)
  };

  return (
    <>
      <div>
        <div>
          <BackgroundLogin />
        </div>
        <Link to="/">
          <img
            src={LogoClient}
            className="fixed h-14 z-10 lg:ml-[140px] mt-[30px] mx-auto"
            alt="Logo"
          />
        </Link>
        <div className="absolute lg:right-[12%] top-[10%]">
          {/* {
            loading 
            ? <Loading /> : ''
          } */}
          <div className="w-full m-9 p-[50px] lg:w-[450px] shadow-2xl border">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">ĐĂNG NHẬP</h2>
            <p className="text-xl text-gray-600 text-center">Chào mừng trở lại</p>
            <Button 
             className="flex items-center justify-center w-full h-11 mt-4 bg-white rounded-lg shadow-md hover:bg-gray-100">
              <div className="px-1 py-3">
                <LoginIcon1 />
              </div>
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Đăng nhập với Google</h1>
            </Button>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4" />
              <Link to="" className="text-xs text-center text-gray-500 uppercase">hoặc với Email</Link>
              <span className="border-b w-1/5 lg:w-1/4" />
            </div>

            <Form layout="vertical" onFinish={onFinish} form={form}>
              <div className="mt-4">
                <Form.Item name='email' label="Email" className="block text-gray-700 text-sm font-bold mb-2">
                  <Input
                    className="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    placeholder="Nhập Email"
                  />
                </Form.Item>
                {error &&
                error.errors &&
                error.errors.email &&
                error.errors.email.length > 0 ? (
                  <div className="text-red-600">{error.errors.email[0]}</div>
                ) : null}
              </div>
              <div className="mt-4">
                <Form.Item name='password' label="Mật khẩu" className="block text-gray-700 text-sm font-bold mb-2">
                  <Input
                    type="password"
                    className="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    placeholder="Nhập mật khẩu"
                  />
                </Form.Item>
                {error &&
                error.errors &&
                error.errors.password &&
                error.errors.password.length > 0 ? (
                  <div className="text-red-600">{error.errors.password[0]}</div>
                ) : null}
              </div>
              <Link to={"/account/forgotpassword"} className="text-black">
                Quên mật khẩu ?
              </Link>
              <div className="mt-8">
                <Button
                  htmlType="submit"
                  className="bg-gray-700 text-white font-bold p-6 w-full rounded hover:bg-gray-600"
                  loading={loading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4" />
                <Link
                  to="/register"
                  className="text-xs text-gray-500 uppercase"
                >
                  Đăng ký
                </Link>
                <span className="border-b w-1/5 md:w-1/4" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
