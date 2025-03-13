import { useState, useEffect } from "react";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import NotificationBell from "./NotificationBell";
import socket from "../config/socket";
import axios from "axios";
import Modal from "./Modal";
import NotifyCard from "./NotifyCard";
import ProfileDropdown from "./ProfileDropdown";

const Layout = () => {
  const user = useSelector((state) => state?.user.user);
  const [notification, setNotification] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const fetchNotification = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/notification/${user?.id}`
      );
      if (res.status === 200) {
        setNotification(res.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotification(data);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  //handle mark as read
  const handleMarkAsRead = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/notification/${id}`
      );
      if (res.status === 200) {
        fetchNotification();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="flex h-screen w-full fixed">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Top Bar */}
        <div className="flex items-center w-full z-10 justify-between p-4 shadow-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
          {/* Branding & Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 mr-3 dark:text-white text-2xl focus:outline-none"
            >
              {isOpen ? <MdClose /> : <FiMenu />}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-2xl focus:outline-none"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationBell
              setIsOpen={setOpenModal}
              count={notification?.length}
            />
           <ProfileDropdown/>
          </div>
        </div>

        {/* Content Area */}
        <div className="h-full px-2 scrollbar-thin py-5 w-full overflow-y-scroll light-scrollbar dark:dark-scrollbar">
          <Outlet />
        </div>
      </div>

      {/* Notifications Modal */}
      {notification.length > 0 && (
        <Modal
          title="Notifications"
          isOpen={openModal}
          setIsModal={setOpenModal}
        >
          {notification?.map((data) => {
            return (
              <NotifyCard
                key={data._id}
                message={data.message}
                date={data?.createdAt}
                handleMarkAsRead={() => handleMarkAsRead(data._id)}
              />
            );
          })}
        </Modal>
      )}
    </div>
  );
};

export default Layout;
