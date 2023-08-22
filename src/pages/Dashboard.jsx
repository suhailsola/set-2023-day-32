import React, { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const { jwt, setJwt, setJwtCookie } = useContext(AuthContext);
  const navigate = useNavigate();
  const notify = () => toast("Wow so easy!");

  const getAuthId = async () => {
    try {
      const user = await getUserId(jwt).then((res) => res.data);
      console.log(user);
    } catch (error) {
      setJwt(null);
      setJwtCookie(null);
    }
  };

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    } else {
      getAuthId();
    }
  }, [jwt]);

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

  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center bg-pink-800 gap-3">
      <h4 className=" text-2xl font-bold text-white">
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
      </div>
    </div>
  );
};

export default Dashboard;

const Msg = ({ closeToast, toastProps }) => (
  <div>
    Lorem ipsum dolor {toastProps.position}
    <button>Retry</button>
    <button onClick={closeToast}>Close</button>
  </div>
);
