import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Store } from "../types/store";
import { Item } from "../types/item";

interface StorePropsType {
    storeData: Store;
    storeId: string;
}
export const createStore = async ({ storeData, storeId }: StorePropsType) => {
    try {
        const docRef = doc(db, "store", storeId); // storeId를 문서 ID로 지정
        await setDoc(docRef, storeData);

        return docRef.id;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addItemToStore = async (storeId: string, itemData: Item) => {
    try {
        const itemDocRef = doc(db, "store", storeId, "itemList", itemData.itemId);

        await setDoc(itemDocRef, itemData); // 데이터 저장
    } catch (error) {
        console.error("아이템 등록 실패:", error);
        throw error;
    }
};

export const updateItemInStore = async (storeId: string, itemId: string, updatedItem: Item) => {
    try {
        const itemDocRef = doc(db, "store", storeId, "itemList", itemId);

        // setDoc({merge:true})로 부분 업데이트 가능
        await setDoc(itemDocRef, updatedItem, { merge: true });
        console.log("아이템 수정 성공:", itemId);
    } catch (error) {
        console.error("아이템 수정 실패:", error);
        throw error;
    }
};

// storeId의 itemList 가져오기
export async function fetchItemsFromStore(storeId: string) {
    try {
        const itemListRef = collection(db, "store", storeId, "itemList");
        const querySnapshot = await getDocs(itemListRef);

        const items = querySnapshot.docs.map((doc) => ({
            ...doc.data(), // 문서 데이터
        }));

        return items; // 아이템 배열 반환
    } catch (error) {
        console.error("아이템 목록 불러오기 실패:", error);
        throw error;
    }
}

// storeId의 reservationList 가져오기
export const fetchStoreReservations = async (storeId: string) => {
    try {
        const reservationRef = collection(db, "store", storeId, "reservationList");
        const snapshot = await getDocs(reservationRef);

        const reservationList = snapshot.docs.map((doc) => ({
            ...doc.data(),
        }));

        return reservationList;
    } catch (error) {
        console.error("사장님 예약 목록 불러오기 실패:", error);
        return [];
    }
};
