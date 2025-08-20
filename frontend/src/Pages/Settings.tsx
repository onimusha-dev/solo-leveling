


function Settings(){
    return(
        <div className="max-w-screen max-h-screen flex flex-col justify-center mt-10 px-8 ">
            <h1 className="text-3xl font-semibold py-10">Account</h1>
            <div className="flex items-center">
                <div className="pr-5">
                    <img className="bg-red-500/50 w-20 h-20 rounded-full" src="../../public/image.png" alt="Profile Picture" />
                </div>
                <div className="flex flex-col ">
                    <h3 className="text-2xl font-medium">Susie Chan</h3>
                    <h3 className="mt-2 text-gray-400">Dream Smasher</h3>
                </div>
            </div>

            {/**  this is where the settings will be  */}
            <div className="mt-10 flex flex-col gap-8 ">
                <div className="flex items-center">
                    <div className="pr-5">
                        <img className="bg-red-500/50 w-10 h-10 rounded-full" src="../../public/image.png"/>
                    </div>
                    <div className="flex flex-col ">
                        <h3 className="text-xl font-semi-bold">General</h3>
                        <h3 className="text-sm text-gray-400">Dream Smasher</h3>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="pr-5">
                        <img className="bg-red-500/50 w-10 h-10 rounded-full" src="../../public/image.png" />
                    </div>
                    <div className="flex flex-col ">
                        <h3 className="text-xl font-semi-bold">Security</h3>
                        <h3 className="text-sm text-gray-400">profile notification and storages</h3>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="pr-5">
                        <img className="bg-red-500/50 w-10 h-10 rounded-full" src="../../public/image.png" />
                    </div>
                    <div className="flex flex-col ">
                        <h3 className="text-xl font-semi-bold">Power Ups</h3>
                        <h3 className="text-sm text-gray-400">add your power ups here</h3>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="pr-5">
                        <img className="bg-red-500/50 w-10 h-10 rounded-full" src="../../public/image.png" />
                    </div>
                    <div className="flex flex-col ">
                        <h3 className="text-xl font-semi-bold">Chat with Pro</h3>
                        <h3 className="text-sm text-gray-400">Pair pro withother softwares</h3>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="pr-5">
                        <img className="bg-red-500/50 w-10 h-10 rounded-full" src="../../public/image.png" />
                    </div>
                    <div className="flex flex-col ">
                        <h3 className="text-xl font-semi-bold">Support Us</h3>
                        <h3 className="text-sm text-gray-400">Get help uing pro</h3>
                    </div>
                </div>
            </div>

            {/** this is where we will show the version */}

            <div className="flex items-center justify-center mt-25">
                <p className="w-fit text-xs opacity-50">version 3.14.15 (3337298933)</p>
            </div>
        </div>
    )
}

export default Settings;