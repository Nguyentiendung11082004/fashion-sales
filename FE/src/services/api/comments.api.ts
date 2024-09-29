import { Icomments } from "@/common/types/comments";
import instance from "@/configs/axios";

    const handleRequest = async (method: 'get' | 'delete', url: string, value?: Icomments) => {
        try {
            // const {data} = await instance[method](url, value);
            const {data} = await instance[method](url, value);
            return data;
        } catch (error) {
            throw error;
        }
    };

export const getComments = () => handleRequest('get', `/comments`);
export const deleteComment = (id: number) => handleRequest('delete', `/comments/${id}`);
