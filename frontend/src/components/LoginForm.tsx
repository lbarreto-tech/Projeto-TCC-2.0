import { useState, type FormEvent } from "react";
import type { LoginRequest } from "../types/auth";

interface LoginFormProps {
  error: string;
  loading: boolean;
  onSubmit: (credentials: LoginRequest) => Promise<void>;
}

const estiloInput = {
  width: "100%",
  boxSizing: "border-box",
  padding: 8,
  font: "inherit",
} as const;

export default function LoginForm({ error, loading, onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit({ email: email.trim(), senha });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="email">E-mail</label>
        <br />
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="nome@escola.com"
          required
          autoFocus
          style={estiloInput}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="senha">Senha</label>
        <br />
        <input
          id="senha"
          name="senha"
          type="password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          autoComplete="current-password"
          required
          style={estiloInput}
        />
      </div>

      {error && (
        <p
          role="alert"
          style={{
            margin: "0 0 12px",
            padding: "8px 12px",
            borderRadius: 6,
            color: "#8c1d18",
            background: "#fdecea",
            fontSize: 14,
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{ padding: "12px 16px", font: "inherit", cursor: loading ? "wait" : "pointer" }}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
