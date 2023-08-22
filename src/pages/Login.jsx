import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postLoginUser } from "../utils/api";
import { AuthContext } from "../App";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const { jwt, setJwt } = useContext(AuthContext);
  const [loginState, setLoginState] = useState("pending");

  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      navigate("/dashboard");
    }
  }, [jwt]);

  const onSubmit = async (data) => {
    try {
      setLoginState("loading");
      const user = await postLoginUser({
        identifier: data.identifier,
        password: data.password,
      });
      setLoginState("success");
      setJwt(user.jwt);
      console.log(user);
    } catch (error) {
      setLoginState("error");
      const serverErrors = error?.response?.data?.errors?.errors[0] || [];
      setError(serverErrors.path, { message: serverErrors.msg });
    }
  };
  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center bg-pink-800">
      <div className=" bg-white w-full max-w-[600px] p-2 space-y-2">
        <form className="p-2 space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <p className=" font-bold">Login</p>
          <div className=" space-y-2">
            <label className="block" htmlFor="">
              Email or username
            </label>
            <input
              className="border border-gray-300 rounded w-full"
              type="text"
              {...register("identifier", { required: true })}
            />
            {errors.identifier && (
              <span className=" text-red-600">
                {errors.identifier.message || "Username or email is required"}
              </span>
            )}
          </div>
          <div className=" space-y-2">
            <label className="block" htmlFor="">
              Password
            </label>
            <input
              className="border border-gray-300 rounded w-full"
              type="text"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className=" text-red-600">Please insert password</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-pink-800 text-white text-center rounded w-full p-2"
          >
            Login
          </button>
          <Link className="block text-center text-pink-800 p-2" to="/register">
            Register as new user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
