/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import { Icomments } from "@/common/types/comments";
import instance from "@/configs/axios";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, message, Rate, Upload, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
interface UpdateCommentPayload {
  data: Icomments;
  editIdComment: string;
}
const CommentProduct = ({
  listIdProduct,
  listInForProducts,
  editIdComment,
  InForCommentId,
  setInForCommentId,
  setEditIdComment,
  setShowFormCmtOpen,
}: any) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const [formsData, setFormsData] = useState<Record<number, any>>(
    listIdProduct?.reduce((acc: any, id: any) => {
      acc[id] = { rating: 5, content: "", image: null };
      return acc;
    }, {})
  );

  const [urlImage, setUrlImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>("");
  const handleStateUpdate = (id: number, field: string, value: any) => {
    let newValue = value;

    if (field === "rating") {
      const currentRating = formsData[id]?.rating;
      if (value === currentRating) {
        newValue = 1;
      } else if (value < currentRating) {
        newValue = value;
      }
      newValue = newValue < 1 ? 1 : newValue;
    }

    if (field === "content" && value === "") {
      newValue = null;
    }

    if (field === "image" && value === "") {
      newValue = null;
      if (InForCommentId) {
        setUrlImage(null);
      }
    }

    // Cập nhật trạng thái
    setFormsData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: newValue,
      },
    }));
  };

  const [form] = Form.useForm();
  useEffect(() => {
    if (listIdProduct) {
      setFormsData(
        listIdProduct.reduce((acc: any, id: any) => {
          acc[id] = {
            rating: 5,
            content: "",
            image: "",
            ...(InForCommentId?.id === id && {
              rating: InForCommentId?.rating,
              content: InForCommentId?.content || "",
              image: InForCommentId?.image || "",
            }),
          };
          return acc;
        }, {})
      );
    }
  }, [listIdProduct, InForCommentId]);

  const postCommentProduct = useMutation({
    mutationFn: async (data: Icomments) => {
      const res = await instance.post("/comment", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Bình luận thành công");
      setFormsData(
        listIdProduct.reduce((acc: any, id: any) => {
          acc[id] = { rating: 5, content: "", image: "" };
          return acc;
        }, {})
      );
      form.resetFields();
      setShowFormCmtOpen(false);
      setInForCommentId(null);
      setEditIdComment(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Sửa bình luận thành công");
      setFormsData(
        listIdProduct.reduce((acc: any, id: any) => {
          acc[id] = { rating: 5, content: "", image: "" };
          return acc;
        }, {})
      );
      form.resetFields();
      setShowFormCmtOpen(false);
      setInForCommentId(null);
      setEditIdComment(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  const propImgComment: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dn94v5jkq/image/upload",
    data: {
      upload_preset: "fashion-sales",
      folder: "fashion_sales",
    },
    onChange(info) {
      if (info?.file?.status === "done") {
        const productId = info.file?.uid;
        setFormsData((prev: any) => ({
          ...prev,
          [productId]: {
            ...prev[productId],
            image: info.file.response.url,
          },
        }));
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={() => {
          listIdProduct?.map((id: any) => {
            const { rating, content, image } = formsData[id];
            const payload = {
              rating,
              content,
              image,
              product_id: id,
            };
            if (editIdComment && InForCommentId) {
              updateComment.mutate({
                data: payload as Icomments,
                editIdComment,
              });
            } else {
              postCommentProduct.mutate(payload as Icomments);
            }
          });
        }}
        className="m-auto w-full max-w-lg p-6 bg-white shadow-lg rounded-lg"
      >
        <h1 className="font-semibold lg:text-2xl text-base mb-4 text-center">
          {editIdComment ? "Sửa đánh giá" : "Đánh giá sản phẩm"}
        </h1>

        {listIdProduct?.map((id: number) => {
          const product = listInForProducts?.find(
            (product: any) => product.product_id === id
          );

          return (
            <div key={id}>
              {product && (
                <Link to={`/products/${product.product_id}`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={product.product_img}
                      alt={product.product_name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <h3 className="text-md font-semibold">
                      Sản phẩm:  <span>{product.product_name}</span>
                    </h3>
                  </div>
                </Link>
              )}

              <label className="mb-2 block lg:text-sm text-[10px] font-medium text-gray-700">
                Chất lượng sản phẩm:
              </label>
              <Form.Item className="mb-4">
                <Rate
                  value={formsData[id]?.rating}
                  onChange={(value) => handleStateUpdate(id, "rating", value)}
                  count={5}
                />
              </Form.Item>
              <label className="mb-2 block lg:text-sm text-[10px] font-medium text-gray-700">
                Nhận xét:
              </label>
              <Form.Item className="mb-4">
                <TextArea
                  value={formsData[id]?.content}
                  onChange={(e) =>
                    handleStateUpdate(id, "content", e.target.value)
                  }
                  rows={3}
                />
              </Form.Item>

              <label className="block lg:text-sm text-[10px] font-medium text-gray-700 mr-4">
                Tải hình ảnh lên:
              </label>
              <Form.Item name="image" className="flex items-start">
                <div>
                  <Upload
                    {...propImgComment}
                    showUploadList={false}
                    onChange={(info) => {
                      if (info.file.status === "done") {
                        handleStateUpdate(id, "image", info.file.response.url);
                      }
                    }}
                    onRemove={() => handleStateUpdate(id, "image", null)}
                  >
                    <Button className="mt-2" icon={<UploadOutlined />}>
                      {formsData[id]?.image ? "Tải ảnh khác" : "Tải lên ảnh"}
                    </Button>
                  </Upload>
                  {formsData[id] && formsData[id].image && (
                    <div className="mb-8 mt-4 group">
                      <div className="relative w-[100px] h-[100px]">
                        <img
                          src={formsData[id].image}
                          alt="Uploaded"
                          className="absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-200 group-hover:opacity-50"
                        />
                        <button
                          onClick={() => handleStateUpdate(id, "image", null)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:text-brown-500 transition-opacity duration-200"
                          title="Xóa ảnh"
                        >
                          <DeleteOutlined style={{ fontSize: "20px" }} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Form.Item>

              {errors && <div className="text-red-600">{errors.image}</div>}
              <hr className="my-4" />
            </div>
          );
        })}

        <div className="flex justify-center items-center">
          <Button type="primary" htmlType="submit">
            {editIdComment ? "Cập nhật" : "Đánh giá"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CommentProduct;
