import ProjectPreview from "../components/ProjectPreview";
import { useProjects } from "../hooks/useProjects";
import Alert from "../components/Alert";

const Projects = () => {
  
  const { projects, alert } = useProjects();

  const { msg } = alert

  return (
    <>
      <h1 className="text-4xl font-black">Projects</h1>

      {msg && <Alert alert={alert} />}

      <div className="bg-white shadow mt-10 w-[920px] mx-auto  rounded-lg p-2">
        {projects?.length ? (
          <>
          {projects.map(project => (
            <ProjectPreview key={project._id} project={project} />
          ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-32"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <p className="text-center text-gray-600 uppercase mt-5">There is not feed to show here. Try to make up some projects</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Projects