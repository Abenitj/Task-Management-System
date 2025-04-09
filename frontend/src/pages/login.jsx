import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { FaUser, FaLock } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setisError] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(import.meta.env.VITE_API_BASE_URL)
  // const handleSendOTP = async () => {
  //   // Define the email address
  //   const email = "abenitj@gmail.com";
    
  //   try {
  //     // Send OTP using email via POST request
  //     const res = await axios.post("http://localhost:4000/api/users/send-otp", { email });
      
  //     if (res.status === 200) {
  //       // Handle success, e.g., display a message or perform further actions
  //       console.log("OTP sent successfully to:", email);
  //     } else {
  //       // Handle unexpected status or errors
  //       console.error("Failed to send OTP:", res.data);
  //     }
  //   } catch (error) {
  //     // Handle error, e.g., network issues
  //     console.error("Error sending OTP:", error);
  //   }
  // };
  
  

  const onSubmit = async (user) => {
    if (!user) {
      throw new Error("All fields are required");
    }
    try {
      const res = await axios.post(`https://task-management-system-backend-hmjf.onrender.com/api/auth`, user, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(loginSuccess(res.data?.user));
        navigate("/");
        setisError("false");
      }
    } catch (error) {
      console.log(error.response?.data);
      setisError(true);
    }
    reset();
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
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-sm sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 flex items-center border border-gray-300 rounded-sm  pl-2">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  placeholder="user@gmail.com"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="flex-1 outline-none  focus:ring-0  border-none focus:outline-none focus:border-transparent"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 flex items-center border border-gray-300 rounded-sm pl-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Shhh... it's a secret"
                  className="flex-1 outline-none border-none focus:ring-0 focus:outline-none focus:border-transparent"
                />
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Error Message */}
            {isError && (
              <div className="mt-2 text-center text-red-500 text-sm">
                Incorrect email or password.
              </div>
            )}

            {/* Sign In Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 rounded-sm transition duration-150 ease-in-out focus:outline-none focus:border-transparent"
              >
                <FiLogIn className="mr-2" />
                Sign in
              </button>
            </div>
            {/* Forgot Password */}
            <div className="mt-4 text-center text-sm">
              <a
                href="/get-otp"
                className="text-blue-500 cursor-pointer hover:text-blue-600 transition ease-in-out duration-150"
              >
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
