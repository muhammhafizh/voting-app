import { Auth } from "../utils/Auth"
import { Outlet, Navigate } from "react-router-dom";

function HomeRoutes() {
    const { role, username, token } = Auth.isAuthorization()

    if (role === 'user') {
        return <Navigate to="/User" replace />
    } 

    if (role === 'admin') {
        return <Navigate to="/Admin" replace />
    }    

    return <Outlet />
}

export default HomeRoutes