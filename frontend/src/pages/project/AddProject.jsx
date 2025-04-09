import React, { useState } from "react";
import FormCard from "../../components/FormCard";
import TextInput from "../../components/TextInput";
import { useForm } from "react-hook-form";
import DatePicker from "../../components/DatePicker";
import TextAreaInput from "../../components/TextareaInput";
import { useSelector } from "react-redux";
import Toast from "../../components/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // Store dynamic messages
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const createdBy = useSelector((state) => state.user.user.id);
  const onSubmit = async (data) => {
    const { startDate, endDate, projectName, description } = data;

    if (new Date(startDate) > new Date(endDate)) {
      setShowToast(true);
      setToastMessage("Start date cannot be later than end date.");
      return;
    }

    try {
      const dataToSend = {
        name: projectName,
        startDateTime: startDate,
        endDateTime: endDate,
        description,
        createdBy,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/projects`,
        dataToSend,
        {
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        navigate('/view-project')
      }
    } catch (error) {
      setShowToast(true);
      setToastMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <FormCard title={"Add Project"} path={"#"}>
        <Toast
          showToast={showToast}
          setShowToast={setShowToast}
          message={toastMessage}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label={"Project Name"}
            error={errors.projectName}
            {...register("projectName", {
              required: "Project Name must not be empty",
            })}
          />
          <div className="w-full grid mt-5 grid-cols-2 gap-4">
            <DatePicker
              label={"startDate"}
              error={errors.startDate}
              {...register("startDate", {
                required: "Start Date must not be empty",
              })}
            />
            <DatePicker
              label={"endDate"}
              error={errors.endDate}
              {...register("endDate", {
                required: "End Date must not be empty",
              })}
            />
          </div>
          <TextAreaInput
            label={"description"}
            error={errors.description}
            {...register("description", {
              required: "Description must not be empty",
            })}
          />

          <div>
            <button
              type="submit"
              className="text-white mt-4 bg-gray-600 hover:bg-gray-700 font-medium rounded-md text-sm px-5 py-2.5"
            >
              Add Project
            </button>
          </div>
        </form>
      </FormCard>
    </div>
  );
};
export default AddProject;
