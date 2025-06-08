import { Item } from "./item";
import { Review } from "./review";

export type Restaurant = {
    storeId: string;
    name: string;
    bizNumber: string;
    category: string;
    address: string;
    rating: number;
    bankAccount: string;
    closeTime: string;
    itemList: Item[];
    reviewList: Review[];
};
