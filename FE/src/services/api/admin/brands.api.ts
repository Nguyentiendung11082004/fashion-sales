import { Ibrands } from "@/common/types/brands";
import instance from "@/configs/axios";

    const handleRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, value?: Ibrands) => {
        try {
            const {data} = await instance[method](url, value);
            return data;
        } catch (error) {
            throw error;
        }
    };

export const getBrands = () => handleRequest('get', `/brand`);
export const getBrand = (id: number | null) => handleRequest('get', `/brand/${id}`);
export const createBrand = (brand: Ibrands) => handleRequest('post', `/brand`, brand);
export const updateBrand = (id: number, brand: Ibrands) => handleRequest('put', `/brand/${id}`, brand);
export const deleteBrand = (id: number) => handleRequest('delete', `/brand/${id}`);
