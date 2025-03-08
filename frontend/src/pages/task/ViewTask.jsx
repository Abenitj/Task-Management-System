import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import TaskCard from "../../components/TaskCard";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

const ViewTask = () => {
  const [isopen, setIsopen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [searchTerm, selectedPriority, selectedStatus, tasks]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/task");
      if (res.status === 200) {
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // real time state change



  const filterTasks = () => {
    let filtered = tasks;

    // Filter by title
    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by priority
    if (selectedPriority) {
      filtered = filtered.filter((task) => task.priority === selectedPriority);
    }

    // Filter by status
    if (selectedStatus) {
      filtered = filtered.filter((task) => task.status === selectedStatus);
    }

    setFilteredTasks(filtered);
  };

  return (
    <div>
      <div className="p-4">
        <h1 className="text-3xl font-semibold ">View Tasks</h1>
        <p className=" text-gray-400 mt-2">
          Manage and track your tasks efficiently
        </p>
      </div>

      {/* Search by title */}
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 sm:px-2">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-500"
          />
        </div>

        {/* Filter by priority */}
        <div className="mb-4">
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-500"
          >
            <option value="">Filter by Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Filter by status */}
        <div className="mb-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-500"
          >
            <option value="">Filter by Status</option>
            <option value="To Do">To Do"g</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Loading or Displaying Tasks */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-2">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                project={task.project}
                title={task.title}
                description={task.description}
                deadline={task.deadline}
                status={task.status}
                priority={task.priority}
                id={task._id}
                setTasks={setTasks}
                tasks={task}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-2">
              No projects found.
            </p>
          )}
        </div>
      )}

      {/* Modal */}
      {/* <Modal isopen={isopen} setIsopen={setIsopen} /> */}
    </div>
  );
};

export default ViewTask;