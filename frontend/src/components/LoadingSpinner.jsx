import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen fixed top-0 left-0  bg-gray-800 bg-opacity-10 z-50">
      <div
        className="inline-block size-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
