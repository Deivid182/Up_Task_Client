import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import Alert from "./Alert";

export default function FormMember() {
  const [email, setEmail] = useState("");
  const { alert, showAlert, submitMember } = useProjects()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email === "") {
      showAlert({
        msg: "Required Field",
        error: true
      })
      return
    }
    await submitMember(email)
    setEmail("")
  }

  const { msg } = alert

  return (
    <form onSubmit={handleSubmit} className="bg-white py-5 px-3 md:w-1/2 rounded-lg shadow">

      {msg && <Alert alert={alert} />}

      <input
        type="email"
        className="mt-3 w-full p-2 border-2 placeholder-gray-400 rounded-md"
        placeholder="name@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="submit"
        value={"Add Member"}
        className="bg-sky-600 hover:bg-sky-800 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md text-sm mt-5"
      />
    </form>
  );
}
