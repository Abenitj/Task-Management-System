import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const SubMenu = ({ label, icon, items, isOpen, isActive, onClick }) => {
  const location = useLocation();
  const submenuRef = useRef(null);

  return (
    <div>
      {/* Submenu Button */}
      <button
        onClick={onClick} // Handle submenu click from parent state
        className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-[background] duration-300"
      >
        <div className="flex items-center space-x-2">
          {isOpen && icon} {/* Hide icon when sidebar is closed */}
          <span className={`${isOpen ? "block" : "hidden"}`}>{label}</span>
        </div>
        {isOpen && (
          <FiChevronDown
            className={`transition-transform duration-300 ${isActive ? "rotate-180" : "rotate-0"}`}
          />
        )}
      </button>

      {/* Submenu Items - Sliding Effect */}
      <div
        ref={submenuRef}
        className="transition-transform duration-300 overflow-hidden transform"
        style={{
          height: isActive ? submenuRef.current?.scrollHeight : 0,
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(-10px)", // Smooth slide effect
        }}
      >
        <div className="mt-2 space-y-1">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`block p-2 text-sm rounded-md transition-transform duration-300 ${
                location.pathname === item.to
                  ? "bg-gray-300 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
