import { useAuth } from '@/common/context/Auth/AuthContext'
import { useUser } from '@/common/context/User/UserContext';
import React, { useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
type Props = {}

const Permission = (props: Props) => {
    const { token } = useAuth();
    const { user } = useUser();
    const hasShownToast = useRef(false); 
    if (!token) {
        if (!hasShownToast.current) {
            toast.error("Bạn cần đăng nhập để sử dụng chức năng này");
            hasShownToast.current = true; 
        }
        return <Navigate to="/login" />;
    }
    if (user?.InforUser?.role_id !== 4) {
        if (!hasShownToast.current) {   
            toast.error("Bạn không có quyền truy cập trang này");
            hasShownToast.current = true;
        }
        return <Navigate to="/" />;
    }

    return <Outlet />;
};


export default Permission