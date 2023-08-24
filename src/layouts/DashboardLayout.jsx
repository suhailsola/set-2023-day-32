import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import { Link, useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const notify = () => toast("Wow so easy!");

  useProtectedPage();

  const navigate = useNavigate();
  // toast
  const displayMsg = () => {
    toast(<Msg />);
    // toast(Msg) would also work
  };

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  const NAV = [
    {
      link: "/dashboard",
      text: "Dashboard",
    },
    {
      link: "/links",
      text: "Links",
    },
  ];

  return (
    <div className=" flex w-screen min-h-screen ">
      <div className="w-[300px] p-2 space-y-8 bg-pink-800">
        <h2 className=" p-2 text-white font-bold">bitly</h2>
        <div>
          {NAV.map((link, index) => (
            <h2 className=" p-2 text-white hover:bg-white/10 cursor-pointer" key={index}>
              <Link to={link.link}>{link.text}</Link>
            </h2>
          ))}
        </div>
        <div className="p-2">
          <button className="p-2 bg-white rounded w-full ">Logout</button>
        </div>
      </div>
      <div className="flex-grow">{children}</div>
      {/* <h4 className=" text-2xl font-bold text-white">
        Congratulations for signing in !
      </h4>
      <div>
        <button
          className=" bg-white text-pink-800 p-2 rounded font-semibold"
          onClick={notify}
        >
          Notify!
        </button>
        <ToastContainer />
      </div>

      <div>
        <button
          className=" bg-white text-pink-800 p-2 rounded font-semibold"
          onClick={displayMsg}
        >
          Click me
        </button>
        <ToastContainer />
      </div>
      <div className=" bg-white p-2 rounded">
        <form
          className="flex flex-col justify-center gap-2 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>Send a message</label>
          <input
            className="border border-black rounded px-2"
            type="text"
            {...register("message", { required: false })}
          />
          <button
            className="bg-pink-800 text-white p-2 rounded font-semibold"
            type="submit"
          >
            Toast a message
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default DashboardLayout;

const Msg = ({ closeToast, toastProps }) => (
  <div>
    Lorem ipsum dolor {toastProps.position}
    <button>Retry</button>
    <button onClick={closeToast}>Close</button>
  </div>
);
