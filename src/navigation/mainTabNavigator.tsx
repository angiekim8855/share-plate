import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Reservation from "../screens/Reservation";
import MyPage from "../screens/MyPage";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Reservation" component={Reservation} />
            <Tab.Screen name="MyPage" component={MyPage} />
        </Tab.Navigator>
    );
}
