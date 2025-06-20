import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

export default function OwnerMyPage() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>마이페이지</Text>

            <View style={styles.section}>
                <Text style={styles.label}>가게 정보 수정</Text>
                <Button title="가게 정보 수정하기" onPress={() => {}} />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>정산 내역 보기</Text>
                <Button title="정산 내역 확인하기" onPress={() => {}} />
            </View>

            <View style={styles.section}>
                <Button title="로그아웃" onPress={() => {}} color="red" />
            </View>
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
    section: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
});
