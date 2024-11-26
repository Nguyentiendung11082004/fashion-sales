// useRealtimeOrders.ts
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

// Tạo một BroadcastChannel để giao tiếp giữa các tab
const broadcast = new BroadcastChannel('channel');

// Hook để lắng nghe sự kiện và refetch dữ liệu khi có sự thay đổi
export const useRealtimeOrders = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Hàm xử lý khi nhận được thông báo
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'REFRESH_ORDERS') {
        queryClient.invalidateQueries({ queryKey: ["history-order"] }); // Refetch lại danh sách đơn hàng
      }
    };

    // Thêm sự kiện listener
    broadcast.addEventListener('message', handleMessage);

    // Cleanup khi component unmount
    return () => broadcast.removeEventListener('message', handleMessage);
  }, [queryClient]);
};

// Hàm gửi thông báo đến các tab khác
export const notifyOrdersChanged = () => {
  broadcast.postMessage({ type: 'REFRESH_ORDERS' });
};
