import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, Button, ActivityIndicator } from "react-native";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../../firebase";
import { Item } from "../../types/item";
import ItemList from "../../components/ItemList";
import { Alert } from "react-native";
import MenuModal from "../../components/MenuModal";
import { addItemToStore, updateItemInStore } from "../../api/owner";

export default function ItemManage() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [itemList, setItemList] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);

    // 데이터 가져와야함
    const storeId = "4a550e11-e86c-43fa-91a6-02fd5a480331";

    const handleAddMenu = () => {
        setModalMode("add");
        setSelectedItem(null);
        setIsModalVisible(true);
    };

    const handleEditMenu = (item: Item) => {
        setModalMode("edit");
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleSubmitMenu = async (newItem: Item) => {
        if (modalMode === "add") {
            await addItemToStore(storeId, newItem);
            setItemList((prev) => [...prev, newItem]);
        } else if (modalMode === "edit" && selectedItem) {
            await updateItemInStore(storeId, selectedItem, newItem); // 수정 로직
            setItemList((prev) => prev.map((menu) => (menu.itemId === selectedItem.itemId ? newItem : menu)));
        }
    };

    // 삭제 핸들러
    const handleDeleteItem = (item: Item) => {
        Alert.alert("메뉴 삭제", `"${item.itemName}" 메뉴를 정말 삭제하시겠습니까?`, [
            { text: "취소", style: "cancel" },
            {
                text: "삭제",
                style: "destructive",
                onPress: () => confirmDelete(item),
            },
        ]);
    };

    // 삭제 확정 로직
    const confirmDelete = async (item: Item) => {
        try {
            const storeRef = doc(db, "store", storeId); // documentId는 현재 가게 문서 ID

            await updateDoc(storeRef, {
                itemList: arrayRemove(item),
            });

            // local state에서도 삭제
            setItemList((prevList) => prevList.filter((menu) => menu.itemId !== item.itemId));
        } catch (error) {
            console.error("삭제 실패:", error);
        }
    };

    const fetchItemList = async (documentId: string) => {
        setLoading(true);

        try {
            const storeRef = doc(db, "store", documentId);
            const storeSnap = await getDoc(storeRef);

            if (storeSnap.exists()) {
                const storeData = storeSnap.data();
                const itemList = storeData.itemList || [];
                setItemList(itemList);
                setLoading(false);
            } else {
                setLoading(false);
                Alert.alert("오류 발생", "잠시 후 다시 시도해주세요.");
                console.log("해당 문서가 존재하지 않습니다.");
            }
        } catch (error) {
            setLoading(false);
            Alert.alert("오류 발생", "잠시 후 다시 시도해주세요.");
            console.error("itemList 가져오기 에러:", error);
        }
    };

    useEffect(() => {
        fetchItemList(storeId);
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>메뉴 관리</Text>
            <Button title="메뉴 추가" onPress={handleAddMenu} />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ItemList itemList={itemList} onEdit={handleEditMenu} onDelete={handleDeleteItem} />
            )}

            <MenuModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSubmit={handleSubmitMenu} // 등록 또는 수정 동작
                mode={modalMode} // "add" 또는 "edit"
                initialData={selectedItem}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    list: {
        padding: 16,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    imagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    imagePlaceholderText: {
        color: "#999",
        fontSize: 12,
    },
    info: {
        flex: 1,
        justifyContent: "center",
    },
    menuName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
        color: "#555",
        marginBottom: 2,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 6,
        borderRadius: 6,
        alignItems: "center",
        marginHorizontal: 4,
    },
    editButton: {
        backgroundColor: "#4CAF50",
    },
    deleteButton: {
        backgroundColor: "#E53935",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    emptyText: {
        textAlign: "center",
        marginTop: 20,
        color: "#999",
        fontSize: 16,
    },
});
