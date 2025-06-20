import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import StoreRegisterModal from "../../components/StoreRegisterModal";

export default function ReservationList() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(true);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>예약 목록</Text>
            {/* 여기에 예약 카드 목록 map으로 렌더링 */}

            {/* 가게 등록 모달 */}
            <StoreRegisterModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
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
