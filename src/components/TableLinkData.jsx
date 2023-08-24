import React from "react";

const TableLinkData = ({ linkUrl, children, copyLink }) => {
  return (
    <div className="flex justify-between items-center">
      {children}
      <div>
        <a className=" hover:text-gray-600" href={linkUrl} target="/">
          {linkUrl}
        </a>
      </div>
      <button className=" p-1 rounded hover:bg-gray-200" onClick={copyLink}>
        <svg
          id="Copy_24"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect
            width="24"
            height="24"
            stroke="none"
            fill="#000000"
            opacity="0"
          />

          <g transform="matrix(0.83 0 0 0.83 12 12)">
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                fill: "rgb(0,0,0)",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform="translate(-16, -16)"
              d="M 4 4 L 4 24 L 11 24 L 11 22 L 6 22 L 6 6 L 18 6 L 18 7 L 20 7 L 20 4 Z M 12 8 L 12 28 L 28 28 L 28 8 Z M 14 10 L 26 10 L 26 26 L 14 26 Z"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default TableLinkData;
