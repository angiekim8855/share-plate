import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../../navigation/types";
import { authStyles } from "../../styles/authStyles";
import { db } from "../../../firebase";

type Navigation = StackNavigationProp<RootStackParamList>;

export default function Signup() {
    const navigation = useNavigation<Navigation>();
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [userType, setUserType] = useState<"owner" | "customer">("customer");

    const handleSignup = async () => {
        try {
            // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // const user = userCredential.user;

            // // Firestore에 사용자 추가 정보 저장 -> doc.id를 userId로 하자
            // await setDoc(doc(db, "user", user.uid), {
            //     userId: user.uid,
            //     userType, // 'owner' or 'customer'
            //     storeIdList,
            // profileImg,
            //     username,
            //     phone,
            //     email,
            // favoriteStore,
            //     createdAt: new Date(),
            // });

            // Alert.alert("회원가입 성공", "이제 로그인해주세요!");
            navigation.navigate("Login");
        } catch (error: any) {
            Alert.alert("회원가입 실패", error.message);
        }
    };

    return (
        <View style={authStyles.container}>
            <Text style={authStyles.title}>회원가입</Text>

            {/* 프로필 이미지 업로드 추가*/}
            <TextInput style={authStyles.input} placeholder="이름" value={username} onChangeText={setUsername} />
            <TextInput
                style={authStyles.input}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput style={authStyles.input} placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
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

            <TouchableOpacity style={authStyles.button} onPress={handleSignup}>
                <Text style={authStyles.buttonText}>계정 만들기</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={authStyles.link}>이미 계정이 있으신가요? 로그인</Text>
            </TouchableOpacity>
        </View>
    );
}
