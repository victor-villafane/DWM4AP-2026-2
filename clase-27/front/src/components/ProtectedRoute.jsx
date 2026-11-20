import { Navigate } from "react-router";
import { useRol, useUsuario } from "../context/session.context";

export default function ProtectedRoute({ element, rol }) {
    const usuario = useUsuario()
    const rolUsuario = useRol()
    if (usuario?.token && rol.includes(rolUsuario())) return element
    if (usuario?.token) return <Navigate to="/" />
    return <Navigate to="/login" />
}
