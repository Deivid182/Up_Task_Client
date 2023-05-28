import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import { axiosClient } from "../config/axios";

export default function ConfirmAccount() {
  const params = useParams();
  const { token } = params;

  const [alert, setAlert] = useState({});
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const url = `/users/confirm/${token}`;
        const { data } = await axiosClient(url);
        setAlert({
          msg: data.msg,
          error: false,
        });
        setVerify(true);
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };
    verifyAccount();
  }, [token]);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-6xl capitalize font-black text-center">
        Verify your account and get started
      </h1>
      <div>
        {msg && <Alert alert={alert} />}
        {verify && (
          <Link
            to={"/"}
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            Sign In
          </Link>
        )}
      </div>
    </>
  );
}
