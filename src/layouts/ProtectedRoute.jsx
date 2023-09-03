import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import ProfileModal from '../components/ProfileModal'
import { useProjects } from "../hooks/useProjects"

export default function ProtectedRoute() {

  const { auth, loading } = useAuth()

  const { profileModal, setProfileModal } = useProjects()

  if (loading) return "Loading..."

  return (
    <>
      {auth._id ?
        (
          <>
            <ProfileModal
              isOpen={profileModal}
              onClose={() => setProfileModal(false)}
            />
            <div className='w-full h-full'>
              <Header />

              <div className="flex max-md:flex-col-reverse flex-row h-full">
                <Sidebar />

                <main className="md:flex-1 p-3">
                  <Outlet />
                </main>

              </div>

            </div>
          </>
        )
        : <Navigate to={"/"} />}
    </>
  )
}
