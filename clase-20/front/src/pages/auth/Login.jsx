import { redirect, useNavigate } from "react-router"

export default function Login() {

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const pass = event.target.pass.value

        fetch("http://localhost:2026/api/usuarios/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email: email, password: pass })
        })
            .then(res => res.json())
            .then(usuario => {
                localStorage.setItem("usuario", JSON.stringify(usuario))
                navigate("/ciudades")
            })
            .catch(err => {

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
