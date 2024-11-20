export interface IOrder_details {
  id: number | string;
  product_id: number;
  product_variant_id: string;
  order_id: number;
  product_name: string;
  product_img: string;
  attributes: null;
  quantity: number;
  price: string;
  total_price: string;
  discount: string;
}

export interface IOrder {
  id: number;
  user_id: number;
  payment_method_id: number;
  order_status: string;
  payment_status: string;
  order_code: string;
  total_quantity: number;
  total: string;
  user_name: string;
  user_email: string;
  user_phonenumber: string;
  user_address: string;
  user_note: string;
  ship_user_name: string;
  ship_user_phonenumber: string;
  ship_user_address: string;
  shipping_method: string;
  voucher_id: string;
  voucher_discount: string;
  order_details: IOrder_details[];
}
