import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Bem-vindo</Text>
                <Text style={styles.text}>ao</Text>
                <Text style={styles.text}>BibigoFood!</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/auth/login")}>
                <Text style={styles.buttonText}>Ir para Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    textContainer: {
        position: "absolute",
        top: "25%",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    button: {
        backgroundColor: "#E53935",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        position: "absolute",
        bottom: "15%",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
