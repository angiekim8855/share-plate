import React, { useState, useCallback } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { Reservation as ReservationType } from "../types/reservation";

type Reservation = ReservationType & {
    id: string;
};

export function Reservation() {
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    // 유저 정보는 Auth나 AsyncStorage에서 가져올 수 있다고 생각
    const userId = "1253464264";

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "reservations"), where("userId", "==", userId));
            const snapshot = await getDocs(q);
            const resList: Reservation[] = [];

            snapshot.forEach((doc) => {
                resList.push({ id: doc.id, ...(doc.data() as Omit<Reservation, "id">) });
            });

            setReservations(resList);
        } catch (error) {
            console.log("예약 정보 불러올 때 오류 :", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchReservations();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>나의 예약 리스트</Text>
            <ScrollView style={styles.container}>
                {reservations && reservations.length > 0 ? (
                    reservations.map((item, idx) => (
                        <View key={item.id} style={styles.card}>
                            <Text style={styles.storeName}>{item.storeName}</Text>
                            <Text style={styles.date}>예약일: {new Date(item.reservationDate).toLocaleString()}</Text>
                            <View style={styles.itemList}>
                                {item.itemList.map((menuItem, menuIdx) => (
                                    <View key={`${item.id}-${menuIdx}`} style={styles.menuItem}>
                                        <Text style={styles.menuName}>• {menuItem.itemName}</Text>
                                        <Text style={styles.menuQuantity}>수량: {menuItem.quantity}개</Text>
                                        <Text style={styles.menuPrice}>₩{menuItem.finalPrice.toLocaleString()}</Text>
                                    </View>
                                ))}
                            </View>
                            <Text style={styles.totalPrice}>총 금액: ₩{item.totalPrice.toLocaleString()}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>주문 내역이 없습니다.</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    card: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
    },
    storeName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    date: {
        color: "#666",
        marginBottom: 10,
    },
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    menuName: {
        flex: 2,
        fontSize: 14,
    },
    menuQuantity: {
        flex: 1,
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
    menuPrice: {
        flex: 1,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "right",
    },
    totalPrice: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
    },
    itemList: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    emptyText: {
        color: "#666",
        textAlign: "center",
        marginTop: 20,
    },
});
