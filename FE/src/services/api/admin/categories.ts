/* eslint-disable no-useless-catch */
import { Icategories } from "@/common/types/categories";
import instance from "@/configs/axios";

const handleRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  value?: Icategories
) => {
  try {
    const { data } = await instance[method](url, value);
    return data;
  } catch (error) {
    throw error;
  }
};
export const categoriesIndex = () => handleRequest("get", "/category");
export const categoriesShow = (id: string | undefined | number) =>
  handleRequest("get", `/category/${id}`);
export const categoriesCreate = (category: Icategories) =>
  handleRequest("post", "/category", category);
export const categoriesUpdate = (id: number, category: Icategories) =>
  handleRequest("put", `/category/${id}`, category);
export const categoriesDestroy = (id: number) =>
  handleRequest("delete", `/category/${id}`);
