// src/sockets/socket.js
import { io } from "socket.io-client";

const backendURL = import.meta.env.VITE_API_URL || "https://child-backend.onrender.com";

const socket = io(backendURL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;
