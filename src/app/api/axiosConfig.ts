// axiosConfig.js
import axios from "axios";

export const BASE_URL_API = "http://192.168.1.66:3000/api";

const apiAxios = axios.create({
  baseURL: BASE_URL_API,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiAxios.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    console.log("[REQUEST]", config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("[RESPONSE ERROR]", error.response);

    if (error.response?.status === 401) {
      console.warn("Bạn chưa đăng nhập hoặc token đã hết hạn");
      localStorage.removeItem("access_token");
    }

    return Promise.reject(error);
  }
);

export default apiAxios;
