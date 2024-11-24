import React from 'react'
import { Modal as AntModal, Button, Form, Input, Skeleton } from 'antd';
import { useAuth } from "@/common/context/Auth/AuthContext";
import { FormatMoney } from "@/common/utils/utils";
import CheckoutIcon22 from "@/components/icons/checkout/CheckoutIcon22";
import Completed from "@/components/icons/checkout/Completed";
import Map from "@/components/icons/checkout/Map";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from '@/common/Loading/Loading';
type Props = {
    open: boolean,
    onClose: () => void,
    title: string,
    idAddress: any,
    onAddressSave: (data: any) => void;
}
const AddressAction = ({ title, open, onClose, idAddress, onAddressSave }: Props) => {
    const { Option } = Select;
    const [idTinh, setIdTinh] = useState<number | null>(0)
    const [idQuanHuyen, setIdQuanHuyen] = useState<number | null>(0)
    const [idXa, setIdXa] = useState<number | null>(0)
    const { token } = useAuth();
    const [form] = Form.useForm();
    const queryClient = useQueryClient()
    
    const { data: tinhThanh } = useQuery({
        queryKey: ['tinhThanh'],
        queryFn: async () => {
            const res = await instance.get(`/getprovinces`);
            return res.data;
        }
    });
    const { data: addressDetail, isFetching } = useQuery({
        queryKey: ['address', idAddress],
        queryFn: async () => {
            return await instance.get(`/addresses/${idAddress}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        enabled: !!idAddress
    })
    const dataDiaChi = addressDetail?.data?.address;
    const mutation = useMutation({
        mutationFn: async (data) => {
            return await instance.post(`/addresses`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['address']
            });
            onClose();
            form.resetFields();
        }
    })
    const mutationUpdate = useMutation({
        mutationFn: async (data) => {
            return await instance.put(`/addresses/${idAddress}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['address']
            });
            onClose();
            form.resetFields();
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message)
        }
    })
    const handleChangeTinh = (e: any) => {
        setIdTinh(Number(e.value));
    };
    const handleChangeQuanHuyen = (e: any) => {
        setIdQuanHuyen(e.value);
    };
    const handleChangeXa = (e: any) => {
        setIdXa(Number(e.value));
    };
    const { data: quanHuyen } = useQuery<any>({
        queryKey: ['quanHuyen', idTinh],
        queryFn: async () => {
            const res = await instance.post(`/getdistricts`, { province_id: idTinh });
            return res?.data;
        },
        enabled: !!tinhThanh
    });
    const { data: phuongXa } = useQuery({
        queryKey: ['phuongXa', idQuanHuyen],
        queryFn: async () => {
            const res = await instance.post(`/getwards`, { district_id: idQuanHuyen });
            return res.data;
        },
        enabled: !!quanHuyen
    });
    const onFinish = (value: any) => {
        let payload = {
            ...value,
            city: {
                id: value.city.value,
                name: value.city.label
            },
            district: {
                id: value.district.value,
                name: value.district.label
            },
            ward: {
                id: value.ward.value,
                name: value.ward.label
            }
        }
        if (idAddress) {
            mutationUpdate.mutate(payload)
        } else {
            mutation.mutate(payload);
        }
        onAddressSave({
            idQuanHuyen,
            idXa,
        });
    }
    const handleClose = () => {
        form.resetFields()
        onClose();
    }
    useEffect(() => {
        if (!open) {
            form.resetFields();
        }
    }, [open]);
    return (
        <>
            {
                isFetching ? <Loading /> :
                    <AntModal 
                    key={open ? 'open' : 'closed'} 
                    title={title} open={open} onCancel={() => handleClose()} closable={false} maskClosable={false} footer={false}>
                        <Form layout='vertical' onFinish={onFinish}
                            initialValues={{
                                phone: dataDiaChi?.phone,
                                city: dataDiaChi?.city ? { value: dataDiaChi.city.id, label: dataDiaChi.city.name } : undefined,
                                district: dataDiaChi?.district ? { value: dataDiaChi.district.id, label: dataDiaChi.district.name } : undefined,
                                ward: dataDiaChi?.ward ? { value: dataDiaChi.ward.id, label: dataDiaChi.ward.name } : undefined,
                                address: dataDiaChi?.address,
                                label: dataDiaChi?.label,
                                is_default: dataDiaChi?.is_default || false,
                            }}
                        >
                            <Form.Item name='phone' className=' text-2xl font-medium text-neutral-900' label="Số điện thoại">
                                <Input />
                            </Form.Item>
                            <Form.Item name="city" className='text-2xl font-medium text-neutral-900' label="Thành phố">
                                <Select
                                    labelInValue
                                    onChange={handleChangeTinh}
                                    showSearch
                                    optionFilterProp="children"
                                    className="hd-Select outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                    {
                                        tinhThanh?.provinces?.map((e: any) => (
                                            <Option value={e?.ProvinceID}>{e?.ProvinceName}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="district" className='text-2xl font-medium text-neutral-900' label="Quận huyện">
                                <Select
                                    labelInValue
                                    onChange={handleChangeQuanHuyen} className="hd-Select  outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                    {
                                        quanHuyen?.districts?.map((quan: any) => (
                                            <Option key={quan.DistrictID} value={quan.DistrictID}>
                                                {quan.DistrictName}
                                            </Option>
                                        ))
                                    }
                                    <option value=""></option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="ward" className='text-2xl font-medium text-neutral-900' label="Xã">
                                <Select
                                    labelInValue
                                    onChange={handleChangeXa}
                                    className="hd-Select outline-0 h-11 mt-1.5 block w-full text-sm rounded-2xl border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:bg-neutral-50 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25">
                                    {
                                        phuongXa?.wards?.map((e: any) => (
                                            <Option key={e?.WardCode} value={`${e?.WardCode}`}>{e?.WardName}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="address" className='text-2xl font-medium text-neutral-900' label="Địa chỉ cụ thể">
                                <Input />
                            </Form.Item>
                            <Form.Item name="label" className='text-2xl font-medium text-neutral-900' label="Tiêu d">
                                <Input />
                            </Form.Item>
                           
                            <Button onClick={() => handleClose()} className='mt-2 mr-3' >Quay lại</Button>
                            <Button type='primary' htmlType='submit' className='mt-2 mr-auto' >Lưu lại</Button>
                        </Form>
                    </AntModal>
            }

        </>
    )
}

export default AddressAction