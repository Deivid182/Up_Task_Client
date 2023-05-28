import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export default function AuthLayout() {
  return (
    <>

      <main className="container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-1/2">
          <Outlet />
        </div>
      </main>
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
