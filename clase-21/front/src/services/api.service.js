export function call(uri, method = "GET", body = undefined) {
    return fetch("http://localhost:2026/api"+ uri, {
        method: method,
        headers: {
            authorization: "Bearer " + JSON.parse(localStorage.getItem("usuario")).token
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
}