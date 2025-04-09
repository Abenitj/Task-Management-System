import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import TaskCard from "../../components/TaskCard";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Trash2 } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal";
import { useSelector } from "react-redux";
import { TeamMember } from "../../utils/Constants";

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(false);
  const role = useSelector((state) => state?.user.user.role);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [searchTerm, selectedPriority, selectedStatus, tasks]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/task`);
      if (res.status === 200) {
        setTasks(res.data);
      }
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setSelectedId(id)
    setIsOpen(true)
  };

  const handleConfirm= async()=>{
    if(!selectedId) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/task/${selectedId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== selectedId));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
    finally{
      setIsOpen(false);
    }
  }

 

  const filterTasks = () => {
    let filtered = tasks;
    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedPriority) {
      filtered = filtered.filter((task) => task.priority === selectedPriority);
    }
    if (selectedStatus) {
      filtered = filtered.filter((task) => task.status === selectedStatus);
    }
    setFilteredTasks(filtered);
  };

  return (
    <div>
      <div className="p-4">
        <h1 className="text-3xl font-semibold ">View Tasks</h1>
        <p className="text-gray-400 mt-2">
          Manage and track your tasks efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 sm:px-2">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-500"
          />

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

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-500"
          >
          <option value="">Filter by Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-2">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task._id} className="relative">
                <TaskCard
                  project={task.project}
                  title={task.title}
                  description={task.description}
                  deadline={task.deadline}
                  status={task.status}
                  priority={task.priority}
                  id={task._id}
                  setTasks={setTasks}
                  tasks={tasks}
                />
                {
                role!==TeamMember && (
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                )
                }
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-2">
              No tasks found.
            </p>
          )}
        </div>
      )}
      { isOpen && <ConfirmModal onConfirm={handleConfirm} message={'Are you Sure!'} onClose={()=>setIsOpen(false)}/>
      }
    </div>
  );
};

export default ViewTask;
