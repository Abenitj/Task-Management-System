import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const SubMenu = ({ label, icon, items, isOpen }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const location = useLocation();
  const submenuRef = useRef(null);

  return (
    <div>
      {/* Submenu Button */}
      <button
        onClick={() => setSubmenuOpen(!submenuOpen)}
        className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-[background] duration-300"
      >
        <div className="flex items-center space-x-2">
          {isOpen && icon} {/* Hide icon when sidebar is closed */}
          <span className={`${isOpen ? "block" : "hidden"}`}>{label}</span>
        </div>
        {isOpen && (
          <FiChevronDown
            className={`transition-transform duration-300 ${submenuOpen ? "rotate-180" : "rotate-0"}`}
          />
        )}
      </button>

      {/* Submenu Items - Sliding Effect */}
    <div
  ref={submenuRef}
  className=" transition-transform duration-300 overflow-hidden transform"
  style={{
    height: submenuOpen ? submenuRef.current?.scrollHeight : 0,
    opacity: submenuOpen ? 1 : 0,
    transform: submenuOpen ? 'translateY(0)' : 'translateY(-10px)', // add translate effect
  }}
>
  <div className="mt-2 space-y-1">
    {items.map((item, index) => (
      <Link
        key={index}
        to={item.to}
        className={`block p-2 text-sm rounded-md transition-transform duration-300  ${ // add transition for transform only
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
