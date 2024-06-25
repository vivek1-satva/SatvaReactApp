import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

type Props = {}

const AuthLayout = (props: Props) => {
    const getTokenFromLocalStorage = localStorage.getItem("accessToken")
    const navigate = useNavigate();
    if(!getTokenFromLocalStorage){
        return <Navigate to='/'/>
    }
    const decoded = jwtDecode(getTokenFromLocalStorage);
    
    let currentDateTime = Math.floor(Date.now() / 1000);
    
    if(decoded.exp && decoded.exp < currentDateTime){
        return <Navigate to='/'/>
    }
    
    return <Outlet />;
}

export default AuthLayout