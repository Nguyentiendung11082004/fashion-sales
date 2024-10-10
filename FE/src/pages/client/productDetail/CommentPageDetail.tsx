/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Icomments } from "@/common/types/comments";
import { productShow_client } from "@/services/api/client/productClient.api";
import { Skeleton } from "antd";

const CommentPageDetail = ({ productId }: { productId: number }) => {
  const [comments, setComments] = useState<Icomments[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await productShow_client(productId);
        setComments(response.product.comments || []);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="w-full">
      {comments.length === 0 ? (
        <p>Chưa có bình luận nào.</p>
      ) : (
        comments.map((comment) => (
          <div className="border py-4 mb-4" key={comment.id}>
            <div className="flex items-center">
              <img
                className="w-[60px] h-[60px] rounded-full mr-4"
                alt="avatar-user"
                src={
                  (comment.user_id as any)?.user?.image ??
                  "https://via.placeholder.com/60"
                }
              />
              <div>
                <span className="font-semibold">
                  {(comment.user_id as any)?.user?.name || "Người dùng"}
                </span>
                <div className="mt-2 flex">
                  {[...Array(comment.rating || 0)].map((_, index) => (
                    <span key={index} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs mt-2">2024-01-01</p>
              </div>
            </div>
            <div className="mt-4 ml-[75px]">
              <p>{comment.content}</p>
              {comment.image && (
                <img
                  className="my-4 w-[150px] h-[150px]"
                  src={comment.image}
                  alt="Hình ảnh từ người mua đánh giá"
                />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentPageDetail;
