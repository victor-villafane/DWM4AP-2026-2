import { useState, useEffect } from "react"

export default function Fetch() {

    const [personajes, setPersonajes] = useState([])
    const [info, setInfo] = useState({})
    const [currentPage, setCurrentPage] = useState(1)

    const fetchApi = (uri = `https://api.disneyapi.dev/character?page=${currentPage}&pageSize=50`) => {
        fetch(uri)
            .then((res) => res.json())
            .then((data) => {
                setPersonajes(data.data)
                setInfo(data.info)
            })
            .catch(err => console.log(err))
    }

    // useEffect(() => { // use()
    //     // componentDidMount() -> se invoca inmediatamente después de que un componente se monte (se inserte en el árbol)
    //     fetchApi()
    // }, [])

    useEffect( () => {
        // componentDidUpdate()-> se invoca inmediatamente después de que la actualización ocurra.
        fetchApi()
    }, [currentPage] )


    return (
        <div className="container-fluid" >
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Peliculas</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        personajes.map(personaje => (
                            <tr key={personaje._id} >
                                <td><img width="100px" src={personaje.imageUrl} alt="" /></td>
                                <td>{personaje.name}</td>
                                <td>{personaje.films.join(", ")}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            { currentPage > 1 && <button onClick={ () => setCurrentPage(currentPage - 1) } >Anterior</button>}
            { currentPage < info.totalPages && <button onClick={ () => setCurrentPage(currentPage + 1) } >Siguiente</button>}
        </div>
    )
}