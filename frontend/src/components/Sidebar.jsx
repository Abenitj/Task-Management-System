import React, { useState } from "react";
import { FiHome, FiLayers, FiMenu, FiUser } from "react-icons/fi";
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
import Logout from "./Logout";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { Admin, ProjectManager, TeamMember } from "../utils/Constants";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const Role = useSelector((state) => state.user.user.role);
  const userName = useSelector((state) => state.user.user.firstname);
  const lastname = useSelector((state) => state.user.user.lastname);
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
          <div className="relative flex items-center justify-between py-1 px-3">
            <div className="flex flex-col items-center w-full">
              <h1 className="text-xl font-semibold  text-center text-gray-900 dark:text-white">
                Addis-Spark PLC
              </h1>
              <p className="text-md">{` ${Role}`}</p>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 dark:text-white text-2xl focus:outline-none md:hidden block"
            >
              {isOpen ? <MdClose /> : <FiMenu />}
            </button>
          </div>
          {/* Menu Items */}
          <nav className="mt-10 overflow-auto scrollbar-thin flex flex-col space-y-1 flex-grow">
            <MenuItem
              to="/"
              icon={<FiHome />}
              label="Dashboard"
              isOpen={isOpen}
            />
            {/* Services with Submenu */}
            {Role === Admin && (
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
            )}
            {Role !== Admin && (
              <SubMenu
                isOpen={isOpen}
                label="Project"
                icon={<FiLayers />}
                items={[
                  ...(Role !== TeamMember
                    ? [{ to: "/add-project", label: "Add project" }]
                    : []),
                  ...(Role !== TeamMember
                    ? [{ to: "/view-project", label: "View projects" }]
                    : []),
                  { to: "/view-task", label: "View Tasks" }, // Always visible
                ]}
                isActive={openSubMenu === "Project"}
                onClick={() => handleSubMenuClick("Project")}
              />
            )}
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
