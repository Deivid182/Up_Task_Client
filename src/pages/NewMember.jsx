import { useEffect } from "react";
import FormMember from "../components/FormMember";
import { useProjects } from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";

export default function NewMember() {

  const { getProject, project, loading, member, newMember, alert } = useProjects()
  const params = useParams()

  useEffect(() => {
    getProject(params._id)
  }, [])

  if(!project?._id) return <Alert alert={alert} />

  return (
    <>
      <h1 className="text-4xl font-black">New Member for the project: {project.name} </h1>

      <div className="mt-10 flex justify-center">
        <FormMember />
      </div>

      {loading ? "Loading..." : member._id && (
        <div className="flex justify-center mt-5">
          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
            <h2 className="text-center mb-10 text-2xl font-bold">Result </h2>

            <div className="flex justify-between items-center">
              <p> {member.name} </p>

              <button
                onClick={() => newMember({email: member.email})}
                type="button"
                className="bg-slate-500 px-5 py-2 uppercase font-bold text-white rounded-md text-sm hover:bg-slate-700 transition-colors"
              >Add to Project</button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}
