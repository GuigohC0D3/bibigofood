import { useEffect } from "react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log("Welcome iniciado...");

    setTimeout(() => {
      console.log("Redirecionando para Cadastro...");
      router.replace("/auth/login");
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao {"\n"}BibigoFood!</Text>
      
      {/* Animação de motoboy abaixo do texto */}
      <LottieView
        source={require("../../assets/animations/Animation - 1741304715761.json")} // Atualize o caminho se necessário
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20, // Espaço entre o texto e a animação
  },
  animation: {
    width: 200, // Ajuste conforme necessário
    height: 200,
  },
});

