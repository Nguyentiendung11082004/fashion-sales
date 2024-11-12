// src/echo.d.ts

import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Mở rộng kiểu của window để thêm Echo và Pusher
declare global {
  interface Window {
    Echo: Echo;
    Pusher: typeof Pusher; // Khai báo kiểu Pusher đúng cách
  }
}

export {};  // Đảm bảo file này không có lỗi TypeScript
