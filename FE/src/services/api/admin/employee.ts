/* eslint-disable no-useless-catch */
import { IUser } from "@/common/types/users";
import instance from "@/configs/axios";

    const handleRequest = async (method: 'get' | 'post' | 'put' | 'delete', url: string, value?: IUser) => {
        try {
            const {data} = await instance[method](url, value);
            return data;
        } catch (error) {
            throw error;
        }
    };

export const getEmployees = () => handleRequest('get', `/employees`);
export const getEmployee = (id: number | null) => handleRequest('get', `/employee/${id}`);
export const createEmployee = (employee: IUser) => handleRequest('post', `/employees`, employee);
export const updateEmployee = (id: number, employee: IUser) => handleRequest('put', `/employees/${id}`, employee);
export const deleteEmployee = (id: number) => handleRequest('delete', `/employees/${id}`);
