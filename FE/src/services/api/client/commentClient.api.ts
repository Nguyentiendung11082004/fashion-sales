//
import instance from "@/configs/axios";

const handleRequest = async (method: "post", url: string) => {
  try {
    const { data } = await instance[method](url);
    return data;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};

export const postComment = (id: number | string) =>
  handleRequest("post", `/comments/${id}`);
