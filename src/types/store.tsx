import { Item } from "./item";
import { Review } from "./review";

export type Store = {
    thumbnailImg: any;
    storeId: string;
    storeName: string;
    businessNumber: string;
    category: string;
    address: string;
    phone: string;
    bankAccount: string;
    closingTime: string;
    itemList: Item[];
    reviewList: Review[];
};
