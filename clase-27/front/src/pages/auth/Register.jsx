import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { usuarioSchema } from "../../schemas/usuario"
import { Bounce, toast } from "react-toastify"
import { useApiAuth } from "../../services/auth.service"

export default function Register() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm(
        { resolver: zodResolver(usuarioSchema), criteriaMode: "all" }
    )
    const { register: apiRegister } = useApiAuth()
    const onSubmit = async (usuario) => {
        try {
            await apiRegister(usuario)
            navigate("/login")
            toast.success('Usuario creado correctamente', {
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
        } catch (error) {
            toast.error('No se pudo guardar el usuario', {
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
        }

    }
    return (
        <div className="mt-5 min-h-100 d-flex justify-content-center align-items-center" >
            <div className="card shadow p-4" style={{ width: "500px" }} >
                <h2 className="text-center mb-4" >Registrar Usuario</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-3" >
                        <label className="form-label" htmlFor="">Email:</label>
                        <input className="form-control" type="email" {...register("email")} id="email" />
                        {errors.email && <div className="text-danger" >{errors.email.message}</div>}
                    </div>
                    <div className="mb-3" >
                        <label className="form-label" htmlFor="">Nombre:</label>
                        <input className="form-control" type="text" {...register("name")} id="name" />
                        {errors.name && <div className="text-danger" >{errors.name.message}</div>}

                    </div>
                    <div className="mb-3" >
                        <label className="form-label" htmlFor="">Nombre de usuario:</label>
                        <input className="form-control" type="text" {...register("username")} id="username" />
                        {errors.username && <div className="text-danger" >{errors.username.message}</div>}

                    </div>
                    <div className="mb-3" >
                        <label className="form-label" htmlFor="">Pass:</label>
                        <input className="form-control" type="text" {...register("password")} id="password" />
                        {errors.password && <div className="text-danger" >{errors.password.message}</div>}
                        {
                            typeof errors.password?.types?.invalid_format == "object"
                                ? errors.password?.types?.invalid_format.map((error, index) =>
                                    <div key={index} className="text-danger" >{error}</div>)
                                : <div className="text-danger" >{errors.password?.types?.invalid_format}</div>
                        }

                    </div>
                    <div className="mb-3" >
                        <label className="form-label" htmlFor="">Confirmar Password:</label>
                        <input className="form-control" type="text" {...register("passwordConfirm")} id="passConfirm" />
                        {errors.passwordConfirm && <div className="text-danger" >{errors.passwordConfirm.message}</div>}
                    </div>
                    <button disabled={isSubmitting} type='submit' className='btn btn-outline-primary' >Ingresar</button>
                </form>
            </div>
        </div>
    )
}
