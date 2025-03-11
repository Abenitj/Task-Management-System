import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import FormCard from "../../components/FormCard";
import Toast from "../../components/Toast";

const UpdateUser = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // Store dynamic messages
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user; // Retrieve user data from router state

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  
  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        setValue(key, user[key]); // Set each key-value pair correctly
      });
    }
  }, [user, setValue]);
  

  const onSubmit = async (data) => {
    if (!data || Object.keys(data).length === 0) {
      alert("No data provided to update user");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:4000/api/users/${user._id}`, // Fixed URL
        data
      );
  
      if (res.status === 200) { // Fixed status check
        console.log("User updated successfully");
      
        navigate("/view-user");
      }
    } catch (error) {
      console.error("Error updating user", error);
      setToastMessage(error.response?.data)
      setShowToast(true);
    }
  };
  
  return (
    <div>
      <FormCard title="UPDATE USER FORM" path={'/view-user'}>
        {/* Show toast only when needed */}
        <Toast
          showToast={showToast}
          setShowToast={setShowToast}
          message={toastMessage}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-[90%] grid gap-x-10 gap-y-5 md:grid-cols-2">
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
              isRequired={true}
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
            <SelectInput
              label="Role"
              isRequired={true}
              error={errors.role}
              onChange={(e) =>handleChange(e)}
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
              update
            </button>
          </div>
        </form>
      </FormCard>
    </div>
  );
};

export default UpdateUser;
