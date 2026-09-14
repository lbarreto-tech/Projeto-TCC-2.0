import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  requiredProfile?: "ADMIN" | "USUARIO";
}

export default function PrivateRoute({ requiredProfile }: PrivateRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredProfile && user?.perfil !== requiredProfile) {
    return <Navigate to="/inicio" replace />;
  }

  return <Outlet />;
}
