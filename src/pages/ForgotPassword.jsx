import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { axiosClient } from "../config/axios";

export default function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [alert, setAlert] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if(email === "") {
      setAlert({
        msg: "Field Required",
        error: true
      })
      return
    }
    
    setAlert({})

      try {
        const { data } = await axiosClient.post(`/users/forgot-password`, {email})
        setAlert({msg: data.msg, error: false})
      } catch (error) {
        setAlert({msg: error.response.data.msg, error: true})
      }
  } 

  const { msg } = alert

  return (
    <>
    <h1 className="text-6xl capitalize font-black text-center">Restore Password</h1>
    <p className="text-center mt-5 font-light ">
      Fill the next input to get a new password
    </p>

    {msg && <Alert alert={alert} />}
    <form onSubmit={handleSubmit} className="my-5">

      <input
        type="text"
        placeholder="name@company.com"
        className="w-full mt-3 p-3 rounded-lg border-2 border-solid border-gray-600 "
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="submit"
        value={"Send email"}
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
        to={"/signup"}
        className="block text-center my-5 text-slate-500 uppercase text-sm"
      >
        don&apos;t have an account? Create a new one for free
      </Link>
    </nav>

  </>

  )
}
