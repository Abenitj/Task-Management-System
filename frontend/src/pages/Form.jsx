import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import FormCard from "../components/FormCard";
import SelectInput from "../components/SelectInput";
import FileInput from "../components/FileInput";
import TextareaInput from "../components/TextareaInput";



const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // useEffect(() => {
  //   // Pre-fill form with mock data
  //   Object.keys(mockUserData).forEach((key) => {
  //     setValue(key, mockUserData[key]);
  //   });
  // }, [setValue]);

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    navigate("/dashboard"); // Redirect after form submission
  };

  return (
    <div className="">
      <FormCard title="UPDATE USER FORM">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" w-full h-[90%] grid gap-x-10 gap-y-5 md:grid-cols-2">
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
              label="Phone"
              type="option"
              error={errors.phone}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
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
                { value: "Admin", label: "Admin" },
                { value: "User", label: "User" },
                { value: "Editor", label: "Editor" },
              ]}
            />
            <TextareaInput
              label="Description"
              isRequired={true}
              error={errors.description}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Must be at least 10 characters",
                },
              })}
            />

            <FileInput
              label="Profile Picture"
              isRequired={true}
              error={errors.profilePicture}
              {...register("profilePicture", {
                required: "Profile picture is required",
              })}
            />

            <div>
              <button
                type="submit"
                className="text-white mt-4 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </FormCard>
    </div>
  );
};

export default Form;
