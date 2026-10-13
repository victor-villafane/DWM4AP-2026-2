import { useEffect, useState } from "react"
import ItemLoading from "../components/ItemLoading"
import ItemError from "../components/ItemError"
import Item from "../components/Item"

export default function Productos() {

    const [productos, setProductos] = useState([])
    const [estado, setEstado] = useState("LOADING")

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => {
                setProductos(data)
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
            contenido =
                productos.map(producto => <Item key={producto.id} producto={producto} />)
            break;
        default:
            contenido = <ItemError />
            break;
    }

    return (
        <div>
            <h1>Productos</h1>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Precio</th>
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