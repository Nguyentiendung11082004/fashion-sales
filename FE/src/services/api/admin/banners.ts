/* eslint-disable no-useless-catch */
import { IBanner } from "@/common/types/banners";
import instance from "@/configs/axios";

const handleRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  value?: IBanner
) => {
  try {
    const { data } = await instance[method](url, value);
    return data;
  } catch (error) {
    throw error;
  }
};
export const bannersIndex = () => handleRequest("get", "/banners");
export const bannersShow = (id: string | undefined | number) =>
  handleRequest("get", `/banners/${id}`);
export const bannerCreate = (banner: IBanner) =>
  handleRequest("post", "/banners", banner);
export const bannerUpdate = (id: number, banner: IBanner) =>
  handleRequest("put", `/banners/${id}`, banner);
export const bannersDestroy = (id: number) =>
  handleRequest("delete", `/banners/${id}`);
