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

// 여기 쓰는 곳 찾아서 수정해야함!!!
export type Restaurant = {
    thumbnailImg: any;
    storeId: string;
    name: string;
    bizNumber: string;
    category: string;
    address: string;
    phone: string;
    rating: number;
    bankAccount: string;
    closeTime: string;
    itemList: Item[];
    reviewList: Review[];
};
