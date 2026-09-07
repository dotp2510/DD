import { useContext ,useEffect} from "react";
import { AuthContext } from "../auth.context";
import { register , login , getMe , logout } from "../services/auth.api";


export const useAuth =() =>{
    const context  =useContext(AuthContext)
    const {user,setUser , loading , setLoading } = context  

    const handleLogin =async({email,password})=>{
        setLoading(true)
       try {
            const data = await login({email, password})
            setUser(data.user)
            return true
        } catch(err) {
            console.error("Login failed:", err)
            return false
        } finally {
            setLoading(false)

        }
 }
  const handleRegister = async ({email, username, password}) => {
        setLoading(true)
        try {
            const data = await register({email, username, password})
            setUser(data.user)
            return true
        } catch(err) {
            console.error("Register failed:", err)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
            
        } catch(err) {
            console.error("Logout failed:", err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                // Not logged in / session expired — this is expected, not an error to crash on
                setUser(null)
            } finally {
                setLoading(false)
            }
            
        }
        getAndSetUser()
    }, [])

    return { user, loading, handleLogin, handleLogout, handleRegister }
  
}