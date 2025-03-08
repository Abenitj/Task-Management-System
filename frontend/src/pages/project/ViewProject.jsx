import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../../components/ProjectCard";
import SimpleSelect from "../../components/SimpleSelect";
import AddTask from "../task/AddTask";

const ViewProject = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isOpen,setIsOpen]=useState(false)

  // Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/projects",{
          withCredentials: true,
        });
        setProjects(res.data); // Set projects from backend
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []); // Empty dependency array ensures it runs once

  // Filter Projects Based on Status and Name
  const filteredProjects = projects
    .filter(
      (project) =>
        (statusFilter === "All" || project.status === statusFilter) &&
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleModal = (id) => {
    alert(id); // This is just a placeholder. You can implement actual modal logic
  };

  return (
    <div className="p-2 min-h-screen">

      <div className="p-4">
        <h1 className="text-3xl font-semibold ">  View Projects</h1>
        <p className=" text-gray-400 mt-2">
          View all projects. You can filter projects by name and status.
        </p>
      </div>


      {/* Filters Section */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            id="search"
            value={searchTerm}
            placeholder=" Search By Name..."
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-500"
          />
        </div>

        {/* Status Filter */}
        <SimpleSelect
          filter={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: "All", label: "All" },
            { value: "Pending", label: "Pending" },
            { value: "InProgress", label: "In Progress" },
            { value: "Completed", label: "Completed" },
            { value: "Cancelled", label: "Cancelled" },
          ]}
        />
      </div>

      {/* Display Project List */}
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              name={project.name}
              createdBy={`${project.createdBy?.firstname} ${project.createdBy?.lastname}`}
              description={project.description}
              startDate={project.startDateTime}
              endDate={project.endDateTime}
              status={project.status}
              handleModal={handleModal}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-2">
            No projects found.
          </p>
        )}
      </div>
      {/* Component To Add A Task */}
      <AddTask isOpen={isOpen} setIsOpen={()=>alert("hello")}/>
    </div>
  );
};

export default ViewProject;
