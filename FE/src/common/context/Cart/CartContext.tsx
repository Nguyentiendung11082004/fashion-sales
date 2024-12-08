/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useState } from "react";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../Auth/AuthContext";
import { toast } from "react-toastify";
// const MySwal = withReactContent(Swal);

interface CartContextType {
  data: any;
  isLoading: boolean;
  activateCart: () => void;
  addToCart: (
    idProduct: number,
    idProductVariant: number,
    quantity: number
  ) => void;
  handleIncrease: (idCart: number, currentQuantity: number) => void;
  handleDecrease: (idCart: number, currentQuantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (token) {
        const res = await instance.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      }
    },
    enabled: !!token && isActive,
  });

  const activateCart = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  const addCartMutation = useMutation({
    mutationFn: async ({
      idProduct,
      idProductVariant,
      quantity,
    }: {
      idProduct: number;
      idProductVariant?: number;
      quantity?: number;
    }) => {
      await instance.post(
        `/cart`,
        {
          product_id: idProduct,
          product_variant_id: idProductVariant,
          quantity: quantity || 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      if (!isActive) {
        setIsActive(true);
      }
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
      // MySwal.fire({
      //   title: <strong>Chúc mừng!</strong>,
      //   icon: "success",
      //   text: "Thêm vào giỏ hàng thành công",
      //   timer: 1000,
      //   timerProgressBar: true,
      //   showConfirmButton: false,
      // });
    },
    onError: (message: any) => {
      toast.error(message?.response?.data?.message);
      // MySwal.fire({
      //   title: <strong>Thất bại</strong>,
      //   icon: "error",
      //   text: `${message?.response?.data?.message}`,
      //   timer: 2000,
      //   timerProgressBar: true,
      //   showConfirmButton: false,
      // });
    },
  });

  const addToCart = (
    idProduct: number,
    idProductVariant: number,
    quantity: number
  ) => {
    activateCart();
    addCartMutation.mutate({ idProduct, idProductVariant, quantity });
  };

  const updateQuantity = useMutation({
    mutationFn: async ({
      idCart,
      newQuantity,
    }: {
      idCart: number;
      newQuantity: number;
    }) => {
      await instance.put(
        `/cart/${idCart}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleIncrease = (idCart: number, currentQuantity: number) => {
    activateCart();
    const newQuantity = currentQuantity + 1;
    updateQuantity.mutate({ idCart, newQuantity });
  };

  const handleDecrease = (idCart: number, currentQuantity: number) => {
    activateCart();
    const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
    updateQuantity.mutate({ idCart, newQuantity });
  };

  return (
    <CartContext.Provider
      value={{
        data,
        isLoading,
        activateCart,
        addToCart,
        handleIncrease,
        handleDecrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
