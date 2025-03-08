import { Bell } from "lucide-react";
import React from "react";
import { formatDate } from "../utils/FormateDate";

const NotifyCard = ({date,message,handleMarkAsRead}) => {
  return (
    <div>
      {" "}
      <div
        id="alert-border-5"
        className="flex items-center p-4 border-t-4 border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-600"
        role="alert"
      >
        <Bell size={18} className="text-gray-800 dark:text-gray-100" />
        <div className="dark:text-gray-50 pl-1">
          <p className="font-semibold">{message}</p>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(date)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleMarkAsRead}
          className="ms-auto -mx-1.5 -my-1.5 bg-gray-50 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          data-dismiss-target="#alert-border-5"
          aria-label="Close"
        >
          <span className="sr-only">Dismiss</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default NotifyCard;