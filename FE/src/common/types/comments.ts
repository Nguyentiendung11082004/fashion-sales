/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Icomments {
  created_at: string;
  id: number | string;
  user_id: number;
  product_id: number;
  content: string;
  rating: number;
  image?: string;
  status: number;
  order_id: string;
}
