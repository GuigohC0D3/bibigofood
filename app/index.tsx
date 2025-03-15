import { useEffect } from "react";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { AuthProvider } from "./auth/authContext"; // Caminho correto


export default function PreloadingScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log("Preloading iniciado...");

    setTimeout(() => {
      console.log("Redirecionando para Welcome...");
      router.replace("/welcome");
    }, 5000); // 5 segundos para o preloading
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animations/Animation - 1741117436008.json")}
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
  animation: {
    width: 200,
    height: 200,
  },
});
