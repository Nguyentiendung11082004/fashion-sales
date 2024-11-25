/* eslint-disable no-useless-catch */
import { Iproduct } from "@/common/types/products";
import instance from "@/configs/axios";

const handleRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  value?: Iproduct
) => {
  try {
    const { data } = await instance[method](url, value);
    return data;
  } catch (error) {
    throw error;
  }
};

export const productsIndex = (filter:any) => handleRequest("get", `/products`,filter);
// getall
export const productShow = (id: number | string) =>
  handleRequest("get", `/products/${id}`);
// get id
export const productCreate = () => handleRequest("get", `/products/create`);
// get theo attribute
export const productStore = (product: Iproduct) =>
  handleRequest("post", `/products`, product);
/// add prouduct
export const productUpdate = (id: number, product: Iproduct) =>
  handleRequest("put", `/products/${id}`, product);
// update
export const productDestroy = (id: number) =>
  handleRequest(`delete`, `products/${id}`);
// delete
