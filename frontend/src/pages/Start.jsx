import { Link } from "react-router-dom"

const Start = () => {
  return (
    <div>
    <div className="bg-cover bg-center  bg-[url(https://images.unsplash.com/photo-1563282058-c9163e4ab24c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full pt-8 flex justify-between flex-col ">
      <img src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" className="w-16 mr-8" alt="" />
     <div className="bg-white pb-7 py-4 px-4">
      <h2 className="text-3xl font-bold">Get Started with Uber</h2>
      <Link to="/login" className="w-full flex justify-center item-center bg-black text-white mt-5 rounded py-3">Continue</Link>
     </div>
    </div>
  </div>
  )
}

export default Start