import React from "react";
import { AuthProvider } from "../auth/authContext"; // Certifique-se de que o caminho está correto
import { Stack } from "expo-router";

export default function App() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
