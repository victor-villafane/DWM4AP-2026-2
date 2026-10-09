export default function TableItem({ tarea, handleCompletado, handleEliminado }) {
    return (
        <tr
            className={`
                  ${tarea.completado
                    ? "text-decoration-line-through"
                    : ""
                }`}
            key={tarea.id} >
            <td>{tarea.id}</td>
            <td>{tarea.nombre}</td>
            <td>
                <button
                    className="btn btn-outline-warning m-1"
                    onClick={() => handleCompletado(tarea.id)}
                >
                    Completar
                </button>
                <button
                    className="btn btn-outline-danger m-1"
                    onClick={() => handleEliminado(tarea.id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}