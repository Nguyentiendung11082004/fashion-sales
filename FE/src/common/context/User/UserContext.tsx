import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
<<<<<<< HEAD
import instance from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { Flex, Spin } from 'antd';
import Loading from '@/common/Loading/Loading';
interface UserContextType {
    user: any;
    loading: boolean;
    error: string | null;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

=======

interface UserContextType {
    user: any;
    loading: boolean;
    error: string | null;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

>>>>>>> 8a7b94bdd111b7874c96e09d071058ac5724ddc6
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
<<<<<<< HEAD
    const { data: user, isFetching } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await instance.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        },
    });
    // if (isFetching) return <div><Loading /></div>

    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {
                isFetching ? <Loading /> : children
            }
        </UserContext.Provider>
    );
};
=======
    const [user, setUser] = useState<any>(null)
    const getUser = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            // setUser(response?.data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng", error);
        }
    }
    console.log(user)
    useEffect(() => {
        getUser()
    }, [token])

    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};
>>>>>>> 8a7b94bdd111b7874c96e09d071058ac5724ddc6
