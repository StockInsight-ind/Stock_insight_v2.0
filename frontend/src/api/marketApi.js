import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5050/api",
});

export const getMarkets = async () => {
  const response = await API.get("/markets");
  return response.data;
};

export const searchStocks = async (query) => {
  const response = await API.get("/markets/search", {
    params: { q: query },
  });

  return response.data;
};
