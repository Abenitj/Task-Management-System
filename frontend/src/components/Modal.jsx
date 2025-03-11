import React, { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modalSlice";
const Modal = ({ children, title, isOpen, setIsModal }) => {
  // const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      // setIsModal(false)
      setIsModal();
    }
  };

  return (
    <div>
      {/* Modal Overlay */}
      {isOpen && (
        <div
          id="modal-overlay"
          onClick={handleOutsideClick}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        >
          {/* Modal Content */}
          <div className="relative p-4  w-full max-w-2xl max-h-full bg-gray-50 rounded-md shadow-lg dark:bg-gray-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-5  rounded-md dark:border-gray-600 border-gray-200">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h1>
              <button
                type="button"
                onClick={() => setIsModal()}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-gray-50"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w0.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal Body (Children - the Form Component will come here) */}
            <div className="md:max-h-[75vh] overflow-auto scrollbar-thin">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
