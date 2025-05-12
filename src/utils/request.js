import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@s/userStore";
import { router } from "@/router";

const instance = axios.create({
  baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net", //换成自己的后端地址
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("请求失败");
      return null;
    }
  },
  (error) => {
    console.log(22222);
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
      ElMessage({
        message: "登录过期，请重新登录",
        type: "warning",
        duration: 2000,
      });
      const userStore = useUserStore();
      userStore.clearUserInfo();
      router.push("/login");
    } else {
      ElMessage({
        message: error.response.data.message || "请求失败",
        type: "warning",
        duration: 2000,
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
