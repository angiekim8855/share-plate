import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { createStore, updateStore } from "../services/owner";
import ImageUploader from "./ImageUploader";
import LoadingIndicator from "./LoadingIndicator";
import { fetchUserData } from "../services/user";
import { useUser } from "../context/UserContext";

export default function StoreModal({ isVisible, onClose, mode, initialData = {}, ownerId }: any) {
    const { setUser } = useUser();
    const [uploading, setLoading] = useState(false);
    const [thumbnailImg, setThumbnailImg] = useState("");
    const [storeName, setStoreName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [businessNumber, setBusinessNumber] = useState("");
    const [category, setCategory] = useState("");
    const [bankAccount, setBankAccount] = useState("");
    const [closingTime, setClosingTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    // 모달 열릴 때마다 초기값 세팅
    useEffect(() => {
        setThumbnailImg(initialData?.thumbnailImg || "");
        setStoreName(initialData?.storeName || "");
        setCategory(initialData?.category || "");
        setAddress(initialData?.address || "");
        setPhone(initialData?.phone || "");
        setBusinessNumber(initialData?.businessNumber || "");
        setBankAccount(initialData?.bankAccount || "");
        setClosingTime(initialData?.closingTime ? new Date(initialData.closingTime) : new Date());
    }, [isVisible]);

    const handleChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        setShowTimePicker(Platform.OS === "ios"); // iOS는 항상 띄우고 Android는 닫기
        if (selectedTime) {
            setClosingTime(selectedTime);
        }
    };

    const handleSubmit = async () => {
        if (!thumbnailImg || !storeName || !address || !phone || !businessNumber || !category || !bankAccount) {
            Alert.alert("모든 항목을 입력해주세요.");
            return;
        }
        setLoading(true);

        try {
            const newStoreData = {
                storeId: initialData?.storeId || uuidv4(),
                storeName,
                category,
                thumbnailImg,
                address,
                phone,
                businessNumber,
                bankAccount,
                closingTime: closingTime.toISOString(),
                ownerId: ownerId || initialData.ownerId,
            };

            if (mode === "edit") {
                await updateStore(newStoreData);
                Alert.alert("수정 완료", "가게 정보가 성공적으로 수정되었습니다.", [
                    {
                        text: "확인",
                        onPress: () => {
                            setLoading(false);
                            onClose();
                        },
                    },
                ]);
            } else {
                await createStore(newStoreData);
                Alert.alert("등록 완료", "가게 정보가 성공적으로 등록되었습니다.", [
                    {
                        text: "확인",
                        onPress: async () => {
                            const updatedUser = await fetchUserData(ownerId);
                            setUser(updatedUser.data());
                            setLoading(false);
                            onClose();
                        },
                    },
                ]);
            }
        } catch (error) {
            setLoading(false);
            Alert.alert("오류 발생", "잠시 후 다시 시도해주세요.");
            console.error(error);
        }
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={mode === 'add' ? undefined : onClose} style={styles.modal}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.sheet}>
                <Text style={styles.title}>{mode === "edit" ? "가게 수정" : "가게 등록"}</Text>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.label}>가게이름</Text>
                    <TextInput
                        style={styles.input}
                        value={storeName}
                        onChangeText={setStoreName}
                        placeholder="가게 이름을 입력하세요"
                        placeholderTextColor="#a1a1aa"
                    />

                    <Text style={styles.label}>카테고리</Text>
                    <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
                        <Picker.Item label="카테고리를 선택하세요" value="" color="#a1a1aa" />
                        <Picker.Item label="한식" value="korean" color="#222" />
                        <Picker.Item label="양식" value="western" color="#222" />
                        <Picker.Item label="분식" value="street" color="#222" />
                        <Picker.Item label="중식" value="chinese" color="#222" />
                        <Picker.Item label="일식" value="japanese" color="#222" />
                        <Picker.Item label="디저트" value="dessert" color="#222" />
                        <Picker.Item label="베이커리" value="bakery" color="#222" />
                        <Picker.Item label="과일" value="fruit" color="#222" />
                        <Picker.Item label="샐러드" value="salad" color="#222" />
                        <Picker.Item label="기타" value="etc" color="#222" />
                    </Picker>

                    <Text style={styles.label}>가게 이미지</Text>
                    <ImageUploader onImageSelected={setThumbnailImg} initialImage={thumbnailImg} label="이미지 선택" />

                    <Text style={styles.label}>주소</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="주소를 입력하세요"
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

                    <Text style={styles.label}>사업자번호</Text>
                    <TextInput
                        style={styles.input}
                        value={businessNumber}
                        onChangeText={setBusinessNumber}
                        placeholder="사업자번호를 입력하세요"
                        keyboardType="number-pad"
                        placeholderTextColor="#a1a1aa"
                    />

                    <Text style={styles.label}>계좌번호</Text>
                    <TextInput
                        style={styles.input}
                        value={bankAccount}
                        onChangeText={setBankAccount}
                        placeholder="예) 토스 100012341234"
                        placeholderTextColor="#a1a1aa"
                    />

                    <Text style={styles.label}>영업 마감 시간</Text>
                    <Button
                        title={closingTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        onPress={() => setShowTimePicker(true)}
                    />

                    {showTimePicker && (
                        <DateTimePicker
                            value={closingTime}
                            mode="time"
                            is24Hour={true}
                            display={Platform.OS === "ios" ? "spinner" : "default"} // iOS: spinner, Android: 기본
                            onChange={handleChange}
                            minuteInterval={10}
                        />
                    )}
                </ScrollView>

                <View style={styles.footer}>
                    {uploading ? (
                        <LoadingIndicator />
                    ) : (
                        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                            <Text style={styles.registerText}>{mode === "edit" ? "수정하기" : "등록하기"}</Text>
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
    placeholder: {
        color: "#a1a1aa",
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
