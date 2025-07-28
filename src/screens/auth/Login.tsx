import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { authStyles } from "../../styles/authStyles";
import { login } from "../../services/auth";
import { useUser } from "../../context/UserContext";
import { MaterialIcons } from "@expo/vector-icons";

type Navigation = StackNavigationProp<RootStackParamList, "HomeMain">;

export default function Login() {
    const navigation = useNavigation<Navigation>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSecure, setIsSecure] = useState(true);

    const { user, setUser } = useUser();

    const handleSignIn = async () => {
        try {
            const userData = await login(email, password);
            setUser(userData);
            Alert.alert("로그인 성공", `안녕하세요, ${userData.userName}님!`);
        } catch (error: any) {
            Alert.alert("로그인 실패", error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={authStyles.container}>
                <Text style={authStyles.title}>로그인</Text>
                <TextInput
                    style={authStyles.input}
                    placeholder="이메일"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="email-address"
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <View style={{ position: "relative" }}>
                    <TextInput
                        style={[authStyles.input, { paddingRight: 40, color: "black" }]}
                        placeholder="비밀번호"
                        placeholderTextColor="rgba(0, 0, 0, 0.54)"
                        secureTextEntry={isSecure}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={authStyles.PwIconButton} onPress={() => setIsSecure((prev) => !prev)} activeOpacity={0.7}>
                        <MaterialIcons name={isSecure ? "visibility-off" : "visibility"} size={20} color="rgba(0, 0, 0, 0.54)" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={authStyles.button} onPress={handleSignIn}>
                    <Text style={authStyles.buttonText}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={authStyles.link}>처음이신가요? 회원가입으로 시작하세요!</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}
