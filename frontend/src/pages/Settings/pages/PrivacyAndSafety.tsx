import { FiChevronRight } from "react-icons/fi";

function PrivacyAndSafety() {
    return (
        <div className="flex flex-col mt-10 px-8 pb-24"> {/* Added pb-24 for spacing from bottom nav */}
            <h1 className="text-3xl font-semibold py-10">Privacy and Safety</h1>

            <div className="flex flex-col gap-8">
                {/* Account Privacy Section */}
                <section>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <h3 className="text-xl font-medium">Private Account</h3>
                                <p className="text-gray-400 text-sm mt-1">When your account is private, only people you approve can see your content.</p>
                            </div>
                            <label htmlFor="privateAccountToggle" className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" id="privateAccountToggle" className="sr-only peer" />
                                    <div className="block bg-gray-600 peer-checked:bg-yellow-500 w-14 h-8 rounded-full transition-colors"></div>
                                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:translate-x-full"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Safety Section */}
                <section>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <h3 className="text-xl font-medium">Sensitive Content</h3>
                                <p className="text-gray-400 text-sm mt-1">Display media that may contain sensitive content.</p>
                            </div>
                            <label htmlFor="sensitiveContentToggle" className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" id="sensitiveContentToggle" className="sr-only peer" defaultChecked />
                                    <div className="block bg-gray-600 peer-checked:bg-yellow-500 w-14 h-8 rounded-full transition-colors"></div>
                                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:translate-x-full"></div>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-800/50 rounded-lg px-4 -mx-4 transition-colors">
                            <div className="">
                                <h3 className="text-xl font-medium">Two-factor authentication</h3>
                                <p className="text-gray-400 text-sm mt-1">Help protect your account from unauthorized access.</p>
                            </div>
                            <div className="">
                                <FiChevronRight className="text-gray-400" size={24} />
                            </div>
                        </div>
                         <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-800/50 rounded-lg px-4 -mx-4 transition-colors">
                            <div className="mr-3">
                                <h3 className="text-xl font-medium">Login history</h3>
                                <p className="text-gray-400 text-sm mt-1">See where you're logged in.</p>
                            </div>
                            <div className="">
                                <FiChevronRight className="text-gray-400" size={24} />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-8 text-center text-gray-500 text-xs">
                    <p>Learn more about our <a href="#" className="text-yellow-500 hover:underline">privacy</a> and <a href="#" className="text-yellow-500 hover:underline">safety</a> policies.</p>
                </div>
            </div>
        </div>
    );
}


export default PrivacyAndSafety;