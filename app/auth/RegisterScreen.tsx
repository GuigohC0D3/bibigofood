import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);

  // Função para formatar o CPF automaticamente
  const formatCpf = (text: string) => {
    const cleaned = text.replace(/\D/g, ""); // Remove não numéricos
    let formatted = cleaned;
    if (cleaned.length > 3) formatted = cleaned.replace(/^(\d{3})(\d)/, "$1.$2");
    if (cleaned.length > 6) formatted = formatted.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (cleaned.length > 9) formatted = formatted.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    return formatted;
  };

  const handleRegister = () => {
    if (!name || !surname || !dob || !phone || !cpf || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    if (cpf.length < 14) {
      Alert.alert("Erro", "CPF inválido!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    if (!isChecked) {
      Alert.alert("Erro", "Você precisa aceitar os Termos de Uso para continuar.");
      return;
    }

    Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    router.replace("/welcome");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={dob}
        onChangeText={setDob}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Celular"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => setCpf(formatCpf(text))}
        keyboardType="numeric"
        maxLength={14}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de Senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
          <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Campo de Confirmação de Senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
          <Ionicons name={isConfirmPasswordVisible ? "eye-off" : "eye"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox value={isChecked} onValueChange={setChecked} />
        <Text style={styles.checkboxText}>Li e aceito os Termos de Uso e Privacidade</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxText: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#FF5733",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegisterScreen;