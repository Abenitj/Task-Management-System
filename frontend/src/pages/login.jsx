import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setisError] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (user) => {
    if (!user) {
      throw new Error("all fields are required");
    }
    try {
      const res = await axios.post("http://localhost:4000/api/auth", user, {
        withCredentials: true,
      });
      if (res.status === 200) {
          
         dispatch(loginSuccess(res.data?.user));
         navigate("/");
         setisError(false);;
      }
    } catch (error) {
      console.log(error.response?.data);
      setisError(true);
    }
    reset();
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
            {" "}
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-md sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5  text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    placeholder="user@gamil.com"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    className="appearance-none h-11 block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:shadow-outline-gray focus:border-gray-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                  {errors.password && (
                    <span className="text-red-500">Email is required</span>
                  )}

                  <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 rounded-sm shadow-sm">
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 h-11 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-gray focus:border-gray-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                  {errors.password && (
                    <span className="text-red-500">Password is require</span>
                  )}
                </div>
              </div>
              {isError && (
                <div className="flex justify-center  w-full">
                  <span className="text-red-500  text-sm">
                    Incorrect email or password.
                  </span>
                </div>
              )}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm leading-5">
                  <a
                    href="#"
                    className="font-medium text-blue-500 hover:text-blue-600 focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <span className="block w-full rounded-sm shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:bg-gray-700 focus:shadow-outline-indigo active:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    Sign in
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
