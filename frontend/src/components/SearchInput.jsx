import React from "react";
const SearchInput = ({ search, change, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={search}
      onChange={change}
      className="bg-gray-200 border-none md:w-[35%] w-[40%] my-5
      text-gray-900 text-sm rounded-sm
      block p-2.5 dark:bg-gray-700   focus:ring-0
      dark:placeholder-gray-400 dark:text-white"
    />
  );
};
export default SearchInput;
