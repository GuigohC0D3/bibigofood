import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log("Welcome iniciado...");

    setTimeout(() => {
      console.log("Redirecionando para Cadastro...");
      router.replace("/auth/Login"); // Agora vai para o Cadastro
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao BibigoFood!</Text>
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
  },
});
