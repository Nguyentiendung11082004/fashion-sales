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
     <div></div>
    </>
  );
};

export default HistoryReturnRequests;
