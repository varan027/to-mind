import axios from "axios";

export const instance = axios.create({
  baseURL: "https://tomind.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
