import React from "react";
import { Link, useLocation } from "react-router-dom";

const MenuItem = ({ to, icon, label, isOpen }) => {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 p-2 rounded-md  ${
        location.pathname === to ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span className={`${isOpen ? "block" : "hidden"}`}>{label}</span>
    </Link>
  );
};

export default MenuItem;
