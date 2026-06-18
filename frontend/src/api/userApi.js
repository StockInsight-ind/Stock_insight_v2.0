import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5050/api",
});

export const registerUser = async (userData) => {
  const response = await API.post(
    "/users/register",
    userData
  );

  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await API.post(
    "/users/login",
    loginData
  );

  return response.data;
};
