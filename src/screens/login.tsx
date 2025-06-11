import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

type Navigation = StackNavigationProp<RootStackParamList, "Login">;

export default function Login() {
    const navigation = useNavigation<Navigation>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>로그인</Text>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate("HomeMain")}
            >
                <Text style={styles.buttonText}>로그인하기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
