import React from "react";

const CreateModal = ({ closeModal, children , closing, urlLink}) => {
  return (
    <div className="w-screen min-h-screen fixed top-0 left-0 flex justify-center items-center bg-pink-200/50 backdrop-blur-sm">
      <div className="bg-white w-[400px] p-2 border border-gray-500 flex flex-col justify-center items-center rounded gap-2">
        {children}
        <span
          className=" hover:underline text-blue-400 cursor-pointer"
          onClick={closeModal}
        >
          {closing}
        </span>
      </div>
    </div>
  );
};

export default CreateModal;
