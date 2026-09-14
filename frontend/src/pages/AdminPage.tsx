import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <h1>Painel Administrativo</h1>
      <p>Bem-vindo, <strong>{user?.nome}</strong>!</p>
      <p>Esta pagina esta acessivel apenas para usuarios com perfil <strong>ADMIN</strong>.</p>
      <button onClick={() => navigate("/inicio")} style={{ marginTop: 16, padding: "8px 16px" }}>
        Voltar
      </button>
    </div>
  );
}
