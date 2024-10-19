import { useAuth } from "@/common/context/Auth/AuthContext";
import { ResponseWishlist } from "@/common/types/responseDataFilter";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";

interface WishlistContextType {
  data: ResponseWishlist[] | undefined;
  isInWishlist: (product_id: number) => boolean;
  handleAddToWishlist: (product: { id: number }) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({children}: {children: React.ReactNode}) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const navigate = useNavigate(); 

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
    mutationFn: async ({ product_id }: { product_id: number }) => {
      const response = await instance.post(
        `/wishlist`,
        { product_id }, // Gửi product_id để thêm sản phẩm vào wishlist
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

  // Hàm kiểm tra xem sản phẩm đã có trong danh sách yêu thích hay chưa
  const isInWishlist = (product_id: number): boolean => {
    return data?.some((item) => item.product.id === product_id) ?? false;
  };
  
  
  const handleAddToWishlist = (product: { id: number }) => {
    if (isInWishlist(product.id)) {
      navigate("/wishlist");
    } else {
      mutationAdd.mutate({ product_id: product.id });
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
