export type User = {
    userId: string;
    userType: "owner" | "customer";
    storeId: string;
    storeIdList: string[]; // owner일때만
    profileImage: string;
    userName: string;
    phone: string;
    email: string;
    favoriteStore: string[]; // customer일때만
    createAt: any;
};
