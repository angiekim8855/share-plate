import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import OwnerTabNavigator from "./OwnerTabNavigator";
import { onAuthStateChanged } from "firebase/auth";
import { getStoredUser, storeUser } from "../services/localStorage";
import { auth } from "../../firebase";
import { fetchUserData } from "../services/user";
import { UserContext } from "../context/UserContext";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const [user, setUser] = useState<any | null>(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const localUser = await getStoredUser();
                if (localUser) setUser(localUser);

                // 최신 정보 덮어쓰기
                const freshUser = await fetchUserData(firebaseUser.uid);
                if (freshUser) {
                    setUser(freshUser.data());
                    await storeUser(freshUser);
                }
            } else {
                setUser(null);
            }
            setInitializing(false);
        });

        return unsubscribe;
    }, []);

    if (initializing) return null;

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user ? (
                    <Stack.Screen name="Auth" component={AuthStackNavigator} />
                ) : user.userType === "owner" ? (
                    <Stack.Screen name="OwnerMain" component={OwnerTabNavigator} />
                ) : (
                    <Stack.Screen name="Main" component={MainTabNavigator} />
                )}
            </Stack.Navigator>
        </UserContext.Provider>
    );
}
