import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function ProtectedRoute() {

  const { auth, loading } = useAuth()
  if(loading) return "Loading..."

  return (
    <>
      {auth._id ? 
        (
          <div>
            <Header />

            <div className="md:flex md:h-screen">
              <Sidebar />

              <main className="flex-1 p-3">
                <Outlet />
              </main>

            </div>

          </div>
        )
      : <Navigate to={"/"}/>} 
    </>
  )
}
