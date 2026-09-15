import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { getApiErrorMessage } from "../services/apiClient";
import type { LoginRequest } from "../types/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ email, senha }: LoginRequest) {
    setError("");
    setLoading(true);

    try {
      await login(email, senha);
      navigate("/inicio", { replace: true });
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Não foi possível entrar. Tente novamente."),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 20 }}>
      <h1>Login</h1>
      <p style={{ marginBottom: 20 }}>Acesse o Sistema de Agendamento Escolar.</p>

      <LoginForm error={error} loading={loading} onSubmit={handleSubmit} />

      <div style={{ marginTop: 24, fontSize: 14, color: "#666" }}>
        <p><strong>Usuários de teste</strong></p>
        <p>Admin: admin@escola.com / admin123</p>
        <p>Professor: joao@escola.com / joao123</p>
      </div>
    </div>
  );
}
