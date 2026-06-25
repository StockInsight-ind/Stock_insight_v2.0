import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5050/api",
});

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

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

export const saveUserPreferences = async (preferences) => {
  const response = await API.post(
    "/users/preferences",
    preferences,
    getAuthConfig()
  );

  return response.data;
};

export const getUserPreferences = async () => {
  const response = await API.get("/users/preferences", getAuthConfig());
  return response.data;
};
