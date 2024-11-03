/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBanner } from "@/common/types/banners";
import instance from "@/configs/axios";
import { bannerCreate, bannerUpdate } from "@/services/api/admin/banners";
import { categoriesIndex } from "@/services/api/admin/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Select, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormVoucher = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>("");

  const { data: listCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesIndex,
  });
  console.log("categories: ", listCategories);

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
          ? dayjs(data?.start_date, "YYYY-MM-DD")
          : "",
        end_date: data?.end_date ? dayjs(data?.end_date, "YYYY-MM-DD") : "",
      });
    }
  }, [data, form]);

  // const createBanner = useMutation({
  //   mutationFn: bannerCreate,
  //   onMutate: () => {
  //     setIsLoading(true);
  //     setErrors({});
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["banners"] });
  //     toast.success("Thêm thành công");
  //     form.resetFields();
  //     navigate("/admin/banners");
  //   },
  //   onError: (error: any) => {
  //     setErrors(error.response.data.errors);
  //     toast.error("Thêm thất bại");
  //     setIsLoading(false);
  //   },
  // });
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

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        start_date: data?.start_date
          ? dayjs(data.start_date, "YYYY-MM-DD")
          : "",
        end_date: data?.end_date ? dayjs(data.end_date, "YYYY-MM-DD") : "",
      });
    }
  }, [data, form]);

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

    if (id) {
      updateBanner.mutate(value);
    } else {
      createBanner.mutate({
        ...value,
      });
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          {id ? "Sửa voucher" : "Thêm voucher"}
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
            start_date: data?.start_date ? dayjs(data.start_date) : "",
            end_date: data?.end_date ? dayjs(data.end_date) : "",
          }}
        >
          <Form.Item name="title" label="Tên voucher">
            <Input placeholder="Tên voucher" />
          </Form.Item>
          {errors ? <div className=" text-red-600">{errors.title}</div> : ""}

          <Form.Item name="description" label="Mô tả">
            <TextArea rows={3} cols={10} name="description" id=""></TextArea>
          </Form.Item>
          {errors ? (
            <div className=" text-red-600">{errors.description}</div>
          ) : (
            ""
          )}

          <Form.Item label="Giá trị sẽ giảm" name="discount_value">
            <Input />
          </Form.Item>
          {errors.discount_value && (
            <div className="text-red-600">{errors.discount_value}</div>
          )}

          <Form.Item label="Đơn vị giảm giá" name="discount_type">
            <Select placeholder="Chọn">
              <Option value="fixed">VNĐ</Option>
              <Option value="percent">%</Option>
            </Select>
          </Form.Item>
          {errors.discount_type && (
            <div className="text-red-600">{errors.discount_type}</div>
          )}

          <Form.Item label="Giá trị đơn hàng tối thiểu" name="min_order_value">
            <Input />
          </Form.Item>
          {errors.min_order_value && (
            <div className="text-red-600">{errors.min_order_value}</div>
          )}
          <Form.Item label="Số lượng voucher" name="usage_limit">
            <Input />
          </Form.Item>
          {errors.usage_limit && (
            <div className="text-red-600">{errors.usage_limit}</div>
          )}
          <p>Đối tượng giảm giá: </p>

          <Form.Item label="Danh mục" name="_voucher_category_ids">
            <Select
              size="large"
              allowClear={false}
              // value={selectedAttributeChildren}
              options={
                listCategories?.map((item: any) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              mode="multiple"
              // onChange={handleChangeAttributeChildren}
            />
          </Form.Item>
          {errors._voucher_category_ids && (
            <div className="text-red-600">{errors._voucher_category_ids}</div>
          )}

          {/*           
          <Form.Item label="Sản phẩm" name="_voucher_product_ids">
            <Select
              size="large"
              allowClear={false}
              // value={selectedAttributeChildren}
              options={
                listCategories?.map((item: any) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              mode="multiple"
              // onChange={handleChangeAttributeChildren}
            />
          </Form.Item>
          {errors._voucher_category_ids && (
            <div className="text-red-600">{errors._voucher_category_ids}</div>
          )} */}

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

export default FormVoucher;
