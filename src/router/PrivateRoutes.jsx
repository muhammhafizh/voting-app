import LayoutPage from "../components/Layout";
import { Auth } from "../utils/Auth";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  const { role, token } = Auth.isAuthorization();

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  if (role === "user") {
    return <Navigate to="/User" replace />;
  }

  return (
    <LayoutPage>
      <Outlet />
    </LayoutPage>
  );
}
