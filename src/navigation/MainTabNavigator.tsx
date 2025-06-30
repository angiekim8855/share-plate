import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Reservation } from "../screens/Reservation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RestaurantDetail from "../screens/RestaurantDetail";
import Home from "../screens/Home";
import UserMyPage from "../screens/UserMyPage";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeMain" component={Home} options={{ title: "홈" }} />
            <HomeStack.Screen name="RestaurantDetail" component={RestaurantDetail} options={{ title: "가게 정보" }} />
        </HomeStack.Navigator>
    );
}

export default function MainTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Reservation" component={Reservation} />
            <Tab.Screen name="MyPage" component={UserMyPage} />
        </Tab.Navigator>
    );
}
