import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import React from "react";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu e-mail!");
      return;
    }

    // Simula um envio de recuperação de senha
    Alert.alert(
      "Sucesso",
      "Um link de recuperação foi enviado para seu e-mail!"
    );

    // Opcionalmente, redireciona para a tela de login
    router.replace("/auth/Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      {/* Campo de E-mail */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Botão de Enviar */}
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar Link</Text>
      </TouchableOpacity>

      {/* Voltar para Login */}
      <TouchableOpacity onPress={() => router.push("/auth/Login")}>
        <Text style={styles.linkText}>Voltar para o Login</Text>
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
  linkText: {
    color: "#E53935",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
  },
});
