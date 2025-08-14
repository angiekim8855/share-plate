export type ReservationStatus = "Pending" | "Reserved" | "Completed" | "Canceled";

export type Reservation = {
    reservationId: string;
    orderNumber: string;
    userId: string;
    userName: string;
    storeId: string;
    storeName: string;
    reservationDate: string; // YYYY-MM-DD 형식
    itemList: ReservationItem[];
    totalPrice: number;
    orderStatus: ReservationStatus;
};

export type rawReservation = Omit<Reservation, "reservationId">;

export type ReservationItem = {
    itemId: string;
    itemName: string;
    discountPrice: number;
    stock: number;
};
