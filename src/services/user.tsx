import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Store } from "../types/store";

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

export const addMenuToStore = async (storeId: string, menuData: any) => {
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
