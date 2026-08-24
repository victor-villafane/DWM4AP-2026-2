function A() {
    console.log("A")
}
function B() {
    console.log("B")
}
import { Worker } from "worker_threads"
function C() {
    return new Promise((resolve, reject) => {
        //resolve -> then
        //reject -> catch
        // for( let i = 0; i < 1000000000000 ; i++ ){}
        const worker = new Worker("./ajax/worker.js")
        worker.on( "message", (mensaje) => console.log(mensaje) )   //then
        worker.on( "error", (err) => console.log(err) )             //catch
        setTimeout(() => {
            const ok = true
            if (ok) {
                resolve("C")
            } else {
                reject(":(")
            }
        }, 2000)

    })
}
function D() {
    return new Promise((resolve, reject) => {
        //resolve -> then
        //reject -> catch
        setTimeout(() => {
            const ok = true
            if (ok) {
                resolve("D")
            } else {
                reject(":(")
            }
        }, 2000)

    })
}
// fetch()



A()
B()
//callback hell
C() 
    .then((mensaje) => {
        console.log(mensaje)
        return D()
    })
    .then( mensaje => console.log(mensaje) )
    .catch((err) => console.log(err))

// fetch("https://hp-api.onrender.com/api/characters")
//     .then( res => {
//         if( res.ok ) return res.json()
//         else throw Error(":(")
//     } )
//     .then( data => console.log(data) )
//     .catch( err => console.log(err) )

// async function promesa() {
//     try {
//         const res = await fetch("https://hp-api.onrender.com/api/characters")
//         if( res.ok ){
//             const data = await res.json()
//             console.log(data)
//         }else{
//             throw new Error(":(")
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// Promise.all( [C(), D()] )
//     .then( mensaje => console.log(mensaje) )
//     .catch( err => console.log(err) )