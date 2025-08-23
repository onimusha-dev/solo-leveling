import { NavLink } from "react-router";

function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex items-center justify-center px-5 md:bg-gray-200">
            <div className="flex flex-col items-center justify-center md:max-w-2/3 p-10 md:bg-gray-100 md:shadow-md rounded-2xl">
                <h1 className="text-3xl font-bold mt-5">Privacy Policy</h1>
                <p className="mt-3 text-center text-gray-600">
                    This is a demo Privacy Policy page for our theme. Your data is handled responsibly.
                </p>
                <div className="mt-10 flex flex-col justify-center items-center gap-4 text-center text-gray-700 text-sm">
                    <h2 className="font-semibold mb-1">Information We Collect</h2>
                    <p>
                        We may collect basic information like email, name, and usage data to improve our services.
                    </p>
                    <h2 className="font-semibold mb-1">How We Use Your Information</h2>
                    <p>
                        Your information is used to provide, maintain, and improve our services. We do not sell your data.
                    </p>
                    <h2 className="font-semibold mb-1">Cookies & Tracking</h2>
                    <p>
                        We may use cookies and similar technologies to enhance your experience on our site.
                    </p>
                    <h2 className="font-semibold mb-1">Contact Us</h2>
                    <p>
                        For any questions about this policy, please <NavLink to="/contact" className="text-blue-600 hover:text-blue-700">contact us</NavLink>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
