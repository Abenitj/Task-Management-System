import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast";
import SearchInput from "../../components/SearchInput";
import ConfirmModal from "../../components/ConfirmModal";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Store the user ID to delete
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // Store dynamic messages

  const fetchUser = () => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`).then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = (user) => {
    navigate("/edit-user", { state: { user } });
  };

  const handleDelete = (id) => {
    setDeleteId(id); // Store the ID but don't delete yet
    setShowDeleteModal(true); // Show modal
  };

  const confirmDelete = async () => {
    if (!deleteId) return; // Ensure there's an ID before proceeding

    try {
      const res = await axios.delete(
        `${import.meta.env.BASE_URL}/api/users/${deleteId}`
      );
      if (res.status === 200) {
        setToastMessage("User deleted successfully");
        setShowToast(true);
        setUsers(users.filter((user) => user._id !== deleteId));
      }
      setShowDeleteModal(false);
      setShowToast(true);
    } catch (error) {
      console.error(error.response?.data);
    } finally {
      setDeleteId(null); // Reset ID after deletion
    }
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = async (id, currentStatus) => {
    if (!id) {
      console.log("Undefined ID");
      return; // Stop execution if ID is not provided
    }

    // Toggle the status
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/status/${id}`,
        { status: newStatus }
      );

      if (res.status === 200) {
        fetchUser(); // Refresh user data after successful update
      }
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
    }
  };

  const handleSort = (field) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField) return 0;
    return sortOrder === "asc"
      ? a[sortField]?.toString().localeCompare(b[sortField]?.toString())
      : b[sortField]?.toString().localeCompare(a[sortField]?.toString());
  });
  const filteredUsers = sortedUsers.filter((user) => {
    return (
      (user.firstname?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (user.lastname?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(search.toLowerCase())
    );
  });

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="w-full  mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xs shadow-sm">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        USER LIST
      </h2>
      {/* search component */}
      <div className="flex justify-between items-center ">
        <SearchInput
          placeholder={"Search users..."}
          change={handleSearch}
          value={search}
          className="flex-grow mr-4"
        />
        <button
          onClick={()=>navigate('/add-user')}
          className="text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-md text-sm px-5 py-2.5"
        >
          Add User
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
          <tr className="relative">
            {[
              { key: "firstname", label: "First Name" },
              { key: "lastname", label: "Last Name" },
              { key: "email", label: "Email" },
              { key: "role", label: "Role" },
              { key: "status", label: "Status" },
            ].map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="cursor-pointer p-2"
              >
                <div className="flex items-center gap-1">
                  <FaSort
                    className={`text-gray-500 ${
                      sortField === key
                        ? sortOrder === "asc"
                          ? "text-gray-500"
                          : "text-gray-500"
                        : "text-gray-500"
                    }`}
                  />
                  {label}
                </div>
              </th>
            ))}
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-300 dark:border-gray-600"
            >
              <td className="p-2">{user.firstname}</td>
              <td className="p-2">{user.lastname}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 ">
                <span
                  onClick={() => handleStatusChange(user._id, user.status)}
                  className={`cursor-pointer ${
                    user?.status !== "Active"
                      ? "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                      : "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                  }`}
                >
                  {user?.status || "Unknown"}
                </span>
              </td>
              <td className="p-2 flex space-x-3">
                <button onClick={() => handleEdit(user)}>
                  <FaEdit className="text-yellow-500 cursor-pointer" />
                </button>
                <button onClick={() => handleDelete(user._id)}>
                  <FaTrash className="text-red-500 cursor-pointer" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label className="mr-2 text-gray-700 dark:text-white">
            Rows per page:
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="p-1 border rounded dark:bg-gray-700 dark:text-white"
          >
            {[5, 10, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded mr-2  dark:bg-gray-700 dark:hover:bg-gray-800 border-none bg-gray-200 hover:bg-gray-300"
          >
            Prev
          </button>
          <span className="text-gray-700 dark:text-white">
            Page {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={indexOfLastUser >= filteredUsers.length}
            className="px-3 py-1 border rounded ml-2 dark:bg-gray-700 dark:hover:bg-gray-800 border-none bg-gray-200 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
      {/* Confirm Delete Modal */}
      {showDeleteModal && (
        <ConfirmModal
          onClose={handleModalClose}
          message={"Are you sure you want to delete it?"}
          onConfirm={confirmDelete}
        />
      )}
      {/* Toast */}
      <Toast
        showToast={showToast}
        setShowToast={setShowToast}
        message={toastMessage}
      />
    </div>
  );
}
