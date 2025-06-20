import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";

export default function ItemManage() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>아이템 등록 / 관리</Text>
            {/* 여기에 등록된 아이템 목록 */}
            {/* 아이템 추가 버튼 */}
            <Button title="아이템 추가" onPress={() => {}} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
});
