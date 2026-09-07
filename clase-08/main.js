import express from "express"
import paisesRoute from "./routes/pais.routes.js"
import paisesApiRoute from "./api/routes/pais.routes.js"

const app = express()

app.use( "/", express.static("public") )
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

app.use( paisesRoute )
app.use( paisesApiRoute )

app.listen(2026, () => console.log("Funcionando... http://localhost:2026"))