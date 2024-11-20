import { IAddresses } from "@/common/types/addressO";
import instance from "@/configs/axios";


    const handleRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, value?: IAddresses) => {
        try {
            
            const {data} = await instance[method](url, value);
            return data;
        } catch (error) {
            throw error;
        }
    };

export const getAddresses = () => handleRequest('get', `/addresses`);
export const getAddress = (id: number | null) => handleRequest('get', `/addresses/${id}`);
export const createAddress = (address: IAddresses) => handleRequest('post', `/addresses`, address);
export const updateAddress = (id: number, address: IAddresses) => handleRequest('put', `/addresses/${id}`, address);
export const deleteAddress = (id: number) => handleRequest('delete', `/addresses/${id}`);
