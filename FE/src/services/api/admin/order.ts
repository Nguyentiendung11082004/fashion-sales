/* eslint-disable no-useless-catch */
import { IOrder } from "@/common/types/order";
import instance from "@/configs/axios";

const handleRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  value?: IOrder
) => {
  try {
    const { data } = await instance[method](url, value);
    return data;
  } catch (error) {
    throw error;
  }
};
export const orderIndex = () => handleRequest("get", "/order-status");
export const ordersShow = (id: string | undefined | number) =>
  handleRequest("get", `/order-status/${id}`);
export const orderCreate = (order: IOrder) =>
  handleRequest("post", "/order-status", order);
export const orderUpdate = (id: number, order: IOrder) =>
  handleRequest("put", `/order-status/${id}`, order);
export const orderDesTroy = (id: number) =>
  handleRequest("delete", `/order-status/${id}`);
