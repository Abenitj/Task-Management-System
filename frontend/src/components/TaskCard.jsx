import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Flag, Calendar } from "lucide-react";
import { formatDate } from "../utils/FormateDate";
import { useSelector } from "react-redux";
import { TeamMember } from "../utils/Constants";

const TaskCard = ({
  title,
  description,
  deadline,
  status,
  id,
  priority,
  setTasks,
}) => {
  const [activeCard, setActiveCard] = useState(null);
  const dropdownRef = useRef(null);
  const { firstname, lastname, role } = useSelector((state) => state.user.user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveCard(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChangeStatus = async (status) => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/task/${id}`, {
        status,
        firstname,
        lastname,
      });
      if (res.status === 200) {
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? { ...task, status } : task))
        );
      }
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setActiveCard(null);
    }
  };
  return (
    <Card className="w-full rounded-sm shadow-sm bg-gray-50 dark:bg-gray-800">
      <CardHeader className="p-4 shadow-sm bg-gray-50 dark:bg-gray-800">
        <Typography variant="h5" className="text-gray-900 dark:text-white">
          {title || "Untitled Task"}
        </Typography>
      </CardHeader>
      <CardBody className="space-y-4">
        <Typography className="text-gray-900 dark:text-gray-50 text-sm">
          {description || "No description available."}
        </Typography>

        {/* Priority */}
        <div className="flex items-center gap-2">
          <Flag
            className={`w-5 h-5 ${
              priority === "High" ? "text-red-500" : "text-yellow-500"
            }`}
          />
          <Typography className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Priority: {priority || "Normal"}
          </Typography>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-gray-800 dark:text-gray-200" />
          <Typography className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {deadline ? formatDate(deadline) : "No Deadline"}
          </Typography>
        </div>

        {/* Status Dropdown */}
        <div
          className="relative transition-all duration-300 "
          ref={dropdownRef}
        >
          <div
            className={`font-semibold w-[30%] text-center px-1 text-sm rounded-md ${
              role === TeamMember ? "cursor-pointer" : "cursor-default"
            } ${
              status === "To Do"
                ? "bg-blue-100 text-blue-500"
                : status === "In Progress"
                ? "bg-yellow-100 text-yellow-500"
                : status === "Completed"
                ? "bg-green-100 text-green-500"
                : status === "Blocked"
                ? "bg-red-100 text-red-500"
                : "bg-red-100 text-gray-500"
            }`}
            // Toggle dropdown
            onClick={
              role === "Team Member"
                ? () => setActiveCard(activeCard === id ? null : id)
                : undefined
            }
          >
            {status || "Unknown Status"}
          </div>

          {activeCard === id && (
            <ul
              className="absolute left-24 transition-all duration-300 ease-in-out text-gray-900 dark:text-gray-100 
              cursor-pointer top-0 rounded-sm p-2 text-sm bg-gray-50 shadow-md w-[50%] dark:bg-gray-700 z-50"
            >
              <li
                className="cursor-pointer py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleChangeStatus("To Do")}
              >
                To Do
              </li>
              <li
                className="cursor-pointer py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleChangeStatus("In Progress")}
              >
                In Progress
              </li>
              <li
                className="cursor-pointer py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleChangeStatus("Completed")}
              >
                Completed
              </li>
            </ul>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
