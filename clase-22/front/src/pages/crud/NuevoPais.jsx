import { useNavigate } from "react-router"
import { ciudadSchema } from "../../schemas/ciudad"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bounce, toast } from "react-toastify"

export default function NuevoPais() {
    const navigate = useNavigate()

    const {
        register,       // Conecta cada input con el formulario
        handleSubmit,   // Valida ( usando zod ) y luego llama a nuestro onSubmit
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(ciudadSchema)
    })

    const onSubmit = (ciudad) => {
        fetch("http://localhost:2026/api/paises", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(ciudad)
        })
            .then(res => res.json())
            .then(data => navigate("/ciudades/" + data._id))
            .catch(err => {
                toast.error('No se pudo guardar la ciudad', {
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

    return (
        <div className="mt-3" >
            <h2>Nuevo Pais</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <label className="form-label" htmlFor="city">Ciudad</label>
                    <input className="form-control" type="text" {...register("city")} id="city" />
                    {errors.city && <div className="text-danger" >
                        {errors.city.message}
                    </div>}
                </div>
                <div>
                    <label className="form-label" htmlFor="country">Pais</label>
                    <input className="form-control" type="text" {...register("country")} id="country" />
                    {errors.country && <div className="text-danger" >
                        {errors.country.message}
                    </div>}
                </div>
                <div>
                    <label className="form-label" htmlFor="capital">Capital</label>
                    <input className="form-control" type="text" {...register("capital")} id="capital" />
                    {errors.capital && <div className="text-danger" >
                        {errors.capital.message}
                    </div>}
                </div>
                <div>
                    <label className="form-label" htmlFor="population">Poblacion</label>
                    <input className="form-control" type="number" {...register("population", { valueAsNumber: true })} id="population" />
                    {errors.population && <div className="text-danger" >
                        {errors.population.message}
                    </div>}
                </div>
                <div className="row" >
                    <div className="col-12 col-md-6" >
                        <label className="form-label" htmlFor="lat">Latitud</label>
                        <input className="form-control" type="number" {...register("lat", { valueAsNumber: true })} id="lat" />
                        {errors.lat && <div className="text-danger" >
                            {errors.lat.message}
                        </div>}
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label" htmlFor="lon">Longitud</label>
                        <input className="form-control" type="number" {...register("lon", { valueAsNumber: true })} id="lon" />
                        {errors.lon && <div className="text-danger" >
                            {errors.lon.message}
                        </div>}
                    </div>
                </div>
                <button className="btn btn-outline-primary mt-3" type="submit" >Guardar</button>
            </form>
        </div>
    )
}