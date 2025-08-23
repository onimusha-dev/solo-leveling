import { Outlet } from "react-router"

function AuthLayout() {
  return (
        <div className="min-h-screen flex items-center justify-center px-5 bg-gray-200">
          <Outlet />
        </div>
    )
}

export default AuthLayout