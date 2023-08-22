import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" w-screen h-screen bg-pink-800 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold text-pink-800">Home</h1>
        <div className="flex justify-between gap-5">
          <button className="bg-pink-800 text-white rounded-lg px-4 py-2">
            <Link to="/login">Login</Link>
          </button>
          <button className="bg-pink-800 text-white rounded-lg px-4 py-2">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
