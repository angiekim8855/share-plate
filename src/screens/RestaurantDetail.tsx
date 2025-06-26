import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import ReservationBottomSheet from "../components/ReservationBottomSheet";
import { createReservation } from "../api/reservation";
import { StackNavigationProp } from "@react-navigation/stack";
import { FallbackImage } from "../components/FallbackImage";
import { Reservation } from "../types/reservation";
import { generateOrderNumber } from "../utils/util";

type RestaurantDetailRouteProp = RouteProp<RootStackParamList, "RestaurantDetail">;
type Navigation = StackNavigationProp<RootStackParamList, "RestaurantDetail">;

export default function RestaurantDetail() {
    const navigation = useNavigation<Navigation>();

    const route = useRoute<RestaurantDetailRouteProp>();
    const { store } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    // 예약하기 버튼 눌렀을 때
    const handleReserve = async (itemList: { itemId: string; itemName: string; quantity: number; finalPrice: number }[], totalPrice: number) => {
        try {
            const reservationData: Reservation = {
                orderNumber: generateOrderNumber(),
                userId: "1253464264",
                userName: "앤지",
                storeId: store.storeId,
                storeName: store.storeName,
                reservationDate: new Date().toISOString(),
                itemList: itemList,
                totalPrice: totalPrice,
                orderStatus: "pending", // 초기 상태
            };
            const reservationId = await createReservation(reservationData);

            Alert.alert("예약 완료", `예약이 정상적으로 완료되었습니다!\n예약 번호: ${reservationId}`, [
                {
                    text: "확인",
                    onPress: () => {
                        navigation.navigate("Main", {
                            screen: "Reservation",
                        });
                    },
                },
            ]);
        } catch (error) {
            Alert.alert("오류 발생", "잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>{store.storeName}</Text>
                <Text style={styles.subtitle}>📍 {store.address}</Text>
                <Text style={styles.subtitle}>📞 {store.phone}</Text>
                <Text style={styles.subtitle}>
                    ⏰ 마감 시간: {new Date(store.closingTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Text>

                <Text style={styles.sectionTitle}>📋 메뉴</Text>
                {store.itemList.length > 0 ? (
                    store.itemList.map((item) => (
                        <View key={item.itemId} style={styles.menuItem}>
                            <FallbackImage uri={item.itemImg} style={styles.image} defaultImg={require("../../assets/default-food.jpeg")} />
                            <View style={styles.menuText}>
                                <Text>{item.itemName || "메뉴 이름 없음"}</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.originalPrice}>{item.price.toLocaleString()}원</Text>
                                    <Text style={styles.discountPrice}>{item.finalPrice.toLocaleString()}원</Text>
                                </View>
                                <Text>수량: {item.stock}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>등록된 메뉴가 없습니다.</Text>
                )}

                <Text style={styles.sectionTitle}>📝 리뷰</Text>
                {store.reviewList.length > 0 ? (
                    store.reviewList.map((review, index) => (
                        <View style={styles.reviewContainer} key={`${review.reviewId}-${index}`}>
                            <FallbackImage uri={review.img} style={styles.reviewImage} />
                            <View style={styles.reviewContent}>
                                <Text style={styles.userName}>{review.userName || "익명"}</Text>
                                <Text style={styles.reviewDetail}>{review.reviewDetail}</Text>
                                <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>등록된 리뷰가 없습니다.</Text>
                )}
            </ScrollView>
            <TouchableOpacity style={styles.reserveButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.reserveButtonText}>예약하기</Text>
            </TouchableOpacity>
            <ReservationBottomSheet
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={(itemList, totalPrice) => {
                    handleReserve(itemList, totalPrice);
                    setModalVisible(false);
                }}
                item={store.itemList}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100, // 버튼 영역 가리기 방지
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 3,
    },
    sectionTitle: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: "600",
    },
    menuItem: {
        flexDirection: "row",
        marginBottom: 12,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
    menuText: {
        justifyContent: "center",
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    originalPrice: {
        textDecorationLine: "line-through",
        color: "#888",
        marginRight: 8,
        fontSize: 14,
    },
    discountPrice: {
        color: "#E63946",
        fontWeight: "bold",
        fontSize: 18,
    },
    reviewItem: {
        marginTop: 12,
        padding: 8,
        backgroundColor: "#f1f1f1",
        borderRadius: 6,
    },
    reviewContainer: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "flex-start",
    },
    reviewImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    reviewContent: {
        flex: 1,
    },
    userName: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    reviewDetail: {
        fontSize: 14,
        marginBottom: 4,
    },
    reviewDate: {
        fontSize: 12,
        color: "#999",
    },
    reserveButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#007AFF",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    reserveButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    noDataText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
        color: "#999",
        fontWeight: "500",
    },
});
