import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import mockData from "../api/storeData.json";
import defaultImg from "../../assets/defaultImg.jpeg";

type Navigation = StackNavigationProp<RootStackParamList, "HomeMain">;

export default function Home() {
    const navigation = useNavigation<Navigation>();

    return (
        <FlatList
            data={mockData}
            keyExtractor={(item) => item.storeId}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RestaurantDetail", { restaurant: item })}>
                    {item.thumbnailImg ? (
                        <Image source={{ uri: item.thumbnailImg }} style={styles.thumbnail} />
                    ) : (
                        <Image source={defaultImg} style={styles.thumbnail}></Image>
                    )}
                    <View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>{item.address}</Text>
                        <Text>⭐ {item.rating}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
    },
    thumbnail: {
        width: 80,
        height: 80,
        marginRight: 12,
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
