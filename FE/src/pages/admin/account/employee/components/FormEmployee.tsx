/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/common/types/users";
import instance from "@/configs/axios";
import { createClient, updateClient } from "@/services/api/clients";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Skeleton,
  Upload,
  UploadProps,
} from "antd";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormEmployee = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>("");
  const [urlImage, setUrlImage] = useState<any>();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      if (!id) return "";
      const response = await instance.get(`/employees/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        birth_date: data.birth_date ? dayjs(data.birth_date, "YYYY-MM-DD") : "",
        gender: data.gender === "1" ? "1" : "0",
      });
      setUrlImage(data.avatar);
    }
  }, [data, form]);

  const createClientMutation = useMutation({
    mutationFn: createClient,
    onMutate: () => {
      setIsLoading(true);
      setErrors({});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Thêm thành công");
      form.resetFields();
      navigate("/admin/employees");
    },
    onError: (error: any) => {
      setErrors(error.response.data.errors);
      toast.error("Thêm thất bại");
      setIsLoading(false);
    },
  });
  const location = useLocation();
  const currentPage = location.state?.currentPage || 1;
  const updateClientMutation = useMutation({
    mutationFn: (client: IUser) => updateClient(Number(id), client),
    onMutate: () => {
      setIsLoading(true);
      setErrors({});
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["currentPage"], currentPage);
      refetch();
      setIsLoading(false);
      toast.success("Cập nhật thành công");
      navigate("/admin/employees");
    },
    onError: (error: any) => {
      setErrors(error.response.data.errors);
      setIsLoading(false);
      toast.error("Cập nhật thất bại");
    },
  });

  const postAvatar: UploadProps = {
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
    if (value.birth_date) {
      value.birth_date = value.birth_date.format("YYYY-MM-DD");
    } else {
      value.birth_date = "";
    }
    value.gender = value.gender === "1" ? "1" : "0";
    if (urlImage) {
      value.avatar = urlImage;
    }
    if (id) {
      updateClientMutation.mutate(value);
    } else {
      createClientMutation.mutate({
        ...value,
        avatar: urlImage,
      });
    }
  };

  const handleRemoveImage = () => {
    setUrlImage(undefined);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          {id ? "Cập nhật tài khoản nhân viên" : "Thêm tài khoản nhân viên"}
        </h1>
      </div>

      {isFetching ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...data,
            birth_date: data?.birth_date ? dayjs(data.birth_date) : "",
            gender: data?.gender === "1" ? "1" : "0",
          }}
        >
          <Form.Item<IUser> label="Username" name="name">
            <Input />
          </Form.Item>
          {errors.name && <div className="text-red-600">{errors.name}</div>}

          <Form.Item name="avatar" label="Ảnh đại diện">
            <Upload {...postAvatar}>
              <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
            </Upload>
            {urlImage && (
              <div className="relative mt-4">
                <img
                  src={urlImage}
                  alt="Uploaded"
                  className="w-24 max-w-full rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center border border-red-600 hover:bg-red-500 transition duration-200 ease-in-out shadow-md"
                >
                  <span className="text-lg font-bold">×</span>
                </button>
              </div>
            )}
          </Form.Item>

          <Form.Item<IUser> label="Password" name="password">
            <Input.Password />
          </Form.Item>
          {errors.password && (
            <div className="text-red-600">{errors.password}</div>
          )}

          <Form.Item<IUser> label="Number phone" name="phone_number">
            <Input />
          </Form.Item>
          {errors.phone_number && (
            <div className="text-red-600">{errors.phone_number}</div>
          )}

          <Form.Item<IUser> label="Email" name="email">
            <Input />
          </Form.Item>
          {errors.email && <div className="text-red-600">{errors.email}</div>}

          <Form.Item<IUser> label="Address" name="address">
            <Input />
          </Form.Item>
          {errors.address && (
            <div className="text-red-600">{errors.address}</div>
          )}

          <Form.Item label="Birth Date" name="birth_date">
            <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày sinh" />
          </Form.Item>
          {errors.birth_date && (
            <div className="text-red-600">{errors.birth_date}</div>
          )}

          <Form.Item label="Gender" name="gender">
            <Select placeholder="Choose gender">
              <Option value="1">Nam</Option>
              <Option value="0">Nữ</Option>
            </Select>
            {errors.gender && (
              <div className="text-red-600">{errors.gender}</div>
            )}
          </Form.Item>

          <Form.Item name="role_id" label="Role">
            <Select placeholder="Select Role">
              <Select.Option value={3}>Shipper</Select.Option>
              <Select.Option value={2}>MemberShip</Select.Option>
            </Select>
          </Form.Item>
          {errors.role_id && (
            <div className="text-red-600">{errors.gender}</div>
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

export default FormEmployee;
