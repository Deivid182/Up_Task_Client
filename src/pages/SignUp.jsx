import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosClient } from "../config/axios";
import Alert from "../components/Alert";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({
        msg: "All fields are required",
        error: true
      })
      setTimeout(() => {
        setAlert({})
      }, 2000)
      return
    }

    if (password !== repeatPassword) {
      setAlert({
        msg: "Your passwords do not match",
        error: true
      })

      setTimeout(() => {
        setAlert({})
      }, 2000)
      return
    }

    if (password.length < 6) {
      setAlert({
        msg: "Your password is too short. It must be at least 6 characteres so try again",
        error: true
      })

      setTimeout(() => {
        setAlert({})
      }, 2000)
      return
    }

    setAlert({})

    //fetch data

    try {

      const { data } = await axiosClient.post(`/users`, { name, email, password })

      console.log(data)
      setAlert({
        msg: data.msg,
        error: false
      })
      setName("")
      setEmail("")
      setPassword("")
      setRepeatPassword("")
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    } finally {
      setTimeout(() => {
        setAlert({})
      }, 2000)
    }

  }

  const { msg } = alert

  return (
    <>
      <h1
        data-cy="signup-heading"
        className="text-6xl capitalize font-black text-center">Sign Up</h1>
      <p className="text-center mt-5 font-light ">
        By signing up, I agree to UpTask&apos;s Privacy Policy and Terms of
        Service .
      </p>


      {msg && <Alert datacy={"signup-alert"} alert={alert} />}

      <form
        data-cy="signup-form"
        id="form" onSubmit={handleSubmit} className="my-5">
        <input
          type="text"
          placeholder="Name"
          className="w-full mt-3 p-3 rounded-lg border-2 border-solid border-gray-600 "
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-cy="signup-name-input"
        />

        <input
          type="email"
          placeholder="name@company.com"
          className="w-full mt-3 p-3 rounded-lg border-2 border-solid border-gray-600 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-cy="signup-email-input"
        />

        <input
          type="password"
          placeholder="Type a secure password"
          className="w-full mt-3 p-3 rounded-lg border-2 border-solid border-gray-600 "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-cy="signup-password-input"
        />

        <input
          type="password"
          placeholder="Type the same password you just set up"
          className="w-full mt-3 p-3 rounded-lg border-2 border-solid border-gray-600 "
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          data-cy="signup-repeat-password-input"
        />

        <input
          type="submit"
          value={"Sign Up"}
          data-cy="signup-submit"
          className="w-full mt-3 p-3 rounded-lg bg-black text-white hover:text-black hover:bg-sky-600 transition-colors cursor-pointer"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to={"/"}
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          already have an account? Sign In
        </Link>

        <Link
          to={"/forgot-password"}
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          forgot password
        </Link>
      </nav>

      <div className="flex justify-between items-center gap-2 mt-10">
        <div className="flex items-center gap-2">
          <AiOutlineCheckCircle size={25} />
          <p className="text-xs">
            Get unlimited access to tasks, projects, and storage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineCheckCircle size={25} />
          <p className="text-xs">
            Use different views, list, board or calendar.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineCheckCircle size={25} />
          <p className="text-xs">Invite your teammates to explore UpTask.</p>
        </div>
      </div>
    </>
  );
}
