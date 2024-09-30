<<<<<<< HEAD
import { Itags } from '@/common/types/tags';
import instance from '@/configs/axios';
import { createTag, updateTag } from '@/services/api/tags.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Itags } from "@/common/types/tags";
import instance from "@/configs/axios";
import { createTag, updateTag } from "@/services/api/tags.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0

const FormTag = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState(null);
  const location = useLocation();
  const currentTagsPage = location.state?.currentTagsPage || 1;
=======

  const [error, setError] = useState(null);
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["tag", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await instance.get(`/tags/${id}`);
      return response.data.data;
    },
  });

  const createTagMutation = useMutation({
    mutationFn: createTag,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Thêm thành công");
      form.resetFields();
<<<<<<< HEAD
      queryClient.setQueryData(['currentTagsPage'], 1);
      navigate('/admin/tags');
    },
    onError: (error: any) => {
      setError(error.response.data.message);
      toast.error('Thêm thất bại');
=======
      navigate("/admin/tags");
    },
    onError: (error: any) => {
      setError(error.response.data.message);
      toast.error("Thêm thất bại");
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
      setIsLoading(false);
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: (tag: Itags) => updateTag(Number(id), tag),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["tag", id], data);
      refetch();
      setIsLoading(false);
<<<<<<< HEAD
      toast.success('Sửa thành công');
      queryClient.setQueryData(['currentTagsPage'], currentTagsPage); 
      navigate('/admin/tags');
=======
      toast.success("Sửa thành công");
      navigate("/admin/tags");
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Sửa thất bại");
    },
  });


  const onFinish = (value: any) => {
    if (id) {
      updateTagMutation.mutate(value);
    } else {
      createTagMutation.mutate(value);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          {id ? "Sửa Tags" : "Thêm Tags"}
        </h1>
      </div>
<<<<<<< HEAD
      {
        isFetching ? (<Skeleton />) : (
          <Form form={form} layout='vertical' onFinish={onFinish} initialValues={data}>
            <Form.Item name="name" label="Tên tag">
              <Input placeholder='Tên tag' />
            </Form.Item>
            {error && <div className='text-red-600'>{error}</div>}
            <Button
              htmlType='submit'
              type="primary"
              className='mt-2'
              loading={isLoading}
            >
              {isLoading ? 'Loading' : 'Submit'}
            </Button>
          </Form>
        )
      }
=======

      {isFetching ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={data}
        >
          <Form.Item name="name" label="Tên tag">
            <Input placeholder="Tên tag" />
          </Form.Item>
          {error ? <div className=" text-red-600">{error}</div> : ""}

          <Button
            htmlType="submit"
            type="primary"
            className="mt-2"
            loading={isLoading}
          >
            {isLoading ? "Loading" : "Submit"}
          </Button>
        </Form>
      )}
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
    </div>
  );
};

export default FormTag;
