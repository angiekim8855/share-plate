import { doc, setDoc } from "firebase/firestore";
import { rawReservation } from "../types/reservation";
import { db } from "../../firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// ✅ 예약 저장 함수
export const createReservation = async (storeId: string, userId: string, reservationData: rawReservation) => {
    try {
        // 고유 ID 생성
        const reservationId = uuidv4();

        // 1. 사장님 데이터 경로
        const storeReservationRef = doc(db, "store", storeId, "reservationList", reservationId);

        // 2. 유저 데이터 경로
        const userReservationRef = doc(db, "user", userId, "reservationList", reservationId);

        // 3. 사장님 데이터 저장
        await setDoc(storeReservationRef, { ...reservationData, reservationId });

        // 4. 유저 데이터 저장
        await setDoc(userReservationRef, { ...reservationData, reservationId });

        return reservationId;
    } catch (error) {
        console.error("예약 에러: ", error);
        throw error;
    }
};
