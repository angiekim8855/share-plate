import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const isLoggedIn = false; // 나중에 context로 바꾸면 좋아

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? <Stack.Screen name="Main" component={MainTabNavigator} /> : <Stack.Screen name="Auth" component={AuthStackNavigator} />}
        </Stack.Navigator>
    );
}
