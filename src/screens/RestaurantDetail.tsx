import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

type RestaurantDetailRouteProp = RouteProp<RootStackParamList, "RestaurantDetail">;

export default function RestaurantDetail() {
    const route = useRoute<RestaurantDetailRouteProp>();
    const { restaurant } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text>📍 {restaurant.address}</Text>
            <Text>⭐ {restaurant.rating}</Text>
            <Text>⏰ 마감 시간: {new Date(restaurant.closeTime).toLocaleTimeString()}</Text>
            <Text style={styles.sectionTitle}>📋 메뉴</Text>
            <FlatList
                data={restaurant.itemList}
                keyExtractor={(item) => item.itemId}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        {item.itemImg ? <Image source={{ uri: item.itemImg }} style={styles.image} /> : null}
                        <Text>{item.itemName || "메뉴 이름 없음"}</Text>
                        <Text>
                            정가: {item.price}원 → 할인: {item.finalPrice}원
                        </Text>
                        <Text>수량: {item.ea}</Text>
                    </View>
                )}
            />
            <Text style={styles.sectionTitle}>📝 리뷰</Text>
            <FlatList
                data={restaurant.reviewList}
                keyExtractor={(item) => item.reviewId || Math.random().toString()}
                renderItem={({ item }) => (
                    <View style={styles.review}>
                        <Text>{item.userName || "익명 사용자"}</Text>
                        <Text>{item.reviewDetail || "리뷰 내용 없음"}</Text>
                        <Text>{new Date(item.date).toLocaleDateString()}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
    item: { marginBottom: 10 },
    review: { marginBottom: 15, paddingBottom: 10, borderBottomWidth: 0.5, borderColor: "#ccc" },
    image: { width: 100, height: 100, marginBottom: 5 },
});
