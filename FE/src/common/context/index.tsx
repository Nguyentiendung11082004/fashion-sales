import React, { ReactNode } from "react";
import { AuthProvider } from "./Auth/AuthContext";
import { CartProvider } from "./Cart/CartContext";
import { UserProvider } from "./User/UserContext";
import { WishlistProvider } from "./Wishlist/WishlistContext";

export const AppContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
            <WishlistProvider>
                {children}
            </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
};
