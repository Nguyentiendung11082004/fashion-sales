import { LogoClient } from "@/components/icons";
import BackgroundLogin from "@/components/icons/login/Background";
import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const emailMutation = useMutation({
    mutationFn: async (email) => {
      const data = await instance.post(`/password/forgot`, email);
      return data;
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data: any) => {
      console.log("data", data)
      toast.success(data?.data?.message)
    },
    onError: () => {
      toast.error("Thất bại")
    },
    onSettled: () => {
      setLoading(false);
    }
  })
  const onSubmit = (value: any) => {
    emailMutation.mutate(value);
  }
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
        <section
          className="bg-[url('../src/assets/images/loginpage.svg')] 
             hidden lg:block  bg-no-repeat bg-cover bg-center text-white  lg:min-h-[620px] md:min-h-[420px]   lg:items-center lg:py-0 mt-16"
        ></section>
        <div className="absolute lg:right-[12%] lg:top-[20%] top-[10%]  ">
          <Form onFinish={onSubmit} layout="vertical">
            <div className="w-full m-9 p-[50px] lg:w-[450px] shadow-2xl border">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Quên mật khẩu
              </h2>
              <div className="mt-4">
                <Form.Item name='email' label="Email" className="block text-gray-700 text-sm font-bold mb-2">
                  <Input
                    type="email"
                    className="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    placeholder="Nhập Email của bạn"
                  />
                </Form.Item>

              </div>
              <div className="mt-8">
                <Button loading={loading} htmlType="submit" className="bg-gray-700 text-white font-bold p-6 w-full rounded hover:bg-gray-600">
                  Gửi
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4" />
                <Link to="/login" className="text-xs text-gray-500 uppercase">
                  {" "}
                  Đăng nhập
                </Link>
                <span className="border-b w-1/5 md:w-1/4" />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
