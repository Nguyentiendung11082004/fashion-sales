/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import { Icomments } from "@/common/types/comments";
import instance from "@/configs/axios";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, message, Rate, Upload, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface UpdateCommentPayload {
  data: Icomments;
  editIdComment: string;
}
const CommentProduct = ({
  productId,
  editIdComment,
  InForCommentId,
  setInForCommentId,
  setEditIdComment,
}: any) => {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [urlImage, setUrlImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>("");

  const { token } = useAuth();

  const postCommentProduct = useMutation({
    mutationFn: async (data: Icomments) => {
      const res = await instance.post("/comment", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onMutate: () => {
      setIsLoading(true);
      setErrors({});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Bình luận thành công");
      form.resetFields();
      setRating(0);
      setUrlImage(null);
      setIsLoading(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
      setErrors(error.response.data.errors);
      setIsLoading(false);
    },
  });

  const updateComment = useMutation({
    mutationFn: async ({ data, editIdComment }: UpdateCommentPayload) => {
      const response = await instance.put(`/comment/${editIdComment}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onMutate: () => {
      setIsLoading(true);
      setErrors({});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Sửa bình luận thành công");
      setEditIdComment(null);
      setInForCommentId(null);
      form.resetFields();
      setInForCommentId(null);
      setRating(0);
      setUrlImage(null);
      setIsLoading(false);
    },

    onError: (error: any) => {
      setErrors(error.response.data.errors);
      setIsLoading(false);
      toast.error(error.response.data.errors);
    },
  });
  useEffect(() => {
    if (editIdComment && InForCommentId) {
      form.setFieldsValue({
        ...InForCommentId,
        content: InForCommentId.content || "",
        rating: InForCommentId.rating || 0,
      });
      setRating(InForCommentId.rating || 0);
      setUrlImage(InForCommentId.image || null);
    } else {
      form.resetFields();
      setRating(0);
      setUrlImage(null);
    }
  }, [editIdComment, InForCommentId, form]);
  const propImgComment: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dn94v5jkq/image/upload",
    data: {
      upload_preset: "fashion-sales",
      folder: "fashion_sales",
    },
    onChange(info) {
      if (info.file.status === "done") {
        setUrlImage(info.file.response.url);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = (values: any) => {
    if (urlImage) {
      values.image = urlImage;
    }
    if (InForCommentId && editIdComment) {
      updateComment.mutate({ data: values as Icomments, editIdComment });
    } else {
      postCommentProduct.mutate({
        ...values,
        image: urlImage,
        rating: rating,
        product_id: productId,
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...InForCommentId,
      }}
      className="m-auto w-full max-w-lg p-6 bg-white shadow-lg rounded-lg"
    >
      <h1 className="font-semibold lg:text-2xl text-base mb-4 text-center">
        {editIdComment ? "Sửa bình luận" : "Thêm bình luận"}
      </h1>

      <label className="mb-2 block lg:text-sm text-[10px] font-medium text-gray-700">
        Chất lượng sản phẩm:
      </label>
      <Form.Item className="mb-4" name="rating">
        <Rate value={rating} onChange={(value) => setRating(value)} />
      </Form.Item>
      {errors ? <div className="text-red-600">{errors.rating}</div> : ""}

      <label className="block lg:text-sm text-[10px] font-medium text-gray-700">
        Nhận xét:
      </label>
      <Form.Item name="content" className="mb-4">
        <TextArea
          className="px-2 py-2 border-black placeholder:lg:text-sm text-[10px] mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Nhập nhận xét của bạn"
          rows={3}
        />
      </Form.Item>
      {errors ? <div className="text-red-600">{errors.content}</div> : ""}

      <Form.Item name="image">
        <label className="block lg:text-sm text-[10px] font-medium text-gray-700">
          Tải hình ảnh lên:
        </label>
        <Upload
          {...propImgComment}
          showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
          onRemove={() => setUrlImage(null)}
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
            InForCommentId?.image && (
              <>
                <img
                  src={InForCommentId.image}
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
          <Button className="mt-4" icon={<UploadOutlined />}>
            Tải lên ảnh
          </Button>
        </Upload>
      </Form.Item>
      {errors && <div className="text-red-600">{errors.image}</div>}

      <div className="flex justify-center items-center ">
        <Button
          className="text-center text-red-500 mr-[20px]"
          onClick={() => {
            setEditIdComment(null);
            setInForCommentId(null);
          }}
        >
          <span className="text-[12px]">Hủy</span>
        </Button>
        <Button
          className="text-center "
          htmlType="submit"
          type="primary"
          loading={isLoading}
        >
          {editIdComment ? "Cập nhật" : "Thêm"}
        </Button>
      </div>
    </Form>
  );
};

export default CommentProduct;
