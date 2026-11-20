import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bounce, toast } from "react-toastify"
import {
    FaEnvelope,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaPhoneAlt,
    FaRegClock,
    FaCheckCircle,
    FaGithub,
    FaLinkedin,
    FaInstagram
} from "react-icons/fa"
import { contactoSchema } from "../schemas/contacto"
import "./contacto.css"

const ASUNTOS = [
    "Consulta general",
    "Soporte técnico",
    "Sugerencias",
    "Otro"
]

export default function Contact() {

    const [enviado, setEnviado] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(contactoSchema),
        defaultValues: { nombre: "", email: "", asunto: "", mensaje: "" }
    })

    const onSubmit = async (datos) => {
        setEnviado(false)

        // Simulación de envío. Reemplazar por el fetch al backend cuando exista el endpoint.
        await new Promise((resolve) => setTimeout(resolve, 900))
        console.log("Contacto:", datos)

        setEnviado(true)
        reset()

        toast.success("¡Mensaje enviado! Te responderemos a la brevedad.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })
    }

    return (
        <section className="contacto-page">
            <div className="container">

                {/* Hero */}
                <header className="contacto-hero text-center">
                    <span className="contacto-badge">
                        <FaPaperPlane /> Hablemos
                    </span>
                    <h1 className="display-5">Estamos para ayudarte</h1>
                    <p className="lead mb-0">
                        ¿Tenés una duda, una propuesta o encontraste un problema?
                        Escribinos y te respondemos a la brevedad.
                    </p>
                </header>

                <div className="row g-4 mt-1">

                    {/* Info de contacto */}
                    <div className="col-12 col-lg-4">
                        <div className="contacto-card p-4 p-lg-4">
                            <h5 className="fw-bold mb-3">Información de contacto</h5>

                            <div className="contacto-info-item">
                                <span className="contacto-icon"><FaEnvelope /></span>
                                <div>
                                    <h6>Email</h6>
                                    <a href="mailto:contacto@dwm4ap.com">contacto@dwm4ap.com</a>
                                </div>
                            </div>

                            <div className="contacto-info-item">
                                <span className="contacto-icon"><FaPhoneAlt /></span>
                                <div>
                                    <h6>Teléfono</h6>
                                    <a href="tel:+541155555555">+54 11 5555-5555</a>
                                </div>
                            </div>

                            <div className="contacto-info-item">
                                <span className="contacto-icon"><FaMapMarkerAlt /></span>
                                <div>
                                    <h6>Ubicación</h6>
                                    <span>Buenos Aires, Argentina</span>
                                </div>
                            </div>

                            <div className="contacto-info-item">
                                <span className="contacto-icon"><FaRegClock /></span>
                                <div>
                                    <h6>Horario</h6>
                                    <span>Lunes a viernes, 9:00 a 18:00</span>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex align-items-center justify-content-between">
                                <span className="text-secondary small">Seguinos</span>
                                <div className="contacto-social d-flex gap-2">
                                    <a href="#" aria-label="GitHub"><FaGithub /></a>
                                    <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                                    <a href="#" aria-label="Instagram"><FaInstagram /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="col-12 col-lg-8">
                        <div className="contacto-card p-4 p-lg-5">
                            <h5 className="fw-bold mb-1">Enviá tu mensaje</h5>
                            <p className="text-secondary small mb-4">
                                Los campos marcados con <span className="text-danger">*</span> son obligatorios.
                            </p>

                            {enviado && (
                                <div className="contacto-alert d-flex align-items-center gap-2 px-3 py-2 mb-4">
                                    <FaCheckCircle />
                                    <span className="small fw-medium">
                                        Tu mensaje fue enviado. ¡Gracias por escribirnos!
                                    </span>
                                </div>
                            )}

                            <form className="contacto-form" onSubmit={handleSubmit(onSubmit)} noValidate>

                                <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="nombre">
                                            Nombre <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                                            placeholder="Tu nombre y apellido"
                                            aria-invalid={!!errors.nombre}
                                            {...register("nombre")}
                                        />
                                        {errors.nombre && (
                                            <div className="invalid-feedback">{errors.nombre.message}</div>
                                        )}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="email">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                            placeholder="tu@email.com"
                                            aria-invalid={!!errors.email}
                                            {...register("email")}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email.message}</div>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label" htmlFor="asunto">
                                            Asunto <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            id="asunto"
                                            className={`form-select ${errors.asunto ? "is-invalid" : ""}`}
                                            aria-invalid={!!errors.asunto}
                                            defaultValue=""
                                            {...register("asunto")}
                                        >
                                            <option value="" disabled>Seleccioná un asunto</option>
                                            {ASUNTOS.map((asunto) => (
                                                <option key={asunto} value={asunto}>{asunto}</option>
                                            ))}
                                        </select>
                                        {errors.asunto && (
                                            <div className="invalid-feedback">{errors.asunto.message}</div>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label" htmlFor="mensaje">
                                            Mensaje <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            id="mensaje"
                                            rows={6}
                                            className={`form-control ${errors.mensaje ? "is-invalid" : ""}`}
                                            placeholder="Contanos en qué podemos ayudarte..."
                                            aria-invalid={!!errors.mensaje}
                                            {...register("mensaje")}
                                        ></textarea>
                                        {errors.mensaje && (
                                            <div className="invalid-feedback">{errors.mensaje.message}</div>
                                        )}
                                    </div>

                                    <div className="col-12 d-flex align-items-center justify-content-between flex-wrap gap-3 mt-2">
                                        <span className="text-secondary small">
                                            Respondemos en menos de 48 hs hábiles.
                                        </span>
                                        <button
                                            type="submit"
                                            className="btn btn-contacto d-inline-flex align-items-center gap-2"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <FaPaperPlane /> Enviar mensaje
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
