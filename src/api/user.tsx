import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const fetchUserReservations = async (userId: string) => {
    try {
        const reservationRef = collection(db, "user", userId, "reservationList");
        const snapshot = await getDocs(reservationRef);

        const reservationList = snapshot.docs.map((doc) => ({
            ...doc.data(),
        }));

        return reservationList;
    } catch (error) {
        console.error("예약 목록 불러오기 실패:", error);
        return [];
    }
};
