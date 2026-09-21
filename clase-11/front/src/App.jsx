// 1. Functional component rfc
// export default function App(){
//   // Logica, Variables, funciones, etc...
//   console.log("Hola!")
//   // document.getElementById("div") -> No va a funcionar
//   // UI -> JSX
//   return <div className="hola" >Hola!</div>
// }
// 2. Arrow Function component rafce
// const App = () => {
//   // Logica
//   // UI
//   return <div>Hola!!</div>
// }
// export default App
// 3. Class Component -> No pueden usar hooks rcc
// export default class App extends React.Component{
//   // Metodos
//   render(){
//     // Logica
//     console.log("Hola!")
//     // UI
//     return <div>Hola!</div>
//   }
// }

export default function App() { //rfc
  return (
    <div>App</div>
  )
}