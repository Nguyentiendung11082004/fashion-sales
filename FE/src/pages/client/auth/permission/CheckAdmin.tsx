import { useAuth } from '@/common/context/Auth/AuthContext'
import { useUser } from '@/common/context/User/UserContext';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
type Props = {}

const CheckAdmin = (props: Props) => {
    const { user } = useUser();
    const {token} = useAuth();
    console.log("user", user)
    if (user?.InforUser?.role_id !== 4) {
        toast.error('Bạn không phải admin')
        return <Navigate to="/" />;
    } else {
        return <Outlet />
    }
}
export default CheckAdmin
