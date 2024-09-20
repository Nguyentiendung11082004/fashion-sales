export interface Iproduct {
    id: number;
    type: boolean;
    brand_id: number;
    category_id: number;
    name: string;
    views: number;
    image_thumbnail: string;
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
}
