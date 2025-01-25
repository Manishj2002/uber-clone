import  { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [userData, setuserData] = useState({})
  const submitHandler = (e) => {
    e.preventDefault()
    setuserData({ email, password })
    setemail('')
    setpassword('')
  }
  return (
    <div className="min-h-screen w-full flex flex-col  justify-between bg-[#eeeeee]">
     <div>
     <img className='w-16' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
      <div className=" p-8 rounded-lg w-full ">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              id="password"
              type="password"
              placeholder="******************"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              LogIn
            </button>
          </div>
        </form>
        <p className='text-center mt-2 '>New here? <Link className='text-blue-600' to="/signup">Create new account</Link></p>
      </div>
     </div>
     <div className='p-5'>
     <Link
     to="/captain-login"
              className="bg-green-500 w-full flex justify-center items-center mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In as Captain
            </Link>
     </div>
    </div>
  )
}

export default UserLogin



