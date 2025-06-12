export const generateOrderNumber = () => {
    const date = new Date();
    const yyyyMMdd = date.toISOString().slice(0, 10).replace(/-/g, ""); // 20250604
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4자리 랜덤 숫자
    return `ORD${yyyyMMdd}-${randomSuffix}`;
};
