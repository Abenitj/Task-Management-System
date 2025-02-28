import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser } from "react-icons/fi";
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
import Logout from "./Logout";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`h-screen md:static fixed left-0 bg-gray-100 overflow-auto scrollbar-thin dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg flex flex-col z-[5000] transition-[width] duration-300 ${
        isOpen ? "w-[80%] md:w-56 p-2" : "w-0 overflow-hidden"
      }`}
    >
      {isOpen && (
        <>
          <h1 className="text-xl font-bold z-[1000] text-center py-5">
            Addis-Spark PLC
          </h1>
          {/* Menu Items */}
          <nav className="mt-10 overflow-auto scrollbar-thin flex flex-col space-y-1 flex-grow">
            <MenuItem
              to="/"
              icon={<FiHome />}
              label="Dashboard"
              isOpen={isOpen}
            />
            {/* Services with Submenu */}
            <SubMenu
              isOpen={isOpen}
              label="User"
              icon={<FiUser />}
              items={[
                { to: "/add-user", label: "Add User" },
                { to: "/view-user", label: "View User" },
              ]}
            />
          </nav>
          <div className="mt-auto">
            <Logout />
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
