import axios from "axios";

export const instance = axios.create({
  baseURL: "https://tomind.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("AXIOS REQUEST →", config.url, config.headers.Authorization);
  return config;
});
