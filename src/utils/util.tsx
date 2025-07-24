import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";

export const generateOrderNumber = () => {
    const date = new Date();
    const yyyyMMdd = date.toISOString().slice(0, 10).replace(/-/g, ""); // 20250604
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4자리 랜덤 숫자
    return `ORD${yyyyMMdd}-${randomSuffix}`;
};

export const formatPrice = (value: number) => value.toLocaleString();

export const randomId = () => Math.random().toString(36).substr(2, 9);

export const checkImageExists = async (url: string) => {
    try {
        // Robustly extract the storage path from the Firebase Storage URL
        const match = url.match(/\/o\/(.*?)\?/);
        const imagePath = match ? decodeURIComponent(match[1]) : "";
        if (!imagePath) throw new Error("Invalid Firebase Storage URL format");

        const imageRef = ref(storage, imagePath);
        await getDownloadURL(imageRef);
        return true;
    } catch (error) {
        console.warn("이미지 존재 확인 실패:", error);
        return false;
    }
};
