import { LogoClient } from "@/components/icons";
import BackgroundLogin from "@/components/icons/login/Background";
import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>('');


    const resetPassword = useMutation<any, Error, any>({
        mutationFn: async (value) => {
            const data = await instance.post(`/password/reset`, value);
            return data;
        },
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            toast.success("Đổi mật khẩu thành công")
        },
        onError: (error: any) => {
            toast.error("Thất bại")
            setLoading(false);
            toast.error(error?.response?.data)
            console.log("error.errors.email", error?.response?.data?.errors?.password[0]);
        },
        onSettled: () => {
            setLoading(false);
        }
    })
    const onSubmit = (value: any) => {
        setError('');
        const url = window.location.href;
        const parsedUrl = new URL(url);
        const token = parsedUrl.searchParams.get('token');
        let x = {
            ...value,
            token
        }
        resetPassword.mutate(x);
    }
    return (
        <>
            <div>
                <div>
                    <BackgroundLogin />
                </div>
                <img
                    src={LogoClient}
                    className="fixed h-10 z-10 lg:ml-[140px] mt-[30px] mx-auto"
                    alt="Logo"
                />
                <section
                    className="bg-[url('../src/assets/images/loginpage.svg')] 
             hidden lg:block  bg-no-repeat bg-cover bg-center text-white  lg:min-h-[620px] md:min-h-[420px]   lg:items-center lg:py-0 mt-16"
                ></section>
                <div className="absolute lg:right-[12%] lg:top-[20%] top-[10%]  ">
                    <Form onFinish={onSubmit} layout="vertical">
                        <div className="w-full m-9 p-[50px] lg:w-[450px] shadow-2xl border">
                            <h2 className="text-2xl font-semibold text-gray-700 text-center">
                                Đặt lại mật khẩu
                            </h2>
                            <div className="mt-4">
                                <Form.Item name='email' label="Email của bạn" className="block text-gray-700 text-sm font-bold mb-2">
                                    <Input
                                        type="email"
                                        className="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                        placeholder="Nhập Email "
                                    />
                                </Form.Item>

                            </div>
                            <div className="mt-4">
                                <Form.Item name='password' label="Mật khẩu của bạn" className="block text-gray-700 text-sm font-bold mb-2">
                                    <Input
                                        type="password"
                                        className="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                        placeholder="Nhập mật khẩu "
                                    />
                                </Form.Item>
                            </div>
                            <div className="mt-4">
                                <Form.Item name='password_confirmation' label="Nhập lại mật khẩu" className="block text-gray-700 text-sm font-bold mb-2">
                                    <Input
                                        type="password"
                                        className="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                        placeholder="Nhập lại mật khẩu "
                                    />
                                    {error && error.errors && error?.response?.data?.errors?.password[0] && error?.response?.data?.errors?.password[0].length > 0 ? (
                                        <div className="text-red-600">{error?.response?.data?.errors?.password[0]}</div>
                                    ) : null}
                                </Form.Item>
                            </div>
                            <div className="mt-8">
                                <Button htmlType="submit" className="bg-gray-700 text-white font-bold p-6 w-full rounded hover:bg-gray-600" loading={loading}>
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

export default ResetPassword;
