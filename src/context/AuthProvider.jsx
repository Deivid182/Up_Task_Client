import { createContext, useEffect, useState } from "react";
import { axiosClient } from "../config/axios";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {


  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const authUser = async () => {
      const token = localStorage.getItem("token")
  
      if(!token) {
        setLoading(false)
        return
      }
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await axiosClient("/users/profile", config)
        setAuth(data)
      } catch (error) {
        setAuth({})
      }
      finally {
        setLoading(false)
      }
    }
    authUser()

  }, [])

  const logOut = () => {
    setAuth({})
  }

  return (
    <AuthContext.Provider
      value={{setAuth, auth, loading, logOut}}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

