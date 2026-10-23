import { Link } from "react-router";

export default function Item({ciudad}) {
    return (
        <tr>
            <td>{ciudad._id}</td>
            <td>{ciudad.city}</td>
            <td>{ciudad.country}</td>
            <td>{ciudad.capital}</td>
            <td>
                <Link className="btn btn-outline-primary mx-1" to={`/ciudades/${ciudad._id}`} >Ver</Link>
                <Link className="btn btn-outline-warning mx-1" to={`/editar-pais/${ciudad._id}`} >Editar</Link>
                <Link className="btn btn-outline-danger mx-1" to={`/eliminar-pais/${ciudad._id}`} >Eliminar</Link>
            </td>
        </tr>
    )
}