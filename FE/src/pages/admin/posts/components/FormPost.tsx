/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import { categoriesIndex } from "@/services/api/admin/categories";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  message,
  Select,
  Upload,
  UploadProps,
} from "antd";

import { useAuth } from "@/common/context/Auth/AuthContext";
import { IPost } from "@/common/types/post";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "@/common/Loading/Loading";

const FormPost = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>("");
  const [urlImage, setUrlImage] = useState<any>();
  const { token } = useAuth();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      if (!id) return "";
      const response = await instance.get(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    enabled: !!id,
  });

  const { data: listCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesIndex,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        status: data.status ? "1" : "0",
        featured: data.featured ? "1" : "0",
      });
      setUrlImage(data?.img_thumbnail);
    }
  }, [data, form]);

  const createPost = useMutation({
    mutationFn: async (data: IPost) => {
      const res = await instance.post("/posts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    onMutate: () => {
      setIsLoading(true);
      setErrors({});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Thêm thành công");
      form.resetFields();
      navigate("/admin/posts");
    },
    onError: (error: any) => {
      setErrors(error.response.data.errors);
      toast.error("Thêm thất bại");
      setIsLoading(false);
    },
  });
  const location = useLocation();
  const currentPage = location.state?.currentPage || 1;

  const updatePost = useMutation({
    mutationFn: async ({ data, id }: { data: IPost; id: string }) => {
      const res = await instance.put(`/posts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
    onMutate: () => {
      setIsLoading(true);
      setErrors({});
    },
    onSuccess: () => {
      queryClient.setQueryData(["currentPage"], currentPage);
      refetch();
      setIsLoading(false);
      toast.success("Cập nhật thành công");
      navigate("/admin/posts");
    },
    onError: (error: any) => {
      setErrors(error.response.data.errors);
      setIsLoading(false);
      toast.error("Cập nhật thất bại");
    },
  });

  const postImage: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dn94v5jkq/image/upload",
    data: {
      upload_preset: "fashion-sales",
      folder: "fashion_sales",
    },
    onChange(info) {
      if (info.file.status === "done") {
        setUrlImage(info.file.response.url);
        message.success("Upload ảnh thành công");
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = (value: any) => {
    console.log("value nè: ", value);
    if (urlImage) {
      value.img_thumbnail = urlImage;
    }
    value.status = value.status === "1" ? "1" : "0";
    value.featured = value.featured === "1" ? "1" : "0";
    console.log(value);
    if (id) {
      updatePost.mutate({ data: value, id });
    } else {
      createPost.mutate({
        ...value,
        img_thumbnail: urlImage,
      });
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          {id ? "Sửa bài viết" : "Thêm bài viết"}
        </h1>
      </div>

      {isFetching ? (
        <Loading />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...data,
            status: data?.status === "1" ? "1" : "0",
            featured: data?.featured === "1" ? "1" : "0",
          }}
        >
          <Form.Item name="post_name" label="Tên bài viết">
            <Input placeholder="Tên bài viết" />
          </Form.Item>
          {errors ? (
            <div className=" text-red-600">{errors.post_name}</div>
          ) : (
            ""
          )}

          <Form.Item name="img_thumbnail" label="Ảnh">
            <Upload
              {...postImage}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true,
              }}
              onRemove={() => {
                setUrlImage(null);
              }}
            >
              {urlImage ? (
                <>
                  <img
                    src={urlImage}
                    alt="Uploaded"
                    style={{ marginTop: 16, width: 100, marginBottom: "10px" }}
                  />
                </>
              ) : (
                data?.img_thumbnail && (
                  <>
                    <img
                      src={data.img_thumbnail}
                      alt="Uploaded"
                      style={{
                        marginTop: 16,
                        width: 100,
                        marginBottom: "10px",
                      }}
                    />
                  </>
                )
              )}

              <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
            </Upload>
          </Form.Item>
          {errors ? (
            <div className=" text-red-600">{errors.img_thumbnail}</div>
          ) : (
            ""
          )}

          <Form.Item name="post_content" label="Nội dung">
            <TextArea rows={3} cols={10} name="post_content" id=""></TextArea>
          </Form.Item>
          {errors ? (
            <div className=" text-red-600">{errors.post_content}</div>
          ) : (
            ""
          )}

          <Form.Item name="slug" label="Slug">
            <Input placeholder="Slug" />
          </Form.Item>
          {errors ? <div className=" text-red-600">{errors.slug}</div> : ""}

          <Form.Item label="Danh mục" name="category_id">
            <Select placeholder="Chọn danh mục">
              {listCategories?.map((category: any) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {errors ? (
            <div className=" text-red-600">{errors.category_id}</div>
          ) : (
            ""
          )}

          <Form.Item label="Nêu bật bài viết" name="featured">
            <Select placeholder="Chọn">
              <Option value="1">Nêu bật</Option>
              <Option value="0">Không nêu bật</Option>
            </Select>
          </Form.Item>
          {errors.featured && (
            <div className="text-red-600">{errors.featured}</div>
          )}

          <Form.Item label="Trạng thái bài viết" name="status">
            <Select placeholder="Trạng thái">
              <Option value="1">Ẩn</Option>
              <Option value="0">Hiện</Option>
            </Select>
          </Form.Item>
          {errors.status && <div className="text-red-600">{errors.status}</div>}

          {/* delete */}
          <Form.Item name="post_view" label="post_view">
            <Input placeholder="" />
          </Form.Item>
          {errors ? (
            <div className=" text-red-600">{errors.post_view}</div>
          ) : (
            ""
          )}
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

export default FormPost;
