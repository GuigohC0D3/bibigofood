import React, { useEffect } from "react";
import AuthProvider from "./auth/authContext"; // Importação corrigida
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permissão Negada", "Você precisa permitir notificações.");
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", token);
}

export default function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
