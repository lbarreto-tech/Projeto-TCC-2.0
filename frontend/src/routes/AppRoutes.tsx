import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/LoginPage";
import InicioPage from "../pages/InicioPage";
import AdminPage from "../pages/AdminPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/inicio",
        element: <InicioPage />,
      },
      {
        element: <PrivateRoute requiredProfile="ADMIN" />,
        children: [
          {
            path: "/admin",
            element: <AdminPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/inicio" replace />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
