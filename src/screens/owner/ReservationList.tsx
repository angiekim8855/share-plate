import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Alert } from "react-native";
import StoreRegisterModal from "../../components/StoreRegisterModal";
import { fetchStoreReservations } from "../../api/owner";
import LoadingIndicator from "../../components/LoadingIndicator";
import { updateOrderStatus } from "../../api/reservation";
import { Reservation, ReservationStatus } from "../../types/reservation";
import StatusBadge from "../../components/StatusBadge";

export default function ReservationList() {
    const [isStoreNotResistered, setIsStoreNotResistered] = useState<boolean>(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    // 데이터 가져와야함
    const storeId = "4a550e11-e86c-43fa-91a6-02fd5a480331";

    const fetchReservations = async () => {
        setLoading(true);
        const data = await fetchStoreReservations(storeId);
        setReservations(data as Reservation[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchReservations();
    }, [storeId]);

    if (loading) {
        return <LoadingIndicator />;
    }

    const handleStatusChange = (reservationId: string, newStatus: ReservationStatus, message: string) => {
        Alert.alert(message, "진행하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
                text: "확인",
                onPress: async () => {
                    await updateOrderStatus(storeId, reservationId, newStatus);
                    fetchReservations();
                },
            },
        ]);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>예약 목록</Text>

            {reservations.length > 0 ? (
                reservations.map((reservation) => (
                    <View key={reservation.reservationId} style={[styles.card, styles[reservation.orderStatus]]}>
                        <View style={styles.header}>
                            <Text style={styles.userName}>예약자: {reservation.userName}</Text>
                            <StatusBadge status={reservation.orderStatus} />
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

                        {/* 오더 상태에 따른 버튼 */}
                        {reservation.orderStatus === "Pending" && (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.confirmButton}
                                    onPress={() => handleStatusChange(reservation.reservationId, "Reserved", "예약을 확정하시겠습니까?")}
                                >
                                    <Text style={styles.buttonText}>예약 확정</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => handleStatusChange(reservation.reservationId, "Canceled", "예약을 반려하시겠습니까?")}
                                >
                                    <Text style={styles.buttonText}>예약 반려</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {reservation.orderStatus === "Reserved" && (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.confirmButton}
                                    onPress={() => handleStatusChange(reservation.reservationId, "Completed", "픽업이 완료되었습니까?")}
                                >
                                    <Text style={styles.buttonText}>픽업 완료</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => handleStatusChange(reservation.reservationId, "Canceled", "예약을 반려하시겠습니까?")}
                                >
                                    <Text style={styles.buttonText}>예약 반려</Text>
                                </TouchableOpacity> */}
                            </View>
                        )}
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>예약 내역이 없습니다.</Text>
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
    },
    card: {
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    Pending: {
        borderColor: "#f39c12",
        borderWidth: 1,
    },
    Reserved: {
        borderColor: "#3498db",
        borderWidth: 1,
    },
    Completed: {
        borderColor: "#2ecc71",
        borderWidth: 1,
    },
    Canceled: {
        borderColor: "#e74c3c",
        borderWidth: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    storeName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    userName: {
        fontSize: 16,
        fontWeight: "600",
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
        backgroundColor: "#4A4A4A",
        padding: 8,
        borderRadius: 5,
        marginRight: 8,
    },
    cancelButton: {
        backgroundColor: "#4A4A4A",
        padding: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
