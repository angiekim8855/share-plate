import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Alert } from "react-native";
import Modal from "react-native-modal";
import ImageUploader from "./ImageUploader";
import LoadingIndicator from "./LoadingIndicator";
import { User } from "../types/user";
import { updateUserProfile } from "../services/user";
import { Timestamp } from "firebase/firestore";
import { uploadImage } from "../utils/util";

export default function ProfileEditModal({ isVisible, onClose, initialData }: any) {
    const [uploading, setUploading] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState("");

    // 모달 열릴 때 초기값 세팅
    useEffect(() => {
        setProfileImage(initialData?.profileImage || "");
        setUserName(initialData?.userName || "");
        setPhone(initialData?.phone || "");
    }, [initialData, isVisible]);

    const handleUpdate = async () => {
        if (!userName || !phone) {
            Alert.alert("모든 항목을 입력해주세요.");
            return;
        }

        setUploading(true);

        try {
            const imageUrl = await uploadImage(profileImage, "profileImages");

            const updatedData: User = {
                userId: initialData.userId,
                userType: initialData.userType,
                storeIdList: initialData.storeIdList,
                email: initialData.email,
                favoriteStore: initialData.favoriteStore,
                createAt: new Timestamp(initialData.createdAt.seconds, initialData.createdAt.nanoseconds),
                profileImage: imageUrl ?? "",
                userName,
                phone,
                storeId: initialData.storeId,
            };

            await updateUserProfile(updatedData);

            Alert.alert("수정 완료", "프로필이 성공적으로 수정되었습니다.", [
                {
                    text: "확인",
                    onPress: () => {
                        setUploading(false);
                        onClose();
                    },
                },
            ]);
        } catch (error) {
            setUploading(false);
            Alert.alert("오류 발생", "잠시 후 다시 시도해주세요.");
            console.error(error);
        }
    };
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.sheet}>
                <Text style={styles.title}>프로필 수정</Text>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.label}>프로필 이미지</Text>
                    <ImageUploader onImageSelected={setProfileImage} initialImage={profileImage} label="이미지 선택" />

                    <Text style={styles.label}>이메일 (수정 불가)</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: "#f0f0f0" }]}
                        value={initialData.email}
                        editable={false}
                        placeholderTextColor="#a1a1aa"
                    />

                    <Text style={styles.label}>이름</Text>
                    <TextInput
                        style={styles.input}
                        value={userName}
                        onChangeText={setUserName}
                        placeholder="이름을 입력하세요"
                        placeholderTextColor="#a1a1aa"
                    />

                    <Text style={styles.label}>전화번호</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="전화번호를 입력하세요"
                        keyboardType="phone-pad"
                        placeholderTextColor="#a1a1aa"
                    />
                </ScrollView>

                <View style={styles.footer}>
                    {uploading ? (
                        <LoadingIndicator />
                    ) : (
                        <TouchableOpacity style={styles.registerButton} onPress={handleUpdate}>
                            <Text style={styles.registerText}>수정하기</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    sheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: "80%",
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    scrollView: {
        maxHeight: "70%",
        minHeight: 200,
        padding: 16,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: "600",
        zIndex: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 24,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    registerButton: {
        backgroundColor: "#E53935",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    registerText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
