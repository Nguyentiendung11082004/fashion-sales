/* eslint-disable no-useless-catch */
import { Iproduct } from "@/common/types/products";
import instance from "@/configs/axios";


const handleRequest = async (method: 'get' | 'post' | 'put' | 'delete',url: string,value?: Iproduct) => {
    try {
        const {data} = await instance[method](url,value);
        return data;
    } catch (error) {
        throw(error)
    }
}

export const getProducts = () => handleRequest('get',`/products/create`);
export const createProduct = (product:Iproduct) => handleRequest('post',`/products`, product)