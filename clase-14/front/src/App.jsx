import { useState } from "react"
import Titulo from "./components/Titulo"
import Formulario from "./components/Formulario"
import Table from "./components/Table"

export default function App() {

  const tareasInit = [
    {
      id: 1,
      nombre: "Tarea 1",
      completado: true
    },
    {
      id: 2,
      nombre: "Tarea 2",
      completado: false
    },
    {
      id: 3,
      nombre: "Tarea 3",
      completado: false
    }
  ]

  const [tareas, setTareas] = useState(tareasInit)
  const [nombre, setNombre] = useState("")
  const [error, setError] = useState("")

  const handleCompletado = (id) => {
    const tareasActualizado = tareas.map((tarea) => {
      if (tarea.id == id) {
        tarea.completado = !tarea.completado
      }
      return tarea
    })
    setTareas(tareasActualizado)
  }
  const handleEliminado = (id) => {
    const tareasActualizado = tareas.filter(tarea => tarea.id != id)
    setTareas(tareasActualizado)
  }
  const handleGuardar = () => {
    setError("")

    if (nombre.length < 3) {
      setError("Nombre debe tener mas de 3 caracteres")
      return
    }

    const tareasActualizado = [...tareas]
    tareasActualizado.push(
      {
        id: tareasActualizado.length + 1,
        nombre: nombre,
        completado: false
      }
    )
    setTareas(tareasActualizado)
  }
  return (
    <div className="container-fluid" >
      <Titulo
        texto="Listado de tareas"
        color="verde"
        className="text-danger"
      />
      <Formulario
        handleGuardar={handleGuardar}
        setNombre={setNombre}
        error={error}
      />
      <Table
        tareas={tareas}
        handleCompletado={handleCompletado}
        handleEliminado={handleEliminado}
      />
    </div>
  )
}