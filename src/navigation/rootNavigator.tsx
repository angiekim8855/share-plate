import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackNavigator from "./AuthStackNavigator";
import MainTabNavigator from "./MainTabNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const isLoggedIn = true; // 나중에 context로 바꾸면 좋아

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? <Stack.Screen name="Main" component={MainTabNavigator} /> : <Stack.Screen name="Auth" component={AuthStackNavigator} />}
        </Stack.Navigator>
    );
}
