import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await axios.post(`${import.meta.env.BASE_URL}/api/users`, data);
      reset();
      navigate("/login");
    } catch (error) {
      // console.log(error.response?.data.error)
      setErrorMessage(error.response?.data?.error)
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-xl">
        <div className="bg-white p-8 shadow-sm rounded-sm">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            {/* First Name */}
       <div className="flex items-center justify-between">
       <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  {...register("firstname", { required: "First name is required" })}
                  className="w-full pl-10 px-3  border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="John"
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  {...register("lastname", { required: "Last name is required" })}
                  className="w-full pl-10 px-3  border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Doe"
                />
              </div>
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
       </div>

            {/* Email */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-10 px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="user@gmail.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  {...register("password", { required: "Password is required", minLength: 6 })}
                  className="w-full pl-10 px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                  className="w-full pl-10 px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="mt-2 text-center text-red-500 text-sm">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Sign Up
              </button>
            </div>

            {/* Already have an account? */}
            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
