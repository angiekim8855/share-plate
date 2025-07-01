export type User = {
    userId: string;
    userType: "owner" | "customer";
    storeIdList: string[]; // owner일때만
    profileImage: string;
    userName: string;
    phone: string;
    email: string;
    favoriteStore: string[]; // customer일때만
    createAt: string;
};
