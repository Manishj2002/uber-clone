import { useState } from "react"
import { Link } from "react-router-dom"

const UserSignup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [userData, setuserData] = useState({})
  const submitHandler = (e) => {
    e.preventDefault()
    setuserData({ email, password,fullname:{ firstname, lastname } })
    setemail('')
    setpassword('')
    setfirstname('')
    setlastname('')
  }
  return (
    <div className="min-h-screen w-full flex flex-col  justify-between bg-[#eeeeee]">
    <div>
    <img className='w-16' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
     <div className=" p-8 rounded-lg w-full ">
       <form onSubmit={(e) => submitHandler(e)}>
       <div className="mb-5">
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
             Username
           </label>
          <div className="flex gap-5">
          <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
             id="firstname"
             type="text"
             placeholder="firstname"
             required
           />
          <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             value={lastname}
              onChange={(e) => setlastname(e.target.value)}
             id="lastname"
             type="text"
             placeholder="lastname"
             required
           />
          </div>
         </div>
         <div className="mb-5">
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
         <div className="mb-5">
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
       <p className='text-center mt-2 '>already have an account? <Link className='text-blue-600' to="/login">Login here</Link></p>
     </div>
    </div>
    <div>
      <p className="text-[10px] leading-tight m-3">By proceeding you consent to get calls, watsapp messages and texts from Uber and its affiliates.
        Standard message and data rates apply. You also agree to Uber's Terms of Service and Privacy Policy.
      </p>
    </div>
   </div>
  )
}

export default UserSignup