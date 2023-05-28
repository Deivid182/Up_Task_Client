import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { axiosClient } from "../config/axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState({})

  const { setAuth } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if([email, password].includes("")){
      setAlert({
        msg: "All fields are required",
        error: true
      })
    }

    try {
      const { data } = await axiosClient.post("/users/login", { email, password })      
      //console.log(data)
      setAlert({})
      localStorage.setItem("token", data.token)
      setAuth(data)
      navigate("/projects")
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const { msg } = alert

  return (
    <div>
      <h1 className="text-6xl capitalize font-normal text-center">Welcome to Up Task</h1>
      <p className="text-slate-500 text-center mt-5 font-light ">
        To get started, Sign In
      </p>

      {msg && <Alert alert={alert}/>}

      <form onSubmit={handleSubmit} className="my-5 flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="name@company.com"
          className="w-2/3 mt-3 p-3 rounded-lg border-2 border-solid border-gray-600 "
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Type a secure password"
          className="w-2/3 mt-3 p-3 rounded-lg border-2 border-solid border-gray-600 "
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value={"Sign In"}
          className="w-2/3 mt-3 p-2 rounded-lg bg-sky-600 text-white cursor-pointer"
        />
      </form>

      <nav className="w-2/3 mx-auto lg:flex lg:justify-between">
        <Link
          to={"/signup"}
          className="block my-5 text-slate-500 uppercase text-sm"
        >
          don&apos;t have an account? Create a new one for free
        </Link>

        <Link
          to={"/forgot-password"}
          className="block my-5 text-slate-500 uppercase text-sm"
        >
          forgot password
        </Link>
      </nav>

    </div>
  );
}
