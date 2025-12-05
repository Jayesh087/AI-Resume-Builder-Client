import axios from "axios";

// Fallback to real backend URL if env variable missing
const API_BASE =
  import.meta.env.VITE_BASE_URL ||
  "https://ai-resume-builder-server-1.onrender.com"; // <-- put your REAL server URL here

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
