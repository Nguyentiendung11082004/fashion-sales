import { useAuth } from '@/common/context/Auth/AuthContext';
import Smile from '@/components/icons/thanks/Smile';
import ThanksIcon from '@/components/icons/thanks/ThanksIcon';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Thanks = () => {
  // const location = useLocation();
  // location.state?._payload = null;
  const { token } = useAuth()
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, []);

  return (
    <div className="container">
      <div className="flex my-20 items-center justify-center">
        <div>
          <div className="flex flex-col items-center space-y-2">
            <ThanksIcon />
            <h1 className="text-4xl font-bold text-center text-green-600">Cảm ơn bạn đã mua hàng!</h1>
            <p className="text-center text-lg text-gray-600 mt-2">
              Chúng tôi rất vui mừng khi bạn đã chọn chúng tôi. Đơn hàng của bạn đang được xử lý và sẽ được giao trong thời gian sớm nhất.
            </p>
            <p className="text-center text-lg text-gray-600 mt-2">
              Hãy kiểm tra email để biết thêm thông tin về đơn hàng. Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi!
            </p>
            <p className="text-center text-lg text-gray-600 mt-2">
              Đừng quên theo dõi chúng tôi trên các mạng xã hội để cập nhật những ưu đãi và sản phẩm mới nhất!
            </p>
            {!token && <p className="text-center text-lg font-semibold text-gray-800 mt-4">
              Chúng tôi mong được phục vụ bạn trong những lần mua sắm tiếp theo.
              <Link
                to="/order_lookup"
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                Tại đây
              </Link>
            </p>}
            {token ? <Link to="/history-order" className="inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring">
              <Smile />
              <span className="text-sm font-medium"> Xem đơn hàng </span>
            </Link> : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thanks