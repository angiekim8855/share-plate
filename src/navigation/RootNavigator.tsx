import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import OwnerTabNavigator from "./OwnerTabNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const isLoggedIn = true;
    const isStoreOwner = true;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
                <Stack.Screen name="Auth" component={AuthStackNavigator} />
            ) : isStoreOwner ? (
                <Stack.Screen name="OwnerMain" component={OwnerTabNavigator} />
            ) : (
                <Stack.Screen name="Main" component={MainTabNavigator} />
            )}
        </Stack.Navigator>
    );
}
