import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration -> Firebase가 만든 '내 프로젝트 정보'를 담은 접속키
const firebaseConfig = {
    apiKey: "AIzaSyC5OqXm3bmggNWAWFPMGUo_4R4XtNqpfyk",
    authDomain: "share-plate-d9dd2.firebaseapp.com",
    projectId: "share-plate-d9dd2",
    storageBucket: "share-plate-d9dd2.firebasestorage.app",
    messagingSenderId: "476378567931",
    appId: "1:476378567931:web:d2c4d5e6fb789bd5a94c5e",
};

// Initialize Firebase -> Firebase JS SDK가 내 Firebase 콘솔의 프로젝트에 연결
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);
