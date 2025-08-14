import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    link: {
        marginTop: 20,
        textAlign: "center",
        color: "#007bff",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
        paddingVertical: 4,
    },
    pickerLabel: {
        marginBottom: 6,
        fontSize: 14,
        color: "#333",
        marginTop: 10,
    },
    PwIconButton: {
        position: "absolute",
        right: 12,
        top: "50%",
        transform: [{ translateY: -25 }],
        padding: 5,
        zIndex: 1,
    },
});
