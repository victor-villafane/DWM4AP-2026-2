import { Link, Outlet } from "react-router";
import Nav from "./Nav";

export default function Layout() {
    return (
        <div className="container-fluid" >
            <Nav />
            <Outlet />
            <footer></footer>
        </div>
    )
}