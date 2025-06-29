import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Alert } from "react-native";
import StoreRegisterModal from "../../components/StoreRegisterModal";
import { fetchStoreReservations } from "../../api/owner";
import LoadingIndicator from "../../components/LoadingIndicator";
import { updateOrderStatus } from "../../api/reservation";
import { Reservation, ReservationStatus } from "../../types/reservation";

export default function ReservationList() {
    const [isStoreNotResistered, setIsStoreNotResistered] = useState<boolean>(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    // 데이터 가져와야함
    const storeId = "4a550e11-e86c-43fa-91a6-02fd5a480331";

    useEffect(() => {
        const loadReservations = async () => {
            const data = await fetchStoreReservations(storeId);
            setReservations(data);
            setLoading(false);
        };

        loadReservations();
    }, [storeId]);

    if (loading) {
        return <LoadingIndicator />;
    }

    const handleStatusChange = (newStatus: ReservationStatus, message: string) => {
        Alert.alert(message, "진행하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
                text: "확인",
                onPress: async () => {
                    await updateOrderStatus(storeId, reservations.reservationId, newStatus);
                    // fetchReservations();
                },
            },
        ]);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Pending":
                return { backgroundColor: "#FFCC00", color: "#000" }; // 노랑
            case "Canceled":
                return { backgroundColor: "#FF6B6B", color: "#fff" }; // 빨강
            case "Reserved":
                return { backgroundColor: "#1E90FF", color: "#fff" }; // 초록
            case "Completed":
                return { backgroundColor: "#4CAF50", color: "#fff" }; // 초록
            default:
                return { backgroundColor: "#ccc", color: "#000" };
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>예약 목록</Text>

            {reservations.length > 0 ? (
                reservations.map((reservation) => (
                    <View key={reservation.reservationId} style={styles.reservationItem}>
                        <View style={styles.header}>
                            <Text style={styles.userName}>예약자: {reservation.userName}</Text>
                            <View style={[styles.statusButton, { backgroundColor: getStatusStyle(reservation.orderStatus).backgroundColor }]}>
                                <Text style={{ color: getStatusStyle(reservation.orderStatus).color, fontWeight: "bold" }}>
                                    {reservation.orderStatus}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.reservationNumber}>예약 번호: {reservation.orderNumber}</Text>
                        <Text style={styles.reservationDate}>예약일: {new Date(reservation.reservationDate).toLocaleDateString()}</Text>
                        <Text style={styles.totalPrice}>총 금액: {reservation.totalPrice.toLocaleString()}원</Text>

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
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>예약 내역이 없습니다.</Text>
            )}

            {reservations.orderStatus === "Pending" && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => handleStatusChange("Reserved", "예약을 확정하시겠습니까?")}>
                        <Text style={styles.buttonText}>예약 확정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => handleStatusChange("Canceled", "예약을 반려하시겠습니까?")}>
                        <Text style={styles.buttonText}>예약 반려</Text>
                    </TouchableOpacity>
                </View>
            )}

            {reservations.orderStatus === "Reserved" && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => handleStatusChange("Completed", "픽업이 완료되었습니까?")}>
                        <Text style={styles.buttonText}>픽업 완료</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => handleStatusChange("Canceled", "예약을 반려하시겠습니까?")}>
                        <Text style={styles.buttonText}>예약 반려</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* 가게 등록 모달 */}
            <StoreRegisterModal isVisible={isStoreNotResistered} onClose={() => setIsStoreNotResistered(false)} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        // backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    reservationItem: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: "600",
    },
    statusButton: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    reservationNumber: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    reservationDate: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    totalPrice: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
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
    noDataText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
        color: "#999",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 12,
    },
    confirmButton: {
        backgroundColor: "#2ecc71",
        padding: 8,
        borderRadius: 5,
        marginRight: 8,
    },
    cancelButton: {
        backgroundColor: "#e74c3c",
        padding: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
