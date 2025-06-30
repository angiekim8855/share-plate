import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserMyPageUI({ user, favorites, onEditProfile, onLogout }: any) {
    const handleLogout = () => {
        Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
            { text: "취소", style: "cancel" },
            { text: "로그아웃", onPress: onLogout },
        ]);
    };

    // todo: 즐겨찾기 가게 삭제 기능 추가
    const renderFavoriteItem = ({ item }: any) => (
        <View style={styles.card}>
            <Image source={{ uri: item.thumbnailImg }} style={styles.storeImage} />
            <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{item.storeName}</Text>
                <Text style={styles.storeCategory}>{item.category}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={{ uri: user.profileImage || "https://via.placeholder.com/100" }} style={styles.profileImage} />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            {/* Favorites */}
            <Text style={styles.sectionTitle}>즐겨찾기 가게</Text>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderFavoriteItem}
                    keyExtractor={(item) => item.storeId}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.emptyText}>즐겨찾기한 가게가 없습니다.</Text>
            )}

            {/* Account Actions */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onEditProfile}>
                    <Text style={styles.buttonText}>프로필 수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: "#E53935" }]} onPress={handleLogout}>
                    <Text style={styles.buttonText}>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    userEmail: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 16,
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        marginBottom: 12,
        overflow: "hidden",
    },
    storeImage: {
        width: 100,
        height: 100,
    },
    storeInfo: {
        flex: 1,
        padding: 12,
        justifyContent: "center",
    },
    storeName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    storeCategory: {
        fontSize: 14,
        color: "#666",
    },
    emptyText: {
        textAlign: "center",
        color: "#a1a1aa",
        marginTop: 32,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
