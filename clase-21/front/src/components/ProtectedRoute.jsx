import { Navigate } from "react-router";

export default function ProtectedRoute({ element, rol }) {
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    if( usuario?.token && rol.includes(usuario.rol) ) return element
    if( usuario?.token ) return <Navigate to="/ciudades" /> 
    return <Navigate to="/login" />
}
