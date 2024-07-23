import { Route, Routes } from "react-router-dom";
import LayoutWebsite from "../pages/client/layout";
import HomePage from "../pages/client/home/HomePage";
import LayoutAdmin from "@/pages/admin/layout";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import About from "@/pages/client/about/About";
import Cart from "@/pages/client/cart/Cart";
import Account from "@/pages/client/account/Account";
import Checkout from "@/pages/client/checkout/Checkout";
import Contact from "@/pages/client/contact/Contact";
import ProductDetail from "@/pages/client/productDetail/ProductDetail";
import HistoryOrder from "@/pages/client/historyOrder/HistoryOrder";
import NotFound from "@/pages/client/notfound/NotFound";
import Login from "@/pages/client/login/Login";
import Register from "@/pages/client/register/Register";
import Products from "@/pages/client/products/Products";
import ForgotPassword from "@/pages/client/forgotpassword/ForgotPassword";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="account" element={<Account />} />
          <Route
            path="account/:id/forgotpassword"
            element={<ForgotPassword />}
          />
          <Route path="checkout" element={<Checkout />} />
          <Route path="contact" element={<Contact />} />
          <Route path="history-order" element={<HistoryOrder />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
