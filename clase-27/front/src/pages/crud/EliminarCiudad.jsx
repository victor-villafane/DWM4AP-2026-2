import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import Loading from "../../components/Loading"
import { useNavigate } from "react-router"
import { Bounce, toast } from "react-toastify"
import { useApiCiudades } from "../../services/ciudades.service"

export default function EliminarCiudad() {
    const { id } = useParams()

    const [ciudad, setCiudad] = useState(null)
    const [estado, setEstado] = useState("LOADING")

    const navigate = useNavigate()

    const { deleteCiudades, getCiudadesById } = useApiCiudades()

    useEffect(() => {
        getCiudadesById(id)
            .then(data => {
                setCiudad(data)
                setEstado("READY")
            })
            .catch(err => setEstado("ERROR"))
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        deleteCiudades(id)
            .then(data => navigate("/ciudades"))
            .catch(err => {
                toast.error('No se pudo eliminar la ciudad', {
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
    }

    if (estado == "LOADING") return <Loading />
    if (estado == "READY") return (
        <>
            <div className='row mt-5' >
                <div className='col-12 col-md-6 col-lg-4' >
                    <img style={{ maxWidth: "300px" }} src={ciudad.image ?? "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1280px-React.svg.png?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail"} alt="" />
                </div>
                <div className='col-12 col-md-6 col-lg-8' >
                    <h2>{ciudad.city}</h2>
                    <p>Pais: {ciudad.country}</p>
                    <p className='text-secondary' >Es capital: {ciudad.capital}</p>
                    <p className='fw-bold' >Poblacion: {ciudad.population}</p>
                    <p className='fw-bold' >Coordenadas:  {ciudad.lat} ,{ciudad.lon}</p>
                    <form className="col-6" onSubmit={onSubmit}> <button type="submit" className="btn btn-danger" >Borrar</button> </form>
                </div>
                <Link className="col-6" to="/ciudades" >Volver</Link>
            </div>
        </>)

    return <Error message="Ciudad no encontrada" />
}