import axios from "axios";
import type { AxiosInstance } from "axios"; // type-only import

const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend URL from .env
});

export default API;
