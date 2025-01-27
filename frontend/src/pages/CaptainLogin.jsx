import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { CaptainDataContext } from "../context/CaptainContext"


const CaptainLogin = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const {captain,setCaptain} = useContext(CaptainDataContext);
    
    const submitHandler = async (e) => {
        e.preventDefault()
        setError('')
        const captainData = { email, password };
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)
            if (response.status === 200) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem("token", data.token);
                navigate("/captain-home");
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
        
        setemail('')
        setpassword('')
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-between bg-[#eeeeee]">
            <div>
                <img className='w-16' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png" alt="" />
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
                        {error && (
                            <div className="mb-4 text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-black w-full hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                LogIn
                            </button>
                        </div>
                    </form>
                    <p className='text-center mt-2 '>Join as fleet? <Link className='text-blue-600' to="/captain-signup">Register as a Captain</Link></p>
                </div>
            </div>
            <div className='p-5'>
                <Link
                    to="/login"
                    className="bg-purple-800 w-full flex justify-center items-center mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                >
                    Sign In as User
                </Link>
            </div>
        </div>
    )
}

export default CaptainLogin