import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postRegisterUser } from "../utils/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setRegisterState("loading");
      const newUser = await postRegisterUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setRegisterState("success");
      console.log(newUser);
      //   navigate("/login");
    } catch (error) {
        const serverErrors = error?.response?.data?.errors?.errors[0] || [];
        console.log(error.response.data.errors.errors[0]);
      setRegisterState("error");
      setError(serverErrors.path, { message: serverErrors.msg });
    //   serverErrors.map((serverErrors) =>
    //     setError(serverErrors.path, { message: serverErrors.msg })
    //   );
    }
  };

  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState("pending");

  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center bg-pink-800">
      {registerState !== "success" && (
        <div className=" bg-white w-full max-w-[600px] p-2 space-y-2">
          <form className="p-2 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <p className=" font-bold">Register as a new user</p>
            <div className=" space-y-2">
              <label className="block" htmlFor="">
                Username
              </label>
              <input
                className="border border-gray-300 rounded w-full"
                type="text"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span className=" text-red-600">
                  {errors.username.message || "Username is required"}
                </span>
              )}
            </div>
            <div className=" space-y-2">
              <label className="block" htmlFor="">
                Email
              </label>
              <input
                className="border border-gray-300 rounded w-full"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className=" text-red-600">
                  {errors.email.message || "Email is required"}
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
                <span className=" text-red-600">Password is required</span>
              )}
            </div>
            <button
              disabled={registerState === "loading"}
              type="submit"
              className="bg-pink-800 text-white text-center rounded w-full p-2"
            >
              {registerState === "loading" ? "Registering..." : "Register"}
            </button>
            <Link className="block text-center text-pink-800 p-2" to="/login">
              Login
            </Link>
          </form>
        </div>
      )}
      {registerState === "success" && (
        <div>
          <h4 className=" text-2xl font-bold text-white">
            Registration completed
          </h4>
          <Link
            className="block w-fit mx-auto text-center mt-4 bg-white rounded p-2 font-semibold"
            to="/login"
          >
            Login as user
          </Link>
        </div>
      )}
    </div>
  );
};

export default Register;
