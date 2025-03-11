import { FaCalendarAlt } from "react-icons/fa"; // Import icon from react-icons

const DatePicker = ({ label, error, isRequired, ...rest }) => {
  return (
    <div className="relative">
      <input
        type="date"
        id={label}
        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 dark:text-gray-50 bg-transparent rounded-lg 
        border appearance-none focus:outline-none focus:ring-0 
        peer
        ${
          error
            ? "border-red-500  focus:border-red-500"
            : "border-gray-300 dark:border-gray-600 focus:border-gray-600"
        }`}
        {...rest}
        placeholder=" "
      />
      <label
        htmlFor={label}
        className="absolute text-sm text-gray-500 bg-white dark:bg-gray-800 
    transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 
    peer-focus:text-gray-600 peer-focus:dark:text-gray-500 
    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
    peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
    peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}{" "}
        {isRequired && (
          <span className="text-red-500 font-mono font-bold">*</span>
        )}
      </label>
      <FaCalendarAlt
        onClick={() => document.getElementById(label).showPicker()} // Opens the date picker
        className={`absolute ${error && 'top-1/3'}  right-2.5 z-10  bg-gray-50  dark:bg-transparent size-5 top-1/2 transform -translate-y-1/2 text-gray-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default DatePicker;
