/* eslint-disable no-useless-catch */
import { Iattribute } from "@/common/types/attribute";
import { Itags } from "@/common/types/tags";
import instance from "@/configs/axios";
const handleRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  value?: Itags
) => {
  try {
    const { data } = await instance[method](url, value);
    return data;
  } catch (error) {
    throw error;
  }
};
export const getAttributes = () => handleRequest("get", `/attribute`);
export const getAttribute = (id: undefined | number) =>
  handleRequest("get", `/attribute/${id}`);
export const createAttributes = (attribute: Iattribute) =>
  handleRequest("post", `/attribute`, attribute);
export const updateAttributes = (id: number, attribute: Iattribute) =>
  handleRequest("put", `/attribute/${id}`, attribute);
export const deleteAttributes = (id: number) =>
  handleRequest("delete", `/attribute/${id}`);
