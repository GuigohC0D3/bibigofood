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
import { useAuth } from "../auth/authContext";

const RegisterScreen = () => {
  const router = useRouter();
  const { register } = useAuth();

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

  const formatCpf = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;
    if (cleaned.length > 3)
      formatted = cleaned.replace(/^(\d{3})(\d)/, "$1.$2");
    if (cleaned.length > 6)
      formatted = formatted.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (cleaned.length > 9)
      formatted = formatted.replace(
        /^(\d{3})\.(\d{3})\.(\d{3})(\d)/,
        "$1.$2.$3-$4"
      );
    return formatted;
  };

  const formatDate = (text: string) => {
    const cleaned = text.replace(/\D/g, ""); // Remove não numéricos
    let formatted = cleaned;

    if (cleaned.length > 2)
      formatted = cleaned.replace(/^(\d{2})(\d)/, "$1/$2");
    if (cleaned.length > 4)
      formatted = formatted.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

    return formatted;
  };

  const handleRegister = async () => {
    // Validação dos campos obrigatórios
    if (
      !name ||
      !surname ||
      !dob ||
      !phone ||
      !cpf ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    // Validação do CPF (mínimo 14 caracteres com máscara aplicada)
    if (cpf.length < 14) {
      Alert.alert("Erro", "CPF inválido!");
      return;
    }

    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    // Verifica se o usuário aceitou os Termos de Uso
    if (!isChecked) {
      Alert.alert(
        "Erro",
        "Você precisa aceitar os Termos de Uso para continuar."
      );
      return;
    }

    try {
      // Chama a função register do contexto com o objeto completo
      await register({
        name,
        surname,
        dob,
        phone,
        cpf,
        email,
        password,
      });

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");

      // Redireciona para a tela de login
      router.replace("/auth/login");
    } catch (error) {
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Falha no cadastro. Tente novamente."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      {/* Nome e Sobrenome no mesmo Row */}
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Sobrenome"
          value={surname}
          onChangeText={setSurname}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={dob}
        onChangeText={(text) => setDob(formatDate(text))}
        keyboardType="numeric"
        maxLength={10}
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
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="gray"
          />
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
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
        >
          <Ionicons
            name={isConfirmPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox value={isChecked} onValueChange={setChecked} />
        <Text style={styles.checkboxText}>
          Li e aceito os Termos de Uso e Privacidade
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Botão de Voltar para o Login */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/auth/login")}
      >
        <Text style={styles.backButtonText}>Já tem uma conta? Faça login</Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
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
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#FF5733",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
