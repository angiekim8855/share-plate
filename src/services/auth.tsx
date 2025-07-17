import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { clearStoredUser, storeUser } from "./localStorage";
import { fetchUserData } from "./user";
import { Alert } from "react-native";

// 회원가입
export const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        console.log("회원가입 성공");
        return userCredential.user;
    } catch (error: any) {
        console.log("회원가입 실패:", error.message);
        throw error;
    }
};

// 로그인
export const login = async (email: string, password: string) => {
    try {
        // 1. Firebase Auth 로그인
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { uid } = userCredential.user;

        // 2. Firestore에서 유저 데이터 가져오기
        const userDoc = await fetchUserData(uid);

        const userData = userDoc.data();
        if (userData) {
            await storeUser(userData);
        }

        console.log("로그인 성공, 유저 데이터:", userData);
        return userData;
    } catch (error: any) {
        console.log("로그인 실패:", error.message);
        throw error;
    }
};

// 로그아웃
export const logout = async () => {
    try {
        await signOut(auth);
        await clearStoredUser();
    } catch (error) {
        Alert.alert("오류 발생", "잠시 후 다시 시도해주세요.");
        console.error(error);
    }
};
