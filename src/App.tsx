import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}
