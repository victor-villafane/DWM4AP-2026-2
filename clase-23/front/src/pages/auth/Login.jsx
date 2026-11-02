import { redirect, useNavigate } from "react-router"
import { Bounce, toast } from "react-toastify"
import { useApiAuth } from "../../services/auth.service"
import { useLogin, useSession } from "../../context/session.context"

export default function Login() {

    const navigate = useNavigate()

    const { login } = useApiAuth()
    const loginSession = useLogin()

    const handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const pass = event.target.pass.value

        login({ email: email, password: pass })
            .then(usuario => {
                loginSession(usuario)
                navigate("/ciudades")
            })
            .catch(err => {
                toast.error('Usuario/Contraseña incorrecto', {
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
        <div className="mt-5 min-h-100 d-flex justify-content-center align-items-center" >
            <div className="card shadow p-4" style={{ width: "500px" }} >
                <h2 className="text-center mb-4" >Iniciar session</h2>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3" >
                        <label className="form-label" htmlFor="">Email:</label>
                        <input className="form-control" type="email" name="email" id="email" />
                    </div>
                    <div className="mb-3" >
                        <label className="form-label" htmlFor="">Pass:</label>
                        <input className="form-control" type="text" name="pass" id="pass" />
                    </div>
                    <button type='submit' className='btn btn-outline-primary' >Ingresar</button>
                </form>
            </div>
        </div>
    )
}
