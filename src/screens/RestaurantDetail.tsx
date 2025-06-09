import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import ReservationBottomSheet from "../components/ReservationBottomSheet";

type RestaurantDetailRouteProp = RouteProp<RootStackParamList, "RestaurantDetail">;

export default function RestaurantDetail() {
    const route = useRoute<RestaurantDetailRouteProp>();
    const { restaurant } = route.params;

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>{restaurant.name}</Text>
                <Text>📍 {restaurant.address}</Text>
                <Text>⭐ {restaurant.rating}</Text>
                <Text>⏰ 마감 시간: {new Date(restaurant.closeTime).toLocaleTimeString()}</Text>

                <Text style={styles.sectionTitle}>📋 메뉴</Text>
                {restaurant.itemList.map((item) => (
                    <View key={item.itemId} style={styles.menuItem}>
                        <Image source={item.itemImg ? item.itemImg : require("../../assets/default-food.jpeg")} style={styles.image} />
                        <View style={styles.menuText}>
                            <Text>{item.itemName || "메뉴 이름 없음"}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.originalPrice}>{item.price.toLocaleString()}원</Text>
                                <Text style={styles.discountPrice}>{item.finalPrice.toLocaleString()}원</Text>
                            </View>
                            <Text>수량: {item.ea}</Text>
                        </View>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>📝 리뷰</Text>
                {restaurant.reviewList.map((review, index) => (
                    <View style={styles.reviewContainer} key={`${review.reviewId}-${index}`}>
                        {review.img && <Image source={{ uri: review.img }} style={styles.reviewImage} />}
                        <View style={styles.reviewContent}>
                            <Text style={styles.userName}>{review.userName || "익명"}</Text>
                            <Text style={styles.reviewDetail}>{review.reviewDetail}</Text>
                            <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.reserveButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.reserveButtonText}>예약하기</Text>
            </TouchableOpacity>
            <ReservationBottomSheet
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={(quantities) => {
                    console.log('예약 수량:', quantities);
                    setModalVisible(false);
                }}
                item={restaurant.itemList}
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
    },
    subtitle: {
        marginBottom: 12,
        color: "gray",
    },
    sectionTitle: {
        marginTop: 16,
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
});

// const styles = StyleSheet.create({
//     container: { padding: 20 },
//     title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
//     sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
//     item: { marginBottom: 10 },
//     review: { marginBottom: 15, paddingBottom: 10, borderBottomWidth: 0.5, borderColor: "#ccc" },
//     image: { width: 100, height: 100, marginBottom: 5 },
// });
