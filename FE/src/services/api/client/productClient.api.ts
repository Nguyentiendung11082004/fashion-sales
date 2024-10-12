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

// // Hàm để tìm biến thể sản phẩm
export const findProductVariant = async (
  productId: number,
  productVariant: object
) => {
  const url = `find-variant/${productId}`;
  return await handleRequest("get", url, { product_variant: productVariant });
};
export const findProduct_id = (id: string | undefined | number) =>
  handleRequest("get", `/product_variant/${id}`);
