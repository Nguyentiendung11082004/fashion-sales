import { useAuth } from "@/common/context/Auth/AuthContext";
import Smile from "@/components/icons/thanks/Smile";
import ThanksIcon from "@/components/icons/thanks/ThanksIcon";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Thanks = () => {
  const { token } = useAuth();
  // const location = useLocation();
  // location.state?._payload = null;
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, []);

  return (
    <div className="container">
      <div className="flex my-20 items-center justify-center">
        <div>
          <div className="flex flex-col items-center space-y-2">
            <ThanksIcon />
            <h1 className="text-4xl font-bold text-center">Cảm ơn !</h1>
            <p className="text-center">
              Cảm ơn bạn đã quan tâm! Kiểm tra email của bạn để biết liên kết
              đến hướng dẫn.
            </p>
            {token ? (
              <Link
                to="/history-order"
                className="inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                <Smile />
                <span className="text-sm font-medium"> Xem đơn hàng </span>
              </Link>
            ) : (
              <Link
                to="/order_lookup"
                className="inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                <Smile />
                <span className="text-sm font-medium"> Tra cứu đơn hàng </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
