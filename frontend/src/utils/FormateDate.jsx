import { format } from "date-fns";

export const formatDate = (dateString) => {
  if (!dateString) {
    console.error("Invalid date input");
    return "Invalid date";
  }

  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    console.error("Invalid date format:", dateString);
    return "Invalid date";
  }

  console.log("Converted Date:", date.toString()); // Debugging log

  return format(date, "MMMM d, yyyy"); // Example: May 20, 2025
};
