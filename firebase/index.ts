import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import Constants from "expo-constants";

const { firebaseApiKey, firebaseAuthDomain, firebaseProjectId, firebaseStorageBucket, firebaseMessagingSenderId, firebaseAppId } =
    Constants.expoConfig?.extra || {};

// Your web app's Firebase configuration -> Firebase가 만든 '내 프로젝트 정보'를 담은 접속키
const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
};

// Initialize Firebase -> Firebase JS SDK가 내 Firebase 콘솔의 프로젝트에 연결
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
