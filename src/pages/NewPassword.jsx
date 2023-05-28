import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosClient } from "../config/axios";
import Alert from "../components/Alert";

export default function NewPassword() {
  const params = useParams();
  const { token } = params;

  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [modifiedPassword, setModifiedPassword] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      try {
        
        await axiosClient(`/users/forgot-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }
    verifyToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "Your passwor is too short. It must be at least 6 characters",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post(
        `/users/forgot-password/${token}`,
        { password }
      );
      setAlert({
        msg: data.msg,
        error: false,
      });
      setModifiedPassword(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-6xl capitalize font-black text-center">
        Recover section
      </h1>
      <p className="text-center mt-5 font-light ">Set up your new password</p>

      {msg && <Alert alert={alert} />}

      {validToken && (
        <form onSubmit={handleSubmit} className="my-5">
          <input
            type="password"
            placeholder="Type a secure password"
            className="w-full mt-3 p-3 rounded-lg border-2 border-solid border-gray-600 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="submit"
            value={"Set Up password"}
            className="w-full mt-3 p-3 rounded-lg bg-black text-white hover:text-black hover:bg-sky-600 transition-colors cursor-pointer"
          />
        </form>
      )}
      {modifiedPassword && (
        <Link
          to={"/"}
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Sign In
        </Link>
      )}
    </>
  );
}
