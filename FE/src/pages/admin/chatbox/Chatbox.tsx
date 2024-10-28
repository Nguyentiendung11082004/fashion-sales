import React from "react";
import UserAvata from "@/assets/images/user1.jpg"

const Chatbox = () => {
  return (
    <div className="flex-1 h-[calc(100vh-60px)] flex overflow-hidden">
      {/* Sidebar Left */}
      <div className="w-1/4 bg-gray-50 p-4 border-r">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full p-2 rounded-lg mb-4 focus:outline-none border text-black"
        />
        <div className="space-y-4 overflow-y-auto">
          {/* Chat List Items */}
          <div className="flex items-center space-x-2">
            <img
              src={UserAvata}
              alt="Avatar"
              className=" w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="font-bold">Nguyễn Thắng Lo</p>
              <p className="text-sm text-gray-500">OK a</p>
            </div>
            <span className="bg-blue-400 px-2 py-1 rounded-md text-xs">
              Zalo
            </span>
          </div>
          {/* More items... */}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/4 p-4 bg-white border-r border-gray-300 flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Yến</h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">
            Đóng chat
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto">
          {/* Messages */}
          <div className="text-left">
            <p className="font-bold">Yến</p>
            <p>mình cần tư vấn MiDesk</p>
            <span className="text-sm text-gray-400">12/08/21 11:23 AM</span>
          </div>
          <div className="text-right">
            <p className="font-bold">Bạn</p>
            <p>da chị cho em xin số ạ?</p>
            <span className="text-sm text-gray-400">12/08/21 11:34 AM</span>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Viết trả lời..."
            className="w-full p-2 rounded-l-lg border focus:outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
            Gửi
          </button>
        </div>
      </div>

      {/* Customer Info */}
      <div className="w-1/4 p-4 bg-gray-50 ">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div>
            <h3 className="text-xl font-bold">Ms Yến</h3>
            <p>myyen@example.com</p>
            <p>098111</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-bold">Thông tin khác</h4>
          <p>MY Company</p>
          <p>Hôm nay</p>
          <div className="mt-2 text-sm text-gray-500">
            <p>IP: 10.10.103.252</p>
            <p>Chrome 90 | Windows 10</p>
          </div>
        </div>

        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">
          Cập nhật thông tin
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
