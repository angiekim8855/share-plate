import { Restaurant } from "../types/store";

export type RootStackParamList = {
    HomeMain: undefined;
    RestaurantDetail: { restaurant: Restaurant };
};
