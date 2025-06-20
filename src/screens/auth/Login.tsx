import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { authStyles } from "../../styles/authStyles";

type Navigation = StackNavigationProp<RootStackParamList, "HomeMain">;

export default function Login() {
    const navigation = useNavigation<Navigation>();

    return (
        <View style={authStyles.container}>
            <Text style={authStyles.title}>로그인</Text>

            <TextInput style={authStyles.input} placeholder="이메일" keyboardType="email-address" />
            <TextInput style={authStyles.input} placeholder="비밀번호" secureTextEntry />

            <TouchableOpacity style={authStyles.button}>
                <Text style={authStyles.buttonText}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={authStyles.link}>처음이신가요? 회원가입으로 시작하세요!</Text>
            </TouchableOpacity>
        </View>
    );
}
