import { Ibrands } from "@/common/types/brands";
import instance from "@/configs/axios";
import { createBrand, updateBrand } from "@/services/api/admin/brands.api";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Skeleton, Upload } from "antd";
import { UploadProps } from "antd/es/upload";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BrandForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [urlImage, setUrlImage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const [error, setError] = useState<any>(null);
  const { data, refetch, isFetching, isError } = useQuery({
    queryKey: ["brand", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await instance.get(`/brand/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      setUrlImage(data.image); 
    }
  }, [data, form]);

  const createTagMutation = useMutation({
    mutationFn: createBrand,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Thêm thành công");
      form.resetFields();
      navigate("/admin/brands");
    },
    onError: (error: any) => {
      setError(error.response.data);
      toast.error("Thêm thất bại");
      setIsLoading(false);
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: (brand: Ibrands) => updateBrand(Number(id), brand),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["brand", id], data);
      refetch();
      setIsLoading(false);
      toast.success("Sửa thành công");
      navigate("/admin/brands");
    },
    onError: () => {
      setError(error.response.data);
      setIsLoading(false);
      toast.error("Sửa thất bại");
    },
  });

  const propsImgThumbnail: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dijxcfiff/image/upload",
    data: {
      upload_preset: "upload-img",
      folder: "upload-img",
    },
    onChange(info) {
      if (info.file.status === "done") {
        setUrlImage(info.file.response.url);
        message.open({
          type: "success",
          content: "Upload ảnh thành công",
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(file) {
      setUrlImage(null);
      message.info(`${file.name} has been removed.`);
      return true;
    },
  };

  const onFinish = (values: Ibrands) => {
    if (id) {
      updateTagMutation.mutate({
        ...values,
        image: urlImage ?? '',
      });
    } else {
      createTagMutation.mutate({
        ...values,
        image: urlImage ?? '',
      });
    }
  };

  useEffect(() => {
    if (isError && !hasError) {
      toast.error("Có lỗi xảy ra");
      setHasError(true);
    }
  }, [isError, hasError]);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          {id ? "Sửa Brands" : "Thêm Brands"}
        </h1>
      </div>

      {isFetching ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={data}
        >
          <Form.Item name="name" label="name">
            <Input placeholder="name" />
          </Form.Item>
          {error &&
          error.errors &&
          error.errors.name &&
          error.errors.name.length > 0 ? (
            <div className="text-red-600">{error.errors.name[0]}</div>
          ) : null}

          <Form.Item name="image" label="image">
            <Upload {...propsImgThumbnail}>
              <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
            </Upload>
          </Form.Item>
          {urlImage && (
            <img
              src={urlImage}
              alt="Uploaded"
              style={{height: "100px"}}
            />
          )}
          {error &&
          error.errors &&
          error.errors.image &&
          error.errors.image.length > 0 ? (
            <div className="text-red-600">{error.errors.image[0]}</div>
          ) : null}

          <Form.Item name="email" label="email">
            <Input placeholder="email" />
          </Form.Item>
          {error &&
          error.errors &&
          error.errors.email &&
          error.errors.email.length > 0 ? (
            <div className="text-red-600">{error.errors.email[0]}</div>
          ) : null}

          <Form.Item name="phone_number" label="phone_number">
            <Input placeholder="phone_number" />
          </Form.Item>
          {error &&
          error.errors &&
          error.errors.phone_number &&
          error.errors.phone_number.length > 0 ? (
            <div className="text-red-600">{error.errors.phone_number[0]}</div>
          ) : null}

          <Form.Item name="address" label="address">
            <Input placeholder="address" />
          </Form.Item>
          {error &&
          error.errors &&
          error.errors.address &&
          error.errors.address.length > 0 ? (
            <div className="text-red-600">{error.errors.address[0]}</div>
          ) : null}

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
    </div>
  );
};

export default BrandForm;
