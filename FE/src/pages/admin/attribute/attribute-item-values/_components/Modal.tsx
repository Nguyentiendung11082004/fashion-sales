import { Iattribute } from '@/common/types/attribute';
import { Iattributeitem } from '@/common/types/attribute-item';
import { getAttributes } from '@/services/api/admin/attribute';
import { createAttributesItem, getAttributeItem, updateAttributesItem } from '@/services/api/admin/attribute-item';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Modal as AntModal, Button, Form, Input, Select, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


type ErrorResponse = {
  [key: string]: string[];
};


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
  const [error, setError] = useState<ErrorResponse | null>(null);

  const { data: attributeData } = useQuery({
    queryKey: ['attributes'],
    queryFn: getAttributes,
  });

  const { data, isFetching } = useQuery({
    queryKey: ['attribute', currentId],
    queryFn: () => getAttributeItem(currentId),
    enabled: !!currentId,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const handleErrorResponse = (error: any) => {
    if (error.response && error.response.data.errors) {
      const errorFields: ErrorResponse = error.response.data.errors;
      const fields = Object.keys(errorFields).map((key) => ({
        name: key,
        errors: errorFields[key],
      }));
      setIsLoading(false);
      form.setFields(fields);
      const allFieldNames = ['attribute_id', 'value']; 
      allFieldNames.forEach((field) => {
        if (!errorFields[field]) {
          form.setFields([{ name: field, errors: [] }]);
        }
      });
    } else {
      toast.error('Có lỗi xảy ra');
    }
  };
  

  const createAttribute = useMutation({
    mutationFn: createAttributesItem,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attributes-values'] });
      toast.success('Thêm thành công');
      form.resetFields();
      setCurrentPage(1);
      onClose();
      setIsLoading(false);
    },
    onError: handleErrorResponse,
  });

  const updateAttribute = useMutation({
    mutationFn: (data: Iattributeitem) => updateAttributesItem(currentId!, data),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attributes-values'] });
      toast.success('Sửa thành công');
      onClose();
      setIsLoading(false);
    },
    onError: handleErrorResponse,
  });

  const onFinish = (data: Iattributeitem) => {
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
              {currentId ? 'Sửa giá trị thuộc tính' : 'Thêm giá trị thuộc tính'}
            </h1>
            <Form.Item name='attribute_id' label="Chọn thuộc tính">
              <Select
                options={attributeData?.map((e: Iattribute) => (
                  {
                    value: e.id,
                    label: e.name,
                  }
                ))}
                placeholder="Chọn thuộc tính"
                placement="bottomLeft" className='w-full' />
              {error?.attribute_id && <div className='text-red-600'>{error.attribute_id.join(', ')}</div>}
            </Form.Item>
            <Form.Item name='value' label="Tên giá trị thuộc tính">
              <Input />
              {error?.value && <div className='text-red-600'>{error.value.join(', ')}</div>}
            </Form.Item>
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
