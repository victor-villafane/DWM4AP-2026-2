import express from "express"

const app = express()

app.use( "/", express.static("public") )

app.get("/", (req, res) => {
    res.send("Hola!")
} )

app.listen(2026, () => console.log("Funcionando..."))