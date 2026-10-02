export default function Titulo({ texto, ...res }) {
    return (
        <h1 {...res} >
            {texto}
        </h1>
    )
}