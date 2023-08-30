import { formatDate } from "../helpers/formatDate";
import { useProjects } from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";

export default function Task({ task }) {
  const { handleUpdateTask, handleDeleteModal, completeTask } = useProjects();
  const { name, description, deadline, priority, _id, completed } = task;

  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="space-y-4">
        <p className="text-xl">{name} </p>
        <p className="text-sm text-gray-500 uppercase">{description} </p>
        <p className="text-xl">{formatDate(deadline)} </p>
        <p className="text-gray-600">Priority: {priority} </p>
        {completed && <p className="text-xl bg-green-600 text-white rounded-lg p-1 uppercase text-center">Completed by: {task.managed.name} </p>}
      </div>
      <div className="flex flex-col lg:flex-row gap-2 ">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-2 uppercase text-white font-bold text-sm rounded-lg"
            onClick={() => handleUpdateTask(task)}
          >
            Update
          </button>
        )}

        <button
          onClick={() => completeTask(_id)}
          className={`${completed ? "bg-sky-600" : "bg-gray-600"} px-4 py-2 uppercase text-white md:font-bold text-sm font-light  rounded-lg`}>
          {completed ? "Complete" : "Incomplete"}
        </button>

        {admin && (
          <button
            className="bg-red-600 px-4 py-2 uppercase text-white font-bold text-sm rounded-lg"
            onClick={() => handleDeleteModal(task)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
