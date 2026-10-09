export default function Item({producto}) {
    return (
        <tr>
            <td>
                <img width="100px" src={producto.image} alt="" />
            </td>
            <td>{producto.title}</td>
            <td>{producto.price}</td>
            <td>
                <button className="btn btn-outline-primary" >Ver</button>
            </td>
        </tr>
    )
}