import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { checkImageExists } from "../utils/util";

interface ImageUploaderProps {
    onImageSelected: React.Dispatch<React.SetStateAction<string>>;
    initialImage?: string;
    label?: string;
}

export default function ImageUploader({ onImageSelected, initialImage = "", label = "이미지 선택" }: ImageUploaderProps) {
    const [selectedImage, setSelectedImage] = useState(initialImage || "");
    const [imageExists, setImageExists] = useState(true);

    useEffect(() => {
        if (initialImage && initialImage.startsWith("http")) {
            validateImage(initialImage);
        } else {
            setSelectedImage(initialImage || "");
            setImageExists(true);
        }
    }, [initialImage]);

    const validateImage = async (url: string) => {
        const exists = await checkImageExists(url);
        if (exists) {
            setSelectedImage(url);
            setImageExists(true);
        } else {
            console.warn("이미지가 storage에 없습니다.");
            setImageExists(false);
        }
    };

    const isLocalImage = selectedImage && !selectedImage.startsWith("http");

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("권한이 필요합니다.", "갤러리 접근 권한을 허용해주세요.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setSelectedImage(uri);
            setImageExists(true);
            onImageSelected(uri); // 부모 컴포넌트에 선택한 로컬 이미지 URI 전달
        }
    };

    return (
        <View style={styles.container}>
            {selectedImage && imageExists ? (
                <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>이미지 없음</Text>
                </View>
            )}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 24,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    placeholder: {
        width: 200,
        height: 200,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    placeholderText: {
        color: "#a1a1aa",
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
