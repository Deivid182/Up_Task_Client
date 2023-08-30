import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
  const { auth } = useAuth();
  //console.log(auth)

  return (
    <aside className="w-full flex flex-col items-center justify-center md:block md:w-2/5 lg:w-1/5 xl:w-1/6 px-3 py-5 border-r">
      <p className="text-xl font-bold">Hi, {auth.name} </p>

      <Link
        className="my-3 w-28 flex justify-between items-center text-white text-sm bg-sky-600 p-3  uppercase font-bold rounded-full"
        to={"new-project"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>

        <p className="text-sm text-white">Create</p>
      </Link>
    </aside>
  );
}
