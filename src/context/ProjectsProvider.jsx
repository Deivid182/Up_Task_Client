import { createContext, useState, useEffect } from "react";
import { axiosClient } from "../config/axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

let socket;

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [alert, setAlert] = useState({});
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [taskFormModal, setTaskFormModal] = useState(false);
  const [task, setTask] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [member, setMember] = useState({});
  const [deleteMemberModal, setDeleteMemberModal] = useState(false);
  const [search, setSearch] = useState(false);

  const { auth } = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_SERVER_URL);
  }, [auth]);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await updateProject(project);
    } else {
      await addProject(project);
    }
  };

  const updateProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        `/projects/${project.id}`,
        project,
        config
      );

      const updatedProjects = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );

      setProjects(updatedProjects);

      setAlert({
        msg: "Project updated successfully",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);

      //console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  const addProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/projects", project, config);
      setProjects([...projects, data]);

      setAlert({
        msg: "Project created successfully",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (_id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient(`/projects/${_id}`, config);
      setProject(data);
      setAlert({});
    } catch (error) {
      navigate("/projects");
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2000);
    }

    setLoading(false);
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.delete(`/projects/${id}`, config);
      setAlert({
        msg: data.msg,
        error: false,
      });

      const updatedProjects = projects.filter(
        (projectState) => projectState._id !== id
      );

      setProjects(updatedProjects);

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setTaskFormModal(!taskFormModal);
    setTask({});
  };

  const submitTask = async (task) => {
    if (task.id) {
      await updateTask(task);
    } else {
      await newTask(task);
    }
  };

  const updateTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);

      setAlert({});
      setTaskFormModal(false);

      //socket

      socket.emit("update task", data)

      setTask({});
    } catch (error) {
      console.log(error);
    }
  };

  const newTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("tasks", task, config);

      //adding state to state

      setAlert({});
      setTaskFormModal(false);
      //socket io
      socket.emit("new task", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = (task) => {
    setTask(task);
    setTaskFormModal(true);
  };

  const handleDeleteModal = (task) => {
    setTask(task);
    setDeleteModal(!deleteModal);
  };

  const deleteTask = async () => {
    //console.log(task)

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.delete(`/tasks/${task._id}`, config);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setDeleteModal(false);

      setTimeout(() => {
        setAlert({});
      }, 2000);

      socket.emit("delete task", task)
      setTask({});
    } catch (error) {
      console.log(error);
    }
  };

  const submitMember = async (email) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        "/projects/members",
        { email },
        config
      );

      setMember(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
    setLoading(false);
  };

  const newMember = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/projects/members/${project._id}`,
        email,
        config
      );

      setAlert({
        msg: data.msg,
        error: false,
      });

      setMember({});
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }

    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  const handleDeleteMemberModal = (member) => {
    setDeleteMemberModal(!deleteMemberModal);
    setMember(member);
  };

  const deleteMember = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        `/projects/delete-member/${project._id}`,
        { id: member._id },
        config
      );

      const updatedProject = { ...project };

      updatedProject.members = updatedProject.members.filter(
        (memberState) => memberState._id !== member._id
      );

      setProject(updatedProject);

      setAlert({
        msg: data.msg,
        error: false,
      });
      setMember({});
      setDeleteMemberModal(false);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }

    setTimeout(() => {
      setAlert({});
    }, 2000);
  };

  const completeTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(`/tasks/state/${id}`, {}, config);


      setTask({});
      setAlert({});
      //socket
      socket.emit("change state", data)

    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  const submitTasksProject = (task) => {
    const updatedProject = { ...project };

    updatedProject.tasks = [...project.tasks, task];
    setProject(updatedProject);
  };

  const deleteTaskProject = task => {
    const updatedProject = { ...project };

    updatedProject.tasks = updatedProject.tasks.filter(
      (taskState) => taskState._id !== task._id
    );

    setProject(updatedProject);
  }

  const updateTaskProject = task => {

    const updatedProject = { ...project };
    updatedProject.tasks = updatedProject.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    );
    setProject(updatedProject);
  }

  const changeTaskState = task => {
    const updatedProject = { ...project };

    updatedProject.tasks = updatedProject.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    );
    setProject(updatedProject);
  }

  const logOutProjects = () => {
    setProject({})
    setProjects([])
    setAlert({})
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        loading,
        deleteProject,
        taskFormModal,
        handleModal,
        submitTask,
        task,
        handleUpdateTask,
        deleteModal,
        handleDeleteModal,
        deleteTask,
        submitMember,
        member,
        newMember,
        handleDeleteMemberModal,
        deleteMemberModal,
        deleteMember,
        completeTask,
        search,
        handleSearch,
        submitTasksProject,
        deleteTaskProject,
        updateTaskProject,
        changeTaskState,
        logOutProjects
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContext;
