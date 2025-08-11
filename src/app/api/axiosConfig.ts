// axiosConfig.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const BASE_URL_API = "http://192.168.1.66:3000/api";

const apiAxios = axios.create({
  baseURL: BASE_URL_API,
  timeout: 50000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn access token vào request
apiAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//
// Refresh token logic

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function onRefreshed(newToken: string) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

apiAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        localStorage.removeItem("access_token");
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(apiAxios(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(`${BASE_URL_API}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("access_token", newAccessToken);

        // Cập nhật header cho các request đang chờ
        onRefreshed(newAccessToken);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiAxios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        isRefreshing = false;
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export async function logout() {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    await apiAxios.post("/auth/logout", { refreshToken });

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/auth/login";
  } catch (error) {
    console.error("Logout failed:", error);
    // fallback nếu API lỗi
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/auth/login";
  }
}

export default apiAxios;
