import { createContext } from "react";
import type { AuthState } from "../types/auth";

export interface AuthContextType extends AuthState {
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
