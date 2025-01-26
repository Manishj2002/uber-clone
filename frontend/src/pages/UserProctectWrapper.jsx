import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
const UserProctectWrapper = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {user,setuser} = useContext(UserDataContext);
    const [loading, setloading] = useState(true)
    useEffect(() => {
      if(!token){
          navigate('/login')
      }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
     }).then((response) =>
      {
        if (response.status === 200) {
            const data = response.data;
            setuser(data.user);
            setloading(false)
        }
     }).catch((error) => {
        console.log(error);
        localStorage.removeItem('token');
        navigate('/login')
    });
  }, [token])
    if (loading) {
        return <div>Loading...</div>
    }  

  return (
    <>
        {children}
    </>
  )
}

export default UserProctectWrapper
