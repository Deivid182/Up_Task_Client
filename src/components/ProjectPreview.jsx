import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProjectPreview({ project }) {

  const { name, customer, creator } = project
  const { auth } = useAuth()

  return (
    <div className="border-b flex flex-col md:flex-row gap-2 md:gap-0 p-2 justify-between">
      <div className="flex items-center gap-2">

      <p className="flex-1 capitalize">
        {name}{" "}
        <span className="uppercase text-gray-400 text-sm">
          {" "}
          {customer}{" "}
        </span>{" "}
      </p>

      {auth._id !== creator && (
        <p className="text-white p-1 rounded-lg text-xs bg-green-600">Member</p>
      )}
      </div>

      <Link
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        to={`${project._id}`}
      >
        View Project
      </Link>
    </div>
  );
}
