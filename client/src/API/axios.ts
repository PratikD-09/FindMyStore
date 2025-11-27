import axios from "axios";
import type { AxiosInstance } from "axios"; // type-only import

const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // backend URL from .env
});

export default API;


// import type { AxiosRequestConfig } from "axios";

// const API_URLS = [
//   import.meta.env.VITE_API_URL1,
//   import.meta.env.VITE_API_URL2,
// ];

// let activeAPI = 0;

// const API: AxiosInstance = axios.create({
//   baseURL: API_URLS[activeAPI],
//   timeout: 8000,
// });

// // 🔥 FIX: DO NOT RETURN NEW OBJECT — just mutate config
// API.interceptors.request.use(
//   (config: any) => {
//     config.baseURL = API_URLS[activeAPI];
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// API.interceptors.response.use(
//   (response) => response,
//   async (error: any) => {
//     const originalRequest = error.config as AxiosRequestConfig | undefined;

//     const shouldFailover =
//       error.code === "ERR_NETWORK" ||
//       error.response?.status === 500 ||
//       error.response?.status === 404;

//     if (shouldFailover && originalRequest) {
//       activeAPI = activeAPI === 0 ? 1 : 0;

//       console.warn("⚠ Switching backend to:", API_URLS[activeAPI]);

//       originalRequest.baseURL = API_URLS[activeAPI];
//       return API.request(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;
