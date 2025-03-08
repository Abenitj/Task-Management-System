import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import axios from "axios";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";
import TextAreaInput from "../../components/TextareaInput";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modalSlice";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../utils/Constants";

const AddTask = () => {
  const user=useSelector((state)=>state.user?.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [Options, setOption] = useState();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/users/role/${ROLE}`
      );
      if (res.status === 200) {
        setOption(
          res.data.map((user) => ({
            value: user._id,
            label: user.firstname,
          }))
        );
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm();

  const project_id = useSelector((state) => state.modal?.projectId);
  const isOpen = useSelector((state) => state.modal?.isOpen);

  // Watch the deadline field
  const deadline = watch("deadline");

  // Check if the deadline is in the past
  useEffect(() => {
    if (deadline) {
      const selectedDeadline = new Date(deadline);
      const currentDate = new Date();
      if (selectedDeadline <= currentDate) {
        setError("deadline", {
          type: "manual",
          message: "The deadline must be a future date.",
        });
      } else {
        // Clear the error if the date is valid (future date)
        clearErrors("deadline");
      }
    }
  }, [deadline, setError, clearErrors]);

  const onSubmit = async (data) => {
    if (!data.assignedTo) {
      alert("Please assign the task to someone.");
      return;
    }

    const newTask = {
      title: data.title,
      description: data.description,
      assignedTo: data.assignedTo,
      deadline: data.deadline,
      project: project_id,
      priority: data.priority,
    };

    try {
      const res = await axios.post("http://localhost:4000/api/task", newTask, {
        withCredentials: true,
      });

      if (res.status === 201) {
        dispatch(closeModal());
        navigate("/view-task")
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert(error.response?.data?.message || "Failed to add task. Please try again.");
    }
  };

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <Modal title={"Add Task"} isOpen={isOpen} setIsModal={() => dispatch(closeModal())}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-[90%] grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2">
            <TextInput
              isRequired={true}
              label="Title"
              error={errors.title}
              {...register("title", { required: "Title is required" })}
            />

            <SelectInput
              label="Assigned To"
              isRequired={true}
              error={errors.assignedTo}
              {...register("assignedTo", { required: "Assigned to is required" })}
              options={Options}
            />
            <SelectInput
              label="Priority"
              isRequired={true}
              error={errors.priority}
              {...register("priority")}
              options={[
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
                { value: "Critical", label: "Critical" },
              ]}
            />
            <TextInput
              label="Deadline"
              isRequired={true}
              type="datetime-local"
              error={errors.deadline}
              {...register("deadline", { required: "Deadline is required" })}
            />
          </div>
          <TextAreaInput
            label="Description"
            error={errors.description}
            {...register("description", {
              required: "Description is required",
            })}
          />
          <div>
            <button
              type="submit"
              className="text-gray-50 mt-4 bg-gray-600 hover:bg-gray-700 font-medium rounded-md text-sm px-5 py-2.5"
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
