export interface IProductVariant {
    attribute_item_id: any[];
    price_regular: number;
    price_sale: number;
    quantity: number;
    sku: string;
    slug: string;
    image:string;
}
export interface Iproduct {
    id: number;
    type: number;
    brand_id: number;
    category_id: number;
    name: string;
    views: number;
    img_thumbnail: string;
    // image: string;
    gallery: string[];
    slug: string;
    price_regular: number;
    price_sale: number;
    sku: string;
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
}


