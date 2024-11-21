/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/common/Loading/Loading";
import { IVouchers } from "@/common/types/vouchers";
import instance from "@/configs/axios";
import { categoriesIndex } from "@/services/api/admin/categories";
import { productsIndex } from "@/services/api/admin/products.api";
import { voucherCreate, voucherUpdate } from "@/services/api/admin/voucher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
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
  const [voucher_applies_to_total, setVoucher_applies_to_total] = useState<
    string | null
  >(null);

  const { data: listCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesIndex,
  });
  console.log("danh sách danh mục : ", listCategories);
  const { data: listProducts } = useQuery({
    queryKey: ["product"],
    queryFn: productsIndex,
  });
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["vouchers", id],
    queryFn: async () => {
      try {
        return await instance.get(`/vouchers/${id}`);
      } catch (error) {
        throw new Error("Error");
      }
    },
  });

  const voucherDetail = data?.data?.data;

  const createVoucher = useMutation({
    mutationFn: voucherCreate,
    onMutate: () => {
      setIsLoading(true);
      setErrors({});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      toast.success("Thêm voucher thành công");
      form.resetFields();
      navigate("/admin/vouchers");
    },
    onError: (error: any) => {
      setErrors(error.response.data.errors);
      toast.error("Thêm voucher thất bại");
      setIsLoading(false);
    },
  });

  const location = useLocation();
  console.log("locaion: ",location)

  const currentPage = location.state?.currentPage || 1;
  console.log("currentPage 123  : ", currentPage);
  const updateVoucher = useMutation({
    mutationFn: (data: IVouchers) => voucherUpdate(Number(id), data),
    onMutate: () => {
      setIsLoading(true);
      setErrors({});
    },
    onSuccess: () => {
      queryClient.setQueryData(["currentPage"], currentPage);
      // queryClient.setQueryData(["vouchers", id], id);
      refetch();
      setIsLoading(false);
      toast.success("Cập nhật voucher thành công");
      navigate("/admin/vouchers");
    },
    onError: (error: any) => {
      console.error(error);
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
        setErrors("Đã có lỗi xảy ra, vui lòng thử lại sau.");
      }
      toast.error(error.response.data.errors);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (voucherDetail) {
      let metaDataValues = {};
      const appliesToTotalMeta = voucherDetail?.meta_data?.find(
        (meta: any) => meta?.meta_key === "_voucher_applies_to_total"
      );

      const initialVoucherAppliesToTotal = appliesToTotalMeta
        ? "true"
        : "false";
      setVoucher_applies_to_total(initialVoucherAppliesToTotal);

      if (initialVoucherAppliesToTotal === "false") {
        metaDataValues = voucherDetail?.meta_data?.reduce(
          (acc: any, meta: any) => {
            if (
              meta?.meta_key !== "_voucher_applies_to_total" &&
              meta?.meta_key &&
              meta?.meta_value !== undefined
            ) {
              if (
                meta?.meta_key === "_voucher_category_ids" ||
                meta?.meta_key === "_voucher_exclude_category_ids" ||
                meta?.meta_key === "_voucher_exclude_product_ids" ||
                meta?.meta_key === "_voucher_product_ids"
              ) {
                acc[meta.meta_key] = JSON.parse(meta.meta_value);
              } else {
                acc[meta.meta_key] = meta.meta_value;
              }
            }
            if (meta?.meta_key === "_voucher_max_discount_amount") {
              acc[meta.meta_key] = meta.meta_value;
            }
            return acc;
          },
          {}
        );
      }

      const initialValues = {
        ...voucherDetail?.voucher,
        _voucher_applies_to_total: initialVoucherAppliesToTotal,
        start_date: dayjs(voucherDetail?.voucher?.start_date),
        end_date: dayjs(voucherDetail?.voucher?.end_date),
        discount_value: parseFloat(voucherDetail?.voucher?.discount_value),
        min_order_value: parseFloat(voucherDetail?.voucher?.min_order_value),
        ...(initialVoucherAppliesToTotal === "false" ? metaDataValues : {}),
      };

      form.setFieldsValue(initialValues);
    }
  }, [voucherDetail, form]);

  const onFinish = (value: any) => {
    console.log("value submit: ", value);

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

    let meta = [];

    if (voucher_applies_to_total === "true") {
      meta = [
        { meta_key: "_voucher_category_ids", meta_value: "[]" },
        { meta_key: "_voucher_exclude_category_ids", meta_value: "[]" },
        { meta_key: "_voucher_product_ids", meta_value: "[]" },
        { meta_key: "_voucher_exclude_product_ids", meta_value: "[]" },
        { meta_key: "_voucher_max_discount_amount", meta_value: "0" },
        { meta_key: "_voucher_applies_to_total", meta_value: "true" },
      ];
    } else {
      meta = [{ meta_key: "_voucher_applies_to_total", meta_value: "false" }];

      if (
        value._voucher_category_ids &&
        value._voucher_category_ids.length > 0
      ) {
        meta.push({
          meta_key: "_voucher_category_ids",
          meta_value: JSON.stringify(
            value._voucher_category_ids.map((item: any) => item.id || item)
          ),
        });
      }

      if (
        value._voucher_exclude_category_ids &&
        value._voucher_exclude_category_ids.length > 0
      ) {
        meta.push({
          meta_key: "_voucher_exclude_category_ids",
          meta_value: JSON.stringify(
            value._voucher_exclude_category_ids.map(
              (item: any) => item.id || item
            )
          ),
        });
      }

      if (value._voucher_product_ids && value._voucher_product_ids.length > 0) {
        meta.push({
          meta_key: "_voucher_product_ids",
          meta_value: JSON.stringify(
            value._voucher_product_ids.map((item: any) => item.id || item)
          ),
        });
      }

      if (
        value._voucher_exclude_product_ids &&
        value._voucher_exclude_product_ids.length > 0
      ) {
        meta.push({
          meta_key: "_voucher_exclude_product_ids",
          meta_value: JSON.stringify(
            value._voucher_exclude_product_ids.map(
              (item: any) => item.id || item
            )
          ),
        });
      }

      if (value._voucher_max_discount_amount) {
        meta.push({
          meta_key: "_voucher_max_discount_amount",
          meta_value: value._voucher_max_discount_amount || 0,
        });
      }
    }
    console.log("meta after processing: ", meta);

    if (id) {
      console.log("update:", value);
      console.log("meta kiểm tra:", meta);
      updateVoucher.mutate({ ...value, meta });
    } else {
      createVoucher.mutate({
        ...value,
        meta,
      });
    }
  };

  const validateSelectedCategories =
    (inputName: any, otherInputName: any) => (_: any, value: any) => {
      const otherSelectedCategories = form.getFieldValue(otherInputName) || [];

      const duplicateCategoryIds =
        value?.filter((categoryId: any) =>
          otherSelectedCategories.includes(categoryId)
        ) || [];

      if (duplicateCategoryIds.length > 0) {
        const duplicateCategoryNames = duplicateCategoryIds
          .map(
            (id: any) =>
              listCategories.find((category: any) => category.id === id)?.name
          )
          .filter(Boolean)
          .join(", ");

        return Promise.reject(
          `Danh mục ${duplicateCategoryNames} đã được chọn ở ô input khác`
        );
      }

      return Promise.resolve();
    };

  const validateSelectedProducts =
    (inputName: any, otherInputName: any) => (_: any, value: any) => {
      const otherSelectedProducts = form.getFieldValue(otherInputName) || [];

      const duplicateProductIds =
        value?.filter((productId: any) =>
          otherSelectedProducts.includes(productId)
        ) || [];

      if (duplicateProductIds.length > 0) {
        const duplicateProductNames = duplicateProductIds
          .map(
            (id: any) =>
              listProducts?.data?.find((product: any) => product.id === id)
                ?.name
          )
          .filter(Boolean)
          .join(", ");

        // Return the error message
        return Promise.reject(
          `Sản phẩm ${duplicateProductNames} đã được chọn ở ô input khác`
        );
      }

      return Promise.resolve();
    };

  const handleRadioChange = (e: any) => {
    setVoucher_applies_to_total(e.target.value);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
          {id ? "Sửa voucher" : "Thêm voucher"}
        </h1>
      </div>

      {isFetching ? (
        <Loading />
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
          <Form.Item
            className="ml-[30px]"
            label="Loại giảm giá"
            name="discount_type"
          >
            <Select placeholder="Chọn">
              <Select.Option value="fixed">
                Giảm theo giá trị tuyệt đối (VNĐ)
              </Select.Option>
              <Select.Option value="percent">
                Giảm theo giá trị tương đối (%)
              </Select.Option>
            </Select>
            {errors.discount_type && (
              <div className=" mt-2 text-red-600">{errors.discount_type}</div>
            )}
          </Form.Item>
          <Form.Item name="discount_value" label="Giá trị sẽ giảm">
            <Input />
          </Form.Item>
          {errors ? (
            <div className=" text-red-600">{errors.discount_value}</div>
          ) : (
            ""
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

          <Form.Item name="_voucher_applies_to_total">
            <Radio.Group
              onChange={handleRadioChange}
              value={voucher_applies_to_total}
            >
              <Radio value="true">Áp dụng cho tất cả đơn hàng</Radio>
              <Radio value="false">Áp dụng cho từng mục...</Radio>
            </Radio.Group>
          </Form.Item>

          {voucher_applies_to_total === "false" && (
            <>
              <Form.Item
                label="Danh mục"
                name="_voucher_category_ids"
                rules={[
                  {
                    validator: validateSelectedCategories(
                      "_voucher_category_ids",
                      "_voucher_exclude_category_ids"
                    ),
                  },
                ]}
              >
                <Select
                  size="large"
                  allowClear={false}
                  options={
                    listCategories?.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  }
                  mode="multiple"
                  onChange={() =>
                    form.validateFields(["_voucher_exclude_category_ids"])
                  }
                />
              </Form.Item>

              <Form.Item
                label="Loại trừ danh mục"
                name="_voucher_exclude_category_ids"
                rules={[
                  {
                    validator: validateSelectedCategories(
                      "_voucher_exclude_category_ids",
                      "_voucher_category_ids"
                    ),
                  },
                ]}
              >
                <Select
                  size="large"
                  allowClear={false}
                  options={
                    listCategories?.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  }
                  // value={}
                  mode="multiple"
                  onChange={() =>
                    form.validateFields(["_voucher_category_ids"])
                  }
                />
              </Form.Item>

              <Form.Item
                label="Sản phẩm"
                name="_voucher_product_ids"
                rules={[
                  {
                    validator: validateSelectedProducts(
                      "_voucher_product_ids",
                      "_voucher_exclude_product_ids"
                    ),
                  },
                ]}
              >
                <Select
                  size="large"
                  allowClear={false}
                  options={
                    listProducts?.data?.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  }
                  mode="multiple"
                  onChange={() =>
                    form.validateFields(["_voucher_exclude_product_ids"])
                  }
                />
              </Form.Item>

              <Form.Item
                label="Loại trừ sản phẩm"
                name="_voucher_exclude_product_ids"
                rules={[
                  {
                    validator: validateSelectedProducts(
                      "_voucher_exclude_product_ids",
                      "_voucher_product_ids"
                    ),
                  },
                ]}
              >
                <Select
                  size="large"
                  allowClear={false}
                  options={
                    listProducts?.data?.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  }
                  mode="multiple"
                  onChange={() => form.validateFields(["_voucher_product_ids"])}
                />
              </Form.Item>

              <Form.Item
                label="Số tiền giảm giá tối đa"
                name="_voucher_max_discount_amount"
                rules={[
                  {
                    required: false,
                    validator: (_, value) => {
                      if (value && (isNaN(value) || Number(value) < 0)) {
                        return Promise.reject(
                          "The voucher max discount amount field must be an integer and at least 1."
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}

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
