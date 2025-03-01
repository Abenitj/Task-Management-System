import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const VerifyOTP = () => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve email from previous page
  const email = location.state?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!email) {
      setIsError(true);
      return;
    }
    alert(email)
    
    const requestData = {
      email,
      otp: data.otp,
      newPassword: data.newPassword,
    };
    
    try {
   
      const res = await axios.patch("http://localhost:4000/api/users/reset-password", requestData);
      if (res.status === 200) {
        setIsSuccess(true);
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
      }
    } catch (error) {
      console.log(error.response);
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the OTP sent to your email and set a new password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-sm sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <div className="mt-1 flex items-center border border-gray-300 rounded-sm pl-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="text"
                  {...register("otp", { required: "OTP is required" })}
                  placeholder="123456"
                  className="flex-1 outline-none border-none focus:ring-0"
                />
              </div>
              {errors.otp && <span className="text-red-500 text-sm">{errors.otp.message}</span>}
            </div>

            {/* New Password Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="mt-1 flex items-center border border-gray-300 rounded-sm pl-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  {...register("newPassword", { required: "Password is required" })}
                  placeholder="********"
                  className="flex-1 outline-none border-none focus:ring-0"
                />
              </div>
              {errors.newPassword && <span className="text-red-500 text-sm">{errors.newPassword.message}</span>}
            </div>

            {/* Error Message */}
            {isError && (
              <div className="mt-2 text-center text-red-500 text-sm">
                Invalid OTP or email missing. Please try again.
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="mt-2 text-center text-green-500 text-sm">
                Password reset successfully! Redirecting to login...
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 rounded-sm transition duration-150 ease-in-out focus:outline-none"
              >
                <FiCheck className="mr-2" />
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
