// src/sockets/socket.js
import { io } from "socket.io-client";

const token = localStorage.getItem("adminToken");

// ✅ Render pe deployed backend URL use karo
const backendURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const socket = io(backendURL, {
  auth: { token },
  autoConnect: false, // Optional: connect manually later if needed
});

export default socket;
