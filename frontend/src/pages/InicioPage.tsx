import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function InicioPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <h1>Inicio</h1>
      <div style={{ padding: 16, border: "1px solid #ccc", borderRadius: 8 }}>
        <p><strong>Nome:</strong> {user?.nome}</p>
        <p><strong>E-mail:</strong> {user?.email}</p>
        <p><strong>Perfil:</strong> {user?.perfil}</p>
      </div>
      <button onClick={handleLogout} style={{ marginTop: 16, padding: "8px 16px" }}>
        Sair
      </button>
      {user?.perfil === "ADMIN" && (
        <button
          onClick={() => navigate("/admin")}
          style={{ marginTop: 16, marginLeft: 8, padding: "8px 16px" }}
        >
          Painel Admin
        </button>
      )}
    </div>
  );
}
