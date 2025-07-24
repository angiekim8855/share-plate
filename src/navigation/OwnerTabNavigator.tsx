import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReservationList from "../screens/owner/ReservationList";
import ItemManage from "../screens/owner/ItemManage";
import OwnerMyPage from "../screens/owner/OwnerMyPage";

const Tab = createBottomTabNavigator();

export default function OwnerTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarIcon: () => null,
                tabBarIconStyle: { display: "none" },
                tabBarLabelStyle: {
                    fontSize: 16,
                    fontWeight: "600",
                    paddingTop: 10,
                },
            }}
        >
            <Tab.Screen name="ReservationList" component={ReservationList} options={{ title: "예약관리" }} />
            <Tab.Screen name="ItemManage" component={ItemManage} options={{ title: "메뉴 관리" }} />
            <Tab.Screen name="OwnerMyPage" component={OwnerMyPage} options={{ title: "마이페이지" }} />
        </Tab.Navigator>
    );
}
