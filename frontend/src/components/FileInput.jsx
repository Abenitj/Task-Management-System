import React from "react";

const FileInput = ({ label, error, isRequired = false, ...rest }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-white">
        {label} {isRequired && <span className="text-red-500 font-mono font-bold">*</span>}
      </label>
      <input
        type="file"
        className={`block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 
          dark:text-white dark:bg-gray-800 focus:outline-none 
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:border-blue-600"
          }`}
        {...rest} // Spread props (register function)
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FileInput;
