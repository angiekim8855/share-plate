import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserMyPageUI from "../components/UserMyPageUI";

export default function UserMyPage() {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    //todo: 로그인 계정 fetch
    const fetchData = async () => {
        // const userData = await getUserInfo();
        // const favData = await getUserFavorites();
        // setUser(userData);
        // setFavorites(favData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 프로필 수정 : 모달
    const handleEditProfile = () => {
        // navigation.navigate("EditProfile");
    };

    // todo: 로그인 에러 해결하고 ㄱㄱ
    const handleLogout = async () => {
        // await logout();
        // navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    };

    // if (!user) return null; // or LoadingIndicator

    // return <UserMyPageUI user={user} favorites={favorites} onEditProfile={handleEditProfile} onLogout={handleLogout} />;

    //------ui test
    const mockUser = {
        name: "김은지",
        email: "eunji.kim@example.com",
        profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    };

    const mockFavorites = [
        {
            storeId: "store1",
            storeName: "맛있는 한식당",
            category: "한식",
            thumbnailImg: "https://source.unsplash.com/100x100/?korean-food",
        },
        {
            storeId: "store2",
            storeName: "트렌디 카페",
            category: "디저트",
            thumbnailImg: "https://source.unsplash.com/100x100/?dessert,cafe",
        },
        {
            storeId: "store3",
            storeName: "프렌치 레스토랑",
            category: "양식",
            thumbnailImg: "https://source.unsplash.com/100x100/?french-food",
        },
    ];

    return (
        <UserMyPageUI
            user={mockUser}
            favorites={mockFavorites}
            onEditProfile={() => console.log("프로필 수정 클릭")}
            onLogout={() => console.log("로그아웃 클릭")}
        />
    );
}
