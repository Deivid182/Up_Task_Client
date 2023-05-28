import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { useAuth } from "../hooks/useAuth";
import Search from "./Search";

export default function Header() {
  const { handleSearch, logOutProjects } = useProjects();
  const { logOut } =useAuth()

  const handleLogOut = () => {
    logOutProjects()
    logOut()
    localStorage.removeItem("token")
  }

  return (
    //container header
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-center text-4xl text-sky-600 font-black mb-5 md:mb-0">
          Up Task
        </h2>
        <div className="flex flex-col gap-3 items-center md:flex-row ">
          <button 
            onClick={() => handleSearch()}
            type="button" 
            className="uppercase font-bold">
            Search Project
          </button>

          <Link to={"/projects"} className="uppercase font-bold">
            Projects
          </Link>
          <button 
            onClick={handleLogOut}
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold">
            Log Out
          </button>
          <Search />
        </div>
      </div>
    </header>
  );
}
