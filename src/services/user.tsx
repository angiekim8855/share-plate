import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
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

        const q = query(reservationRef, orderBy("reservationDate", "desc"));

        const snapshot = await getDocs(q);

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

// Firestore에서 유저 데이터 가져오기
export const fetchUserData = async (uid: string) => {
    try {
        const userDoc = await getDoc(doc(db, "user", uid));

        if (!userDoc.exists()) {
            throw new Error("유저 정보가 존재하지 않습니다.");
        }
        return userDoc;
    } catch (error: any) {
        console.log("유저 데이터 가져오기 실패: ", error.message);
        throw error;
    }
};
