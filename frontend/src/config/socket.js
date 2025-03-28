import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  autoConnect: false, // Prevent auto connection
  reconnection: true, // Allow automatic reconnection
});

export default socket;
