import { Auth } from "../utils/Auth"
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
    const { role, username, token } = Auth.isAuthorization()

    if (!token) {
        return <Navigate to="/" replace />
    } 

    if (role === 'admin') {
        return <Navigate to="/Admin" replace />
    }    

    return <Outlet />
}