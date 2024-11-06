import React, { useEffect, useState } from "react";
import LogoIcon from "@/assets/images/logo-icon.png";

const LiveChat = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleMouseEnter = () => {
    setShowMessage(true);
  };
  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  const handleCloseChat = () => setShowConfirmation(true); 
  const resetChat = () => {
    setIsChatOpen(false); // Đóng cửa sổ chat
    setShowConfirmation(false); // Ẩn thông báo xác nhận
  };

  useEffect(() => {
    if (isChatOpen) {
      // open
    }
  }, [isChatOpen]);

  return (
    <>
      {/* Nút LiveChat */}
      <div className="relative">
        <div
          onClick={() => setIsChatOpen(true)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed bottom-8 right-8 w-14 h-14 bg-black rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50 group transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>

          {/* Dấu chấm tĩnh */}
          <div className="absolute flex space-x-1 group-hover:hidden">
            <span className="w-[5px] h-[5px] bg-white rounded-full"></span>
            <span className="w-[5px] h-[5px] bg-white rounded-full"></span>
            <span className="w-[5px] h-[5px] bg-white rounded-full"></span>
          </div>

          {/* Dấu chấm chuyển động khi hover */}
          <div className="absolute flex space-x-1 opacity-0 group-hover:opacity-100">
            <span className="w-[5px] h-[5px] bg-white rounded-full group-hover:animate-bounce1"></span>
            <span className="w-[5px] h-[5px] bg-white rounded-full group-hover:animate-bounce2"></span>
            <span className="w-[5px] h-[5px] bg-white rounded-full group-hover:animate-bounce3"></span>
          </div>
        </div>
        {/* Thông báo khi hover vào nút LiveChat */}
        {showMessage && (
          <div
            className={`fixed bottom-[45px] right-24 z-40 transform transition-transform duration-300 ease-in-out animate-slide-in `}
          >
            <span className="bg-black text-white rounded-full px-4 py-2">
              Xin chào! Bạn cần hỗ trợ gì?
            </span>
          </div>
        )}
      </div>

      {/* Cửa sổ LiveChat */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-7 w-[360px] h-[480px] bg-white shadow-lg border border-gray-300 rounded-lg z-50">
          <div className="bg-gradient-to-r from-black to-[#00BABD] text-white flex justify-between items-center px-4 py-2 rounded-t-lg">
            <h2 className="font-bold text-lg">Mix & Match</h2>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsChatOpen(false)}
                className="mr-2 mt-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              </button>
              <button className=""
              onClick={handleCloseChat}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-4 pt-6 h-[370px] overflow-y-auto">
            <div className="flex justify-end mb-4">
              <div className="bg-gradient-to-r from-[#a9d5d6] to-gray-200 text-black p-3 rounded-3xl rounded-tr-none inline-block max-w-[87%] break-words">
                <p>Bắt đầu</p>
              </div>
            </div>

            <div className="flex mb-4">
              <img
                src={LogoIcon}
                alt="logo"
                className="w-[26px] h-[26px] mr-3"
              />
              <div className="bg-gradient-to-r from-black to-slate-800 text-white p-3 rounded-3xl rounded-tl-none inline-block max-w-[90%] break-words">
                <p>
                  Để được hỗ trợ tốt nhất, Anh/Chị vui lòng cho biết đã sử dụng
                  sản phẩm/dịch vụ nào chưa ạ?
                </p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <div className="bg-gradient-to-r from-[#a9d5d6] to-gray-200 text-black p-3 rounded-3xl rounded-tr-none inline-block max-w-[87%] break-words">
                <p>Bắt đầuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu</p>
              </div>
            </div>

            <div className="flex mb-4">
              <img
                src={LogoIcon}
                alt="logo"
                className="w-[26px] h-[26px] mr-3"
              />
              <div className="bg-gradient-to-r from-black to-slate-800 text-white p-3 rounded-3xl rounded-tl-none inline-block max-w-[90%] break-words">
                <p>
                  Để được hỗ trợ tốt nhất, Anh/Chị vui lòng cho biết đã sử dụng
                  sản phẩm/dịch vụ nào chưa ạ? Hoặc nếu chưa, Anh/Chị muốn biết
                  thêm thông tin gì ạ?
                </p>
              </div>
            </div>
          </div>

          <div className="border-t px-1 py-[6px] flex items-center">
            <button className="p-2 -mr-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </button>

            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
                transform="rotate(-45)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                />
              </svg>
            </button>

            <textarea
              placeholder="Nhập tin nhắn"
              className="w-full bg-gray-100 rounded-full px-4 py-2 resize-none overflow-hidden max-h-[100px] outline-none focus:ring-2 focus:ring-gray-100"
              rows={1}
            ></textarea>
            <button className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
              <svg
                color="inherit"
                viewBox="0 0 32 32"
                aria-hidden="true"
                className="size-8"
              >
                <path d="M9.05674797,7.10056554 L9.13703813,7.13553157 L25.4390381,15.1015316 L25.5284558,15.1506535 L25.6286153,15.2222405 C25.7452987,15.313793 25.8339182,15.4266828 25.895416,15.5505399 L25.9423517,15.6622033 L25.9751927,15.7773803 L25.9891204,15.8509608 L25.998657,15.9475578 L25.9972397,16.0748669 L25.9800642,16.201216 L25.9701282,16.2435678 C25.9550365,16.3071288 25.9331784,16.3694784 25.9050831,16.4294253 L25.8937351,16.4490792 C25.8488724,16.5422577 25.7878083,16.6290528 25.7112518,16.7055442 L25.609137,16.7931281 L25.539527,16.8424479 L25.4390381,16.8984684 L9.05674797,24.8994345 C8.4880852,25.1179893 7.84373932,24.9716543 7.42618713,24.5298922 C7.02348961,24.1049956 6.89354829,23.48994 7.08502271,22.9526995 L9.44381329,15.9994998 L7.08997091,9.06153122 C6.90991684,8.5560159 7.00409914,7.99707209 7.33051276,7.58090053 L7.4252609,7.47108641 C7.84373932,7.02834566 8.4880852,6.8820107 9.05674797,7.10056554 Z M20.6761421,16.9994644 L11.2161421,16.9994644 L9.33681329,22.5404998 L20.6761421,16.9994644 Z M9.33581329,9.45749977 L11.2161421,14.9994644 L20.6761421,14.9994644 L9.33581329,9.45749977 Z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Thông báo xác nhận */}
      {showConfirmation && (
        <div className="fixed bottom-[149px] right-7 w-[360px] h-[370px] bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Bạn muốn kết thúc cuộc trò chuyện?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowConfirmation(false)} // Hủy bỏ thông báo
                className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={resetChat} // Đóng và reset cuộc trò chuyện
                className="px-3 py-1 bg-gradient-to-r from-black to-[#00BABD] text-white rounded-lg hover:bg-red-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
