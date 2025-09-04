import { NavLink } from "react-router"
import { useState } from "react"
import { IoMdEye, IoMdEyeOff } from "react-icons/io"

function ResetPassword() {
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    })

    const togglePassword = (field: keyof typeof showPassword) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }))
    }

    const [userData, setUserData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        termsAccept: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target
        setUserData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { currentPassword, newPassword, confirmPassword, termsAccept } = userData

        if (!currentPassword || !newPassword || !confirmPassword)
            return console.log("All fields are required")

        if (!termsAccept)
            return console.log("You must accept the terms")

        if (newPassword !== confirmPassword)
            return console.log("Passwords do not match")

        try {
            const res = await fetch("http://localhost:5500/api/v1/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
            })
            const data = await res.json()
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-10 bg-gray-100 p-10 rounded-2xl shadow-md select-none">
            {/* Left section */}
            <div className="flex flex-col items-center justify-center md:w-1/2">
                <h1 className="text-3xl font-bold mt-5">Reset Password</h1>

                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 mt-10">
                    {/* Current password */}
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password *
                        </label>
                        <div className="relative flex items-center">
                            <input
                                required
                                onChange={handleChange}
                                autoComplete="current-password"
                                id="currentPassword"
                                name="currentPassword"
                                type={showPassword.currentPassword ? "text" : "password"}
                                placeholder="your current password"
                                className="w-full border border-gray-300 rounded-2xl p-3"
                            />
                            <button
                                type="button"
                                aria-label={showPassword.currentPassword ? "hide" : "show"}
                                onClick={() => togglePassword("currentPassword")}
                                className="absolute right-0 pr-3 text-gray-500 hover:text-gray-600"
                            >
                                {showPassword.currentPassword ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* New password */}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password *
                        </label>
                        <div className="relative flex items-center">
                            <input
                                required
                                onChange={handleChange}
                                autoComplete="new-password"
                                id="newPassword"
                                name="newPassword"
                                type={showPassword.newPassword ? "text" : "password"}
                                placeholder="At least 8 characters"
                                className="w-full border border-gray-300 rounded-2xl p-3"
                            />
                            <button
                                type="button"
                                aria-label={showPassword.newPassword ? "hide" : "show"}
                                onClick={() => togglePassword("newPassword")}
                                className="absolute right-0 pr-3 text-gray-500 hover:text-gray-600"
                            >
                                {showPassword.newPassword ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password *
                        </label>
                        <div className="relative flex items-center">
                            <input
                                required
                                onChange={handleChange}
                                autoComplete="new-password"
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword.confirmPassword ? "text" : "password"}
                                placeholder="confirm new password"
                                className="w-full border border-gray-300 rounded-2xl p-3"
                            />
                            <button
                                type="button"
                                aria-label={showPassword.confirmPassword ? "hide" : "show"}
                                onClick={() => togglePassword("confirmPassword")}
                                className="absolute right-0 pr-3 text-gray-500 hover:text-gray-600"
                            >
                                {showPassword.confirmPassword ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex">
                        <input required onChange={handleChange} id="termsAccept" type="checkbox" name="termsAccept" className="w-5 h-5" />
                        <label htmlFor="termsAccept" className="text-sm text-gray-700 ml-2">
                            I agree to the
                            <NavLink to={"/policies/privacy"} className="text-blue-600 hover:text-blue-700">&nbsp;Privacy Policy</NavLink>
                        </label>
                    </div>

                    <button type="submit" className="text-white rounded-2xl p-3 bg-blue-600 hover:bg-blue-700">
                        Reset Password 
                    </button>
                </form>
            </div>

            {/* Right section */}
            <div className="flex flex-col items-center justify-between gap-8 w-full md:w-1/2">
                <div>
                    <div className="w-full">
                        <hr className="relative text-gray-300 top-3" />
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-100 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex items-center text-sm mt-4">
                        <h3>Remembered your password?</h3>
                        <NavLink to={"/auth"} className="text-blue-600 hover:text-blue-700">&nbsp;Login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
