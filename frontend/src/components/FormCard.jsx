import React from "react";
import { useNavigate } from "react-router-dom";
const FormCard = ({ title, path, children }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 dark:bg-gray-800 md:p-10 p-3 overflow-auto h-auto rounded-md">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-3xl font-semibold ">{title}</h1>
          <p className=" text-gray-400 my-2">
            Please fill out the form below accurately.
          </p>
        </div>

        <div>
          <button
            onClick={() => navigate(path)}
            type="button"
            className="text-white bg-gray-700 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700 
            focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 
            font-medium rounded-md text-sm px-5 py-2.5 flex items-center"
          >
            Back
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default FormCard;
