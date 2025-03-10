import { useEffect } from "react";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
export default function PreloadingScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log("preloading iniciado...");

    setTimeout(() => {
      console.log("REdirecionando para Welcome...");
      router.replace("/welcome"); // Redireciona para a tela de Boas-Vindas
    }, 10000);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/animations/new_loading_animation.json")} // Caminho correto para o JSON da animação
        autoPlay
        loop
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
});
