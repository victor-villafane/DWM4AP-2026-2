export default function Formulario({setNombre, handleGuardar, error}) {
    return (
        <>
            <div className="d-flex g-1" >
                <input
                    className="form-control"
                    type="text"
                    placeholder="Ingresar nombre de la tarea"
                    onChange={(event) => setNombre(event.target.value)}
                />
                <button
                    className="btn btn-outline-primary mx-1"
                    onClick={handleGuardar}
                >
                    +
                </button>
            </div>
            {
                error?.length > 0
                && <p className="text-danger text-sm mx-2" >{error}</p>
            }
        </>
    )
}