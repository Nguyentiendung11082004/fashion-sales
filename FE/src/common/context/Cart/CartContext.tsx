import React, { ReactNode, createContext, useContext, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import instance from '@/configs/axios';
import { toast } from 'react-toastify';

interface CartContextType {
    data: any;
    isLoading: boolean;
    addToCart: (idProduct: number, idProductVariant: number) => void;
    handleIncrease: (idCart: number, currentQuantity: number) => void;
    handleDecrease: (idCart: number, currentQuantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth();
    const queryClient = useQueryClient();
    const [error, setError] = useState(null)
    const { data, isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await instance.get('/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        },
    });
    const addCartMutation = useMutation({
        mutationFn: async ({ idProduct, idProductVariant }: { idProduct: number, idProductVariant: number }) => {
            await instance.post(`/cart`, {
                product_id: idProduct,
                product_variant_id: idProductVariant,
                quantity: 1
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart']
            })
            toast.success("Thêm vào giỏ hàng thành công")
        },
        onError: (message: any) => {
            toast.error(message?.response?.data?.message, {
                autoClose: 5000,
            })
        }
    });

    const addToCart = (idProduct: number, idProductVariant: number) => {
        addCartMutation.mutate({ idProduct, idProductVariant });
    };
    const updateQuantity = useMutation({
        mutationFn: async ({ idCart, newQuantity }: { idCart: number; newQuantity: number }) => {
            await instance.put(`/cart/${idCart}`, {
                quantity: newQuantity,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
    const handleIncrease = (idCart: number, currentQuantity: number) => {
        const newQuantity = currentQuantity + 1;
        updateQuantity.mutate({ idCart, newQuantity });
    };

    const handleDecrease = (idCart: number, currentQuantity: number) => {
        const newQuantity = currentQuantity - 1;
        updateQuantity.mutate({ idCart, newQuantity });
    };

    return (
        <CartContext.Provider value={{ data, isLoading, addToCart, handleIncrease, handleDecrease }}>
            {children}
        </CartContext.Provider>
    );
};
