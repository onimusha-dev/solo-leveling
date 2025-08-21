import React from "react";

const SupportUs: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gray-50">
            <h1 className="text-4xl font-bold mb-4">Support Us</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
                We're building cool stuff. If you like what we're doing, consider
                supporting us — every little bit helps keep the mission alive.
            </p>

            <div className="flex gap-4">
                <a
                    href="https://www.buymeacoffee.com/yourlink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-3xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-md transition"
                >
                    ☕ Buy us a Coffee
                </a>

                <a
                    href="https://patreon.com/yourlink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-3xl bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-md transition"
                >
                    ❤️ Support on Patreon
                </a>
            </div>
        </div>
    );
};

export default SupportUs;
