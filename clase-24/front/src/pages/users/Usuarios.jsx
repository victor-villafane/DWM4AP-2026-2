import { useEffect, useState } from "react";
import { useApiUsuarios } from "../../services/usuarios.service";
import { Bounce, toast } from "react-toastify";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([])
    const { getUsuarios, asignarRol, reset } = useApiUsuarios()
    const [nuevoRol, setNuevoRol] = useState(null)

    function fetchApi() {
        getUsuarios()
            .then(usuarios => setUsuarios(usuarios))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchApi()
    }, [])

    const handleAsignar = (usuario) => {
        asignarRol({ usuario, rol: nuevoRol })
            .then(() => {
                fetchApi()
                toast.success('Rol asignado correctamente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            })
            .catch((err) =>
                toast.error('No se pudo asignar el rol', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                }))
    }

    const handleReset = (usuario) => {
        reset(usuario)
            .then(() => {
                fetchApi()
                toast.success('Contraseña cambiada', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            })
            .catch((err) =>
                toast.error('No se pudo cambiar la contraseña', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                }))
    }

    return (
        <div>
            <h1>Usuarios</h1>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Nombre de usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Contraseña</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios?.map(usuario => (
                        <tr key={usuario._id} >
                            <td>{usuario._id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <select onChange={(event) => setNuevoRol(event.target.value)} name="rol" defaultValue={usuario.rol ?? "user"} >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                    <option value="superadmin">superadmin</option>
                                </select>
                                <button onClick={() => handleAsignar(usuario)} >Asignar</button>
                            </td>
                            <td>
                                <button onClick={() => handleReset(usuario)} >Reset</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}