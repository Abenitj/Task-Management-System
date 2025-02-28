import React from "react";

const TextInput = ({ label, error, isRequired, ...rest }) => {
  return (
    <div>
      <div className="relative">
        <input
          type="text"
          id={label}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
          border appearance-none dark:text-white focus:outline-none focus:ring-0 
          peer
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:border-blue-600"
          }`}
          {...rest} // Spread props (register function)
          placeholder=" " // Ensures floating label works correctly
        />
        <label
          htmlFor={label}
          className="absolute text-sm text-gray-500 bg-white dark:bg-gray-800 
  transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 
  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
  peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {label}{" "}
          {isRequired && (
            <span className="text-red-500 font-mono font-bold">*</span>
          )}
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TextInput;
