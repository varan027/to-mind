import axios from "axios";

export const instance = axios.create({
  baseURL: "https://tomind.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
