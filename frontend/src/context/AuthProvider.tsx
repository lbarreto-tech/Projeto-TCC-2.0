import { useState, type ReactNode } from "react";
import AuthContext from "./AuthContext";
import type { AuthState } from "../types/auth";
import type { User } from "../types/auth";

const MOCK_USERS: (User & { senha: string })[] = [
  {
    id: 1,
    nome: "Administrador",
    email: "admin@escola.com",
    perfil: "ADMIN",
    senha: "admin123",
  },
  {
    id: 2,
    nome: "Professor Joao",
    email: "joao@escola.com",
    perfil: "USUARIO",
    senha: "joao123",
  },
];

function createMockToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      perfil: user.perfil,
      nome: user.nome,
      exp: Date.now() + 3600000,
    }),
  );
  const signature = btoa("mock-signature");
  return `${header}.${payload}.${signature}`;
}

function decodeMockToken(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp < Date.now()) return null;
    return {
      id: payload.sub,
      nome: payload.nome,
      email: payload.email,
      perfil: payload.perfil,
    };
  } catch {
    return null;
  }
}

function getInitialAuthState(): AuthState {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedToken && storedUser) {
    try {
      const user = JSON.parse(storedUser) as User;
      const decoded = decodeMockToken(storedToken);
      if (decoded) {
        return {
          user,
          token: storedToken,
          isAuthenticated: true,
          isLoading: false,
        };
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  };
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(getInitialAuthState);

  async function login(email: string, senha: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const found = MOCK_USERS.find((u) => u.email === email && u.senha === senha);
    if (!found) {
      throw new Error("E-mail ou senha invalidos");
    }

    const { senha: _senha, ...user } = found;
    void _senha;
    const token = createMockToken(user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
