import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface ImageUploaderProps {
    onImageSelected: React.Dispatch<React.SetStateAction<string>>;
    label?: string;
}

export default function ImageUploader({ onImageSelected, label = "이미지 선택" }: ImageUploaderProps) {
    const [localUri, setLocalUri] = useState<string>("");

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
            setLocalUri(uri);
            onImageSelected(uri); // 부모 컴포넌트에 선택한 로컬 이미지 URI 전달
        }
    };

    return (
        <View style={styles.container}>
            {localUri && <Image source={{ uri: localUri }} style={styles.image} />}
            <Button title={label} onPress={pickImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    image: { width: 200, height: 200, marginBottom: 8, borderRadius: 8 },
});
