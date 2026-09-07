import {useAuth} from "../hooks/useAuth"
import React from 'react'
import Loader from "./Loader"
import { Navigate } from "react-router"

function Protected({children}) {
    // const navigate = useNavigate()
    const {user,loading}=useAuth()
    if(loading){
        return (<Loader></Loader>)
    }

    if(!user){
        return (<Navigate to="/login"></Navigate>)
    }
  return children
}

export default Protected
