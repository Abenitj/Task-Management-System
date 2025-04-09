import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const GetOTP = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendOTP = async (data) => {

      setIsLoading(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/send-otp`, {
        email: data.email,
      });
        
      if (res.status === 200) {
        navigate("/verify-otp", { state: { email: data.email } });
        console.log("OTP sent successfully to:", data.email);
      } else {
        console.error("Failed to send OTP:", res.data);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error("Error sending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="OTP Verification"
        />
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Enter Your Email to Receive OTP
        </h2>
      </div>{" "}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-sm sm:px-10">
          <form onSubmit={handleSubmit(handleSendOTP)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 flex items-center border border-gray-300 rounded-sm pl-2">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  placeholder="user@gmail.com"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="flex-1 outline-none border-none focus:ring-0 focus:outline-none focus:border-transparent"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {errorMessage && (
              <div className="mt-2 text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 rounded-sm transition duration-150 ease-in-out focus:outline-none focus:border-transparent"
              >
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetOTP;
