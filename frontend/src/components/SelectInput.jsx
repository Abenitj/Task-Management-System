import React, { useState } from "react";

const SelectInput = ({ label, options, error, isRequired = false, ...rest }) => {
  const [selectedValue, setSelectedValue] = useState(""); // State to store selected value

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Update state when selection changes
    alert("al")
  };
  return (
    <div>
      <div className="relative">
        <select
          id={label}
          className={`block px-2.5 pb-2.5 pt-4 w-full  text-sm text-gray-900 bg-transparent rounded-lg 
          border-1 appearance-none dark:text-white focus:outline-none focus:ring-0 peer 
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:border-blue-600"
          }`}
          {...rest} // Spread props (register function)
        >
          <option className="dark:bg-gray-600 dark:text-gray-50" value="" disabled>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option className="text-gray-900 dark:bg-gray-700 dark:hover:bg-red-500 dark:text-white" key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label
          htmlFor={label}
          className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-4 scale-75 
          top-2 z-10 origin-[0] bg-white dark:bg-transparent px-2 peer-focus:px-2 
          peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
          peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
          rtl:peer-focus:left-auto start-1"
        >
          {label} {isRequired && <span className="text-red-500 font-mono font-bold">*</span>}
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default SelectInput;
