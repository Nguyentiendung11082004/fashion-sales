import { useAuth } from "@/common/context/Auth/AuthContext";
import { ResponseWishlist } from "@/common/types/responseDataFilter";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

interface WishlistContextType {
  data: ResponseWishlist[] | undefined;
  isInWishlist: (product_id: number | string) => boolean;
  handleAddToWishlist: (product: { id: number | string }) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({children}: {children: React.ReactNode}) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const navigate = useNavigate(); 
  const [localWishlist, setLocalWishlist] = useState<Set<number | string>>(new Set());

  const { data } = useQuery<ResponseWishlist[]>({
    queryKey: ["productsData", token],
    queryFn: async () => {
      const response = await instance.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    },
  });
  //   console.log(data);

  const mutationAdd = useMutation({
    mutationFn: async ({ product_id }: { product_id: number | string }) => {
      const response = await instance.post(
        `/wishlist`,
        { product_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsData", token] });
    },
    onError: (error) => {
      console.error("Thêm vào danh sách yêu thích thất bại:", error);
    },
  });

  const isInWishlist = (product_id: number | string): boolean => {
    return (
      localWishlist.has(product_id) ||
      (data?.some((item) => item.product.id === product_id) ?? false)
    );
  };  

  const handleAddToWishlist = (product: { id: number | string }) => {
    const newProductId = product.id;

    // Cập nhật trạng thái địa phương ngay lập tức
    setLocalWishlist((prev) => {
      const updatedWishlist = new Set(prev);
      if (updatedWishlist.has(newProductId)) {
        updatedWishlist.delete(newProductId);
      } else {
        updatedWishlist.add(newProductId);
      }
      return updatedWishlist;
    });

    // Thực hiện cuộc gọi API
    if (!isInWishlist(newProductId)) {
      mutationAdd.mutate({ product_id: newProductId });
    } else {
      navigate("/wishlist");
    }
  };


  return (
    <WishlistContext.Provider
      value={{ data, isInWishlist, handleAddToWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};