import React, { useContext, useEffect, useState } from "react";
import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../App";
import {
  deleteSoftLink,
  getAllLinks,
  postCreateNewLink,
  updateEditLink,
} from "../utils/api";
import TableLinkData from "../components/TableLinkData";
import { ToastContainer, toast } from "react-toastify";
import EditLinkButton from "../components/EditLinkButton";
import CreateModal from "../components/CreateModal";
import { useForm } from "react-hook-form";

const BASE_URL = import.meta.env.VITE_API_URL;

const Links = () => {
  const [linkState, setLinkState] = useState("pending");
  const [data, setData] = useState([]);
  const { jwtCookie } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setCreateLink("loading");
      const link = await postCreateNewLink(jwtCookie, {
        link: data.link,
      });
      setCreateLink("success");
      console.log(data.link);
    } catch (error) {
      setCreateLink("error");
      console.log(error);
    }
  };
  // Edit link
  const [editLink, setEditLink] = useState("pending");
  const editSubmit = async (data, links) => {
    try {
      setEditLink("loading");
      console.log(data, links);
      //   const link = await updateEditLink(jwtCookie, links, {
      //     link: data.link,
      //   });
      setEditLink("success");
      setEditStatus(false);
    } catch (error) {
      setEditLink("error");
      console.log(error);
    }
  };

  const fetchLinks = async () => {
    try {
      setLinkState("loading");
      const data = await getAllLinks(jwtCookie);
      console.log(data.data.data.rows);
      setLinkState("success");
      setData(data.data.data.rows);
    } catch (error) {
      setLinkState("error");
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const [copiedLink, setCopiedLink] = useState(false);
  const [createLinkForm, setCreateLinkForm] = useState(false);
  const [createLink, setCreateLink] = useState("pending");

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    // not utilised yet
    setCopiedLink(true);
    toast(`Copied ${link}`);
  };

  const [deleteLink, setDeleteLink] = useState("pending");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const handleDeleteLink = async (data) => {
    try {
      setDeleteLink("loading");
      console.log("Deleting links");
      //   const dataDeleted = await deleteSoftLink(jwtCookie, data);
      setDeleteLink("success");
      setDeletePopUp(false);
      // console.log(dataDeleted);
    } catch (error) {
      setDeleteLink("error");
      console.log(error);
    }
  };

  const [editStatus, setEditStatus] = useState(false);

  useProtectedPage();
  return (
    <DashboardLayout>
      <ToastContainer />

      {createLinkForm && createLink !== "success" && (
        <CreateModal
          closing={"Close"}
          closeModal={() => setCreateLinkForm(false)}
        >
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="border border-gray-300 rounded w-[380px] px-2 py-1"
              type="text"
              {...register("link", { required: true })}
            />
            {errors.link && (
              <span className=" text-red-600 text-center">
                Link is required
              </span>
            )}
            <button
              type="submit"
              className="bg-pink-800 text-white text-center rounded w-full p-2 hover:text-black"
              disabled={createLink === "loading"}
            >
              {createLink === "loading" ? "Creating..." : "Create Link"}
            </button>
          </form>
        </CreateModal>
      )}
      <div className=" p-4 bg-gray-400 space-y-2">
        <div className="mx-2 flex justify-between items-center">
          <h4 className=" p-2 text-xl font-semibold text-pink-800">Links</h4>
          <button
            onClick={() => setCreateLinkForm(true)}
            className="bg-pink-800 text-white p-2 rounded"
          >
            New Link
          </button>
        </div>

        <table className="w-full table-auto bg-white">
          <thead>
            <tr>
              <th>No</th>
              <th>Destination</th>
              <th>Link</th>
              <th>Visit count</th>
              <th>Created at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((column, index) => {
              return (
                <tr className=" text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>{column.link}</td>
                  <td>
                    <TableLinkData
                      linkUrl={`${BASE_URL}/${column.slug}`}
                      copyLink={() => copyLink(`${BASE_URL}/${column.slug}`)}
                    ></TableLinkData>
                  </td>
                  <td>{column.visit_counter}</td>
                  <td>{column.created_at}</td>
                  <td>
                    {deletePopUp && (
                      <CreateModal
                        urlLink={column.slug}
                        closing={"Cancel"}
                        closeModal={() => setDeletePopUp(false)}
                      >
                        <h4 className=" font-semibold">
                          Do you want to delete this link?
                        </h4>
                        <h4>{column.slug}</h4>
                        <h4>'{`${BASE_URL}/${column.slug}`}'</h4>
                        <button
                          className="bg-pink-800 text-white text-center rounded w-full p-2 hover:text-black"
                          onClick={() => handleDeleteLink(column.slug)}
                        >
                          {deleteLink === "success" ? "Confirm" : "Deleting"}
                        </button>
                      </CreateModal>
                    )}
                    <EditLinkButton
                      deleteLink={() => setDeletePopUp(true)}
                      editLink={() => setEditStatus(true)}
                    />
                    {editStatus && (
                      <CreateModal
                        closeModal={() => setEditStatus(false)}
                        closing={"Cancel"}
                      >
                        <form
                          className="space-y-2"
                          onSubmit={handleSubmit((data) =>
                            editSubmit(data, column.slug)
                          )}
                        >
                          <h4>{column.slug}</h4>
                          <input
                            className="border border-gray-300 rounded w-[380px] px-2 py-1"
                            type="text"
                            {...register("link", { required: true })}
                          />
                          {errors.link && (
                            <span className=" text-red-600 text-center">
                              Link is required
                            </span>
                          )}
                          <button
                            type="submit"
                            className="bg-pink-800 text-white text-center rounded w-full p-2 hover:text-black"
                            disabled={editLink === "loading"}
                          >
                            {editLink === "loading" ? "Editing..." : "OK"}
                          </button>
                        </form>
                      </CreateModal>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {linkState === "loading" && (
          <div className="flex flex-col justify-center items-center">
            <h4 className=" text-2xl font-bold text-white">Loading</h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 animate-spin text-blue-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const EditBox = ({ link }) => {
  return <div>{link}</div>;
};

export default Links;
