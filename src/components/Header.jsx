import { Link, useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { useAuth } from "../hooks/useAuth";
import Search from "./Search";
import { menu } from '../assets';
import { useState } from 'react';
import MenuDrawer from './MenuDrawer';

export default function Header() {
  const { handleSearch, logOutProjects, setProfileModal } = useProjects();
  const { logOut } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogOut = () => {
    logOutProjects()
    logOut()
    localStorage.removeItem("token")
  }

  return (
    <>
      <MenuDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <header className="px-4 py-5 bg-white border-b">
        <div className="flex justify-between items-center">
          <h2
            onClick={() => navigate('/projects')}
            className="cursor-pointer max-md:text-2xl my-0 text-4xl text-sky-500 font-black md:mb-0">
            Up Task
          </h2>
          <div className='max-md:flex items-center hidden'>
            <img
              onClick={() => setIsOpen(true)}
              src={menu}
              className='cursor-pointer'
              alt='menu-mobile'
              width={30}
              height={30}
            />
          </div>
          <div className="max-md:hidden flex items-center gap-x-4">
            <button
              onClick={() => handleSearch()}
              type="button"
              className="uppercase font-bold outline-none">
              Search
            </button>
            <button
              type="button"
              onClick={() => setProfileModal(true)}
              className="uppercase font-bold outline-none">
              Profile
            </button>

            <Link to={"/projects"} className="uppercase font-bold">
              Projects
            </Link>
            <button
              onClick={handleLogOut}
              className="text-white text-sm bg-sky-500 p-4 rounded-full uppercase font-bold">
              SignOut
            </button>
          </div>

        </div>
      </header>
      <Search />
    </>
  );
}
