/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Icomments } from "@/common/types/comments";
import { productShow_client } from "@/services/api/client/productClient.api";
import { Skeleton } from "antd";

const CommentPageDetail = ({ productId }: { productId: number }) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  useEffect(() => {
    const fetchProductAndComments = async () => {
      setLoading(true);
      try {
        const response = await productShow_client(productId);
        setProduct(response.product);
      } catch (error) {
        console.error("Call api thất bại", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndComments();
  }, [productId]);

  if (loading) {
    return <Skeleton />;
  }

  const comments = product?.comments || [];
  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / commentsPerPage);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full">
      {currentComments.length === 0 ? (
        <p>Chưa có bình luận nào.</p>
      ) : (
        currentComments.map((comment: Icomments) => (
          <div className="border py-4 mb-4" key={comment.id}>
            <div className="flex items-center">
              <img
                className="w-[60px] h-[60px] rounded-full mr-4"
                alt="avatar-user"
                src={comment.user?.avatar ?? "https://via.placeholder.com/60"}
              />
              <div>
                <span className="font-semibold">
                  {comment.user?.name ?? "Người dùng"}
                </span>
                <div className="mt-2 flex">
                  {[...Array(comment.rating || 0)].map((_, index) => (
                    <span key={index} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs mt-2">
                  {comment.created_at ?? "DD-MM-YYYY"}
                </p>
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

      {totalComments > 0 && (
        <div className="container text-center mt-[20px] text-gray-500 lg:text-sm text-xs">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`hover:text-[red] px-4 ${currentPage === 1 ? "text-gray-300" : ""}`}
          >
            Pre
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-4 py-2 border border-gray-400 
              ${currentPage === index + 1 ? "bg-gray-200 font-bold" : ""}
              hover:bg-gray-100 hover:text-red-500 transition-all`}
              style={{ width: "40px", height: "40px", borderRadius: "4px" }}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`hover:text-[red] px-4 ${currentPage === totalPages ? "text-gray-300" : ""}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentPageDetail;
