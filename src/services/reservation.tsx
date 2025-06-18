import { collection, addDoc } from "firebase/firestore";
import { Reservation } from "../types/reservation";
import { db } from "../../firebase";

// 예약 저장 함수
export const createReservation = async (reservationData: Reservation) => {
    try {
        const docRef = await addDoc(collection(db, "reservations"), reservationData);

        return docRef.id;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
