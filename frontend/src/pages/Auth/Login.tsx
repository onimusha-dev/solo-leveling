import { NavLink } from "react-router"

function Login() {
  return (
    <div className="flex flex-col md:flex-row gap-10 min-w-full bg-gray-100 p-10 rounded-2xl shadow-md">

      {/* section one  */}

      <div className="flex flex-col items-center justify-center md:w-1/2">
        <h1 className="text-3xl font-bold mt-5">Welcome Back</h1>
        <p className="mt-3 text-center text-gray-600">Sign in to your account to continue</p>

        <form action="submit" className="flex flex-col w-full gap-4 mt-10">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input type="text" placeholder="Email" className="w-full border-1 border-gray-300 rounded-2xl p-3" />
          </div>

          <div>
            <div className="flex justify-between ">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <NavLink to={"/auth/reset-password"} className={'text-sm text-blue-600 hover:text-blue-700'}>Forgot Password?</NavLink>
            </div>
            <input type="password" placeholder="Password" className="w-full border-1 border-gray-300 rounded-2xl p-3" />
          </div>
          <div className="flex">
            <label className="flex items-center text-sm text-gray-700">
              <input type="checkbox" className="w-5 h-5" />
              <span className="ml-2">Remember me</span>
            </label>
          </div>
          <button 
            type="submit"
            
            className="text-white rounded-2xl p-3 bg-blue-600 hover:bg-blue-700 ">Login</button>
        </form>
      </div>

      {/* section two  */}

      <div className="flex flex-col items-center justify-between gap-8 w-full md:w-1/2 ">
        <div className="hidden md:flex relative w-full h-full rounded-2xl shadow-md overflow-hidden bg-blue-500">
          <div className="relative top-0 w-full h-full bg-gradient-to-r from-white via-blue-950 to-white animate-spin-slow opacity-50 blur-sm rounded-2xl "></div>

          <div className="absolute top-0 flex items-center justify-center w-full h-full bg-gr ">
            <img src="/friren.png"
              alt="friren"
              className="w-full h-full p-1 rounded-2xl shadow-md hover:transform hover:scale-105 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        <div className="">
          <div className="w-full">
            <hr className="relative text-gray-300 top-3" />
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-100 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* {/* we will add google o auth here  */}

          {/* <div className="w-full h-5 my-5">
          <button className="">goofle</button>
          <button className="">gigi</button>
        </div> */}

          <div className="flex items-center text-sm">
            <h3>Don't have an account?</h3>
            <NavLink to={"/auth/register"} className={'text-blue-600 hover:text-blue-700'}>&nbsp;Sign Up</NavLink>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login