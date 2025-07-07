import { deleteDoc, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { rawReservation, ReservationStatus } from "../types/reservation";
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

export const updateOrderStatus = async (userId: string, storeId: string, reservationId: string, newStatus: ReservationStatus) => {
    try {
        const reservationRef = doc(db, "store", storeId, "reservationList", reservationId);
        const userReservationRef = doc(db, "user", userId, "reservationList", reservationId);

        const storeDocSnap = await getDoc(reservationRef);
        const userDocSnap = await getDoc(userReservationRef);

        if (!storeDocSnap.exists()) {
            console.error("Store 예약 데이터가 없습니다.");
            return;
        }

        if (!userDocSnap.exists()) {
            console.error("User 예약 데이터가 없습니다.");
            return;
        }
        await updateDoc(reservationRef, { orderStatus: newStatus });
        await updateDoc(userReservationRef, { orderStatus: newStatus });

        console.log("예약 상태 업데이트 성공");
    } catch (error) {
        console.error("예약 상태 업데이트 실패:", error);
        throw error;
    }
};

// 예약 삭제 함수
export const deleteReservation = async (userId: string, storeId: string, reservationId: string) => {
    try {
        // 가게의 예약 삭제
        const storeReservationRef = doc(db, "store", storeId, "reservationList", reservationId);
        await deleteDoc(storeReservationRef);

        // 유저의 예약 삭제
        const userReservationRef = doc(db, "user", userId, "reservationList", reservationId);
        await deleteDoc(userReservationRef);

        console.log("예약 삭제 성공");
    } catch (error) {
        console.error("예약 삭제 실패:", error);
        throw error;
    }
};

// 재고 감소 (예약 시)
export const decreaseItemStock = async (storeId: string, itemId: string, stock: number) => {
    try {
        const itemRef = doc(db, "store", storeId, "itemList", itemId);
        await updateDoc(itemRef, {
            stock: increment(-stock), // Firebase 내장 원자 연산
        });
        console.log(`재고 감소: ${itemId} - ${stock}`);
    } catch (error) {
        console.error("재고 감소 실패:", error);
        throw error;
    }
};

// 재고 복구 (예약 취소 시)
export const increaseItemStock = async (storeId: string, itemId: string, stock: number) => {
    try {
        const itemRef = doc(db, "store", storeId, "itemList", itemId);
        await updateDoc(itemRef, {
            stock: increment(stock), // 수량 복구
        });
        console.log(`재고 복구: ${itemId} +${stock}`);
    } catch (error) {
        console.error("재고 복구 실패:", error);
        throw error;
    }
};
