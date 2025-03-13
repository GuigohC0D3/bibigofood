import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { useAuth } from "../auth/authContext";

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Por favor, preencha todos os campos!");
            return;
        }

        try {
            await login(email, password);
            router.replace("../(tabs)/index");
        } catch (error) {
            Alert.alert("Erro", error instanceof Error ? error.message : "Credenciais inválidas!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* Campo de E-mail */}
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            {/* Campo de Senha */}
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Botão de Login */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {/* Atalhos de Cadastro e Esqueci a Senha */}
            <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => router.push("/auth/RegisterScreen")}>
                    <Text style={styles.linkText}>Criar Conta</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("/auth/forgot-password")}>
                    <Text style={styles.linkText}>Esqueci a Senha</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#E53935",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    linksContainer: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-between",
        width: "100%",
    },
    linkText: {
        color: "#E53935",
        fontSize: 14,
        fontWeight: "bold",
    },
});