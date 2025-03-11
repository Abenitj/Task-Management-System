import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { FaTasks, FaUsers, FaProjectDiagram, FaClock } from 'react-icons/fa'; // Adding icons for better visuals

const taskData = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 30 },
  { name: "Overdue", value: 10 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const taskTrendData = [
  { day: "Mon", tasks: 5 },
  { day: "Tue", tasks: 8 },
  { day: "Wed", tasks: 6 },
  { day: "Thu", tasks: 9 },
  { day: "Fri", tasks: 7 },
];

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

const projectProgressData = [
  { stage: "Planning", percentage: 20 },
  { stage: "Development", percentage: 50 },
  { stage: "Testing", percentage: 70 },
  { stage: "Deployment", percentage: 90 },
];

const recentProjects = [
  { name: "Project Alpha", date: "2025-03-01", status: "Completed" },
  { name: "Project Beta", date: "2025-02-20", status: "In Progress" },
  { name: "Project Gamma", date: "2025-01-15", status: "Pending" },
];

export default function Dashboard() {
  return (
    <div className="p-10 grid grid-cols-1  gap-4 dark:bg-gray-900 dark:text-gray-100">
      {/* Total Summary Cards */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Team */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-sm shadow-sm flex flex-col items-center relative">
          <FaUsers className="text-4xl text-blue-500 absolute top-4 right-2" />
          <h3 className="text-xl font-semibold text-left   mt-auto">Total Team</h3>
          <p className="text-2xl font-bold text-left w-full">12</p>
        </div>

        {/* Total Projects */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-sm shadow-sm flex flex-col items-center relative">
          <FaProjectDiagram className="text-4xl text-green-500 absolute top-4 right-2" />
          <h3 className="text-xl font-semibold mt-auto">Total Projects</h3>
          <p className="text-2xl font-bold text-left w-full">8</p>
        </div>

        {/* Total Tasks */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-sm shadow-sm flex flex-col items-center relative">
          <FaTasks className="text-4xl text-yellow-500 absolute top-4 right-2" />
          <h3 className="text-xl font-semibold mt-auto">Total Tasks</h3>
          <p className="text-2xl font-bold text-left w-full">50</p>
        </div>

        {/* Pending Tasks */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-sm shadow-sm flex flex-col items-center relative">
          <FaClock className="text-4xl text-red-500 absolute top-4 right-2" />
          <h3 className="text-xl font-semibold mt-auto">Pending Tasks</h3>
          <p className="text-2xl font-bold text-left w-full">15</p>
        </div>
      </div>
      {/* Charts Section */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-0 sm:grid-cols-2 gap-4">
        {/* Task Completion Pie Chart */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-sm shadow-sm flex flex-col items-center space-y-4">
          <h2 className="text-lg font-semibold">Task Completion</h2>
          <PieChart width={400} height={400}>
            <Pie data={taskData} cx="50%" cy="50%" outerRadius={120} dataKey="value">
              {taskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Task Trend Line Chart */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-sm shadow-sm flex flex-col items-center space-y-4">
          <h2 className="text-lg font-semibold">Task Trend</h2>
          <LineChart width={400} height={300} data={taskTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={4} />
          </LineChart>
        </div>

        {/* Task Category Bar Chart */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-sm shadow-sm flex flex-col items-center space-y-4">
          <h2 className="text-lg font-semibold">Task Categories</h2>
          <BarChart width={400} height={300} data={taskCategoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f97316" barSize={50} />
          </BarChart>
        </div>


        {/* Project Progress Bar Chart */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-sm shadow-sm flex flex-col items-center space-y-4">
          <h2 className="text-lg font-semibold">Project Progress</h2>
          <BarChart width={400} height={300} data={projectProgressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="percentage" fill="#14b8a6" barSize={50} />
          </BarChart>
        </div>
      </div>
      {/* Recent Projects List */}
     
    </div>
  );
}
