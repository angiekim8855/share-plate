import { Store } from "../types/store";
import { NavigatorScreenParams } from "@react-navigation/native";

export type MainTabParamList = {
    Home: undefined;
    Reservation: undefined;
    MyPage: undefined;
};

export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Main: NavigatorScreenParams<MainTabParamList>;
    HomeMain: undefined;
    RestaurantDetail: { store: Store };
};
