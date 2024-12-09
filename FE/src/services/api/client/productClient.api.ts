/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";

// Hàm xử lý yêu cầu cho cả GET và POST
// const handleRequest = async (
//   method: "get" | "post",
//   url: string,
//   data?: object
// ) => {
//   try {
//     const response = await instance[method](url, data);
//     return response.data;
//   } catch (error) {
//     console.error("Request error:", error);
//     throw error;
//   }
// };
const handleRequest = async (
  method: "get" | "post",
  url: string,
  options?: { data?: object; params?: object }
) => {
  try {
    const config =
      method === "get" ? { params: options?.params } : options?.data;
    const response = await instance[method](url, config);
    return response.data;
  } catch (error) {
    console.log("Request error:", error);
    throw error;
  }
};

// Hàm để lấy chi tiết sản phẩm
export const productShow_client = (slug: string) =>
  handleRequest("get", `/product-detail/${slug}`);

export const findProductVariant = async (
  productId: number,
  productVariant: any
) => {
  const url = `find-variant/${productId}`;
  return await handleRequest("get", url, { params: productVariant });
};
