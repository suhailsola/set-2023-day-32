import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" w-screen h-screen bg-pink-800 flex flex-col justify-center items-center gap-12">
      <h1 className=" text-8xl font-bold text-white tracking-wider">bitly</h1>
      <div className="  rounded-lg w-[400px]  flex flex-col justify-center items-center ">
        <div className="flex w-full justify-between items-center">
          <button className=" text-white rounded  font-semibold tracking-wide border border-white w-24 py-2 hover:border-black  hover:text-black">
            <Link to="/login">Login</Link>
          </button>
          <button className=" bg-white text-pink-800 rounded font-semibold tracking-wide w-24 py-2 hover:text-black hover:bg-gray-300">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
