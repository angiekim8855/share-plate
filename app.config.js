import "dotenv/config";

export default {
    expo: {
        name: "share-plate",
        slug: "share-plate",
        owner: "ameunji",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/logo.png",
        userInterfaceStyle: "light",
        newArchEnabled: true,
        splash: {
            image: "./assets/logo.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/logo.png",
                backgroundColor: "#ffffff",
            },
            edgeToEdgeEnabled: true,
            package: "com.shareplate.shareplate",
        },
        web: {
            favicon: "./assets/logo.png",
        },
        extra: {
            eas: {
                projectId: process.env.EAS_PROJECT_ID,
            },
            firebaseApiKey: process.env.FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.FIREBASE_APP_ID,
        },
        runtimeVersion: {
            policy: "appVersion",
        },
        updates: {
            url: process.env.EXPO_UPDATES_URL,
        },
        ios: {},
    },
};
