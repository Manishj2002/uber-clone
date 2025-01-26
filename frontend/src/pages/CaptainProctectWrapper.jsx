import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProctectWrapper = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {captain,setCaptain} = useContext(CaptainDataContext);
    const [loading, setloading] = useState(true)

     useEffect(() => {
        if(!token){
            navigate('/captain-login')
        }
     }, [token])

     axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: { Authorization: `Bearer ${token}` },
     })
     .then((response) => {
        if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
           setloading(false)
        }
     })
        .catch((error) => {
            console.log(error);
            localStorage.removeItem('token');
            navigate('/captain-login')
        });

        if (loading) {
            return <div>Loading...</div>        
        }
     

  return (
    <>
        {children}
    </>
  )
}

export default CaptainProctectWrapper
