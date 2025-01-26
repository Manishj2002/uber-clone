import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignup from "./pages/CaptainSignup"
import Start from "./pages/Start"
import UserProctectWrapper from "./pages/UserProctectWrapper"
import UserLogout from "./pages/UserLogout"
import CaptainHome from "./pages/CaptainHome"
import CaptainProctectWrapper from "./pages/CaptainProctectWrapper"
import CaptainLogout from "./pages/CaptainLogout"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/home' element={
          <UserProctectWrapper>
            <Home/>
          </UserProctectWrapper>
        }/>
        <Route path="/user/logout" element={
          <UserProctectWrapper>
            <UserLogout/>
          </UserProctectWrapper>
        }/>
        <Route path="/captain-home" element={
          <CaptainProctectWrapper>
            <CaptainHome/>
          </CaptainProctectWrapper>
       
        }/>
           <Route path="/captain/logout" element={
            <CaptainProctectWrapper>
              <CaptainLogout/>
            </CaptainProctectWrapper>
          }/>
        
      </Routes>
    </div>
  )
}

export default App