import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { FaTasks, FaUsers, FaProjectDiagram, FaClock } from "react-icons/fa";

const taskData = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 30 },
  { name: "Overdue", value: 10 },
];
const COLORS = ["#22c55e", "#facc15", "#ef4444"];
const taskCategoryData = [
  { category: "Bug", count: 15 },
  { category: "Feature", count: 10 },
  { category: "Improvement", count: 8 },
];
const userPerformanceData = [
  { subject: "Alice", A: 100, fullMark: 150 },
  { subject: "Bob", A: 120, fullMark: 150 },
  { subject: "Charlie", A: 80, fullMark: 150 },
];
const recentProjects = [
  { name: "Project Alpha", date: "2025-03-01", status: "Completed" },
  { name: "Project Beta", date: "2025-02-20", status: "In Progress" },
  { name: "Project Gamma", date: "2025-01-15", status: "Pending" },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Task Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Tasks",
            value: taskData.reduce((acc, curr) => acc + curr.value, 0),
            icon: <FaTasks size={34} />,
          },
          {
            label: "Task Categories",
            value: taskCategoryData.reduce((acc, curr) => acc + curr.count, 0),
            icon: <FaProjectDiagram size={34} />,
          },
          {
            label: "Average User Score",
            value: (
              userPerformanceData.reduce((acc, curr) => acc + curr.A, 0) /
              userPerformanceData.length
            ).toFixed(1),
            icon: <FaUsers size={34} />,
          },
          {
            label: "Recent Projects",
            value: recentProjects.length,
            icon: <FaClock size={34} />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="dark:bg-gray-800 bg-gray-100 rounded-md shadow-sm text-gray-700 dark:text-gray-200 h-32 p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="text-4xl font-bold">{item.value}</div>
              <div className="text-gray-700 dark:text-gray-200">
                {item.icon}
              </div>
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Pie Chart for Task Status */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Task Status
          </h3>
          <PieChart width={300} height={300}>
            <Pie
              data={taskData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {taskData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Bar Chart for Task Categories */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Task Categories
          </h3>
          <BarChart width={400} height={300} data={taskCategoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4F46E5" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
