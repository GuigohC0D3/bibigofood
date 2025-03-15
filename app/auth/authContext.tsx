import React, { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definindo o tipo do usuário completo
export interface User {
  name: string;
  surname: string;
  dob: string;
  phone: string;
  cpf: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (newUser: User) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Carrega usuário logado (persistência)
  React.useEffect(() => {
    const loadUser = async () => {
      const storedUserJson = await AsyncStorage.getItem("user");
      if (storedUserJson) {
        setUser(JSON.parse(storedUserJson));
      }
    };
    loadUser();
  }, []);

  // Registra um novo usuário com campos completos
  const register = async (newUser: User) => {
    const usersJson = await AsyncStorage.getItem("users");
    const users: Record<string, User> = usersJson ? JSON.parse(usersJson) : {};

    if (users[newUser.email]) {
      throw new Error("Usuário já cadastrado!");
    }

    users[newUser.email] = newUser;
    await AsyncStorage.setItem("users", JSON.stringify(users));
  };

  // Login de usuário (validação simples)
  const login = async (email: string, password: string) => {
    const usersJson = await AsyncStorage.getItem("users");
    const users: Record<string, User> = usersJson ? JSON.parse(usersJson) : {};

    const foundUser = users[email];

    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      await AsyncStorage.setItem("user", JSON.stringify(foundUser));
    } else {
      throw new Error("Email ou senha inválidos!");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    const usersJson = await AsyncStorage.getItem("users");
    const users: Record<string, User> = usersJson ? JSON.parse(usersJson) : {};

    if (!users[email]) {
      throw new Error("E-mail não encontrado!");
    }

    console.log(`Enviando email de recuperação para ${email}`);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export default AuthProvider;
