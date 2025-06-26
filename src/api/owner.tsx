import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
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

export const addItemToStore = async (storeId: string, menuData: Item) => {
    try {
        const storeRef = doc(db, "store", storeId); // store 테이블 접근

        await updateDoc(storeRef, {
            itemList: arrayUnion(menuData),
        });
    } catch (error) {
        console.error("가게 업데이트 에러:", error);
        throw error;
    }
};

export const updateItemInStore = async (storeId: string, originalItem: Item, updatedItem: Item) => {
    try {
        const storeRef = doc(db, "store", storeId);
        const storeSnap = await getDoc(storeRef);

        if (!storeSnap.exists()) {
            throw new Error("해당 가게를 찾을 수 없습니다.");
        }

        const storeData = storeSnap.data();
        const currentItemList = storeData.itemList || [];

        const updatedItemList = currentItemList.map((item: Item) => (item.itemId === originalItem.itemId ? updatedItem : item));

        await updateDoc(storeRef, { itemList: updatedItemList });
    } catch (error) {
        console.error("메뉴 수정 실패:", error);
        throw error;
    }
};
