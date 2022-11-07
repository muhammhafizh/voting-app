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

    // if (Auth.isAuthorization[2] && Auth.isAuthorization[0] === 'user') {
    //     return <Outlet />
    // } 

    // if (Auth.isAuthorization[2] && Auth.isAuthorization[0] === 'admin') {
    //     return <Navigate to="/Admin" replace />
    // }

    // return <Navigate to="/" replace />    

    // if (Auth.isAuthorization[2] && Auth.isAuthorization[0] === 'user') {
    //     const name = Auth.isAuthorization[1]
    //     return <Outlet context={name} />
    // }

    // return navigate('/', { replace: true })
}