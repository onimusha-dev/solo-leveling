import { useState } from "react"
import { NavLink } from "react-router"

function Login() {
  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
  })
  const [MdRememberMe, setRememberMe] = useState(false)

  const handleRememberMe = () => {
    setRememberMe(!MdRememberMe)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })

    


  }

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(userData)

    if (userData.identifier === '' || userData.password === '')
      return console.log('All fields are required')


    fetch('http://localhost:5500/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => res)
      .then(data => console.log(data))
      .catch(err => console.log(err))

  }

  return (
    <div className="flex flex-col md:flex-row gap-10 min-w-full bg-gray-100 p-10 rounded-2xl shadow-md">

      {/* section one  */}

      <div className="flex flex-col items-center justify-center md:w-1/2">
        <h1 className="text-3xl font-bold mt-5">Welcome Back</h1>
        <p className="mt-3 text-center text-gray-600">Sign in to your account to continue</p>

        <form action="submit" className="flex flex-col w-full gap-4 mt-10">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address or username <span aria-label="required">*</span>
            </label>
            <input onChange={handleChange} id="identifier" name="identifier" type="text" placeholder="Email or username" className="w-full border-1 border-gray-300 rounded-2xl p-3" />
          </div>

          <div>
            <div className="flex justify-between ">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span aria-label="required">*</span>
              </label>
              <NavLink to={"/auth/reset-password"} className={'text-sm text-blue-600 hover:text-blue-700'}>Forgot Password?</NavLink>
            </div>
            <input onChange={handleChange} id="password" name="password" type="password" placeholder="Password" className="w-full border-1 border-gray-300 rounded-2xl p-3" />
          </div>


          <div className="flex items-center text-sm text-gray-700">
            <input onChange={handleRememberMe} id="rememberMe" type="checkbox" className="w-5 h-5" />
            <label htmlFor="rememberMe" className="ml-2">Remember me</label>
          </div>
          <button
            type="submit"
            onClick={handleClick}
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