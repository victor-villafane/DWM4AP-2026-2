import { useState, useEffect } from "react";

export default function FetchRealTime() {
    const [dolares, setDolares] = useState([])
    // const [refresh, setRefresh] = useState(false)

    const fetchApi = () => {
        fetch("https://dolarapi.com/v1/dolares")
            .then(res => res.json())
            .then(precios => setDolares(precios))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchApi()
        const timer = setInterval( () => fetchApi(), 1000 )
        return () => {
            // componentWillUnmount() se invoca inmediatamente antes de desmontar y destruir un componente.
           clearInterval(timer)
        }
    }, [])

    return (
        <div>
            <h1>Precio dolar actual</h1>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Compra</th>
                        <th>Venta</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dolares.map(dolar => (
                            <tr key={dolar.nombre} >
                                <td>{dolar.nombre}</td>
                                <td>{dolar.compra}</td>
                                <td>{dolar.venta}</td>
                                <td>{dolar.fechaActualizacion}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}