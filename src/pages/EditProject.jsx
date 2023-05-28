import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProjects } from "../hooks/useProjects";
import ProjectForm from "../components/ProjectForm";

export default function EditProject() {
  const { project, loading, getProject, deleteProject } = useProjects();
  const params = useParams();

  useEffect(() => {
    getProject(params._id);
  }, []);

  const { name } = project;

  if (loading) return "Loading...";

  const handleClick = async () => {
    if(confirm("Are you sure?")) {
      await deleteProject(params._id)
    } else {
      console.log("no")
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-black text-4xl capitalize">
          EditProyect: {name}{" "}
        </div>
        <div className="flex gap-3 bg-red-600 text-white py-2 px-4 rounded-md ">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <button type="button" className="font-bold uppercase cursor-pointer" onClick={handleClick}>Delete</button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
}
