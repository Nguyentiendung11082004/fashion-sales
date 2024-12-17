/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/common/context/Auth/AuthContext";
import { useUser } from "@/common/context/User/UserContext";
import {
  notifyOrdersChanged,
  useRealtimeOrders,
} from "@/common/hooks/useRealtimeOrders";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input, Modal, Table } from "antd";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommentProduct from "../../productDetail/CommentProduct";
import ReasonReturn from "../../requestOrder/components/ReasonReturn";

const HistoryReturnRequests = () => {
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const [currentCancelOrderId, setCurrentCancelOrderId] = useState<
    number | null
  >(null);
  const { user } = useUser();
  const dataUser = user?.InforUser;
  const [tempName, setTempName] = useState<string | undefined>(dataUser?.name);
  const [tempEmail, setTempEmail] = useState<string | undefined>(
    dataUser?.email
  );
  // const [receivedOrders, setReceivedOrders] = useState<number[]>([]);
  // const [ratedOrders, setRatedOrders] = useState<number[]>([]);
  const [isCancelPopupOpen, setCancelPopupOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const { data, isFetching, isError } = useQuery({
    queryKey: ["return-requests"],
    queryFn: async () => {
      const response = await instance.get("user/return-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    // refetchInterval: 2000,
  });
  useRealtimeOrders();

  const location = useLocation();
  const checkRequest = location.state?.checkRequest;

  const cancelOrder = async ({
    id,
    reason,
  }: {
    id: number;
    reason: string;
  }) => {
    const payload = {
      order_status: "Đã hủy",
      user_note: reason,
    };
    const response = await instance.put(`/order/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history-order"] });
      toast.success("Đơn hàng đã được hủy thành công!");
      setCancelPopupOpen(false);
      notifyOrdersChanged();
    },
    onError: () => {
      toast.error("Hủy đơn hàng thất bại.");
    },
  });
  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrders(
      (prev) =>
        prev.includes(orderId)
          ? prev.filter((id) => id !== orderId) // Nếu đã mở, thì đóng
          : [...prev, orderId] // Nếu chưa mở, thì mở
    );
  };

  const completeOrder = async (id: number) => {
    const payload = {
      order_status: "Hoàn thành",
    };
    console.log("Payload being sent:", payload);
    const response = await instance.put(`/order/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { mutate: mutateOk } = useMutation({
    mutationFn: completeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history-order"] });
      // toast.success("Đơn hàng đã hoàn thành!");
      notifyOrdersChanged();
    },
    onError: () => {
      console.log("Lỗi!");
    },
  });

  const { mutate: mutateReorder } = useMutation({
    mutationFn: async (id: number) => {
      const response = await instance.post(
        "/cart",
        { order_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // setSelectedItems(data.items);
      navigate("/cart");
      notifyOrdersChanged();
    },
    onError: () => {
      console.log("Lỗi!");
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const showOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const columns = [
    {
      title: "Mục",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Nội dung",
      dataIndex: "value",
      key: "value",
    },
  ];
  // if (isFetching) return <div>Loading...</div>;

  //  đánh giá sản phẩm
  const [InForCommentId, setInForCommentId] = useState<string | null>(null);

  const [listIdProduct, setListIdProduct] = useState<any[]>([]);
  const [listInForProducts, setListInForProducts] = useState<any[]>([]);

  const [isShowFormCmtOpen, setShowFormCmtOpen] = useState(false);
  const showFormCmt = (order: any) => {
    console.log("data order nè : ", order);
    setShowFormCmtOpen(true);
    setSelectedOrder(order);

    const listIdProducts = order?.order_details?.map(
      (detail: any) => detail.product_id
    );

    const listInForProducts = order?.order_details?.map((detail: any) => {
      return {
        product_id: detail.product_id,
        product_img: detail.product_img,
        product_name: detail.product_name,
      };
    });

    setListIdProduct(listIdProducts || []);
    setListInForProducts(listInForProducts || []);
  };

  const closeFormCmt = () => {
    setShowFormCmtOpen(false);
  };

  //  hoàn hàng
  const [dataOrderRequest, setDataOrderRequest] = useState({});
  const [reason, setReason] = useState<string | null>(null);
  const [visiable, setVisible] = useState(false);
  const handleOpenFormReason = (order: any) => {
    setVisible(true);
    setDataOrderRequest(order);
  };
  const handleCloseFormReason = () => {
    setVisible(false);
  };

  const handleGetReturnRequest = (id: number) => {
    navigate(`return_requests`, { state: { id } });
  };

  console.log("data lịch sử đơn hàng: ", data?.data);

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const productsPerPage = 6; // Mỗi trang có 12 sản phẩm
  const totalProducts = data?.length || 0; // Tổng số sản phẩm

  // Tính toán các sản phẩm hiển thị trên trang hiện tại

  //   const indexOfLastProduct = currentPage * productsPerPage;
  //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //   const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);
  // Tính số trang
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  // Hàm để chuyển trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const pusher = new Pusher("4d3e0d70126f2605977e", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("orders");
    pusher.connection.bind("connected", () => {
      console.log("Connected to Pusher!");
    });
    channel.bind("order.updated", (newOrder: any) => {
      queryClient.invalidateQueries({ queryKey: ["history-order"] });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [queryClient]);

  return (
    <>
      <main
        id="main-content"
        className="min-h-fit !shadow-none !outline-0 block isolate *:box-border"
      >
        {/*end hd-page-head*/}
        <div className="hd-account-body max-w-5xl w-full mx-auto px-4 text-[14px] lg:my-[80px] my-[50px]">
          {/*end hd-account-head*/}
          <div className="hd-account-content pt-[30px] mx-auto">
            <div className="hd-ct-text">
              <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-8">
                <h2 className="lg:mb-[50px] mb-[30px] lg:mt-[25px] text-2xl font-semibold uppercase flex-grow">
                  Lịch sử mua hàng
                </h2>
                <Link
                  to="/historyReturnRequests"
                  className={`block py-[1rem] px-[1.5rem] text-center rounded-md transition-all ${
                    isActive("/historyReturnRequests")
                      ? "border-b-[3px] border-[#00BADB] text-[#00BADB]"
                      : "text-gray-600 hover:text-[#00BADB]"
                  }`}
                >
                  Lịch sử hoàn hàng
                </Link>
              </div>

              {data?.data?.map((order: any) => {
                console.log("data id đang tìm: ", order);
                const isExpanded = expandedOrders.includes(order.id);
                console.log("isExpanded:", isExpanded);
                const isDelivered =
                  order.status.toLowerCase() === "giao hàng thành công";
                const isCancelOk =
                  order.status.trim().toLowerCase() === "đang chờ xác nhận" ||
                  order.status.trim().toLowerCase() === "đã xác nhận";
                const canCel = order.status.trim().toLowerCase() === "đã hủy"; //
                const shipOk =
                  order.status.trim().toLowerCase() === "đang vận chuyển";
                const complete =
                  order.status.trim().toLowerCase() === "hoàn thành"; //
                const requestReturn =
                  order.status.trim().toLowerCase() === "yêu cầu hoàn trả hàng";
                const completedReturn =
                  order.status.trim().toLowerCase() === "hoàn trả hàng"; //

                const handleCancelClick = (id: number, status: string) => {
                  if (!isCancelOk) {
                    toast.warning(
                      "Không thể hủy đơn hàng ở trạng thái hiện tại!"
                    );
                    return;
                  }

                  setCurrentCancelOrderId(id);
                  setCancelPopupOpen(true);
                };

                const handleConfirmCancel = () => {
                  if (!cancelReason.trim()) {
                    toast.error("Vui lòng nhập lý do hủy đơn hàng.");
                    return;
                  }

                  if (currentCancelOrderId !== null) {
                    mutate({ id: currentCancelOrderId, reason: cancelReason });
                    // setCancelReason("");
                    // Xóa lý do sau khi hủy
                  }
                };

                const disableCmt: any[] = [];

                return (
                  <div
                    key={order.id}
                    className="border border-slate-200 rounded-lg overflow-hidden z-0 mb-[30px]"
                  >
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="hd-head-form-order w-full flex sm:flex-row justify-between lg:justify-between sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5"
                    >
                      <div className="flex items-center">
                        <button className="text-base">
                          {isExpanded ? "▼" : "▲"}{" "}
                        </button>
                        {order?.items?.map((value: any) => {
                          <>
                            <p className="text-base font-semibold mx-2">
                              {value[0]?.order?.order_code}
                            </p>
                            ;<p className="text-2xl relative mr-2">|</p>
                            <span className="text-[#00BADB] uppercase font-medium text-base">
                              {value[0]?.order?.order_status}
                            </span>
                          </>;
                        })}
                      </div>
                      <div className="">
                        <button
                          onClick={() => showOrderDetails(order)}
                          className="nc-Button border relative h-auto inline-flex items-center justify-center rounded-full transition-colors hover:font-medium py-2.5 px-4 sm:px-6 ttnc-ButtonSecondary dark:bg-[#00BADB] dark:text-white bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </button>
                    {/*end hd-head-form-order*/}
                    <div className="hd-body-form-order border-b border-t border-slate-200 p-2 sm:p-8">
                      {order?.items?.length > 0 && (
                        <div
                          className="flex py-4 sm:py-7 last:pb-0 first:pt-0"
                          key={order.items[0].id}
                        >
                          <div className="relative sm:w-20 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            <img
                              alt={
                                order?.items[0]?.order_detail[0]?.product_name
                              }
                              loading="lazy"
                              decoding="async"
                              data-nimg="fill"
                              className="block absolute align-middle inset-0 h-full w-full object-cover object-center"
                              sizes="100px"
                              src={
                                order?.items[0]?.order_detail[0]?.product_img
                              }
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="text-lg font-medium line-clamp-1 flex items-center">
                                    <span>
                                      {
                                        order?.items[0]?.order_detail[0]
                                          ?.product_name
                                      }
                                    </span>
                                    <span className="ml-4 text-sm text-red">
                                      {order?.status === "rejected" && (
                                        <p className="text-[red]">
                                          Yêu cầu hoàn trả bị từ chối
                                        </p>
                                      )}
                                      {order?.status === "completed" && (
                                        <p className="text-[red]">
                                          Yêu cầu hoàn trả được chấp nhận
                                        </p>
                                      )}
                                      {order?.status === "pending" && (
                                        <p className="text-[red]">
                                          Đang gửi yêu cầu hoàn trả hàng
                                        </p>
                                      )}
                                    </span>
                                  </h3>

                                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    {order?.items?.map((value: any) => {
                                      <>
                                        {value?.order?.order_detail.map(
                                          (dataDetail: any) =>
                                            dataDetail?.map(
                                              (dataOrderDetail: any) => {
                                                {
                                                  dataOrderDetail?.attributes &&
                                                    Object.entries(
                                                      order.order_details[0]
                                                        .attributes
                                                    ).length > 0 && (
                                                      <>
                                                        Phân loại hàng:
                                                        {Object.entries(
                                                          order.order_details[0]
                                                            .attributes
                                                        ).map(
                                                          ([key, value]) => (
                                                            <li key={key}>
                                                              {Array.isArray(
                                                                value
                                                              )
                                                                ? value.join(
                                                                    ", "
                                                                  )
                                                                : typeof value ===
                                                                      "object" &&
                                                                    value !==
                                                                      null
                                                                  ? Object.values(
                                                                      value
                                                                    ).join(", ")
                                                                  : String(
                                                                      value
                                                                    )}
                                                            </li>
                                                          )
                                                        )}
                                                        <div className="mt-[1.7px]">
                                                          <div className="flex items-center text-sm font-medium">
                                                            {/* <del className="mr-1">{detail.price}đ</del> */}
                                                            <span className="text-base">
                                                              {/* {FormatMoney(detail.price)}₫ */}
                                                              {new Intl.NumberFormat(
                                                                "vi-VN"
                                                              ).format(
                                                                order
                                                                  .order_details[0]
                                                                  .price
                                                              )}
                                                              ₫
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </>
                                                    );
                                                }
                                              }
                                            )
                                        )}
                                      </>;
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500 dark:text-slate-400 flex items-center">
                                <span className="inline-block">x</span>
                                <span className="ml-2">
                                  {order.order_details[0].quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {isExpanded && order.order_details.length > 1 && (
                        <div className="divide-y divide-y-slate-20 border-t pt-8">
                          {order.order_details.slice(1).map((detail: any) => (
                            <div
                              className="flex py-4 sm:py-7 last:pb-0 first:pt-0 "
                              key={detail.id}
                            >
                              <div className="relative sm:w-20 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                <img
                                  alt={detail.product_name}
                                  loading="lazy"
                                  decoding="async"
                                  data-nimg="fill"
                                  className="block absolute align-middle inset-0 h-full w-full object-cover object-center"
                                  sizes="100px"
                                  src={detail.product_img}
                                />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between">
                                    <div>
                                      <h3 className="text-lg font-medium line-clamp-1">
                                        {detail.product_name}
                                      </h3>

                                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {detail.attributes &&
                                          Object.entries(detail.attributes)
                                            .length > 0 && (
                                            <>
                                              {Object.entries(
                                                detail.attributes
                                              ).map(([key, value]) => (
                                                <li key={key}>
                                                  {Array.isArray(value)
                                                    ? value.join(", ")
                                                    : typeof value ===
                                                          "object" &&
                                                        value !== null
                                                      ? Object.values(
                                                          value
                                                        ).join(", ")
                                                      : String(value)}
                                                </li>
                                              ))}
                                            </>
                                          )}
                                      </p>
                                    </div>
                                    <div className="mt-[1.7px]">
                                      <div className="flex items-center text-sm font-medium">
                                        <span className="text-base">
                                          {new Intl.NumberFormat(
                                            "vi-VN"
                                          ).format(detail.price)}
                                          ₫
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500 dark:text-slate-400 flex items-center">
                                    <span className="inline-block">x</span>
                                    <span className="ml-2">
                                      {detail.quantity}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/*end hd-body-form-order*/}
                    <div className="hd-head-form-order flex sm:flex-row justify-between lg:justify-between sm:justify-between sm:items-center p-4 sm:p-8">
                      <div className="mt-3 sm:mt-0">
                        <div className="flex items-center space-x-2">
                          {(isDelivered || requestReturn || shipOk) && (
                            <>
                              <button
                                className={`nc-Button mr-3 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm py-2.5 px-4 sm:px-6 bg-[#00BADB]  font-medium ${
                                  shipOk
                                    ? "bg-gray-200 text-gray-400 border cursor-pointer border-gray-300"
                                    : "text-white"
                                }`}
                                onClick={() => mutateOk(order.id)}
                                disabled={shipOk}
                              >
                                Đã Nhận Hàng
                              </button>

                              {requestReturn && (
                                <button
                                  className={`nc-Button mr-3 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm py-2.5 px-4 sm:px-6 bg-[#00BADB] font-medium ${
                                    shipOk
                                      ? "bg-gray-200 text-gray-400 border cursor-pointer border-gray-300"
                                      : "text-white"
                                  }`}
                                  disabled={shipOk}
                                  onClick={() =>
                                    handleGetReturnRequest(
                                      order?.return_requests[0]?.id
                                    )
                                  }
                                >
                                  Chi tiết hoàn trả
                                </button>
                              )}
                            </>
                          )}

                          {order?.return_requests[0]?.status ===
                            "completed" && (
                            <button
                              className={`nc-Button mr-3 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm py-2.5 px-4 sm:px-6 bg-[#00BADB] font-medium ${
                                shipOk
                                  ? "bg-gray-200 text-gray-400 border cursor-pointer border-gray-300"
                                  : "text-white"
                              }`}
                              disabled={shipOk}
                              onClick={() =>
                                handleGetReturnRequest(
                                  order?.return_requests[0]?.id
                                )
                              }
                            >
                              Chi tiết hoàn trả
                            </button>
                          )}
                          {complete && (
                            <>
                              <button
                                className="nc-Button mr-3 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm py-2.5 px-4 sm:px-6 bg-[#00BADB] text-white font-medium"
                                onClick={() => {
                                  showFormCmt(order);
                                }}
                              >
                                Đánh Giá
                              </button>
                              <Modal
                                visible={isShowFormCmtOpen}
                                onCancel={closeFormCmt}
                                footer={null}
                                centered
                              >
                                <CommentProduct
                                  selectedOrder={selectedOrder}
                                  listIdProduct={listIdProduct}
                                  InForCommentId={InForCommentId}
                                  isShowFormCmtOpen={isShowFormCmtOpen}
                                  listInForProducts={listInForProducts}
                                  setShowFormCmtOpen={setShowFormCmtOpen}
                                />
                              </Modal>
                            </>
                          )}

                          {order?.return_requests[0]?.status === "rejected" && (
                            <button
                              className={`nc-Button mr-3 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm py-2.5 px-4 sm:px-6 bg-[#00BADB] font-medium ${
                                shipOk
                                  ? "bg-gray-200 text-gray-400 border cursor-pointer border-gray-300"
                                  : "text-white"
                              }`}
                              disabled={shipOk}
                              onClick={() =>
                                handleGetReturnRequest(
                                  order?.return_requests[0]?.id
                                )
                              }
                            >
                              Chi tiết hoàn trả
                            </button>
                          )}

                          {isCancelOk && (
                            <button
                              className={`nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm py-2.5 px-4 sm:px-6 ttnc-ButtonSecondary ${
                                isCancelOk
                                  ? "bg-[#00BADB] text-white font-medium"
                                  : "bg-gray-200 text-slate-400 border cursor-pointer border-gray-300"
                              }`}
                              onClick={() =>
                                handleCancelClick(order.id, order.order_status)
                              }
                              disabled={canCel}
                            >
                              Xác Nhận Hủy
                            </button>
                          )}

                          {(canCel || complete || completedReturn) && (
                            <button
                              className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm py-2.5 px-4 sm:px-6 bg-[#00BADB] text-white font-medium"
                              onClick={() => mutateReorder(order.id)}
                            >
                              Mua Lại
                            </button>
                          )}
                          {complete && (
                            <>
                              <button
                                className={`nc-Button mr-3 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm py-2.5 px-4 sm:px-6 bg-[#00BADB]  font-medium ${
                                  shipOk
                                    ? "bg-gray-200 text-gray-400 border cursor-pointer border-gray-300"
                                    : "text-white"
                                }`}
                                disabled={shipOk}
                                onClick={() => handleOpenFormReason(order)}
                              >
                                Yêu cầu trả hàng
                              </button>
                              <ReasonReturn
                                open={visiable}
                                onClose={handleCloseFormReason}
                                dataOrderRequest={dataOrderRequest}
                              />
                            </>
                          )}
                        </div>

                        <Modal
                          title="Lý do hủy đơn hàng"
                          open={isCancelPopupOpen}
                          onOk={handleConfirmCancel}
                          onCancel={() => setCancelPopupOpen(false)}
                          okText="Gửi"
                          cancelText="Hủy"
                          maskStyle={{
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <Input.TextArea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Nhập lý do hủy..."
                            rows={4}
                          />
                        </Modal>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-2">Thành tiền: </p>
                        <span className="text-[red] font-medium text-xl">
                          {/* {FormatMoney(order.total)}đ */}
                          {new Intl.NumberFormat("vi-VN").format(
                            order.total
                          )}₫
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* phân trang  */}
              {totalProducts > productsPerPage && (
                <div className="pagination flex justify-center mt-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-gray-100 rounded"
                  >
                    Quay lại
                  </button>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 mx-1 ${
                        currentPage === pageNumber
                          ? "text-black"
                          : "text-gray-300"
                      } rounded`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 bg-gray-100 rounded"
                  >
                    Chuyển tiếp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HistoryReturnRequests;