import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { FiLogOut } from "react-icons/fi";
import socket from "../config/socket";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
     socket.disconnect();
    // Redirect to login and prevent back navigation
    navigate("/login", { replace: true });

    // Prevent back button navigation after logout
    setTimeout(() => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
      };
    }, 100);
  };

  return (
 <button
  onClick={handleLogout}
  className="p-2 hover:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-700 w-full flex items-center gap-2 rounded-sm transition-all duration-300"
  title="Logout"
> 
  <FiLogOut className="text-gray-700 dark:text-gray-50 text-xl" />
  <span className="text-gray-700 dark:text-gray-50 text-sm font-medium">Logout</span>
</button>

  );
};

export default Logout;
