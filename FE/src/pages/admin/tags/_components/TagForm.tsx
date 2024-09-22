
import { Itags } from '@/common/types/tags';
import instance from '@/configs/axios';
import { createTag, updateTag } from '@/services/api/tags.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const FormTag = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null)
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['tag', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await instance.get(`/tags/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const createTagMutation = useMutation({
    mutationFn: createTag,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast.success('Thêm thành công');
      form.resetFields();
      navigate('/admin/tags');
    },
    onError: (error: any) => {
      setError(error.response.data.message)
      toast.error('Thêm thất bại');
      setIsLoading(false)
    },
  });
  const updateTagMutation = useMutation({
    mutationFn: (tag: Itags) => updateTag(Number(id), tag),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['tag', id], data);
      refetch();
      setIsLoading(false);
      toast.success('Sửa thành công');
      navigate('/admin/tags');
    },
    onError: () => {
      setIsLoading(false);
      toast.error('Sửa thất bại');
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
          {id ? 'Sửa Tags' : 'Thêm Tags'}
        </h1>
      </div>

      {
        isFetching ? (<Skeleton />) : (
          <Form form={form} layout='vertical' onFinish={onFinish} initialValues={data}>
            <Form.Item name="name" label="Tên tag">
              <Input placeholder='Tên tag' />
            </Form.Item>
            {
              error ? (<div className=' text-red-600'>{error}</div>) : ''
            }
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
    </div>
  );
};

export default FormTag;
