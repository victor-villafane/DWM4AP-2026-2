import express from "express"
import paisesRoute from "./routes/pais.routes.js"
const app = express()

app.use( "/", express.static("public") )
app.use( express.urlencoded({ extended: true }) )

app.get("/formulario", (req, res) => {
    // query string
    console.log(req.query)
} )

app.post("/formulario", (req, res) => {
    // body
    console.log(req.body)
} )

app.get("/productos/:id", (req, res) => {
    // params
    console.log(req.params)
} )

app.use( paisesRoute )

app.listen(2026, () => console.log("Funcionando... http://localhost:2026"))