import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormCard from "../../components/FormCard";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";

const AddUser = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // Store dynamic messages
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users`, data);
      reset();
      navigate("/view-user");
    } catch (error) {
      setToastMessage(error.response?.data.error || "An error occurred");
      setShowToast(true);
    }
  };

  return (
    <FormCard title={"ADD USER"} path={"/view-user"}>
      {/* Show toast only when needed */}
      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        message={toastMessage}
      />

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-[90%] grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2">
          <TextInput
            label="Firstname"
            error={errors.firstname}
            {...register("firstname", { required: "Firstname is required" })}
          />
          <TextInput
            label="Lastname"
            error={errors.lastname}
            {...register("lastname", { required: "Lastname is required" })}
          />
          <TextInput
            label="Email"
            type="email"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          <TextInput
            label="Password"
            type="password"
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            error={errors.confirmPassword}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          <SelectInput
            label="Role"
            isRequired={true}
            error={errors.role}
            {...register("role", { required: "Role is required" })}
            options={[
              { value: "Team Member", label: "Team Member" },
              { value: "Project Manager", label: "Project Manager" },
              { value: "Admin", label: "Admin" },
            ]}
          />
        </div>
        <div>
          <button
            type="submit"
            className="text-white mt-4 bg-gray-600 hover:bg-gray-700 font-medium rounded-md text-sm px-5 py-2.5"
          >
            Add User
          </button>
        </div>
      </form>
    </FormCard>
  );
};

export default AddUser;
