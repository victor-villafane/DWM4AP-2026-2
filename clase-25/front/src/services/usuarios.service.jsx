import { call } from "./api.service";

export function useApiUsuarios(){
    const getUsuarios = () => call("/usuarios")
    const asignarRol = (payload) => call("/usuarios/asignar", "POST", payload)
    const reset = (payload) => call("/usuarios/reset", "POST", payload)
    
    return {
        getUsuarios,
        asignarRol,
        reset
    }
}