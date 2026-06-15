import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const registerUser = async (userData) => {
  const response = await API.post("/users/register", userData);
  return response.data;
};