/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBanner } from "@/common/types/banners";
import Loading from "@/common/Loading/Loading";

import instance from "@/configs/axios";
import { bannerCreate, bannerUpdate } from "@/services/api/admin/banners";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Skeleton,
  Upload,
  UploadProps,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BannersForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>("");
  const [urlImage, setUrlImage] = useState<any>();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["banners", id],
    queryFn: async () => {
      if (!id) return "";
      const response = await instance.get(`/banners/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        start_date: data?.start_date
          ? dayjs(data.start_date, "YYYY-MM-DD")
          : "",
        end_date: data?.end_date ? dayjs(data.end_date, "YYYY-MM-DD") : "",
      });
      setUrlImage(data?.image);
    }
  }, [data, form]);

  const createBanner = useMutation({
    mutationFn: bannerCreate,
    onMutate: () => {
      setIsLoading(true);
      setErrors({});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast.success("Thêm thành công");
      form.resetFields();
      navigate("/admin/banners");
    },
    onError: (error: any) => {
      setErrors(error.response.data.errors);
      toast.error("Thêm thất bại");
      setIsLoading(false);
    },
  });
  const location = useLocation();
  const currentPage = location.state?.currentPage || 1;

  const updateBanner = useMutation({
    mutationFn: (data: IBanner) => bannerUpdate(Number(id), data),
    onMutate: () => {
      setIsLoading(true);
      setErrors({});
    },
    onSuccess: () => {
      queryClient.setQueryData(["currentPage"], currentPage);
      refetch();
      setIsLoading(false);
      toast.success("Cập nhật thành công");
      navigate("/admin/banners");
    },
    onError: (error: any) => {
      console.error(error);
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
        setErrors("Đã có lỗi xảy ra, vui lòng thử lại sau.");
      }
      toast.error("Cập nhật thất bại");
      setIsLoading(false);
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
    if (value.start_date) {
      value.start_date = value.start_date.format("YYYY-MM-DD");
    } else {
      value.start_date = "";
    }
    if (value.end_date) {
      value.end_date = value.end_date.format("YYYY-MM-DD");
    } else {
      value.end_date = "";
    }

    if (urlImage) {
      value.image = urlImage;
    }

    if (id) {
      updateBanner.mutate(value);
    } else {
      createBanner.mutate({
        ...value,
        image: urlImage,
      });
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          {id ? "Sửa banner" : "Thêm banner"}
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
            start_date: data?.start_date ? dayjs(data.start_date) : "",
            end_date: data?.end_date ? dayjs(data.end_date) : "",
          }}
        >
          <Form.Item name="title" label="Tiêu đề">
            <Input placeholder="Tiêu đề" />
          </Form.Item>
          {errors ? <div className=" text-red-600">{errors.title}</div> : ""}

          <Form.Item name="image" label="Ảnh">
            <Upload
              {...postImage}
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
                data?.image && (
                  <>
                    <img
                      src={data?.image}
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
          {errors ? <div className=" text-red-600">{errors.image}</div> : ""}

          <Form.Item name="link" label="Link">
            <Input placeholder="Đường dẫn" />
          </Form.Item>
          {errors ? <div className=" text-red-600">{errors.link}</div> : ""}

          <Form.Item label="Ngày bắt đầu" name="start_date">
            <DatePicker format="DD/MM/YYYY" placeholder="Chọn" />
          </Form.Item>
          {errors ? (
            <div className=" text-red-600">{errors.start_date}</div>
          ) : (
            ""
          )}

          <Form.Item label="Ngày kết thúc" name="end_date">
            <DatePicker format="DD/MM/YYYY" placeholder="Chọn" />
          </Form.Item>
          {errors ? <div className=" text-red-600">{errors.end_date}</div> : ""}

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

export default BannersForm;
