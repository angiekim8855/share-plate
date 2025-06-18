import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { authStyles } from "../styles/authStyles";
import { Picker } from "@react-native-picker/picker";

type Navigation = StackNavigationProp<RootStackParamList>;

export default function Signup() {
    const navigation = useNavigation<Navigation>();
    const [phone, setPhone] = useState("");
    const [userType, setUserType] = useState<"owner" | "customer">("customer");

    // const handleSignup = async () => {
    //     try {
    //         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //         const user = userCredential.user;

    //         // Firestore에 사용자 추가 정보 저장
    //         await setDoc(doc(db, "users", user.uid), {
    //             uid: user.uid,
    //             email,
    //             username,
    //             phone,
    //             userType, // 'owner' or 'customer'
    //             createdAt: new Date(),
    //         });

    //         Alert.alert("회원가입 성공", "이제 로그인해주세요!");
    //         navigation.navigate("Login");
    //     } catch (error: any) {
    //         Alert.alert("회원가입 실패", error.message);
    //     }
    // };

    return (
        <View style={authStyles.container}>
            <Text style={authStyles.title}>회원가입</Text>

            <TextInput style={authStyles.input} placeholder="이름" />
            <TextInput style={authStyles.input} placeholder="이메일" keyboardType="email-address" />
            <TextInput style={authStyles.input} placeholder="비밀번호" secureTextEntry />
            <TextInput
                style={authStyles.input}
                placeholder="전화번호 (예: 010-1234-5678)"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />

            <View style={authStyles.pickerContainer}>
                <Text style={authStyles.pickerLabel}>유저 타입 선택</Text>
                <Picker selectedValue={userType} onValueChange={(value) => setUserType(value)} dropdownIconColor="#555">
                    <Picker.Item label="일반 손님" value="customer" />
                    <Picker.Item label="사장님" value="owner" />
                </Picker>
            </View>

            <TouchableOpacity style={authStyles.button}>
                <Text style={authStyles.buttonText}>계정 만들기</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={authStyles.link}>이미 계정이 있으신가요? 로그인</Text>
            </TouchableOpacity>
        </View>
    );
}
