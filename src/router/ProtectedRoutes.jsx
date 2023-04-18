import { Auth } from "../utils/Auth";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const { role, token } = Auth.isAuthorization();

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/Admin" replace />;
  }

  return <Outlet />;
}
