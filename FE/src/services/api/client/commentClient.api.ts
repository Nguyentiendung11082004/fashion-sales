/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-useless-catch */
import { Icomments } from "@/common/types/comments";
import instance from "@/configs/axios";

const handleRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,

  value?: Icomments
) => {
  try {
    const { data } = await instance[method](url, value);
    return data;
  } catch (error) {
    throw error;
  }
};

// sửa
export const commentUpdate = (id: number, comment: Icomments) =>
  handleRequest("put", `/comment/${id}`, comment);
// xóa
export const commentDestroy = (id: number) =>
  handleRequest(`delete`, `comment/${id}`);
// lấy theo id
export const commentShow = (id: number | string) =>
  handleRequest("get", `/comment/${id}`);
