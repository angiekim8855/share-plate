import React, { useState } from "react";
import UserMyPageUI from "../../components/UserMyPageUI";
import ProfileEditModal from "../../components/ProfileEditModal";
import { logout } from "../../services/auth";
import { useUser } from "../../context/UserContext";
import { fetchUserData } from "../../services/user";

export default function UserMyPage() {
    const { user, setUser } = useUser();
    const [isProfileModalVisible, setProfileModalVisible] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    const handleOpenModal = () => setProfileModalVisible(true);
    const handleCloseModal = async () => {
        const userDoc = await fetchUserData(user.userId);
        const userData = userDoc.data();
        setUser(userData);
        setProfileModalVisible(false);
    };

    return (
        <>
            <UserMyPageUI user={user} favorites={user.favoriteStore} onEditProfile={handleOpenModal} onLogout={handleLogout} />
            <ProfileEditModal isVisible={isProfileModalVisible} onClose={handleCloseModal} initialData={user} />
        </>
    );
}
