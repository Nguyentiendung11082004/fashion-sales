/* eslint-disable no-useless-catch */
import { IVouchers } from "@/common/types/vouchers";
import instance from "@/configs/axios";

const handleRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  value?: IVouchers
) => {
  try {
    const { data } = await instance[method](url, value);
    return data;
  } catch (error) {
    throw error;
  }
};
export const voucherIndex = () => handleRequest("get", "/vouchers");
export const vouchersShow = (id: string | undefined | number) =>
  handleRequest("get", `/vouchers/${id}`);
export const voucherCreate = (voucher: IVouchers) =>
  handleRequest("post", "/vouchers", voucher);
export const voucherUpdate = (id: number, voucher: IVouchers) =>
  handleRequest("put", `/vouchers/${id}`, voucher);
export const vouchersDestroy = (id: number) =>
  handleRequest("delete", `/vouchers/${id}`);
