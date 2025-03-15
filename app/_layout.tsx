import React from "react";
import AuthProvider from "./auth/authContext"; // Importação corrigida
import { Stack } from "expo-router";

export default function App() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
