import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/website/Header";
import Footer from "../../components/website/Footer";

const LayoutWebsite = () => {
  const location = useLocation();
  const hideFooterRoutes = [
    "/requestOrder",
    "/return/request_order",
    "/history-order/return_requests",
  ];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div>
      <Header />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default LayoutWebsite;
