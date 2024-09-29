import { Itags } from "@/common/types/tags";
import instance from "@/configs/axios";

    const handleRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, value?: Itags) => {
        try {
            const {data} = await instance[method](url, value);
            return data;
        } catch (error) {
            throw error;
        }
    };

export const getTags = () => handleRequest('get', `/tags`);
export const getTag = (id:string | undefined | number) => handleRequest('get', `/tags/${id}`);
export const createTag = (tag: Itags) => handleRequest('post', `/tags`, tag);
export const updateTag = (id: number, tag: Itags) => handleRequest('put', `/tags/${id}`, tag);
export const deleteTag = (id: number) => handleRequest('delete', `/tags/${id}`);
