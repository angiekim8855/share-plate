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
        // 스토리지 경로 추출
        const imagePath = decodeURIComponent(new URL(url).pathname.replace("/o/", "").split("?")[0]);

        const imageRef = ref(storage, imagePath);
        await getDownloadURL(imageRef);
        return true;
    } catch (error) {
        console.warn("이미지 존재 확인 실패:", error);
        return false;
    }
};
