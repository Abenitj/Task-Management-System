import React from "react";

const TextareaInput = ({ label, error, isRequired = false, ...rest }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-white">
        {label} {isRequired && <span className="text-red-500 font-mono font-bold">*</span>}
      </label>
      <textarea
        rows="4"
        className={`block w-full px-2.5 py-2.5 text-sm text-gray-900 bg-transparent rounded-lg 
          border-1 appearance-none dark:text-white focus:outline-none focus:ring-0 peer 
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

export default TextareaInput;
