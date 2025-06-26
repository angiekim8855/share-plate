export type Reservation = {
    orderNumber: string;
    userId: string;
    userName: string;
    storeId: string;
    storeName: string;
    reservationDate: string; // YYYY-MM-DD 형식
    itemList: ReservationItem[];
    totalPrice: number;
    orderStatus: "pending" | "canceled" | "completed";
};

export type ReservationItem = {
    itemId: string;
    itemName: string;
    discountPrice: number;
    stock: number;
};
