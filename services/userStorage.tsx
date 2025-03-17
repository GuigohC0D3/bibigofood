import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "USERS_LIST";

export interface User {
  name: string;
  surname: string;
  dob: string;
  phone: string;
  cpf: string;
  email: string;
  password: string;
}

// Busca a lista de usuários cadastrados
export const getUsers = async (): Promise<User[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USERS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao buscar usuários:", e);
    return [];
  }
};

// Salva a lista de usuários atualizada
export const saveUsers = async (users: User[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(USERS_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar usuários:", e);
  }
};

// Registra um novo usuário
export const registerUser = async (newUser: User): Promise<void> => {
  const users = await getUsers();

  const userExists = users.find((user) => user.email === newUser.email);

  if (userExists) {
    throw new Error("Este e-mail já está em uso!");
  }

  users.push(newUser);
  await saveUsers(users);
};

// Valida o login do usuário
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const users = await getUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Credenciais inválidas!");
  }

  return user;
};
