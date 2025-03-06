import { useState, useEffect } from "react";
import {
  FiMenu,
  FiHome,
  FiBell,
  FiSun,
  FiMoon,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Dashboard from "../pages/Dashboard";
import { Link, Outlet } from "react-router-dom";
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import Sidebar from "./Sidebar";

const Layout = () => {
  const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleSidebar = (open) => {
    setIsOpen(open);
  };

  return (
    <div className="flex h-screen w-full fixed ">
        {/* Divider between Dashboard and User */}

      {/* Sidebar */}
     <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

      {/* Main Content */}
      <div className="flex-1 flex  flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white ">
        {/* Top Bar */}
        <div className="flex items-center w-full z-10 justify-between p-4 shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
          {/* Branding & Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 mr-3 dark:text-white text-2xl focus:outline-none"
            >
              {isOpen ? <MdClose /> : <FiMenu />}
            </button>{" "}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-2xl focus:outline-none"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <FiBell className="text-2xl cursor-pointer" />
            <FaUserCircle className="text-2xl cursor-pointer" />
          </div>
        </div>
        {/* Content Area */}
        <div className="h-full px-2   scrollbar-none py-5   w-full overflow-x-scroll light-scrollba dark:dark-scrollbar">
          <Outlet />
          
        </div>
      </div>
    </div>
  );
};

export default Layout;
