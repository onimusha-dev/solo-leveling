import { NavLink } from "react-router";

function Index(){
    return(
        <>
            <div className="max-w-screen max-h-screen flex flex-col justify-center mt-10 px-8 ">
                <h1 className="text-3xl font-semibold py-10">Account</h1>
                <div className="flex items-center">
                    <div className="pr-5">
                        <img className="bg-red-500/50 w-20 h-20 rounded-full" src="/image.png" alt="Profile Picture" />
                    </div>
                    <div className="flex flex-col ">
                        <NavLink to={'/profile'} className="text-2xl font-medium">Susie Chan</NavLink>
                        <h3 className="mt-2 text-gray-400">Dream Smasher</h3>
                    </div>
                </div>

                {/**  this is where the settings will be  */}
                <div className="mt-10 flex flex-col gap-8 ">
                    <NavLink to={'general'} className="flex items-center">
                        <div className="pr-5">
                            <img className="bg-red-500/50 w-10 h-10 rounded-full" src="/image.png" alt="" />
                        </div>
                        <div className="flex flex-col ">
                            <h2 className="text-xl font-medium">General</h2>
                            <h3 className="text-sm text-gray-400">Apperiance, Notification, </h3>
                        </div>
                    </NavLink>

                    <NavLink to={'privacy_and_safety'} className="flex items-center">
                        <div className="pr-5">
                            <img className="bg-red-500/50 w-10 h-10 rounded-full" src="/image.png" alt="" />
                        </div>
                        <div className="flex flex-col ">
                            <h2 className="text-xl font-medium">Security and Privacy</h2>
                            <h3 className="text-sm text-gray-400">profile notification and storages</h3>
                        </div>
                    </NavLink>

                    <NavLink to={'privacy'} className="flex items-center">
                        <div className="pr-5">
                            <img className="bg-red-500/50 w-10 h-10 rounded-full" src="/image.png" alt="" />
                        </div>
                        <div className="flex flex-col ">
                            <h2 className="text-xl font-semibold">Power Ups</h2>
                            <h3 className="text-sm text-gray-400">add your power ups here</h3>
                        </div>
                    </NavLink>

                    <NavLink to={'help'} className="flex items-center">
                        <div className="pr-5">
                            <img className="bg-red-500/50 w-10 h-10 rounded-full" src="/image.png" alt="" />
                        </div>
                        <div className="flex flex-col ">
                            <h2 className="text-xl font-semibold">Chat with Pro</h2>
                            <h3 className="text-sm text-gray-400">Pair pro withother softwares</h3>
                        </div>
                    </NavLink>
                    <NavLink to={'support-us'} className="flex items-center">
                        <div className="pr-5">
                            <img className="bg-red-500/50 w-10 h-10 rounded-full" src="/image.png" alt="" />
                        </div>
                        <div className="flex flex-col ">
                            <h2 className="text-xl font-semibold">Support Us</h2>
                            <h3 className="text-sm text-gray-400">Get help uing pro</h3>
                        </div>
                    </NavLink>
                </div>

                {/** this is where we will show the version */}

                <div className="flex items-center justify-center mt-24">
                    <p className="w-fit text-xs opacity-50">version 3.14.15 (3337298933)</p>
                </div>
            </div>
        </>
    )
}


export default Index;