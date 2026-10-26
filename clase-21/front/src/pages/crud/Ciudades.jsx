import { useEffect, useState } from "react"
import ItemLoading from "../../components/ItemLoading"
import ItemError from "../../components/ItemError"
import Item from "../../components/Item"
import { Link } from "react-router"
import { call } from "../../services/api.service"

export default function Ciudades() {

    const [ciudades, setCiudades] = useState([])
    const [estado, setEstado] = useState("LOADING")

    useEffect(() => {
        call("/paises", "GET")
            .then(data => {
                setCiudades(data)
                setEstado("READY")
            })
            .catch(err => {
                console.log(err)
                setEstado("ERROR")
            })
    }, [])
    let contenido = ""
    switch (estado) {
        case "LOADING":
            contenido = <ItemLoading />
            break;
        case "ERROR":
            contenido = <ItemError />
            break;
        case "READY":
            contenido = ciudades.map(ciudad => <Item key={ciudad._id} ciudad={ciudad} />)
            break;
        default:
            contenido = <ItemError />
            break;
    }

    return (
        <div>
            <h1>Ciudades</h1>
            <Link to="/nuevo-pais" >Nuevo pais</Link>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ciudad</th>
                        <th>Pais</th>
                        <th>Capital</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {contenido}
                </tbody>
            </table>
        </div>
    )
}