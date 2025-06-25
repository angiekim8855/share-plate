import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import ImageUploader from "./ImageUploader";
import { addItemToStore } from "../services/user";

export default function MenuRegisterModal({ isVisible, onClose, storeId }: any) {
    const [imageUri, setImageUri] = useState("");
    const [uploading, setUploading] = useState(false);
    const [itemName, setItemName] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [stock, setStock] = useState("");

    const uploadImage = async (uri: string) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            const imageId = `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
            const imageRef = ref(storage, `menuImages/${imageId}`);

            await uploadBytes(imageRef, blob);
            const downloadURL = await getDownloadURL(imageRef);

            return downloadURL;
        } catch (error) {
            console.error("이미지 업로드 에러:", error);
            return null;
        }
    };

    const handleRegister = async () => {
        if (!imageUri || !itemName || !originalPrice || !discountPrice || !stock) {
            Alert.alert("모든 항목을 입력해주세요.");
            return;
        }

        setUploading(true);

        try {
            const imageUrl = await uploadImage(imageUri);
            if (!imageUrl) {
                Alert.alert("이미지 업로드 실패", "다시 시도해주세요.");
                setUploading(false);
                return;
            }

            const itemId = uuidv4();

            const itemData = {
                itemId,
                itemName,
                thumbnailImg: imageUrl,
                originalPrice: Number(originalPrice),
                discountPrice: Number(discountPrice),
                stock: Number(stock),
                addDate: new Date().toISOString(),
            };
            await addItemToStore(storeId, itemData);

            Alert.alert("등록 완료", "메뉴가 성공적으로 등록되었습니다.", [
                {
                    text: "확인",
                    onPress: () => onClose(itemData),
                },
            ]);
        } catch (error) {
            Alert.alert("오류 발생", "잠시 후 다시 시도해주세요.");
            console.error(error);
        }
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.sheet}>
                <Text style={styles.title}>메뉴 등록</Text>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.label}>메뉴 이름</Text>
                    <TextInput
                        style={styles.input}
                        value={itemName}
                        onChangeText={setItemName}
                        placeholder="메뉴 이름을 입력하세요"
                        placeholderTextColor="#a1a1aa"
                    />

                    <Text style={styles.label}>메뉴 이미지</Text>
                    <ImageUploader onImageSelected={setImageUri} />

                    <Text style={styles.label}>정가</Text>
                    <TextInput
                        style={styles.input}
                        value={originalPrice}
                        onChangeText={setOriginalPrice}
                        placeholder="정가를 입력하세요"
                        keyboardType="number-pad"
                        placeholderTextColor="#a1a1aa"
                    />

                    <Text style={styles.label}>할인가</Text>
                    <TextInput
                        style={styles.input}
                        value={discountPrice}
                        onChangeText={setDiscountPrice}
                        placeholder="할인가를 입력하세요"
                        keyboardType="number-pad"
                        placeholderTextColor="#a1a1aa"
                    />

                    <Text style={styles.label}>수량</Text>
                    <TextInput
                        style={styles.input}
                        value={stock}
                        onChangeText={setStock}
                        placeholder="수량을 입력하세요"
                        keyboardType="number-pad"
                        placeholderTextColor="#a1a1aa"
                    />
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerText}>등록하기</Text>
                    </TouchableOpacity>
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
