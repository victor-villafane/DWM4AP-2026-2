import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Loading from "../../components/Loading"
import Error from "../../components/Error"
import Detalle from "../../components/Detalle"
import { useApiCiudades } from "../../services/ciudades.service"

export default function DetalleCiudad() {
    const { id } = useParams()

    const [ciudad, setCiudad] = useState(null)
    const [estado, setEstado] = useState("LOADING")

    const { getCiudadesById } = useApiCiudades()

    useEffect(() => {
        getCiudadesById(id)
            .then(data => {
                setCiudad(data)
                setEstado("READY")
            })
            .catch(err => setEstado("ERROR"))
    }, [])

    if (estado == "LOADING") return <Loading />
    if( estado == "READY" ) return <Detalle ciudad={ciudad} />

    return <Error message="Ciudad no encontrada" />
}
