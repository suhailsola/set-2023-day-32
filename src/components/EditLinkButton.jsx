import React from "react";

const EditLinkButton = ({ deleteLink, editLink }) => {
  return (
    <div className="space-y-2">
      <button
        onClick={editLink}
        className="bg-pink-800 text-white p-2 rounded hover:bg-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
        </svg>
      </button>
      <DeleteButton deleteLink={deleteLink} />
    </div>
  );
};

export const DeleteButton = ({ deleteLink }) => {
  return (
    <div>
      <button
        className="bg-pink-800 text-white p-2 rounded hover:bg-black"
        onClick={deleteLink}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </button>
    </div>
  );
};

const EditForm = () => {
  return (
    <div className="w-screen min-h-screen fixed top-0 left-0 flex justify-center items-center bg-blue-200/50 backdrop-blur-sm">
      <div className="bg-white w-[400px] p-2 border border-gray-200"></div>
    </div>
  );
};

export default EditLinkButton;
