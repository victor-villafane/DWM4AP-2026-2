import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Loading from "../components/Loading"
import Error from "../components/Error"
import Detalle from "../components/Detalle"

export default function DetalleProducto() {
    const { id } = useParams()

    const [producto, setProducto] = useState(null)
    const [estado, setEstado] = useState("LOADING")

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/" + id)
            .then(res => res.json())
            .then(data => {
                setProducto(data)
                setEstado("READY")
            })
            .catch(err => setEstado("ERROR"))
    }, [])

    if (estado == "LOADING") return <Loading />
    if( estado == "READY" ) return <Detalle producto={producto} />

    return <Error message="Producto no encontrado" />
}
