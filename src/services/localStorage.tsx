import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUser = async (user: any) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
};

export const getStoredUser = async () => {
    const json = await AsyncStorage.getItem("user");
    return json ? JSON.parse(json) : null;
};

export const clearStoredUser = async () => {
    await AsyncStorage.removeItem("user");
};
