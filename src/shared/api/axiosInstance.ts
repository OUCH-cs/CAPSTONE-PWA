import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_EPHEMERAL_KEY}`,
    "Content-Type": "application/json",
  },
  timeout: 6000,
});

export { axiosInstance };
