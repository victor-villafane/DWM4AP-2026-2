import { call } from "./api.service";

export function useApiCiudades() {
    const getCiudades = () => call("/paises")
    const getCiudadesById = (id) => call("/paises/" + id)
    const createCiudades = (ciudad) => call("/paises", "POST", ciudad)
    const updateCiudades = (id, ciudad) => call("/paises/" + id, "PUT", ciudad)
    const deleteCiudades = (id) => call("/paises/" + id, "DELETE")
    
    return {
        getCiudades,
        getCiudadesById,
        createCiudades,
        updateCiudades,
        deleteCiudades
    }
}