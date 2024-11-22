import { Iattribute } from '@/common/types/attribute';
import { createAttributes, getAttribute, updateAttributes } from '@/services/api/admin/attribute';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Modal as AntModal, Button, Form, Input, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  currentId: number | undefined;
  open: boolean;
  onClose: () => void;
  setCurrentPage: (page: number) => void;
};

const ModalActon = ({ currentId, open, onClose, setCurrentPage }: Props) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  const { data, isFetching } = useQuery({
    queryKey: ['attribute', currentId],
    queryFn: () => getAttribute(currentId),
    enabled: !!currentId,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const createAttribute = useMutation({
    mutationFn: createAttributes,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
      toast.success('Thêm thành công');
      form.resetFields();
      setCurrentPage(1);
      onClose();
      setIsLoading(false);
    },
    onError: (error: any) => {
      setError(error.response.data.message);
      toast.error('Thêm thất bại');
      setIsLoading(false);
    },
  });

  const updateAttribute = useMutation({
    mutationFn: (data: Iattribute) => updateAttributes(currentId!, data),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
      toast.success('Sửa thành công');
      onClose();
      setIsLoading(false);
    },
    onError: (error:any) => {
      setError(error.response.data.message);
      toast.error('Sửa thất bại');
      setIsLoading(false);
    },
  });

  const onFinish = (data: Iattribute) => {
    if (currentId) {
      updateAttribute.mutate(data);
    } else {
      createAttribute.mutate(data);
    }
  };

  return (
    <AntModal
      open={open}
      onCancel={onClose}
      footer={null}
    >
      {
        isFetching ? (<Skeleton />) :
          <Form layout='vertical' onFinish={onFinish} form={form}>
            <h1 className='text-xl font-bold text-gray-800 border-gray-300 pb-2'>
              {currentId ? 'Sửa thuộc tính' : 'Thêm thuộc tính'}
            </h1>
            <Form.Item name='name' label="Tên thuộc tính">
              <Input />
            </Form.Item>
            {error && <div className='text-red-600'>{error}</div>}
            <Form.Item>
              <Button type='primary' htmlType='submit' loading={isLoading}>
                {isLoading ? 'Loading' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
      }
    </AntModal>
  );
};

export default ModalActon;
