import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";

// 根域名設置
// 超時處理
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// 攔截器
request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  // 200 以外的設置
  (err) => {
    if (err.response.status === 401) {
      removeToken();
      router.navigate("/login");
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export { request };
