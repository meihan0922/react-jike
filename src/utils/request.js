import axios from "axios";

// 根域名設置
// 超時處理
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// 攔截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  // 200 以外的設置
  (err) => Promise.reject(err)
);

export { request };
