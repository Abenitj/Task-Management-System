import React, { useEffect, useState } from "react";
import socket from "../../config/socket"; // Assuming this is where socket is initialized

const ViewTask = () => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    // Emit some initial event if needed (e.g., sending a request for data)
    // socket.emit("requestTasks");

    // Listening to "user" event
    socket.on("user", (data) => {
      setValue(data);
    });

    // Cleanup: Remove the listener when the component unmounts
    return () => {
      socket.off("user"); // Unsubscribe from the "user" event
    };
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <div>
      <h1>Task Data:</h1>
      <div>{value ? value : "Loading..."}</div>
    </div>
  );
};

export default ViewTask;
