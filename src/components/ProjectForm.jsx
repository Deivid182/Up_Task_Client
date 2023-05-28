import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import Alert from "./Alert";
import { useEffect } from "react";

export default function ProjectForm() {
  const params = useParams()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [customer, setCustomer] = useState("");
  const [id, setId] = useState(null)

  const { showAlert, alert, submitProject, project } = useProjects()

  useEffect(() => {

    if(params._id) { 
      setId(project._id)
      setName(project.name)
      setDescription(project.description)
      setDeadline(project.deadline?.split("T")[0])
      setCustomer(project.customer)
    }
  }, [params])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if([name, description, deadline, customer].includes("")) {
      showAlert({
        msg: "All fields are required",
        error: true
      })
    }

    await submitProject({ id, name, description, deadline, customer})
    setId(null)
    setName("")
    setDescription("")
    setDeadline("")
    setCustomer("")

  }

  const { msg } = alert

  return (
    <form onSubmit={handleSubmit} className="bg-white py-4 px-4 md:w-1/2 rounded-lg">

      {msg && <Alert alert={alert} />}

      <div className="mb-5">
        <label
          className="text-gray-400 uppercase font-medium text-sm"
          htmlFor="name"
        >
          Project&apos;s name
        </label>
        <input
          type="text"
          id="name"
          className="border-b w-full p-2 mt-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-400 uppercase font-medium text-sm"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          className="border-b w-full p-2 mt-2 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-5">
        <label
          className="text-gray-400 uppercase font-medium text-sm"
          htmlFor="deadline"
        >
          Deadline
        </label>
        <input
          type="date"
          id="deadline"
          className="border-b w-full p-2 mt-2 rounded-md"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-400 uppercase font-medium text-sm"
          htmlFor="customer"
        >
          Customer
        </label>
        <input
          type="text"
          id="name"
          className="border-b w-full p-2 mt-2 rounded-md"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <input type="submit"
        value={project._id ? "Update Project" : "Create Project"} 
          className="w-full mt-3 cursor-pointer text-white px-5 py-2 rounded-md font-bold text-xl bg-sky-600 hover:bg-sky-800 transition-colors"
        />

      </div>

    </form>
  );
}
