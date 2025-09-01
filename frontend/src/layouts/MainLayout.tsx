import { Outlet } from "react-router";
import NavBar from "../Components/NavBar";


function MainLayout(){
    return(
        <>
        <Outlet/>
        <NavBar/>







        </>
    )
}


export default MainLayout;