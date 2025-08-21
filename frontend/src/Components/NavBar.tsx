import { GoHomeFill } from "react-icons/go";
import { SiBuzzfeed } from "react-icons/si";
import { IoSettings } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { NavLink } from "react-router";

function NavBar(){
    return(
        <>
            <div className="fixed bottom-0 flex justify-evenly items-center w-full p-3   bg-yellow-500/30 ">
                <NavLink to={'/'} className="p-3 rounded-2xl bg-yellow-500"><GoHomeFill /></NavLink>
                <NavLink to={'/feeds'} className="p-3 rounded-2xl bg-yellow-500"><SiBuzzfeed /></NavLink>
                <NavLink to={'/missions'} className="p-3 rounded-2xl bg-yellow-500"><IoStatsChart /></NavLink>
                <NavLink to={'/settings'} className="p-3 rounded-2xl bg-yellow-500"><IoSettings/></NavLink>
            </div>
        </>
    )

}

export default NavBar;