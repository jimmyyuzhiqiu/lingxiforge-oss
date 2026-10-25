import axios, { type AxiosInstance } from "axios";
import { ElMessage } from "element-plus";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/lingxiforge";

const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("lingxiforge_demo_token_v2");
  if (token) config.headers.Authorization = token;

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status as number | undefined;
    const messageFromServer = error?.response?.data?.message as
      | string
      | undefined;

    const message =
      messageFromServer ||
      (status === 401
        ? "登录已过期，请重新登录"
        : status === 403
          ? "无权访问"
          : status === 404
            ? "请求地址错误"
            : status === 500
              ? "服务器故障"
              : "网络连接故障");

    ElMessage({
      type: "error",
      message,
    });

    return Promise.reject(error);
  }
);

export default http;
