/* eslint-disable no-useless-catch */
import { IUser } from "@/common/types/users";
import instance from "@/configs/axios";

const handleRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  value?: IUser
) => {
  try {
    const { data } = await instance[method](url, value);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getClients = () => handleRequest("get", `/clients`);
export const getClient = (id: number | null) =>
  handleRequest("get", `/client/${id}`);
export const createClient = (client: IUser) =>
  handleRequest("post", `/clients`, client);
export const updateClient = (id: number, client: IUser) =>
  handleRequest("put", `/clients/${id}`, client);
export const deleteClient = (id: number) =>
  handleRequest("delete", `/clients/${id}`);
