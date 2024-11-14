import { useAuth } from '@/common/context/Auth/AuthContext'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
type Props = {}

const Permission = (props: Props) => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to='/login' />
    } else {
        return <Outlet />
    }
}

export default Permission