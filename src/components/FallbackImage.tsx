import React, { useState } from "react";
import { Image, ImageStyle, ImageResizeMode, StyleProp } from "react-native";

type FallbackImageProps = {
    uri?: string;
    style?: StyleProp<ImageStyle>;
    defaultImg?: any;
    resizeMode?: ImageResizeMode;
};

export const FallbackImage: React.FC<FallbackImageProps> = ({ uri, style, defaultImg, resizeMode = "cover" }) => {
    const [error, setError] = useState(false);

    const isValidUri = typeof uri === "string" && uri.trim() !== "";
    const shouldShowImage = isValidUri && !error;

    if (!shouldShowImage && !defaultImg) {
        return null;
    }

    return <Image source={!error && uri ? { uri } : defaultImg} style={style} onError={() => setError(true)} resizeMode={resizeMode} />;
};
