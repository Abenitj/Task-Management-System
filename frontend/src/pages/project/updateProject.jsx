import React, { useEffect, useState } from "react";
import FormCard from "../../components/FormCard";
import TextInput from "../../components/TextInput";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import TextAreaInput from "../../components/TextareaInput";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../components/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { closeModal } from "../../features/modalSlice";
import "react-datepicker/dist/react-datepicker.css";

const UpdateProject = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal?.isOpenUpdateProject);
  const project = useSelector((state) => state.states?.project);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    control,
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (project) {
      setValue("name", project.name);
      setValue("description", project.description);
      setValue(
        "startDateTime",
        project.startDateTime ? new Date(project.startDateTime) : null
      );
      setValue(
        "endDateTime",
        project.endDateTime ? new Date(project.endDateTime) : null
      );
    }
  }, [project, setValue]);

  const startDateTime = watch("startDateTime");
  const onSubmit = async (data) => { 
    const { startDateTime, endDateTime, name, description } = data;
    if (new Date(startDateTime) > new Date(endDateTime)) {
      setShowToast(true);
      setToastMessage("Start date cannot be later than end date.");
      return;
    }
    try {
      const dataToSend = { name, startDateTime, endDateTime, description };

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/projects/${project._id}`,
        dataToSend,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(closeModal());
        navigate("/view-project");
      }
    } catch (error) {
      setShowToast(true);
      setToastMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        title="Update Project"
        setIsModal={() => dispatch(closeModal())}
      >
        <Toast
          showToast={showToast}
          setShowToast={setShowToast}
          message={toastMessage}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            label="Project Name"
            error={errors.name}
            {...register("name", {
              required: "Project Name must not be empty",
            })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div>
              <label className="block text-sm font-medium dark:text-gray-50 text-gray-700">
                Start Date
              </label>
              <Controller
                name="startDateTime"
                control={control}
                rules={{ required: "Start Date must not be empty" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-full  rounded p-2 dark:bg-gray-600 focus:outline-none  focus:ring-0"
                    placeholderText="Select a start date"
                  />
                )}
              />
              {errors.startDateTime && (
                <p className="text-red-500 text-sm">
                  {errors.startDateTime.message}
                </p>
              )}
            </div>

            <div>
            <label className="block text-sm font-medium dark:text-gray-50 text-gray-700">
            End Date
              </label>
              <Controller
                name="endDateTime"
                control={control}
                rules={{ required: "End Date must not be empty" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-full  rounded p-2 dark:bg-gray-600 focus:outline-none  focus:ring-0"
                    placeholderText="Select an end date"
                    minDate={startDateTime} // Prevents selecting a date before startDateTime
                  />
                )}
              />
              {errors.endDateTime && (
                <p className="text-red-500 text-sm">
                  {errors.endDateTime.message}
                </p>
              )}
            </div>
          </div>

          <TextAreaInput
            label="Description"
            error={errors.description}
            {...register("description", {
              required: "Description must not be empty",
            })}
          />

          <button
            type="submit"
            className="w-full md:w-auto text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-md text-sm px-5 py-2.5"
          >
            Update Project
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateProject;
