import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { fetchStoreData } from "../../services/owner";
import { Store } from "../../types/store";
import { FallbackImage } from "../../components/FallbackImage";
import StoreModal from "../../components/StoreModal";

export default function OwnerMyPage() {
    const storeId = "4a550e11-e86c-43fa-91a6-02fd5a480331";
    const [store, setStore] = useState<Store>();
    const [reservations, setReservations] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadStoreData();
    }, []);

    const loadStoreData = async () => {
        const storeData = await fetchStoreData(storeId);
        // const reservationData = await fetchStoreReservations(storeId);
        setStore(storeData as Store);
        // setReservations(reservationData);
    };

    const handleLogout = async () => {
        console.log("to do: 로그아웃!");
        // await auth.signOut();
    };

    // const completedReservations = reservations.filter((r) => r.orderStatus === "completed");

    // const totalSales = completedReservations.reduce((sum, r) => sum + r.totalPrice, 0);
    // const totalOrders = completedReservations.length;
    // const totalItems = completedReservations.reduce((sum, r) => {
    //     return sum + r.itemList.reduce((itemSum, item) => itemSum + item.quantity, 0);
    // }, 0);

    return (
        <>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* 가게 정보 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>가게 정보</Text>
                    {store && (
                        <View>
                            <FallbackImage uri={store.thumbnailImg} style={styles.noImageBox} />

                            <View style={styles.infoCard}>
                                <Text style={styles.label}>가게명</Text>
                                <Text style={styles.value}>{store.storeName}</Text>
                            </View>

                            <View style={styles.infoCard}>
                                <Text style={styles.label}>카테고리</Text>
                                <Text style={styles.value}>{store.category}</Text>
                            </View>

                            <View style={styles.infoCard}>
                                <Text style={styles.label}>사업자 번호</Text>
                                <Text style={styles.value}>{store.businessNumber}</Text>
                            </View>

                            <View style={styles.infoCard}>
                                <Text style={styles.label}>은행 계좌</Text>
                                <Text style={styles.value}>{store.bankAccount}</Text>
                            </View>

                            <View style={styles.infoCard}>
                                <Text style={styles.label}>전화번호</Text>
                                <Text style={styles.value}>{store.phone}</Text>
                            </View>

                            <View style={styles.infoCard}>
                                <Text style={styles.label}>주소</Text>
                                <Text style={styles.value}>{store.address}</Text>
                            </View>

                            <View style={styles.infoCard}>
                                <Text style={styles.label}>마감 시간</Text>
                                <Text style={styles.value}>
                                    {new Date(store.closingTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </Text>
                            </View>
                        </View>
                    )}
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                        <Text style={styles.buttonText}>가게 정보 수정</Text>
                    </TouchableOpacity>
                </View>

                {/* 정산 내역 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>정산 내역</Text>
                    <Text style={styles.storeInfoText}>개발 예정</Text>
                    {/* <Text style={styles.storeInfoText}>총 판매량: {totalItems}개</Text>
                <Text style={styles.storeInfoText}>총 수익: {totalSales.toLocaleString()}원</Text>
                <Text style={styles.storeInfoText}>예약 건수: {totalOrders}건</Text> */}
                </View>

                {/* 리뷰 관리 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>리뷰 관리</Text>
                    <Text style={styles.storeInfoText}>개발 예정</Text>
                </View>

                {/* 로그아웃 */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.buttonText}>로그아웃</Text>
                </TouchableOpacity>
            </ScrollView>
            <StoreModal isVisible={modalVisible} onClose={() => setModalVisible(false)} mode="edit" initialData={store} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    thumbnail: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    noImageBox: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    noImageText: {
        fontSize: 16,
        color: "#999",
    },
    infoCard: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    label: {
        fontSize: 14,
        color: "#888",
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    storeInfoText: {
        fontSize: 16,
        marginBottom: 4,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#E53935",
        padding: 12,
        borderRadius: 8,
    },
});
