import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";

interface Props {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: (quantities: { [key: string]: number }) => void;
    item: {
        itemId: string;
        itemName: string;
        itemImg?: string;
        price: number;
        finalPrice: number;
    }[];
}

const ReservationBottomSheet = ({ isVisible, onClose, onConfirm, item }: Props) => {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    const increase = (itemId: string) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const decrease = (itemId: string) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: Math.max(0, (prev[itemId] || 0) - 1),
        }));
    };

    const formatPrice = (value: number) => value.toLocaleString();

    const getTotalPrice = () => {
        return item.reduce((total, item) => {
            const quantity = quantities[item.itemId] || 0;
            return total + item.finalPrice * quantity;
        }, 0);
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
            <View style={styles.sheet}>
                <Text style={styles.title}>메뉴 선택</Text>
                <ScrollView style={styles.scrollView}>
                    {item.map((menuItem) => (
                        <View key={menuItem.itemId} style={styles.menuItem}>
                            <Image
                                source={menuItem.itemImg ? { uri: menuItem.itemImg } : require("../../assets/default-food.jpeg")}
                                style={styles.image}
                            />
                            <View style={styles.menuInfo}>
                                <Text style={styles.name}>{menuItem.itemName}</Text>
                                <View style={styles.priceRow}>
                                    <Text style={styles.originalPrice}>₩{formatPrice(menuItem.price)}</Text>
                                    <Text style={styles.finalPrice}>₩{formatPrice(menuItem.finalPrice)}</Text>
                                </View>
                                <View style={styles.quantityRow}>
                                    <TouchableOpacity onPress={() => decrease(menuItem.itemId)} style={styles.qButton}>
                                        <Text style={styles.qText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.qText}>{quantities[menuItem.itemId] || 0}</Text>
                                    <TouchableOpacity onPress={() => increase(menuItem.itemId)} style={styles.qButton}>
                                        <Text style={styles.qText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <Text style={styles.totalPrice}>총 금액: ₩{formatPrice(getTotalPrice())}</Text>
                    <TouchableOpacity
                        style={[styles.confirmButton, getTotalPrice() === 0 && styles.disabledButton]}
                        onPress={() => onConfirm(quantities)}
                        disabled={getTotalPrice() === 0}
                    >
                        <Text style={styles.confirmText}>예약하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

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
    },
    menuItem: {
        flexDirection: "row",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    menuInfo: {
        flex: 1,
        justifyContent: "space-between",
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    originalPrice: {
        fontSize: 14,
        color: "#888",
        textDecorationLine: "line-through",
        marginRight: 8,
    },
    finalPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#E53935",
    },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    qButton: {
        backgroundColor: "#eee",
        padding: 8,
        borderRadius: 6,
        marginHorizontal: 8,
    },
    qText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    confirmButton: {
        backgroundColor: "#E53935",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    confirmText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ReservationBottomSheet;
