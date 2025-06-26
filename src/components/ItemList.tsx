import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FallbackImage } from "./FallbackImage";

export default function ItemList({ itemList, onEdit, onDelete }: any) {
    return (
        <ScrollView contentContainerStyle={styles.list}>
            {itemList.length === 0 ? (
                <Text style={styles.emptyText}>등록된 메뉴가 없습니다.</Text>
            ) : (
                itemList.map((item: any) => (
                    <View key={item.itemId} style={styles.card}>
                        {/* 메뉴 이미지 */}
                        <FallbackImage uri={item.thumbnailImg} style={styles.image} defaultImg={require("../../assets/default-food.jpeg")} />

                        {/* 메뉴 정보 */}
                        <View style={styles.info}>
                            <Text style={styles.itemName}>{item.itemName}</Text>
                            <Text style={styles.text}>정가: {item.originalPrice}원</Text>
                            <Text style={styles.text}>할인가: {item.discountPrice}원</Text>
                            <Text style={styles.text}>수량: {item.stock}개</Text>

                            {/* 버튼 영역 */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => onEdit(item)}>
                                    <Text style={styles.buttonText}>수정</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(item)}>
                                    <Text style={styles.buttonText}>삭제</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 16,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    imagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    imagePlaceholderText: {
        color: "#999",
        fontSize: 12,
    },
    info: {
        flex: 1,
        justifyContent: "center",
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
        color: "#555",
        marginBottom: 2,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: "center",
        marginHorizontal: 4,
    },
    editButton: {
        backgroundColor: "#4CAF50",
    },
    deleteButton: {
        backgroundColor: "#E53935",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    emptyText: {
        textAlign: "center",
        marginTop: 20,
        color: "#999",
        fontSize: 16,
    },
});
