import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const defaultInputProps = {
    placeholderTextColor: "#888",
};
export default function StoreRegisterModal({ isVisible, onClose }: any) {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal} animationIn="slideInUp" animationOut="slideOutDown">
            <View style={styles.container}>
                <Text style={styles.title}>가게 등록</Text>
                <TextInput placeholder="가게 이름" style={styles.input} {...defaultInputProps} />
                <TextInput placeholder="주소" style={styles.input} {...defaultInputProps} />
                <TextInput placeholder="전화번호" style={styles.input} {...defaultInputProps} />
                <TextInput placeholder="사업자번호" style={styles.input} {...defaultInputProps} />
                <Button title="등록하기" onPress={onClose} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    container: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 16,
        padding: 12,
        fontSize: 16,
        color: "#000",
    },
});
