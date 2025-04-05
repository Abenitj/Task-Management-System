import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  MdPerson,
  MdSettings,
  MdExitToApp,
} from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: <MdPerson size={24} />, label: "Profile" },
    { icon: <MdSettings size={24} />, label: "Settings" },
    { icon: <MdExitToApp size={24} />, label: "Logout" },
  ];

  return (
    <Menu open={open} handler={setOpen}>
      <MenuHandler>
        <div className="flex items-center cursor-pointer">
          <FaUserCircle size={28} />
        </div>
      </MenuHandler>
      <MenuList className="bg-gray-50 w-44 border-none shadow-lg dark:bg-gray-700 text-gray-800 dark:text-gray-50 px-3 py-2 -ml-7 rounded-sm">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            className="text-left p-1 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2"
          >
            {item.icon}
            <span>{item.label}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ProfileDropdown;
