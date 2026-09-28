import { Activity } from "react"
import { useState } from "react"

export default function App() { //rfc
  // Logica -> codigo js
  //--------------------------------------------
  console.log("Hola!")
  let miVariable = "Hola!"  //Camel case para variables, funciones, hooks, etc...
  const miCondicional = false
  const personajes = [
    "Homero",
    "Marge",
    "Lisa",
    "Bart",
    "Maggie"
  ]
  const [ estado, setEstado ] = useState(personajes)
  // console.log(state[0], state[1])
  const miFuncionCondicional = () => {
    if (miCondicional) {
      return "Es verdadero"
    } else {
      return "Es falso"
    }
  }
  const handleSumar = () => {
    console.log(miVariable)
    // personajes.push(miVariable)
    // console.log("Personajes", personajes)
    setEstado( [...estado, miVariable] )
  }
  const handleChange = (event) => {
    console.log(event.target.value)
    miVariable = event.target.value
  }
  // UI
  //--------------------------------------------
  return (
    <div
      className=""
    // style={{ "backgroundColor": "red" }}
    >
      {/* ------------------------ */}
      {/* En vue esto era interpolacion -> en react: */}
      {
        miVariable
      }
      <br />
      {/* ------------------------ */}
      {/* https://es.react.dev/learn/rendering-lists */}
      {/* v-for="personaje in personajes" */}
      <ul>
        {

          estado.map((personaje, indice) =>
            <li
              key={indice}
            >
              {personaje}
            </li>
          )
        }
      </ul>
      {/* ------------------------ */}
      {/* https://es.react.dev/learn/conditional-rendering */}
      {/* v-if v-else */}
      {
        miCondicional
          ? "Es Verdadero"
          : "Es Falso"
      }
      <br />
      { miFuncionCondicional() }
      <br />
      {/* v-if */}
      { miCondicional && "Es Verdadero" }
      <br />
      <Activity mode={ miCondicional ? "visible" : "hidden" } >
        <span>Es Verdadero</span>
      </Activity>
      {/* Eventos */}
      <input type="text" onChange={ handleChange } />
      <button onClick={ handleSumar } >Sumar</button>
    </div>
  )
}