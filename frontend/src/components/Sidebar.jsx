import React, { useState } from "react";
import { FiHome, FiLayers, FiMenu, FiUser } from "react-icons/fi";
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
import Logout from "./Logout";
import { MdClose } from "react-icons/md";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuClick = (menuLabel) => {
    setOpenSubMenu((prev) => (prev === menuLabel ? null : menuLabel));
  };

  return (
    <aside
      className={`h-screen md:static fixed left-0 bg-gray-100 md:z-0 z-[1000] overflow-auto scrollbar-thin dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg flex flex-col transition-[width] duration-300 ${
        isOpen ? "w-[80%] md:w-56 p-2" : "w-0 overflow-hidden"
      }`}
    >
      {isOpen && (
        <>
          <div className="relative">
            <h1 className="text-xl font-bold z-[1000] text-center py-5">
              Addis-Spark PLC
            </h1>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 mr-3 md:hidden block absolute top-2 right-2 dark:text-white text-2xl focus:outline-none"
            >
              {isOpen ? <MdClose /> : <FiMenu />}
            </button>
          </div>
          {/* Menu Items */}
          <nav className="mt-10 overflow-auto scrollbar-thin flex flex-col space-y-1 flex-grow">
            <MenuItem to="/" icon={<FiHome />} label="Dashboard" isOpen={isOpen} />
            {/* Services with Submenu */}
            <SubMenu
              isOpen={isOpen}
              label="User"
              icon={<FiUser />}
              items={[
                { to: "/add-user", label: "Add User" },
                { to: "/view-user", label: "View Users" },
              ]}
              isActive={openSubMenu === "User"}
              onClick={() => handleSubMenuClick("User")}
            />
            <SubMenu
              isOpen={isOpen}
              label="Project"
              icon={<FiLayers />}
              items={[
                { to: "/add-project", label: "Add project" },
                { to: "/view-project", label: "View projects" },
                { to: "/view-task", label: "View Tasks" },
              ]}
              isActive={openSubMenu === "Project"}
              onClick={() => handleSubMenuClick("Project")}
            />
          </nav>
          <div className="mt-auto">
            <div className="border-t border-gray-300 dark:border-gray-700" />
            {/* Divider above Logout */}
            <Logout />
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
