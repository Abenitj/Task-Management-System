import React from "react";

const SimpleSelect = ({ 
  options = [], 
  label, 
  onChange, 
  filter = "", 
  name = "simple-select" 
}) => {
  return (
    <div className="flex flex-col sm:space-y-0 space-y-2">
      {label && (
        <label htmlFor={name} className="text-gray-900 dark:text-gray-50 font-medium">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={filter}
        // aria-placeholder="hello"
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-500"  >
        {options.map((option, index) => (
          <option 
            key={index} 
            value={option.value || ""} 
            className="text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-700 "
          >
            {option.label || option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SimpleSelect;
