import { useProjects } from "../hooks/useProjects"

export default function Member({member}) {

  const { email, name } = member
  const { handleDeleteMemberModal } = useProjects()

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-xl"> {name} </p>
        <p className="text-sm text-gray-700"> {email} </p>
      </div>
      <div>
        <button
          onClick={() => handleDeleteMemberModal(member)}
          type="button"
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
        >Remove</button>
      </div>
    </div>
  )
}
