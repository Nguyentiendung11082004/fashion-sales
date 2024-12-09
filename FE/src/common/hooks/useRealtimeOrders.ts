import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

// Hook để lắng nghe sự kiện và refetch dữ liệu khi có sự thay đổi
export const useRealtimeOrders = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Hàm xử lý khi có sự thay đổi trong localStorage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'REFRESH_ORDERS' && event.newValue === 'true') {
        queryClient.invalidateQueries({ queryKey: ["history-order"] }); // Refetch lại danh sách đơn hàng
        localStorage.setItem('REFRESH_ORDERS', 'false'); // Reset giá trị sau khi đã xử lý
      }
    };

    // Thêm sự kiện listener cho storage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup khi component unmount
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [queryClient]);
};

// Hàm gửi thông báo đến các tab khác thông qua localStorage
export const notifyOrdersChanged = () => {
  localStorage.setItem('REFRESH_ORDERS', 'true');
};
