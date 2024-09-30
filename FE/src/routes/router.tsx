import CategoryPage from "@/pages/admin/category/Category";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import LayoutAdmin from "@/pages/admin/layout";
import ProductPageManager from "@/pages/admin/products/page";
import About from "@/pages/client/about/About";
import Account from "@/pages/client/account/Account";
import Cart from "@/pages/client/cart/Cart";
import Checkout from "@/pages/client/checkout/Checkout";
import Contact from "@/pages/client/contact/Contact";
import ForgotPassword from "@/pages/client/forgotpassword/ForgotPassword";
import HistoryOrder from "@/pages/client/historyOrder/HistoryOrder";
import Login from "@/pages/client/login/Login";
import NotFound from "@/pages/client/notfound/NotFound";
import ProductDetail from "@/pages/client/productDetail/ProductDetail";
import Products from "@/pages/client/products/Products";
import Register from "@/pages/client/register/Register";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/client/home/HomePage";
import LayoutWebsite from "../pages/client/layout";
<<<<<<< HEAD
import CommentPage from "@/pages/admin/comments/Comments";
import UserPage from "@/pages/admin/user/User";
=======
import CommentPage from "@/pages/admin/comment/Comment";
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
import OrderPage from "@/pages/admin/order/Order";
import Tags from "@/pages/admin/tags/Tags";
import FormTag from "@/pages/admin/tags/_components/TagForm";
import ProductForm from "@/pages/admin/products/_components/ProductForm";
<<<<<<< HEAD
import CategoryForm from "@/pages/admin/category/_components/CategoryForm";
import ProductDetailAdmin from "@/pages/admin/products/_components/ProductDetail";
import AttributeItem from "@/pages/admin/attribute/attribute-item/page";
import AttributeItemValues from "@/pages/admin/attribute/attribute-item-values/page";
import BrandForm from "@/pages/admin/brands/_components/BrandForm";
import Brands from "@/pages/admin/brands/Brands";

=======
import ClientPage from "@/pages/admin/account/client/Client";
import EmployeePage from "@/pages/admin/account/employee/Employee";
import FormClient from "@/pages/admin/account/client/components/FormClient";
import FormEmployee from "@/pages/admin/account/employee/components/FormEmployee";
>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0

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
          <Route path="products" element={<ProductPageManager />} />
          <Route path="products/:id" element={<ProductDetailAdmin />} />
          <Route path="products/create" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="categories/create" element={<CategoryForm />} />
          <Route path="categories/edit/:id" element={<CategoryForm />} />
          <Route path="attributes" element={<AttributeItem />} />
          <Route path="attribute-values" element={<AttributeItemValues />} />
          <Route path="comment" element={<CommentPage />} />
<<<<<<< HEAD
          <Route path="category" element={<CategoryPage />} />
          <Route path="comments" element={<CommentPage />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brands/create" element={<BrandForm />} />
          <Route path="brands/edit/:id" element={<BrandForm />} />
          <Route path="user" element={<UserPage />} />
=======
          <Route path="clients" element={<ClientPage />} />
          <Route path="clients/create" element={<FormClient />} />
          <Route path="clients/edit/:id" element={<FormClient />} />
          <Route path="employees" element={<EmployeePage />} />
          <Route path="employees/create" element={<FormEmployee />} />
          <Route path="employees/edit/:id" element={<FormEmployee />} />

>>>>>>> 597b39cfaaeb4344fbc505f49f7445aaf9fd21f0
          <Route path="order" element={<OrderPage />} />
          <Route path="tags" element={<Tags />} />
          <Route path="tags/create" element={<FormTag />} />
          <Route path="tags/edit/:id" element={<FormTag />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Router;
