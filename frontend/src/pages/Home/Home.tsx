import { IoSettings } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";

import { NavLink } from "react-router";


function Home() {
    return (
        <div className="max-w-screen max-h-screen flex flex-col justify-center mt-10 px-8 ">
            <div className="flex items-center justify-between mt-10 mb-8">
                <h1 className="text-3xl font-semibold">Home</h1>
                <div className="flex gap-3">
                    <div className="flex items-center justify-center">
                        <NavLink to={'/settings'}><IoSettings size={24} opacity={0.75} /></NavLink>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-yellow-500/30 items-center justify-center flex"><IoAddSharp size={24} opacity={0.75 } /></div>
                </div>
            </div>
            <div className="">
                <div className="flex gap-3">
                    <div className="w-42 h-42 bg-yellow-500/30 rounded-2xl"></div>
                    <div className="w-42 h-42 bg-yellow-500/30 rounded-2xl"></div>
                </div>
                <div className="w-87 h-42 bg-yellow-500/30 rounded-2xl mt-5"></div>
            </div>
        </div>
    )
}

export default Home;