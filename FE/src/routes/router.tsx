import ClientPage from "@/pages/admin/account/client/Client";
import FormClient from "@/pages/admin/account/client/components/FormClient";
import EmployeePage from "@/pages/admin/account/employee/Employee";
import FormEmployee from "@/pages/admin/account/employee/components/FormEmployee";
import AttributeItemValues from "@/pages/admin/attribute/attribute-item-values/page";
import AttributeItem from "@/pages/admin/attribute/attribute-item/page";
import Banners from "@/pages/admin/banners/Banners";
import BannersForm from "@/pages/admin/banners/components/BannersForm";
import Brands from "@/pages/admin/brands/Brands";
import BrandForm from "@/pages/admin/brands/_components/BrandForm";
import CategoryPage from "@/pages/admin/category/Category";
import CategoryForm from "@/pages/admin/category/_components/CategoryForm";
import Chatbox from "@/pages/admin/chatbox/Chatbox";
import CommentPage from "@/pages/admin/comments/Comments";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import LayoutAdmin from "@/pages/admin/layout";
import OrderPage from "@/pages/admin/order/Order";
import Posts from "@/pages/admin/posts/Posts";
import FormPost from "@/pages/admin/posts/components/FormPost";
import ProductDetailAdmin from "@/pages/admin/products/_components/ProductDetail";
import ProductForm from "@/pages/admin/products/_components/ProductForm";
import ProductPageManager from "@/pages/admin/products/page";
import Tags from "@/pages/admin/tags/Tags";
import FormTag from "@/pages/admin/tags/_components/TagForm";
import About from "@/pages/client/about/About";
import Account from "@/pages/client/account/Account";
import ForgotPassword from "@/pages/client/auth/forgotpassword/ForgotPassword";
import Login from "@/pages/client/auth/login/Login";
import Register from "@/pages/client/auth/register/Register";
import ResetPassword from "@/pages/client/auth/resetpassword/ResetPassword";
import Cart from "@/pages/client/cart/Cart";
import Checkout from "@/pages/client/checkout/Checkout";
import Contact from "@/pages/client/contact/Contact";
import HistoryOrder from "@/pages/client/historyOrder/HistoryOrder";
import NotFound from "@/pages/client/notfound/NotFound";
import ProductDetail from "@/pages/client/productDetail/ProductDetail";
import Products from "@/pages/client/products/Products";
import Wishlist from "@/pages/client/wishlist/Wishlist";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/client/home/HomePage";
import LayoutWebsite from "../pages/client/layout";
import { PasswordResetHandler } from "@/pages/client/auth/resetpassword/PasswordResetHandler";
import Vouchers from "@/pages/admin/vouchers/Vouchers";
import VoucherDetail from "@/pages/admin/vouchers/components/VoucherDetail";
import FormVoucher from "@/pages/admin/vouchers/components/FormVoucher";
import Order from "@/pages/client/order";
import Thanks from "@/pages/client/thanks/Thanks";
import Permission from "@/pages/client/auth/permission";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="" element={<Permission />}>
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="account" element={<Account />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="contact" element={<Contact />} />
          <Route path="thank" element={<Thanks />} />

          <Route path="history-order" element={<HistoryOrder />} />
          <Route path="/order" element={<Order />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="account/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/password/reset/:token"
          element={<PasswordResetHandler />}
        />
        <Route path="password/reset" element={<ResetPassword />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductPageManager />} />
          <Route path="products/:id" element={<ProductDetailAdmin />} />
          <Route path="products/create" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="categories/create" element={<CategoryForm />} />
          <Route path="categories/edit/:id" element={<CategoryForm />} />
          <Route path="attributes" element={<AttributeItem />} />
          <Route path="attribute-values" element={<AttributeItemValues />} />
          <Route path="clients" element={<ClientPage />} />
          <Route path="clients/create" element={<FormClient />} />
          <Route path="employees" element={<EmployeePage />} />
          <Route path="employees/create" element={<FormEmployee />} />
          <Route path="employees/edit/:id" element={<FormEmployee />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="comments" element={<CommentPage />} />
          <Route path="clients" element={<ClientPage />} />
          <Route path="clients/create" element={<FormClient />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brands/create" element={<BrandForm />} />
          <Route path="brands/edit/:id" element={<BrandForm />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="tags" element={<Tags />} />
          <Route path="tags/create" element={<FormTag />} />
          <Route path="tags/edit/:id" element={<FormTag />} />
          <Route path="clients" element={<ClientPage />} />
          <Route path="clients/create" element={<FormClient />} />
          <Route path="employees" element={<EmployeePage />} />
          <Route path="employees/create" element={<FormEmployee />} />
          <Route path="employees/edit/:id" element={<FormEmployee />} />
          <Route path="banners" element={<Banners />} />
          <Route path="banners/create" element={<BannersForm />} />
          <Route path="banners/edit/:id" element={<BannersForm />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/create" element={<FormPost />} />
          <Route path="posts/edit/:id" element={<FormPost />} />
          <Route path="chatbox" element={<Chatbox />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="vouchers/:id" element={<VoucherDetail />} />
          <Route path="vouchers/create" element={<FormVoucher />} />
          <Route path="vouchers/edit/:id" element={<FormVoucher />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
