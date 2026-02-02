// src/echo.d.ts

import Echo from "laravel-echo";

declare global {
    interface Window {
        Echo: Echo<any>;
        Pusher: any;
    }
}

export {};
