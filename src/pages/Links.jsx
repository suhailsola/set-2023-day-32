import React, { useContext, useEffect, useState } from "react";
import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../App";
import {
  deleteSoftLink,
  postCreateNewLink,
  updateEditLink,
} from "../utils/api";
import TableLinkData from "../components/TableLinkData";
import { ToastContainer, toast } from "react-toastify";
import EditLinkButton from "../components/EditLinkButton";
import CreateModal from "../components/CreateModal";
import { useForm } from "react-hook-form";
import useGetAllLink from "../utils/hooks/useGetAllLink";
import QRCode from "react-qr-code";

const BASE_URL = import.meta.env.VITE_API_URL;

const Links = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const { linkState, data } = useGetAllLink();

  const { jwtCookie } = useContext(AuthContext);
  const onSubmit = async (data) => {
    try {
      setCreateLink("loading");
      const link = await postCreateNewLink(jwtCookie, {
        link: data.link,
      });
      setTimeout(setCreateLink("success"), 2000);
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
      const link = await updateEditLink(jwtCookie, links, {
        link: data.link,
      });
      setEditLink("success");
      setEditStatus(false);
    } catch (error) {
      setEditLink("error");
      console.log(error);
    }
  };

  const [copiedLink, setCopiedLink] = useState(false);
  const [createLinkForm, setCreateLinkForm] = useState(false);
  const [createLink, setCreateLink] = useState("pending");

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    // not utilised yet
    setCopiedLink(true);
    toast(`Copied ${link}`);
  };

  const [deletePopUp, setDeletePopUp] = useState(false);

  const [editStatus, setEditStatus] = useState(false);

  const [selectedSlug, SetSelectedSlug] = useState("");
  const [qrPopUp, setQrPopUp] = useState(false);

  const getStandardDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based
    const year = date.getFullYear();

    // Pad single-digit day and month with leading zero if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  useProtectedPage();
  return (
    <DashboardLayout>
      <ToastContainer />
      {/* create link modal */}
      {createLinkForm && createLink !== "success" && (
        <CreateModal
          closing={"Close"}
          closeModal={() => setCreateLinkForm(false)}
        >
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <input
              className=" text-center border border-gray-300 rounded w-[380px] px-2 py-1"
              type="text"
              {...register("link", { required: true })}
            />
            {(errors.link && (
              <center>
                <span className=" text-red-600 text-center">
                  Link is required
                </span>
              </center>
            )) ||
              errors?.errors}
            <button
              type="submit"
              className="bg-pink-800 text-white text-center rounded w-full p-2 hover:text-black"
              disabled={createLink === "loading"}
            >
              {createLink === "loading" ? "Creating..." : "Create Link"}
            </button>
          </form>
          {createLink === "success" && <h4>Success</h4>}
        </CreateModal>
      )}
      {/* QR modal */}
      {qrPopUp && (
        <CreateModal
          urlLink={selectedSlug}
          closing={"Close"}
          closeModal={() => setQrPopUp(false)}
        >
          <div
            className="p-3"
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 500,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={selectedSlug}
              viewBox={`0 0 256 256`}
            />
          </div>
          <h4>'{selectedSlug}'</h4>
        </CreateModal>
      )}
      {/* delete modal */}
      {deletePopUp && (
        <DeleteModal slug={selectedSlug} setDeletePopUp={setDeletePopUp} />
      )}
      {/* edit modal */}
      {editStatus && (
        <CreateModal
          urlLink={selectedSlug}
          closeModal={() => setEditStatus(false)}
          closing={"Cancel"}
        >
          <form
            className="space-y-2"
            onSubmit={handleSubmit((data) => editSubmit(data, selectedSlug))}
          >
            <div className="space-y-1">
              <label htmlFor="">You want to edit the following link?</label>
              <h4 className=" font-semibold">
                '{`${BASE_URL}/${selectedSlug}`}'
              </h4>
            </div>
            <label htmlFor="">Insert new link:</label>
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
      <div className=" p-4 bg-gray-400 space-y-2 min-h-screen">
        <div className="mx-2 flex justify-between items-center">
          <h4 className=" p-2 text-3xl font-semibold tracking-wider text-pink-800">
            Links
          </h4>
          <button
            onClick={() => setCreateLinkForm(true)}
            className="bg-pink-800 text-white py-2 px-3 rounded font-medium hover:bg-pink-900"
          >
            + Link
          </button>
        </div>

        <table className="w-full table-auto bg-white">
          <thead className=" font-mono uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>No</th>
              <th>Destination</th>
              <th>Link</th>
              <th>Get QR</th>
              <th>Visit count</th>
              <th>Created at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center space-x-3">
                  <p className=" inline-block">No links 🥲</p>
                  <button
                    onClick={() => setCreateLinkForm(true)}
                    className="bg-pink-800 text-white text-center rounded p-2 hover:bg-pink-900 inline-block"
                  >
                    Create now 😁
                  </button>
                </td>
              </tr>
            )}
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
                  <td>
                    {" "}
                    <button
                      onClick={() => {
                        SetSelectedSlug(`${BASE_URL}/${column.slug}`);
                        setQrPopUp(true);
                      }}
                      className="text-blue-400 hover:underline"
                    >
                      View
                    </button>
                  </td>
                  <td>{column.visit_counter}</td>
                  <td>{getStandardDate(column.created_at)}</td>
                  <td>
                    <EditLinkButton
                      deleteLink={() => {
                        SetSelectedSlug(column.slug);
                        setDeletePopUp(true);
                      }}
                      editLink={() => {
                        setEditStatus(true);
                        SetSelectedSlug(column.slug);
                      }}
                    />
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

const DeleteModal = ({ slug = "", setDeletePopUp }) => {
  const [deleteLink, setDeleteLink] = useState("pending");
  const { jwtCookie } = useContext(AuthContext);
  const handleDeleteLink = async (data) => {
    try {
      setDeleteLink("loading");
      console.log("Deleting links");
      const dataDeleted = await deleteSoftLink(jwtCookie, data);
      setDeleteLink("success");
      setDeletePopUp(false);
      console.log(dataDeleted);
    } catch (error) {
      setDeleteLink("error");
      console.log(error);
    }
  };
  return (
    <CreateModal
      urlLink={slug}
      closing={"Cancel"}
      closeModal={() => setDeletePopUp(false)}
    >
      <h4>Do you want to delete this link?</h4>
      <h4 className="font-semibold">'{`${BASE_URL}/${slug}`}'</h4>
      <button
        className="bg-pink-800 text-white text-center rounded w-full p-2 hover:text-black"
        onClick={() => handleDeleteLink(slug)}
      >
        {deleteLink !== "loading" ? "Confirm" : "Deleting"}
      </button>
    </CreateModal>
  );
};

export default Links;
