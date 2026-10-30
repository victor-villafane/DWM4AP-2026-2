export function call(uri, method = "GET", body = undefined) {
    const url = "http://localhost:2026/api"
    return fetch(url + uri, {
        method: method,
        headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + JSON.parse(localStorage.getItem("usuario"))?.token
        },
        body: JSON.stringify(body)
    })
        .then(res => {
            if( res.ok ) return res.json()
            else throw new Error()
        })
}