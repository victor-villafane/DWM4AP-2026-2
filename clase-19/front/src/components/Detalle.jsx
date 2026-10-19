import React from 'react'
import { Link } from 'react-router'

export default function Detalle({ ciudad }) {
    return (
        <div className='row mt-5' >
            <div className='col-12 col-md-6 col-lg-4' >
                <img style={{maxWidth: "300px"}} src={ciudad.image ?? "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1280px-React.svg.png?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail"} alt="" />
            </div>
            <div className='col-12 col-md-6 col-lg-8' >
                <h2>{ciudad.city}</h2>
                <p>Pais: {ciudad.country}</p>
                <p className='text-secondary' >Es capital: {ciudad.capital}</p>
                <p className='fw-bold' >Poblacion: {ciudad.population}</p>
                <p className='fw-bold' >Coordenadas:  {ciudad.lat} ,{ciudad.lon}</p>
            </div>
            <Link to="/ciudades" >Volver</Link>
        </div>
    )
}
