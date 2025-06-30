import React, { useState } from "react";
import { Image, ImageStyle, ImageResizeMode, StyleProp, View, Text } from "react-native";

type FallbackImageProps = {
    uri?: string;
    style?: StyleProp<ImageStyle>;
    defaultImg?: any;
    fallbackText?: string;
    resizeMode?: ImageResizeMode;
};

// 디폴트 이미지 기능
export const FallbackImage: React.FC<FallbackImageProps> = ({ uri, style, defaultImg, fallbackText = "이미지 없음", resizeMode = "cover" }) => {
    const [error, setError] = useState(false);

    const isValidUri = typeof uri === "string" && uri.trim() !== "";
    const shouldShowImage = isValidUri && !error;

    if (!shouldShowImage) {
        if (defaultImg) {
            return <Image source={defaultImg} style={style} resizeMode={resizeMode} onError={() => setError(true)} />;
        }

        if ((fallbackText = "이미지 없음")) {
            return (
                <View style={[style, { justifyContent: "center", alignItems: "center" }]}>
                    <Text style={{ fontSize: 16, color: "#999" }}>{fallbackText}</Text>
                </View>
            );
        }

        return null;
    }

    return <Image source={{ uri }} style={style} resizeMode={resizeMode} onError={() => setError(true)} />;
};
