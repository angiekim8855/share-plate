import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Store } from "../types/store";

export const createStore = async (storeData: Store) => {
    try {
        const docRef = await addDoc(collection(db, "store"), storeData);

        return docRef.id;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
