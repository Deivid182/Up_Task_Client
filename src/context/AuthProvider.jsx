import { createContext, useEffect, useState } from "react";
import { axiosClient } from "../config/axios";
import { toast } from 'react-hot-toast'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const authUser = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
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

  const updateInfo = async (data) => {
    const token = localStorage.getItem('token');

    if (!token) return

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }

    try {
      const response = await axiosClient.put(`/users/profile/${auth._id}`, data, config)
      setAuth(response.data)

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{ setAuth, auth, loading, logOut, updateInfo }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

