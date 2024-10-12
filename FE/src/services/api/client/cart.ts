import { useAuth } from "@/common/context/Auth/AuthContext";
import { Iattribute } from "@/common/types/attribute";
import { Itags } from "@/common/types/tags";
import instance from "@/configs/axios";
const { token } = useAuth();
const handleRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, value?: Itags) => {
    try {
        const { data } = await instance[method](url, value);
        return data;
    } catch (error) {
        throw error;
    }
};
export const getCart = () => handleRequest('get', `/cart`);
