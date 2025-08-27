import { NavLink } from "react-router"
import { useState } from "react"

function Login() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })

  const handleShowPassword = {
    password: () => {
      setShowPassword({ ...showPassword, password: !showPassword.password })
    },
    confirmPassword: () => {
      setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })
    }
  }


  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccept: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
    if (e.target.name === 'termsAccept')
      setUserData({ ...userData, [e.target.name]: e.target.checked })
  }

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(userData)

    if (userData.fullName === '' || userData.username === '' || userData.email === '' || userData.password === '' || userData.confirmPassword === ''){
      alert('All fields are required')
      return console.log('All fields are required')
}
    if (!userData.termsAccept)
      return console.log('You must accept the terms and conditions')

    if (userData.password !== userData.confirmPassword)
      return console.log('passwords do not match')

    fetch('http://localhost:5500/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

  }

  return (
    <div className="flex flex-col md:flex-row gap-10 min-w-full bg-gray-100 p-10 rounded-2xl shadow-md">

      {/* section one  */}

      <div className="flex flex-col items-center justify-center md:w-1/2">
        <h1 className="text-3xl font-bold mt-5">Create Account</h1>
        <p className="mt-3 text-center text-gray-600">access exclusive features and services</p>

        <form action="submit" className="flex flex-col w-full gap-4 mt-10">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span aria-label="required">*</span>
            </label>
            <input required onChange={handleChange} id="fullName" type="text" name="fullName" placeholder="Susie Chan" className="w-full border-1 border-gray-300 rounded-2xl p-3" />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              username <span aria-label="required">*</span>
            </label>
            <input required onChange={handleChange} id="username" type="text" name="username" placeholder="susie.dev" className="w-full border-1 border-gray-300 rounded-2xl p-3" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span aria-label="required">*</span>
            </label>
            <input required onChange={handleChange} autoComplete="email" id="email" type="text" name="email" placeholder="your.email@example.com" className="w-full border-1 border-gray-300 rounded-2xl p-3" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span aria-label="required">*</span>
            </label>
            <div className="relative flex items-center ">
              <input required onChange={handleChange} autoComplete="password" id="password" name="password" type={showPassword.password ? "text" : "password"} placeholder="At least 8 characters" className="w-full border-1 border-gray-300 rounded-2xl p-3" />
              <button
                type="button"
                onClick={handleShowPassword.password}
                className="absolute right-0 pr-3 text-gray-500 hover:text-gray-600"
              >-O-</button>
            </div>
            {/* <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters with uppercase, lowercase, and number</p> */}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password <span aria-label="required">*</span>
            </label>
            <div className="relative flex items-center ">
              <input required onChange={handleChange} autoComplete="password" id="confirmPassword" type={showPassword.confirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm your Password" className="w-full border-1 border-gray-300 rounded-2xl p-3" />
              <button
                type="button"
                onClick={handleShowPassword.confirmPassword}
                className="absolute right-0 pr-3 text-gray-500 hover:text-gray-600"
              >-O-</button>
            </div>
          </div>

          <div className="flex">
            <input required onChange={handleChange} id="termsAccept" type="checkbox" name="termsAccept" className="w-5 h-5" />
            <label htmlFor="termsAccept" className="text-sm text-gray-700">
              <span className="ml-2">I agree to the
                <NavLink to={'/policies/privacy'} className={'text-blue-600 hover:text-blue-700'}>&nbsp;Privacy Policy</NavLink>
              </span>
            </label>
          </div>
          <button
            type="submit"
            onClick={handleClick}
            className="text-white rounded-2xl p-3 bg-blue-600 hover:bg-blue-700 ">Create Account</button>
        </form>
      </div>

      {/* section two  */}

      <div className="flex flex-col items-center justify-between gap-8 w-full md:w-1/2 ">
        <div className="hidden md:flex relative w-full h-full rounded-2xl shadow-md overflow-hidden bg-blue-500">
          <div className="relative top-0 w-full h-full bg-gradient-to-r from-white via-blue-500 to-white animate-spin-slow opacity-50 blur-sm rounded-2xl "></div>

          <div className="absolute top-0 flex items-center justify-center w-full h-full bg-gr ">
            <img src="/friren.png"
              alt="friren"
              className="w-full h-full p-1 rounded-2xl shadow-md hover:transform hover:scale-105 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>

        <div>
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
            <h3>Already have an account?</h3>
            <NavLink to={"/auth"} className={'text-blue-600 hover:text-blue-700'}>&nbsp;Login</NavLink>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login