import instance from "@/configs/axios";

const handleRequest = async (method: "get", url: string) => {
  try {
    const { data } = await instance[method](url);
    return data;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};

export const productShow_client = (id: number | string) =>
  handleRequest("get", `/product-detail/${id}`);
