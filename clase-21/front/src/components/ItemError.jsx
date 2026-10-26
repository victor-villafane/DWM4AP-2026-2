import Error from "./Error";

export default function ItemError() {
    return (
        <tr>
            <td></td>
            <td></td>
            <td>
                <Error message="Error al traer los productos" />
            </td>
            <td></td>
        </tr>
    )
}