import { Restaurant } from "../types/store";

export type RootStackParamList = {
    Login: undefined;
    HomeMain: undefined;
    RestaurantDetail: { restaurant: Restaurant };
}; 