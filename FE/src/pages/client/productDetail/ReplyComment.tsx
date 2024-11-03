/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import { Icomments } from "@/common/types/comments";
import instance from "@/configs/axios";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, message, Upload, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
interface UpdateReplyPayload {
  data: Icomments;
  replyToCommentId: any;
}
const ReplyComment = ({
  productId,
  setReplyToCommentId,
  replyToCommentId,
  InForCommentId,
  setInForCommentId,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const [form] = Form.useForm();
  const [urlImage, setUrlImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

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

  const replyComment = useMutation({
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Phản hồi thành công");
      form.resetFields();
      setReplyToCommentId(null);
      setUrlImage(null);
      setIsLoading(false);
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(error.response.data.message);
    },
  });

  const updatReplyComment = useMutation({
    mutationFn: async ({ data, replyToCommentId }: UpdateReplyPayload) => {
      const res = await instance.put(`/comment/${replyToCommentId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Chỉnh sửa thành công");
      form.resetFields();
      console.log("replyToCommentId", setReplyToCommentId);
      setReplyToCommentId(null);
      // setUrlImage(null);
      setInForCommentId(null);
      setIsLoading(false);
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(error.response.data.message);
    },
  });

  const onFinish = (values: any) => {
    if (urlImage) {
      values.image = urlImage;
    }
    if (InForCommentId && replyToCommentId) {
      updatReplyComment.mutate({ data: values as Icomments, replyToCommentId });
    } else {
      replyComment.mutate({
        ...values,
        rating: null,
        product_id: productId,
        parent_id: replyToCommentId,
        image: urlImage,
      });
    }
  };

  return (
    <>
      <div className="w-[90%] border ml-[48px] flex items-center">
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={InForCommentId}
          className="flex justify-between items-center w-full"
        >
          <div className="w-[90%] flex items-center">
            <Form.Item name="content" className="w-[85%]">
              <TextArea
                autoFocus
                placeholder="Nhập nhận xét của bạn"
                rows={4}
                className="h-full"
              />
            </Form.Item>
            <Form.Item
              valuePropName="fileList"
              className="w-[30%] flex items-center justify-center h-full"
            >
              <Upload
                {...propImgComment}
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                }}
                onRemove={() => {
                  setUrlImage(null);
                }}
                listType="picture-card"
                maxCount={1}
                className="flex items-center justify-center h-full w-full border-none"
              >
                <button
                  style={{
                    border: 0,
                    background: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          </div>
          <div className="flex text-right justify-end mt-2">
            <Button
              className="text-center mr-2 px-4 flex items-center justify-center"
              htmlType="submit"
              type="primary"
              loading={isLoading}
            >
              <span className="text-[12px]">Gửi</span>
            </Button>

            <Button
              className="text-center text-red-500 mr-2 px-4 flex items-center justify-center"
              onClick={() => {
                setReplyToCommentId(null);
              }}
            >
              <span className="text-[12px]">Hủy</span>
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ReplyComment;
