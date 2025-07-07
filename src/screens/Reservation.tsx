import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { ReservationItem, Reservation as ReservationType } from "../types/reservation";
import { fetchUserReservations } from "../api/user";
import LoadingIndicator from "../components/LoadingIndicator";
import StatusBadge from "../components/StatusBadge";
import { ORDER_STATUS_COLORS } from "../styles/statusStyles";
import { deleteReservation, increaseItemStock } from "../api/reservation";
import { useFocusEffect } from "@react-navigation/native";

export function Reservation() {
    const [loading, setLoading] = useState(true);
    const [reservationList, setReservationList] = useState<ReservationType[]>([]);

    // 데이터 가져와야함
    const userId = "1253464264";

    const fetchReservations = async () => {
        setLoading(true);
        const data = await fetchUserReservations(userId);
        setReservationList(data as ReservationType[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchReservations();
    }, [userId]);

    useFocusEffect(
        useCallback(() => {
            fetchReservations();
        }, [])
    );

    if (loading) {
        return <LoadingIndicator />;
    }

    const handleStatusChange = (storeId: string, reservationId: string, itemList: ReservationItem[]) => {
        Alert.alert("예약 삭제", "정말 삭제하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
                text: "삭제",
                style: "destructive",
                onPress: async () => {
                    try {
                        // ✅ 재고 복구 먼저
                        await Promise.all(itemList.map((item) => increaseItemStock(storeId, item.itemId, item.stock)));

                        await deleteReservation(userId, storeId, reservationId);
                        fetchReservations(); // 새로고침
                    } catch (error) {
                        Alert.alert("삭제 실패", "잠시 후 다시 시도해주세요.");
                    }
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>나의 예약 리스트</Text>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                {reservationList && reservationList.length > 0 ? (
                    reservationList.map((reservation) => (
                        <View key={reservation.orderNumber} style={styles.card}>
                            <View style={styles.header}>
                                <Text style={styles.storeName}>{reservation.storeName}</Text>
                                <StatusBadge status={reservation.orderStatus} />
                            </View>
                            <Text style={styles.reservationNumber}>예약번호: {reservation.orderNumber}</Text>
                            <Text style={styles.reservationDate}>예약일: {new Date(reservation.reservationDate).toLocaleString()}</Text>
                            <View style={styles.menuContainer}>
                                <Text style={styles.menuTitle}>🧾 주문 메뉴</Text>
                                {reservation.itemList.map((item: any) => (
                                    <View key={item.itemId} style={styles.menuItem}>
                                        <Text style={styles.menuName}>{item.itemName}</Text>
                                        <Text style={styles.menuDetail}>수량: {item.stock}개</Text>
                                        <Text style={styles.menuDetail}>가격: {item.discountPrice.toLocaleString()}원</Text>
                                    </View>
                                ))}
                            </View>
                            <Text style={styles.totalPrice}>총 금액: ₩{reservation.totalPrice.toLocaleString()}</Text>

                            {reservation.orderStatus === "Pending" && (
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => handleStatusChange(reservation.storeId, reservation.reservationId, reservation.itemList)}
                                    >
                                        <Text style={styles.buttonText}>예약 취소</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>주문 내역이 없습니다.</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
    },
    card: {
        backgroundColor: "#ffffff",
        padding: 20,
        marginBottom: 15,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#eee",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    storeName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    reservationNumber: {
        color: "#888",
        marginBottom: 4,
        fontSize: 14,
    },
    reservationDate: {
        color: "#888",
        marginBottom: 10,
        fontSize: 14,
    },
    menuContainer: {
        backgroundColor: "#f9f9f9",
        padding: 12,
        borderRadius: 8,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    menuItem: {
        marginBottom: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginVertical: 2,
    },
    menuName: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 2,
    },
    menuDetail: {
        fontSize: 14,
        color: "#444",
    },
    totalPrice: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
    },
    noDataText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
        color: "#999",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
        gap: 8,
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: ORDER_STATUS_COLORS.Canceled,
        padding: 8,
        borderRadius: 8,
        flex: 1,
    },
    buttonText: {
        color: ORDER_STATUS_COLORS.Canceled,
        fontWeight: "bold",
        textAlign: "center",
    },
});
