import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Store } from "../types/store";
import { User } from "../types/user";

// 고객 프로필 수정
export const updateUserProfile = async (userData: User) => {
    try {
        const docRef = doc(db, "user", userData.userId); // 유저의 문서 ID

        await updateDoc(docRef, userData);

        return true;
    } catch (error) {
        console.error("유저 업데이트 실패:", error);
        throw error;
    }
};

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

// storeId 배열을 받아서 store 리스트 가져오기
export const fetchFavoriteStores = async (storeIds: string[]): Promise<Store[]> => {
    try {
        if (storeIds.length === 0) return [];

        // Firestore는 'in' 쿼리로 최대 10개까지 한 번에 가져올 수 있음
        const storeRef = collection(db, "store");
        const storeQuery = query(storeRef, where("storeId", "in", storeIds));

        const snapshot = await getDocs(storeQuery);

        const stores: Store[] = snapshot.docs.map((doc) => ({
            ...(doc.data() as Store),
        }));

        return stores;
    } catch (error) {
        console.error("즐겨찾기 가게 가져오기 실패:", error);
        return [];
    }
};
