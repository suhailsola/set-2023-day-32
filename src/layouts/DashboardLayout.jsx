import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const DashboardLayout = ({ children }) => {
  useProtectedPage();

  const { setJwtCookie } = useContext(AuthContext);

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
    <div className="flex w-screen min-h-screen ">
      <div className="w-[250px] p-3 space-y-8 bg-pink-800">
        <h1 className="text-3xl font-bold text-white tracking-wider text-center">
          bitly
        </h1>
        <div className="space-y-1">
          {NAV.map((link, index) => (
            <h2
              className=" p-2 text-white tracking-wider hover:bg-white/10 cursor-pointer"
              key={index}
            >
              <Link to={link.link}>{link.text}</Link>
            </h2>
          ))}
        </div>
        <div className="p-2">
          <button
            onClick={() => setJwtCookie(null)}
            className=" w-full bg-white text-pink-800 rounded font-semibold tracking-wide py-2 hover:text-black hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-grow min-h-screen overflow-y-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
