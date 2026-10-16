import { Link } from "react-router";

export default function Item({ciudad}) {
    return (
        <tr>
            <td>{ciudad._id}</td>
            <td>{ciudad.city}</td>
            <td>{ciudad.country}</td>
            <td>{ciudad.capital}</td>
            <td>
                <Link className="btn btn-outline-primary" to={`/ciudades/${ciudad._id}`} >Ver</Link>
            </td>
        </tr>
    )
}