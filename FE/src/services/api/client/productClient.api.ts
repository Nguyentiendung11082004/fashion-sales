/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";

// Hàm xử lý yêu cầu cho cả GET và POST
const handleRequest = async (
  method: "get" | "post",
  url: string,
  data?: object
) => {
  try {
    const response = await instance[method](url, data);
    return response.data;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};

// Hàm để lấy chi tiết sản phẩm
export const productShow_client = (id: number | string) =>
  handleRequest("get", `/product-detail/${id}`);

// // // Hàm để tìm biến thể sản phẩm
// export const findProductVariant = async (
//   productId: number,
//   productVariant: any
// ) => {
//   const url = `find-variant/${productId}`;
//   return await handleRequest("get", url, productVariant);
// };


export const findProductVariant = async (
  productId: number,
  productVariant: any
) => {
  const url = `find-variant/${productId}`;
  return await handleRequest("get", url, { params: productVariant });
};


// // Hàm tìm biến thể sản phẩm
// export const findProductVariant = async (
//   productId: number,
//   productVariant: { product_variant: { [key: string]: string | number } }
// ) => {
//   return handleRequest("post", `find-variant/${productId}`, productVariant);
// };

// // Hàm tìm biến thể sản phẩm
// export const findProductVariant = async (
//   productId: number,
//   productVariant: { product_variant: { [key: string]: number } }
// ) => {
//   const url = `find-variant/${productId}`;

//   return await handleRequest("post", url, productVariant);
// };

// Hàm tìm kiếm sản phẩm theo ID
export const findProduct_id = (id: string | undefined | number) =>
  handleRequest("get", `/product_variant/${id}`);
