import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import instance from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { Flex, Spin } from 'antd';
import Loading from '@/common/Loading/Loading';
interface UserContextType {
    user: any;
    urlImage: string | null; 
    setUrlImage: any; 
    loading: boolean;
    error: string | null;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

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
        enabled: !!token,
    });

    const [urlImage, setUrlImage] = useState<string | null>(null);

    useEffect(() => {
        if (user && user["Infor User"]) {
            // console.log("User data:", user["Infor User"]);
            // console.log("Setting urlImage to:", user["Infor User"].avatar);
            setUrlImage(user["Infor User"].avatar);
        }
    }, [user]);
    

    if (isFetching) return <div></div>

    return (
        <UserContext.Provider value={{ user, urlImage, setUrlImage, loading, error }}>
            {
                // isFetching ? <Loading /> : 
                children
            }
        </UserContext.Provider>
    );
};
