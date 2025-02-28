import { FaRegChartBar, FaUserFriends, FaCogs } from "react-icons/fa";
import Card from "../components/Card";

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {/* Card 1 */}
        <Card
          title="Analytics"
          description="Track your project progress and monitor the key metrics"
          icon={FaRegChartBar}
          linkText="View Reports"
          linkUrl="#reports"
          bgColor="bg-gray-100 dark:bg-gray-700"
          iconColor="bg-blue-500"
        />

        {/* Card 2 */}
        <Card
          title="Team"
          description="Manage your team and view member activities"
          icon={FaUserFriends}
          linkText="View Team"
          linkUrl="#team"
          bgColor="bg-gray-100 dark:bg-gray-700"
          iconColor="bg-green-500"
        />

        {/* Card 3 */}
        <Card
          title="Settings"
          description="Adjust your system settings and preferences"
          icon={FaCogs}
          linkText="Go to Settings"
          linkUrl="#settings"
          bgColor="bg-gray-100 dark:bg-gray-700"
          iconColor="bg-yellow-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {/* Card 1 */}
        <Card
          title="Analytics"
          description="Track your project progress and monitor the key metrics"
          icon={FaRegChartBar}
          linkText="View Reports"
          linkUrl="#reports"
          bgColor="bg-gray-100 dark:bg-gray-700"
          iconColor="bg-blue-500"
        />

        {/* Card 2 */}
        <Card
          title="Team"
          description="Manage your team and view member activities"
          icon={FaUserFriends}
          linkText="View Team"
          linkUrl="#team"
          bgColor="bg-gray-100 dark:bg-gray-700"
          iconColor="bg-green-500"
        />

        {/* Card 3 */}
        <Card
          title="Settings"
          description="Adjust your system settings and preferences"
          icon={FaCogs}
          linkText="Go to Settings"
          linkUrl="#settings"
          bgColor="bg-gray-100 dark:bg-gray-700"
          iconColor="bg-yellow-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {/* Card 1 */}
        <Card
          title="Analytics"
          description="Track your project progress and monitor the key metrics"
          icon={FaRegChartBar}
          linkText="View Reports"
          linkUrl="#reports"
          bgColor="bg-gray-100 dark:bg-gray-700"
          iconColor="bg-blue-500"
        />

        {/* Card 2 */}
        <Card
          title="Team"
          description="Manage your team and view member activities"
          icon={FaUserFriends}
          linkText="View Team"
          linkUrl="#team"
          bgColor="bg-gray-100 dark:bg-gray-700"
          iconColor="bg-green-500"
        />

        {/* Card 3 */}
        <Card
          title="Settings"
          description="Adjust your system settings and preferences"
          icon={FaCogs}
          linkText="Go to Settings"
          linkUrl="#settings"
          bgColor="bg-gray-100 dark:bg-gray-700"
          iconColor="bg-yellow-500"
        />
      </div>
    </div>
  );
};

export default Dashboard;
