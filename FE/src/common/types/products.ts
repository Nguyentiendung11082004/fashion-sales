/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProductVariant {
  attribute_item_id: any[];
  price_regular: number;
  price_sale: number;
  quantity: number;
  sku: string;
  image: string;
  id_guid: any;
}
export interface IProductGalleries {
  id: number;
  image: string;
}
export interface Iproduct {
  id: number | string;
  type: any;
  brand_id: number;
  category_id: number;
  name: string;
  views: number;
  img_thumbnail: string;
  image: string;
  galleries: IProductGalleries[];
  gallery: IProductGalleries[];
  slug: string;
  price_regular: number;
  price_sale: number;
  weigth: number;
  sku: string;
  rate: number;
  description: string;
  description_title: string;
  status: boolean;
  is_show_home: boolean;
  is_trend: boolean;
  is_new: string;
  attribute_item_id: any;
  attributes: number[];
  quantity: number;
  product_variant?: IProductVariant[];
  variants: any;
}


