import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserMyPageUI from "../components/UserMyPageUI";
import ProfileEditModal from "../components/ProfileEditModal";

export default function UserMyPage() {
    const [isProfileModalVisible, setProfileModalVisible] = useState(false);
    // const [user, setUser] = useState(null);

    // //todo: 로그인 계정 fetch
    // const fetchData = async () => {
    //     // const userData = await getUserInfo();
    //     // const favData = await getUserFavorites();
    //     // setUser(userData);
    //     // setFavorites(favData);
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // todo: 로그인 에러 해결하고 ㄱㄱ
    const handleLogout = async () => {
        // await logout();
        // navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    };

    // if (!user) return null; // or LoadingIndicator

    // return <UserMyPageUI user={user} favorites={favorites} onEditProfile={handleEditProfile} onLogout={handleLogout} />;

    const user = {
        userId: "3333333333",
        userType: "owner",
        storeIdList: [],
        profileImg: "",
        userName: "eunji",
        phone: "01012345678",
        email: "abc@gmail.com",
        favoriteStore: ["4a550e11-e86c-43fa-91a6-02fd5a480331", "c5b3e525-8806-4037-a00b-4c228f699771"],
        createAt: "",
    };

    const handleOpenModal = () => setProfileModalVisible(true);
    const handleCloseModal = () => setProfileModalVisible(false);

    return (
        <>
            <UserMyPageUI user={user} favorites={user.favoriteStore} onEditProfile={handleOpenModal} onLogout={handleLogout} />
            <ProfileEditModal isVisible={isProfileModalVisible} onClose={handleCloseModal} initialData={user} />
        </>
    );
}
