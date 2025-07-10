import React from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'
import Register from '../pages/Register.jsx'
import Login from '../pages/Login.jsx'

export const authRoutesArray = [
  {path : "/register" , Component : Register },
  {path : "/login" , Component : Login }
]

function authRoutes() {
  const { user }  =  useAuthStore()
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/profile'; // fallback route


  return !user ? <Outlet/> : <Navigate to={from} />
}

export default authRoutes
