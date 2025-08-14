import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { FallbackImage } from "../../components/FallbackImage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { Store } from "../../types/store";
import LoadingIndicator from "../../components/LoadingIndicator";
import { categoryColors, StoreCategory } from "../../constant";

type Navigation = StackNavigationProp<RootStackParamList, "HomeMain">;

export default function Home() {
    const navigation = useNavigation<Navigation>();
    const [storeList, setStoreList] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStores = async () => {
        try {
            setLoading(true); // 로딩 시작
            const querySnapshot = await getDocs(collection(db, "store"));
            const stores: Store[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    thumbnailImg: data.thumbnailImg ?? "",
                    storeId: data.storeId ?? doc.id,
                    storeName: data.storeName ?? "",
                    businessNumber: data.businessNumber ?? "",
                    category: data.category ?? "",
                    address: data.address ?? "",
                    phone: data.phone ?? "",
                    bankAccount: data.bankAccount ?? "",
                    closingTime: data.closingTime ?? "",
                    ownerId: data.ownerId ?? "",
                } as Store;
            });
            setStoreList(stores);
        } catch (error) {
            console.error("데이터 가져오기 실패", error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <FlatList
            data={storeList}
            keyExtractor={(item) => item.storeId}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RestaurantDetail", { store: item })}>
                    <FallbackImage uri={item.thumbnailImg} style={styles.thumbnail} defaultImg={require("../../../assets/defaultImg.jpeg")} />
                    <View>
                        <Text style={styles.name}>{item.storeName}</Text>
                        <Text>{item.address}</Text>
                    </View>

                    {/* 카테고리 뱃지 */}
                    <View style={[styles.badge, { backgroundColor: categoryColors[item.category] || "#999" }]}>
                        <Text style={styles.badgeText}>{StoreCategory[item.category]}</Text>
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
        position: "relative", // 뱃지 절대 위치를 위한 설정
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
    infoContainer: {
        flex: 1,
    },
    badge: {
        position: "absolute",
        top: 10,
        right: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
    },
});
