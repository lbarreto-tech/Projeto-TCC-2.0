import apiClient from "./apiClient";
import type { LoginRequest, LoginResponse, User } from "../types/auth";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export async function getPerfil(): Promise<User> {
  const response = await apiClient.get<User>("/auth/perfil");
  return response.data;
}
