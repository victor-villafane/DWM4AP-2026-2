import { useState, useEffect } from "react"
import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup
} from 'https://cdn.esm.sh/react-leaflet' //npm install react@rc react-dom@rc leaflet

//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
export default function FetchGeo() {

    const [ubicacion, setUbicacion] = useState({})

    useEffect(() => {
        if (!navigator.geolocation) return
        // Configuraciones
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
        function success(pos) {
            console.log(pos)
            const { latitude, longitude, accuracy } = pos.coords
            setUbicacion(
                {
                    latitud: latitude,
                    longitud: longitude,
                    precision: `${accuracy} metros`,
                    fecha: new Date().toLocaleDateString()
                }
            )
        }
        function error(err) {
            console.log(err)
        }
        const watchId = navigator.geolocation.watchPosition(success, error, options)
        return () => navigator.geolocation.clearWatch(watchId)
    }, [])

    return ubicacion?.latitud && (
        <div>
            {/* https://react-leaflet.js.org/ */}
            {/* https://www.npmjs.com/package/@react-google-maps/api */}
            <p>Latitud: {ubicacion.latitud}</p>
            <p>Longitud: {ubicacion.longitud}</p>
            <p>Precision: {ubicacion.precision}</p>
            <p>Fecha: {ubicacion.fecha}</p>
        </div>
    )
}