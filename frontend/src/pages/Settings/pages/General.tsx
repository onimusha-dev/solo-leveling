function General(){
    return(
        <>
            <div className="flex flex-col justify-center mt-10 px-8 ">
                <h1 className="text-3xl font-semibold py-10">General</h1>
            </div>
            <div className="flex flex-col gap-3">
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between px-8 py-2">
                    <h2 className="text-xl font-medium">Dark Mode</h2>
                    <label htmlFor="darkModeToggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" id="darkModeToggle" className="sr-only" />
                            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                        </div>
                    </label>
                </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between px-8 py-2">
                    <h2 className="text-xl font-medium">Notifications</h2>
                    <label htmlFor="notificationsToggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" id="notificationsToggle" className="sr-only" />
                            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                        </div>
                    </label>
                </div>

                {/* You can add more settings here following the same pattern */}
            </div>
        </>
    )
}


export default General;

