    import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
    import axios from 'axios';
    import { useAuth } from '../Auth/AuthContext';

    interface UserContextType {
        user: any;
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
        const [user, setUser] = useState<any>(null)
        const getUser = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng", error);
            }
        }
        useEffect(() => {
            getUser()
        }, [token])
    
        return (
            <UserContext.Provider value={{ user, loading, error }}>
                {children}
            </UserContext.Provider>
        );
    };
