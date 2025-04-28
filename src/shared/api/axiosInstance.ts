import {
  getAccessToken,
  setAccessToken,
} from "@/features/sign-in/lib/tokenHandler";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use((response) => {
  const token = response.headers["authorization"];
  console.log(response.headers);
  console.log("token", token);
  if (token) {
    const accessToken = token.replace("Bearer ", "");
    setAccessToken(accessToken);
  }
  return response;
});

export { axiosInstance };
