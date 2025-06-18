export type Reservation = {
    orderNumber: string;
    userId: string;
    userName: string;
    storeId: string;
    storeName: string;
    reservationDate: string; // YYYY-MM-DD 형식
    itemList: { itemId: string; itemName: string; quantity: number; finalPrice: number }[];
    totalPrice: number;
    orderStatus: "pending" | "canceled" | "completed";
};
