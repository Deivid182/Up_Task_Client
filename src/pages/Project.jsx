import { useParams, Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";

import useAdmin from "../hooks/useAdmin";
import { useEffect } from "react";
import Task from "../components/Task";

import TaskModal from "../components/TaskModal";
import DeleteModal from "../components/DeleteModal";
import DeleteMemberModal from "../components/DeleteMemberModal";

import Member from "../components/Member";
import { io } from "socket.io-client";
let socket;

export default function Project() {
  const {
    getProject,
    project,
    loading,
    handleModal,
    submitTasksProject,
    deleteTaskProject,
    updateTaskProject,
    changeTaskState
  } = useProjects();
  const admin = useAdmin();

  const params = useParams();
  const { _id } = params;

  useEffect(() => {
    getProject(_id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_SERVER_URL);
    socket.emit("OpenProject", _id);
  }, []);

  useEffect(() => {
    socket.on("added task", (newWork) => {
      if (newWork.project === project._id) {
        submitTasksProject(newWork);
      }
    });

    socket.on("task deleted", (taskDeleted) => {
      if (taskDeleted.project === project._id) {
        deleteTaskProject(taskDeleted);
      }
    });

    socket.on("task updated", (taskUpdated) => {
      if (taskUpdated.project._id === project._id) {
        updateTaskProject(taskUpdated);
      }
    });

    socket.on("new state", (newTaskState) => {
      if (newTaskState.project._id === project._id) {
        changeTaskState(newTaskState)
      }
    });
  });

  //console.log(project);
  //console.log(auth)

  const { name } = project;

  if (loading)
    return (
      <div className="spinner m-auto">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-black text-4xl capitalize"> {name} </h1>
        {admin && (
          <Link
            to={`/projects/edit/${_id}`}
            className="flex gap-4 p-2 bg-sky-600 rounded-md text-white">
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            <p className="text-sm text-white">Edit</p>
          </Link>
        )}
      </div>

      {admin && (
        <button
          onClick={handleModal}
          type="button"
          className="flex items-center my-2 text-sm text-white py-2 px-4 bg-sky-600 cursor-pointer rounded-md "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          New Task
        </button>
      )}

      <p className="font-bold text-xl mt-5">Project&lsquo;s tasks</p>

      <div className="bg-white shadow mt-5 rounded-lg">
        {project.tasks?.length ? (
          project.tasks.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center my-5 p-10">There is not tasks to show</p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold uppercase text-gray-500 text-xl">Members</p>

            <Link
              to={`/projects/new-member/${project._id}`}
              className="flex gap-4 p-2 bg-sky-700 rounded-md text-white">
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
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              <span className="text-lg font-bold text-white">New Member</span>
            </Link>
          </div>

          <div className="bg-white shadow mt-5 rounded-lg">
            {project.members?.length ? (
              project.members.map((member) => (
                <Member key={member._id} member={member} />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                There is not members to show
              </p>
            )}
          </div>
        </>
      )}

      <TaskModal />
      <DeleteModal />
      <DeleteMemberModal />
    </>
  );
}
