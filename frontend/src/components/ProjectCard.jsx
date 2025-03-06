import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Typography,
  Chip,
  useSelect,
} from "@material-tailwind/react";
import { FaPlus, FaProjectDiagram } from "react-icons/fa";
import { formatDate } from "../utils/FormateDate";
import { useState } from "react";
import { openModal, setProjectId } from "../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
const ProjectCard = ({
  name,
  description,
  createdBy,
  startDate,
  endDate,
  status,
  id,
}) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const dispatch = useDispatch();
  const handleTaskCreate = (id) => {
    dispatch(openModal());
    dispatch(setProjectId(id));
  };
  return (
    <div>
      <Card className="w-full  h-auto relative rounded-md bg-gray-50 dark:bg-gray-800 shadow-sm">
        <CardBody>
          <FaProjectDiagram className="mb-4 size-8 dark:text-gray-50 text-gray-800" />
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 dark:text-gray-200 break-words"
          >
            {name}
          </Typography>

          <Typography
            variant="p"
            color="blue-gray"
            className="mb-2 dark:text-gray-200"
          >
            <strong>Created By</strong>:{createdBy}
          </Typography>
          <Typography className="dark:text-gray-300">
            <strong>Description</strong>:
            <span
              className="cursor-pointer hover:opacity-90"
              onClick={() => setIsReadMore(!isReadMore)}
            >
              {isReadMore ? description : description.slice(0, 100)}
              {description.length > 100 && "..."}
            </span>
          </Typography>
          <Typography className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Start Date:</strong> {formatDate(startDate)}
          </Typography>
          <Typography className="text-sm text-gray-600 dark:text-gray-400">
            <strong>End Date:</strong> {formatDate(endDate)}
          </Typography>
          <Chip
            value={status}
            className="rounded-lg absolute top-2 right-1 bg-none bg-transparent text-center  text-orange-400 w-1/5 px-2 py-1 "
          />
        </CardBody>
        <CardFooter className="pt-0">
          <button
            onClick={() => handleTaskCreate(id)}
            className="text-white bg-gray-700 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700 
            focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 
            font-medium rounded-md text-sm px-5 py-2.5 flex items-center"
            type="button"
          >
            <FaPlus className="w-3.5 h-3.5 me-2" />
            Add Task
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
