import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>404</h1>
      <p>Pagina nao encontrada.</p>
      <Link to="/inicio">Voltar para o inicio</Link>
    </div>
  );
}
