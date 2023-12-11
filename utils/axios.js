// axiosInstance.js
import axios from 'axios';
import { useUserStore } from '~/stores/useUserStore.js';

const axiosInstance = axios.create({
    withCredentials: true
});

// 请求拦截器
axiosInstance.interceptors.request.use(config => {
    console.log("-------------------请求------------")
    const userStore = useUserStore();
    const token = userStore.token;
    console.log("-------------------请求------------:"+token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截器
axiosInstance.interceptors.response.use(response => {

    console.log("-------------------处理响应数据------------")
    console.log(response.data.code === 401)
    // 检查错误响应并执行特定操作
    if (response.config.url.startsWith('/api/admin') && response.data.code === 401) {
        // router.push("/login")
        // 清空 cookie
        // 注：这里的具体实现取决于您如何管理 cookie
        // 例如：document.cookie = 'token=; Max-Age=0';

        // 重定向到登录页面
        // 注：这里的重定向实现取决于您的路由设置
        // 例如：window.location.href = '/login';
        // 清空 token 或其他认证数据
        const userStore = useUserStore();
        userStore.clearUser();  // 假设 clearToken 是清空 token 的方法

        // 重定向到登录页面
        window.location.href = '/login';
    }
    // 处理响应数据
    return response;
}, error => {
    // 处理响应错误
    // 可以在这里处理 401 等错误状态
    return Promise.reject(error);
});

export default axiosInstance;
