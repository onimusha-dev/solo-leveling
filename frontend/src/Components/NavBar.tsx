import { GoHomeFill } from "react-icons/go";
import { SiBuzzfeed } from "react-icons/si";
import { IoSettings } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";


function NavBar(){
    return(
        <>
            <div className="fixed bottom-0 flex justify-evenly items-center w-full p-3   bg-yellow-500/30 ">
                <button className="p-3 rounded-2xl bg-yellow-500"><GoHomeFill/></button>
                <button className="p-3 rounded-2xl bg-yellow-500"><SiBuzzfeed/></button>
                <button className="p-3 rounded-2xl bg-yellow-500"><IoStatsChart/></button>
                <button className="p-3 rounded-2xl bg-yellow-500"><IoSettings/></button>
            </div>
        </>
    )

}

export default NavBar;