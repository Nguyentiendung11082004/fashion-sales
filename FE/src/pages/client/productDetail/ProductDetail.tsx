/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import { useCart } from "@/common/context/Cart/CartContext";
import { useUser } from "@/common/context/User/UserContext";
import instance from "@/configs/axios";
import { categoriesShow } from "@/services/api/admin/categories";
import {
  findProductVariant,
  productShow_client,
} from "@/services/api/client/productClient.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Less from "../../../components/icons/detail/Less";
import CommentProduct from "./CommentProduct";
import RelatedProducts from "./RelatedProducts";
import ReplyComment from "./ReplyComment";
import Loading from "@/common/Loading/Loading";
import HeartRedPopup from "@/components/icons/detail/HeartRedPopup";
import HeartBlack from "@/components/icons/detail/HeartBlack";
import { useWishlist } from "@/common/context/Wishlist/WishlistContext";

interface IinitialAttributes {
  [key: string]: string;
}
const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const [product, setProduct] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const { handleAddToWishlist, isInWishlist } = useWishlist();

  // sửa bình luận
  const closeFormCmt = () => {
    setShowFormCmtOpen(false);
  };
  const [listIdProduct, setListIdProduct] = useState<any[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        return await productShow_client(`${id}`);
      } catch (error) {
        throw new Error("Không có sản phẩm nào phù hợp");
      }
    },
  });

  const getUniqueAttributes = data?.getUniqueAttributes;
  useEffect(() => {
    if (data && data.product) {
      setProduct(data.product);
    }
  }, [data]);

  const categoryId = product?.category_id;

  const { data: categoryData } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      if (!categoryId) return "";
      return await categoriesShow(`${categoryId}`);
    },
  });

  const categoryName = categoryData?.name || "";

  // Hiển thị bình luận của khách hàng về sản phẩm

  const comments = data?.product?.comments;

  // người dùng xóa, sửa bình luận

  // thông tin user đăng nhập
  const { user } = useUser();
  const idUser = user?.InforUser.id;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (commentId) => {
      await instance.delete(`/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (commentId) => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Xoá thành công");
    },
    onError: () => {
      toast.error("Xoá thất bại");
    },
  });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments?.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const totalPages = Math.ceil(comments?.length / commentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Trạng thái lưu các bình luận cha đã mở
  const [openComments, setOpenComments] = useState(new Set());

  const toggleChildComments = (commentId: any) => {
    const updatedOpenComments = new Set(openComments);
    if (updatedOpenComments.has(commentId)) {
      updatedOpenComments.delete(commentId);
    } else {
      updatedOpenComments.add(commentId);
    }
    setOpenComments(updatedOpenComments);
  };

  // Hàm render bình luận
  const renderComments = (
    comments: any,
    level = 0,
    displayedComments = new Set(),
    parentName = ""
  ) => {
    if (!Array.isArray(comments)) return null;

    const sortedComments = [...comments].sort((a, b) => {
      if (a.user_id === idUser && b.user_id !== idUser) return -1;
      else if (a.user_id !== idUser && b.user_id === idUser) return 1;
      return 0;
    });

    return sortedComments.map((comment) => {
      if (displayedComments.has(comment.id)) return null;
      displayedComments.add(comment.id);
      // setListIdProduct([comment?.id]);

      const isChild = level >= 3;
      const hasChildren =
        comment.children_recursive && comment.children_recursive.length > 0;
      const isOpen = openComments.has(comment.id);

      return (
        <div key={comment.id} className="">
          <div
            className={`py-4 mb-2 ${isChild ? "mt-2 border-none" : "border-2 border-gray-200"}`}
            style={{ marginLeft: isChild ? "0px" : `${level * 50}px` }}
          >
            <div className="flex items-start">
              <img
                className={`w-10 h-10 border-black rounded-full mr-4 border-2`}
                alt="avatar-user"
                src={comment?.user?.avatar || "https://via.placeholder.com/40"}
              />
              <div className="flex flex-col">
                <p className="font-bold mr-2">{comment?.user?.name}</p>
                {level === 0 && (
                  <p className="text-xs">
                    {comment?.created_at
                      ? dayjs(comment.created_at).format("DD-MM-YYYY")
                      : ""}
                  </p>
                )}
                {level === 0 && (
                  <div className="flex">
                    {[...Array(comment?.rating || 0)].map((_, index) => (
                      <span key={index} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-2">
                  {level > 0 && parentName && (
                    <span className="font-bold">{parentName} </span>
                  )}
                  {comment?.content}
                </p>
                {comment?.image && (
                  <img
                    className="my-4 w-[150px] h-[150px]"
                    alt="Hình ảnh từ người mua"
                    src={comment.image}
                  />
                )}
              </div>
            </div>

            <div className="pl-[60px]">
              <button
                onClick={() =>
                  handleReplyClick(comment?.id, comment?.parent_id)
                }
                className="font-bold text-[12px] text-blue-500 mr-2"
              >
                Trả lời
              </button>
              {comment?.user_id === idUser && (
                <>
                  <button
                    onClick={() => {
                      setListIdProduct([comment?.id]),
                        onHandleEdit(comment?.id, comment);
                    }}
                    className="font-bold text-[12px] text-blue-500 mr-2"
                  >
                    Sửa
                  </button>
                  <Modal
                    visible={isShowFormCmtOpen}
                    onCancel={closeFormCmt}
                    footer={null}
                    centered
                  >
                    <CommentProduct
                      listIdProduct={listIdProduct}
                      setListIdProduct={setListIdProduct}
                      editIdComment={editIdComment}
                      InForCommentId={InForCommentId}
                      isShowFormCmtOpen={isShowFormCmtOpen}
                      dataProductIdQuery={data}
                      setShowFormCmtOpen={setShowFormCmtOpen}
                    />
                  </Modal>
                  <Popconfirm
                    title="Xóa sản phẩm"
                    description="Bạn chắc chắn muốn xóa không?"
                    onConfirm={() => mutate(comment?.id)}
                    okText="Có"
                    cancelText="Không"
                  >
                    <button className="font-bold text-[12px] text-blue-500 mr-2">
                      Xóa
                    </button>
                  </Popconfirm>
                </>
              )}
            </div>

            {replyToCommentId === comment.id && (
              <ReplyComment
                productId={productId}
                InForCommentId={InForCommentId}
                setReplyToCommentId={setReplyToCommentId}
                replyToCommentId={replyToCommentId}
              />
            )}

            {hasChildren && (
              <button
                onClick={() => toggleChildComments(comment.id)}
                className="text-blue-500 mt-2 pl-[59px] text-sm font-semibold"
              >
                {isOpen
                  ? "Ẩn phản hồi"
                  : `Hiện ${comment.children_recursive.length} phản hồi`}
              </button>
            )}

            {isOpen &&
              hasChildren &&
              comment.children_recursive.map((childComment: any) => (
                <div key={childComment.id}>
                  {renderComments(
                    [childComment],
                    level + 1,
                    displayedComments,
                    comment.user.name
                  )}
                </div>
              ))}
          </div>
        </div>
      );
    });
  };
  const [activeButton, setActiveButton] = useState("details");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  const galleryImages = product?.galleries || [];
  const imgPr = product?.img_thumbnail;

  useEffect(() => {
    if (imgPr) {
      setSelectedImage(imgPr);
    }
  }, [imgPr, galleryImages]);

  const handleGalleryClick = (image: string) => {
    setSelectedImage(image);
    setMainImage(image);
  };
  const { token } = useAuth();

  // thêm vào giỏ hàng

  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const { addToCart } = useCart();
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const onHandleAddToCart = (
    idProduct: any,
    idProductVariant: any,
    quantity: any
  ) => {
    if (data.getUniqueAttributes == 0) {
      idProductVariant = undefined;
    }
    addToCart(idProduct, idProductVariant, quantity);
  };

  // selectAttribute
  const [selectedAttributes, setSelectedAttributes] = useState<{
    product_variant: Record<string, string | number>;
  }>({
    product_variant: {},
  });

  const handleAttributeSelect = (attribute: any, id: any) => {
    setSelectedAttributes((prev: any) => ({
      ...prev,
      [attribute]: id,
    }));
  };

  const result = product?.variants
    .filter(
      (variant: any) =>
        variant.attributes &&
        variant.attributes.length > 0 &&
        variant.quantity > 0
    )
    .map((variant: any) => {
      const attributeObj = variant.attributes.reduce(
        (acc: { [key: string]: string }, attribute: any) => {
          acc[attribute.name] = attribute.pivot.attribute_item_id.toString();
          return acc;
        },
        {}
      );
      return attributeObj;
    });

  const checkDisable = (attribute: string, value: any) => {
    let res = false;

    let matchingItems = result?.filter((x: any) => {
      return Object.keys(selectedAttributes.product_variant).every((key) => {
        if (key !== attribute) {
          return (
            x[key] &&
            x[key].toString() ===
              selectedAttributes?.product_variant[key].toString()
          );
        }
        return true;
      });
    });

    let isAttributeValid = matchingItems?.some(
      (x: any) => x[attribute] && x[attribute].toString() === value.toString()
    );

    res = !isAttributeValid;

    return res;
  };

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (result && result.length > 0 && isInitialLoad) {
      setSelectedAttributes({ product_variant: result[0] });
      setIsInitialLoad(false);
    }
  }, [result, isInitialLoad]);

  useEffect(() => {
    const fetchProductVariant = async () => {
      try {
        const variant = await findProductVariant(productId, selectedAttributes);
        if (variant.findProductVariant) {
          setProduct((prevProduct: any) => ({
            ...prevProduct,
            ...variant.findProductVariant,
          }));

          if (variant.findProductVariant.image) {
            setMainImage(variant.findProductVariant.image);
          }
        } else {
          setMainImage(product?.img_thumbnail);
        }
      } catch (error) {
        console.log("Call api thất bại", error);
      }
    };
    fetchProductVariant();
  }, [selectedAttributes]);

  const resultGetUniqueAttribute = Object.entries(
    getUniqueAttributes ?? {}
  ).map(([key, value]) => ({
    attribute: key,
    attributeValue: Object.entries(value ?? {}).map(([id, name]) => ({
      id,
      name,
    })),
  }));
  const [isShowFormCmtOpen, setShowFormCmtOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("resultGetUniqueAttribute", resultGetUniqueAttribute);
  console.log("getUniqueAttributes", getUniqueAttributes);

  const [editIdComment, setEditIdComment] = useState<string | null>(null);
  const [InForCommentId, setInForCommentId] = useState<string | null>(null);

  console.log("InForCommentId: ", InForCommentId);

  const onHandleEdit = (id: any, value: any) => {
    if (value.parent_id) {
      setReplyToCommentId(id);
    } else {
      setIsModalOpen(true);

      setShowFormCmtOpen(true);
      setEditIdComment(id);
    }
    setInForCommentId(value);
  };

  const [replyToCommentId, setReplyToCommentId] = useState(null);

  const handleReplyClick = (commentId: any, parent_id: any) => {
    setReplyToCommentId(commentId);
    if (parent_id) {
      setReplyToCommentId(commentId);
    }
    setInForCommentId("");
  };

  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const img = imgRef.current;
    if (img) {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      containerRef.current.scrollTop += e.deltaY;
    }
  };

  if (isLoading) return <Loading />;
  // if (isError) return <p>{error.message}</p>;

  return (
    <>
      <div>
        <div className="hd-detail-head bg-[#f6f6f6]">
          <div className="container h-[55px] flex items-center">
            <span className="text-[13px]">Trang chủ</span>
            <Less />
            <Link to="">
              <span className="text-[13px] text-[#222]">{categoryName}</span>
            </Link>
            <Less />
            <span className="text-[13px] text-gray-500">{product?.name}</span>
          </div>
        </div>

        <div className="container py-10 lg:flex">
          <div className="w-full lg:w-[55%] ">
            <div className="lg:flex lg:gap-3">
              <div className="lg:w-4/5 h-full w-full lg:order-2">
                <div
                  className="group lg:w-[500px] lg:h-[500px] h-full relative overflow-hidden"
                  onMouseMove={handleMouseMove}
                >
                  <img
                    ref={imgRef}
                    alt="product detail"
                    data-nimg="fill"
                    className="w-full lg:h-[100%] h-full lg:w-[500px] object-cover transition-transform ease-in-out duration-300 group-hover:scale-150"
                    src={mainImage || selectedImage}
                    // src={selectedImage}
                  />
                </div>
              </div>

              {/* galleries */}
              <div
                className="  lg:order-1 hd-img-soft lg:w-1/5 w-full lg:h-[500px] max-h-[500px] overflow-x-auto lg:overflow-y-auto flex lg:flex-col flex-row"
                onWheel={handleWheel}
                ref={containerRef}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style>
                  {`.hd-img-soft::-webkit-scrollbar {display: none;}`}
                </style>
                {galleryImages.length > 0 ? (
                  galleryImages.map((value: any) => (
                    <img
                      key={value.id}
                      // alt={`Gallery image ${value.id}`}
                      className="mb-2 w-24 h-[150px] lg:w-auto flex-shrink-0 cursor-pointer"
                      src={value.image}
                      onClick={() => handleGalleryClick(value.image)}
                    />
                  ))
                ) : (
                  <p>No images available</p> // Hoặc bạn có thể thay thế bằng placeholder khác
                )}
              </div>
              {/* end galleries */}
            </div>
          </div>

          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10 ">
            <div className="h-full">
              <div>
                <h2 className="text-[16px] xl:text-start sm:text-center sm:text-3xl mb-3 ">
                  {product?.name}
                </h2>
                <div className="flex items-center mt-5 lg:mx-[15%] sm:mx-[42%] xl:mx-0 sm:mt-2 space-x-4">
                  <div className="">
                    <span className="lg:text-[18px] sm:text-[16px] text-lg text-[#747474] my-2">
                      {product?.price_sale?.toLocaleString("vi-VN")} ₫
                    </span>
                  </div>

                  <div className="h-7 border-l border-slate-300 dark:border-slate-700 lg:block xl:block block sm:hidden"></div>
                  <div className="flex items-center lg:block xl:block sm:hidden">
                    <Link
                      to="#reviews"
                      className="flex items-center text-sm font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="w-5 h-5 pb-[1px] text-yellow-400"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <div className="ml-1.5 flex">
                        <span>4</span>
                        <span className="block mx-2">.</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <p className="mt-1 hd-all-text grey text-sm">
                  {product?.description_title}
                </p>
              </div>
              <div>
                <div className="mt-2">
                  {resultGetUniqueAttribute.map((key) => {
                    return (
                      <div key={key.attribute} className="mb-4">
                        <label className="flex items-center">
                          <span className="font-medium">{key.attribute}:</span>
                          {selectedAttributes.product_variant[key.attribute] !==
                            undefined && (
                            <span className="ml-2">
                              {key.attributeValue
                                .find(
                                  (item) =>
                                    item.id ===
                                    selectedAttributes.product_variant[
                                      key.attribute
                                    ]
                                )
                                ?.name.toLowerCase()}
                            </span>
                          )}
                        </label>
                        <div className="flex mt-3 gap-2">
                          {key.attributeValue.map((item) => {
                            const isDisabled = checkDisable(
                              key.attribute,
                              item.id
                            );
                            const isSelected =
                              selectedAttributes.product_variant[
                                key.attribute
                              ] === item.id;

                            return (
                              <div
                                key={item.id}
                                className={`relative flex-1 max-w-[70px] h-6 sm:h-9 rounded-full cursor-pointer flex items-center justify-center
                                   ${
                                     isSelected
                                       ? "border-gray-800 border-2"
                                       : isDisabled
                                         ? "border-gray-200 border-2 opacity-50 cursor-not-allowed"
                                         : ""
                                   }`}
                                style={{
                                  backgroundColor:
                                    key.attribute === "color"
                                      ? item.name
                                      : "transparent",
                                }}
                                onClick={() => {
                                  if (!isDisabled) {
                                    handleAttributeSelect(
                                      key.attribute,
                                      item.id
                                    );
                                    setSelectedAttributes((prev) => ({
                                      ...prev,
                                      product_variant: {
                                        ...prev.product_variant,
                                        [key.attribute]: item.id,
                                      },
                                    }));
                                  }
                                }}
                              >
                                {key.attribute !== "color" && (
                                  <div className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden z-0 bg-gray-300 text-[8px] md:text-base text-center">
                                    {item.name}
                                  </div>
                                )}
                                {key.attribute === "color" && (
                                  <div className="absolute inset-0 rounded-full overflow-hidden z-0 object-cover bg-cover border-2 border-gray-200">
                                    <span className="text-sm md:text-base text-center"></span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="font-medium mt-2 mb-2">số lượng: </div>

              <div className="flex space-x-3.5 items-center lg:ml-0 sm:ml-[40px]">
                <div className="flex items-center  justify-center sm:pr-3.5 rounded-full">
                  <div className="nc-NcInputNumber flex items-center justify-between space-x-3 w-full border border-black px-2 py-2 rounded-full">
                    <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28 ">
                      <button
                        className="flex items-center justify-center bg-slate-100/70 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 "
                        type="button"
                        onClick={decreaseQuantity}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <span className="select-none block flex-1 text-center font-semibold">
                        {quantity}
                      </span>
                      <button
                        className="flex items-center justify-center bg-white focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                        type="button"
                        onClick={increaseQuantity}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    onHandleAddToCart(id, product?.id, quantity);
                  }}
                  className={`h-11 w-full px-2 py-2 rounded-full ...`}
                  disabled={isLoading}
                >
                  <svg
                    className="hidden lg:hidden xl:block sm:inline-block w-5 h-5 mb-0.5"
                    viewBox="0 0 9 9"
                    fill="none"
                  >
                    <path
                      d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z"
                      fill="currentColor"
                    ></path>

                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="xl:ml-3 ml-1 lg:text-base xl:text-base">
                    Thêm vào giỏ hàng
                  </span>
                </Button>

                <br />
                <button onClick={() => handleAddToWishlist(data.product)}>
                  {isInWishlist(data.product.id) ? (
                    <HeartRedPopup />
                  ) : (
                    <HeartBlack />
                  )}
                </button>
              </div>
              {/* mua ngay */}
              <button className=" nc-Button relative right-2 h-11 w-full inline-flex items-center justify-center rounded-full text-sm sm:text-base font-medium sm:py-3.5 sm:px-2 lg:px-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 text-md mt-3 border bg-[#222222] text-white">
                <span className="xl:ml-3 ml-1 lg:text-base xl:text-base">
                  Mua ngay
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* chi tiết */}

        <div className="w-full bg-[#f6f6f8]">
          <div className="container py-[45px]">
            <div className="w-[100%] text-center m-auto flex justify-center">
              <button
                onClick={() => {
                  handleButtonClick("details");
                  setEditIdComment(null);
                  setInForCommentId(null);
                  setReplyToCommentId(null);
                  setInForCommentId("");
                }}
                className={`${
                  activeButton === "details"
                    ? "border-black text-black border-2"
                    : " text-[#8e8e8e]"
                } font-medium cursor-pointer lg:text-base text-[10px] lg:py-2 lg:px-6 px-2 py-2 rounded-full`}
              >
                Chi tiết sản phẩm
              </button>
              <button
                onClick={() => {
                  handleButtonClick("reviews");
                  setEditIdComment(null);
                  setInForCommentId(null);
                  setReplyToCommentId(null);
                  setInForCommentId("");
                }}
                className={`${
                  activeButton === "reviews"
                    ? "border-black text-black border-2"
                    : "border-black text-[#8e8e8e]"
                } btn_cmt text-[10px] lg:text-base font-medium cursor-pointer lg:py-2 lg:px-6 px-2 py-2 rounded-full`}
              >
                Xem đánh giá sản phẩm
              </button>
            </div>

            <div className="mt-[20px] w-full">
              {activeButton === "details" && (
                <div className="detail_pageDetail flex flex-col lg:text-base text-[10px]">
                  <p className="py-2 relative">
                    <span className="text-[#9b9791] mr-[200px]">Danh mục:</span>
                    <span className="absolute left-[200px] font-medium">
                      {categoryName}
                    </span>
                  </p>
                  <p className="py-2 relative">
                    <span className="text-[#9b9791] mr-[200px]">
                      Mã sản phẩm:
                    </span>
                    <span className="absolute left-[200px] font-medium">
                      {product?.sku}
                    </span>
                  </p>
                  <p className="py-2 relative">
                    <span className="text-[#9b9791] mr-[200px]">
                      Tình trạng:
                    </span>
                    <span className="absolute left-[200px] font-medium">
                      {product && product.quantity > 0 ? (
                        <span className="">Còn hàng</span>
                      ) : (
                        <span className="">Hết hàng</span>
                      )}
                    </span>
                  </p>
                  <p className="py-2 relative">
                    <span className="text-[#9b9791] mr-[200px]">
                      Thương hiệu:
                    </span>
                    <span className="absolute left-[200px] font-medium">
                      {(product as any)?.brand?.name || ""}
                    </span>
                  </p>

                  <div className="w-full mt-4">
                    <h1 className="font-semibold text-xl pb-2">
                      Mô tả sản phẩm: {product?.description_title}
                    </h1>
                    <p>{product?.description}</p>
                  </div>
                </div>
              )}
              {activeButton === "reviews" && (
                <div className="w-full">
                  {comments?.length === 0 ? (
                    <p>Chưa có bình luận nào.</p>
                  ) : (
                    <div>
                      <div>{renderComments(currentComments)}</div>

                      <div className="flex justify-center mt-4">
                        <button
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                        >
                          Trang trước
                        </button>
                        <span className="mx-4">
                          Trang {currentPage} / {totalPages}
                        </span>
                        <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                        >
                          Trang tiếp
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeButton === "comment" && (
                <CommentProduct
                  productId={productId}
                  setEditIdComment={setEditIdComment}
                  editIdComment={editIdComment}
                  InForCommentId={InForCommentId}
                  setInForCommentId={setInForCommentId}
                  dataProductIdQuery={data}
                />
              )}
            </div>
          </div>
        </div>
        <RelatedProducts />
      </div>
    </>
  );
};

export default ProductDetail;
