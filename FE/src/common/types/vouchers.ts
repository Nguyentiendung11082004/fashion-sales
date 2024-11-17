export interface IMeta {
  id: number | string;
  voucher_id: number;
  meta_key: string;
  meta_value: string;
}
export interface IVouchers {
  id: number;
  title: string;
  description: string;
  discount_type: string;
  discount_value: string;
  start_date: Date;
  start_end: Date;
  min_order_value: string;
  usage_limit: string;
  used_count: string;
  meta: IMeta[];
}
