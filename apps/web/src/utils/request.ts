import axios, { type AxiosInstance } from "axios";
import { ElMessage } from "element-plus";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/lingxiforge";

const request: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  //config配置
  // config.headers["Custom-Header"] = "CustomHeaderValue";
  config.headers["Authorization"] = localStorage.getItem("token");
  if (config.data instanceof FormData) {
    // FormData 类型不需要设置 Content-Type，axios 会自动处理
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message: string | ArrayBuffer | Blob = error?.response?.data?.message;
    const status: any = error?.response?.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      default:
        message = "网络连接故障";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  }
);

export default request;
