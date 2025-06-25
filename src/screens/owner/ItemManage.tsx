import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import MenuRegisterModal from "../../components/MenuRegisterModal";

export default function ItemManage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 데이터 가져와야함
    const storeId = "4a550e11-e86c-43fa-91a6-02fd5a480331";

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>메뉴 관리</Text>
            <Button title="메뉴 추가" onPress={() => setIsModalVisible(true)} />

            {/* 여기에 등록된 아이템 목록 */}

            <MenuRegisterModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                storeId={storeId} // 현재 가게 ID 넘기기
            />
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
