import React from 'react'
import { Link } from 'react-router'

export default function Detalle({ producto }) {
    return (
        <div className='row mt-5' >
            <div className='col-12 col-md-6 col-lg-4' >
                <img style={{maxWidth: "300px"}} src={producto.image} alt="" />
            </div>
            <div className='col-12 col-md-6 col-lg-8' >
                <h2>{producto.title}</h2>
                <p>{producto.description}</p>
                <p className='text-secondary' >{producto.category}</p>
                <p className='fw-bold' >${producto.price}</p>
            </div>
            <Link to="/productos" >Volver</Link>
        </div>
    )
}
