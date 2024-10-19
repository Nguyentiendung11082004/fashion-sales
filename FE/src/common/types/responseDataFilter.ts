import { Iattributeitem } from "./attribute-item";
import { Ibrands } from "./brands";
import { Icategories } from "./categories";
import { Iproduct } from "./products";

export interface ResponseData {
    products: Array<{ product: Iproduct; getUniqueAttributes: any }>;
    brands: Ibrands[];
    attributes: { size: Iattributeitem[], color: Iattributeitem[]};
    categories: Icategories[];
}

export interface ResponseWishlist {
    wishlist_id: number;
    product: Iproduct
    getUniqueAttributes: any;
}