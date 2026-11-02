import { Link } from "react-router";
import { useRol, useSession } from "../context/session.context";

export default function Nav() {

    const usuario = JSON.parse(localStorage.getItem("usuario"))

    const auth = useSession()

    const rol = useRol()

    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{auth?.usuario?.name ?? "NavBar"}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tareas">Tareas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ciudades">Ciudades</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        {
                            !auth?.usuario?.email && <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        }
                        {
                            rol() == "superadmin" && <li className="nav-item">
                                <Link className="nav-link" to="/usuarios">Usuarios</Link>
                            </li>
                        }
                        {
                            !auth?.usuario?.email && <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        }
                        {
                            auth?.usuario?.email && <li className="nav-item">
                                <Link className="nav-link" to="/logout">Salir</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}