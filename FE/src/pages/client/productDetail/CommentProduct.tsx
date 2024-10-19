/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import instance from "@/configs/axios";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Upload, UploadProps } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

const CommentProduct = () => {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [urlImage, setUrlImage] = useState<string | null>(null);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const { token } = useAuth();
  const postCommentProduct = useMutation({
    mutationFn: async () => {
      await instance.post(`/comment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      toast.success("Bình luận thành công");
      form.resetFields();
      //   setIsLoading(false);
      //   setRating(0);
      //   setUrlImage(null);
    },
    onError: (error: any) => {
      setError(error.response.data.message);
      toast.error("Bình luận thất bại");
      setIsLoading(false);
    },
  });

  const propImgComment: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dlvwxauhf/image/upload",
    data: {
      upload_preset: "fashion-sales",
      folder: "fashion-sales",
    },
    onChange(info: any) {
      if (info.file.status === "done") {
        const isImage = /^image\//.test(info?.file?.type);
        if (isImage) {
          setUrlImage(info.file.response.url);
          message.success("Upload ảnh thành công");
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} upload failed.`);
      }
    },
  };

  const onFinish = (data: any) => {
    // const commentData: any = {
    //   rating,
    //   content: data.content,
    //   image: urlImage || "",
    //   id: "",
    //   user_id: 0,
    //   product_id: 0,
    //   status: 0,
    // };

    postCommentProduct.mutate(data);
    // console.log("sadfas", data);
    // console.log("Submitting comment:", commentData);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      className="m-auto w-full max-w-lg p-6 bg-white shadow-lg rounded-lg"
    >
      <h1 className="font-semibold lg:text-2xl text-base mb-4 text-center">
        Đánh giá sản phẩm
      </h1>

      <Form.Item className="mb-4">
        <label className="block lg:text-sm text-[10px] font-medium text-gray-700">
          Chất lượng sản phẩm:
        </label>
        <div className="flex items-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingClick(star)}
              className={`cursor-pointer text-3xl ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}
              type="button"
            >
              ★
            </button>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {rating > 0 ? `Bạn đã đánh giá: ${rating} sao` : ""}
        </div>
      </Form.Item>

      <Form.Item name="content" className="mb-4">
        <label className="block lg:text-sm text-[10px] font-medium text-gray-700">
          Nhận xét:
        </label>
        <Input.TextArea
          rows={4}
          name="content"
          className="px-2 py-2 border-black placeholder:lg:text-sm text-[10px] mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Nhập nhận xét của bạn"
        />
      </Form.Item>

      {error && <div className="text-red-600">{error}</div>}

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
            <img
              src={urlImage}
              alt="Uploaded"
              style={{ marginTop: 16, width: 100, marginBottom: "10px" }}
            />
          ) : (
            <Button className="mt-4" icon={<UploadOutlined />}>
              Tải lên ảnh
            </Button>
          )}
        </Upload>
      </Form.Item>

      <div className="text-center">
        <Button
          className="text-center mt-2"
          htmlType="submit"
          type="primary"
          loading={isLoading}
        >
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </div>
    </Form>
  );
};

export default CommentProduct;
