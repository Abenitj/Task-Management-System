import React from "react";
import { FiBell } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modalSlice";

const NotificationBell = ({ count,setIsOpen }) => {
   const dispatch = useDispatch()
   const handleNotificationDetail=()=>{
     setIsOpen(true)
   }
  return (
    <button onClick={handleNotificationDetail} className="relative p-2">
      <FiBell size={24} className="text-gray-700 dark:text-white" />
      {/* Badge for unread notifications */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;
