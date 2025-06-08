import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import mockData from "../api/storeData.json";
import { Restaurant } from "../types/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

type Navigation = StackNavigationProp<RootStackParamList, "HomeMain">;

export default function HomeScreen() {
    const navigation = useNavigation<Navigation>();

    const renderItem = ({ item }: { item: Restaurant }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RestaurantDetail", { restaurant: item })}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>
                {item.category} · {item.address}
            </Text>
            <Text>⭐ {item.rating}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList data={mockData} keyExtractor={(item) => item.storeId} renderItem={renderItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
