import { useState } from "react"

export default function App() {
  const ciudadesInit = [
    {
      "_id": 1,
      "city": "Buenos Aires",
      "country": "Argetina"
    },
    {
      "_id": 2,
      "city": "Ciudad Autonoma de buenos aires",
      "country": "Argetina"
    },
    {
      "_id": 3,
      "city": "Cordoba",
      "country": "Argetina"
    },
    {
      "_id": 4,
      "city": "Rosario",
      "country": "Argetina"
    }
  ]
  const [error, setError] = useState(
    {
      city: "",
      country: ""
    }
  )
  const [ciudades, setCiudades] = useState(ciudadesInit)
  const [ciudad, setCiudad] = useState(
    {
      city: "",
      country: ""
    }
  )
  const handleBorrar = (id) => {
    const ciudadesFiltradas =
      ciudades.filter(ciudad => ciudad._id != id)
    setCiudades(ciudadesFiltradas)
  }

  const handleVisitar = (indice) => {
    const ciudadesVisitadas = ciudades.map((ciudad, index) => {
      if (indice == index) {
        ciudad.visitada = !ciudad?.visitada
      }
      return ciudad
    })
    setCiudades(ciudadesVisitadas)
  }

  const handleCity = (event) =>
    setCiudad({ ...ciudad, city: event.target.value })

  const handleCountry = (event) =>
    setCiudad({ ...ciudad, country: event.target.value })

  const agregarCiudad = () => {
    // const ciudadesActualizadas = [...ciudades]
    // ciudad._id = ciudades.length + 1
    // ciudadesActualizadas.push(ciudad)
    // setCiudades(ciudadesActualizadas)
    const newErrors = {}
    if (ciudad.city?.length < 3)
      newErrors.city = "Ciudad debe tener mas de 3 caracteres"

    if (ciudad.country?.length < 3)
      newErrors.country = "Pais debe tener mas de 3 caracteres"

    setError(newErrors)
    if (Object.keys(newErrors).length > 0)
      return

    setCiudades((prevCiudades) =>
      [
        ...prevCiudades,
        { ...ciudad, _id: prevCiudades.length + 1 }
      ]
    )
  }
  return (
    <div className="container-fluid" > { /*React.Fragment*/}
      <h1>
        Ciudades
      </h1>
      <div className="d-flex gap-1" >
        <div>
          <input
            onChange={handleCity}
            className="form-control"
            type="text"
            name="city"
          />
          <p>{error?.city}</p>
        </div>
        <div>
          <input
            onChange={handleCountry}
            className="form-control"
            type="text"
            name="country"
          />
          <p>{error?.country}</p>
        </div>
        <button
          onClick={agregarCiudad}
          className="btn btn-primary" >
          Agregar
        </button>
      </div>
      <table className="table" >
        <thead>
          <tr>
            <th>id</th>
            <th>Ciudad</th>
            <th>Pais</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            ciudades.map((ciudad, indice) => (
              <tr
                className={
                  ciudad?.visitada && "text-decoration-line-through"
                }
                key={ciudad._id}
              >
                <td>{ciudad._id}</td>
                <td>{ciudad.city}</td>
                <td>{ciudad.country}</td>
                <td>
                  <button
                    onClick={() => handleVisitar(indice)}
                    className="btn btn-secondary mx-1">
                    Visitar
                  </button>
                  <button
                    onClick={() => handleBorrar(ciudad._id)}
                    className="btn btn-danger mx-1"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}