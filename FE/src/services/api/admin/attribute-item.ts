
import { Iattributeitem } from "@/common/types/attribute-item";
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
export const getAttributesItem = () => handleRequest('get', `/attributeItem`);
export const getAttributeItem = (id:string | undefined | number) => handleRequest('get', `/attributeItem/${id}`);
export const createAttributesItem = (attribute: Iattributeitem) => handleRequest('post', `/attributeItem`, attribute);
export const updateAttributesItem = (id: number, attribute: Iattributeitem) => handleRequest('put', `/attributeItem/${id}`, attribute);
export const deleteAttributesItem = (id: number) => handleRequest('delete', `/attributeItem/${id}`);
