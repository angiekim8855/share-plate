import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getStatusStyle } from "../styles/statusStyles";

interface StatusBadgeProps {
    status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const { backgroundColor, color } = getStatusStyle(status);

    return (
        <View style={[styles.badge, { backgroundColor }]}>
            <Text style={[styles.badgeText, { color }]}>{status}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    badgeText: {
        fontWeight: "bold",
    },
});

export default StatusBadge;
