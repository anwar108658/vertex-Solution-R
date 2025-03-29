import { useEffect, useState } from 'react'
// import 'devextreme/dist/css/dx.light.css';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
function App() {
  const navigate = useNavigate()
  
  // get data form reducer
  const {login} = useSelector(state => state)
  
 // get data session Storage
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const isAuthenticated = userData?.userName && userData?.userRole && userData?.authToken;
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    } else {
      navigate("/dashboard")
    }
  }, [login.navigate])
  
  return (
    <>
    <Outlet/>
    </>
  )
}

export default App
