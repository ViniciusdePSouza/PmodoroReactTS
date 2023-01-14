import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

export function DefaultLayout() {
    return(
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}