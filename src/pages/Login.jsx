import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postLoginUser } from "../utils/api";
import { AuthContext } from "../App";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { jwtCookie, setJwtCookie, setUsername } = useContext(AuthContext);
  const [loginState, setLoginState] = useState("pending");

  const navigate = useNavigate();

  useEffect(() => {
    if (jwtCookie) {
      navigate("/dashboard");
    }
  }, [jwtCookie]);

  const onSubmit = async (data) => {
    try {
      setLoginState("loading");
      const user = await postLoginUser({
        identifier: data.identifier,
        password: data.password,
      });
      setLoginState("success");
      setJwtCookie(user.jwt);
      setUsername(user.data.username);
      console.log(user);
      //   console.log(user);
    } catch (error) {
      setLoginState("error");
      const serverErrors = error?.response?.data?.errors?.errors[0] || [];
      setError(serverErrors.path, { message: serverErrors.msg });
    }
  };
  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center bg-pink-800 gap-3 font-mono">
      {loginState !== "loading" ? (
        <div className=" bg-white w-full max-w-[600px] p-2 space-y-2">
          <form className="p-2 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <p className=" font-bold text-lg">Login</p>
            <div className=" space-y-2">
              <label className="block" htmlFor="">
                Email or username
              </label>
              <input
                className="border border-gray-300 rounded w-full px-2"
                type="text"
                {...register("identifier", { required: true })}
              />
              {errors.identifier && (
                <span className=" text-red-600 my-1">
                  {errors.identifier.message || "Username or email is required"}
                </span>
              )}
            </div>
            <div className=" space-y-2">
              <label className="block" htmlFor="">
                Password
              </label>
              <input
                className="border border-gray-300 rounded w-full px-2"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className=" text-red-600 my-1">
                  Please insert password
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-pink-800 text-white text-center rounded w-full p-2 hover:bg-pink-900"
            >
              Login
            </button>
            <Link
              className="block text-center text-pink-800 p-2 hover:text-black"
              to="/register"
            >
              Register as new user
            </Link>
          </form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-20 h-20 animate-spin text-blue-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <h4 className=" text-3xl font-bold text-white tracking-wider">
            Loading
          </h4>
        </div>
      )}
    </div>
  );
};

export default Login;
