# 1. La url no hace referencia a la accion sino al recurso

    /paises/nuevo ----> ❌
            -> /paises POST
    /paises/editar ---> ❌
            -> /paises PUT/PATCH

# 2. Usamos Verbos HTTP para definir la accion

    GET         -> Obtener
    POST        -> Crear
    PUT         -> Reemplazar
    PATCH       -> Actualizazr
    DELETE      -> Borrar

# 3. Formato de intercambio de datos JSON

# 4. Estados de respuesta

    1xx     -> Informativos
    2xx     -> OK
    3xx     -> Redireccion
    4xx     -> Errores del usuario
    5xx     -> Errores del servidor