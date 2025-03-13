import React, { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  // Carregar usuário salvo
  React.useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(storedUser);
      }
    };
    loadUser();
  }, []);

  // Registrar um novo usuário
  const register = async (email: string, password: string) => {
    const usersJson = await AsyncStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : {};

    if (users[email]) {
      throw new Error("Usuário já cadastrado!");
    }

    users[email] = { email, password };
    await AsyncStorage.setItem("users", JSON.stringify(users));
  };

  // Login do usuário
  const login = async (email: string, password: string) => {
    const usersJson = await AsyncStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : {};

    if (users[email] && users[email].password === password) {
      setUser(email);
      await AsyncStorage.setItem("user", email);
    } else {
      throw new Error("Email ou senha inválidos!");
    }
  };

  // Logout do usuário
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  // Reset de senha
  const resetPassword = async (email: string) => {
    const usersJson = await AsyncStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : {};

    if (!users[email]) {
      throw new Error("E-mail não encontrado!");
    }

    console.log(`Enviando e-mail de recuperação para ${email}`);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Correção: Exportando corretamente a função useAuth()
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
export default AuthProvider;


