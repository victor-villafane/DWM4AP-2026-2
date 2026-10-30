import TableItem from "./TableItem";

export default function Table({ tareas, handleCompletado, handleEliminado }) {
    return (
        <table className="table table-striped" >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    tareas.map((tarea, indice) =>
                        <TableItem
                            key={tarea.id}
                            tarea={tarea}
                            handleCompletado={handleCompletado}
                            handleEliminado={handleEliminado}
                        />)
                }
            </tbody>
        </table>
    )
}