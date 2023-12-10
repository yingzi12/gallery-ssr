// plugins/axios.js
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const axiosInstance = axios.create({
        // Axios 配置，如基础 URL 等
    });

    // 请求拦截器
    axiosInstance.interceptors.request.use(function (config) {
        log.error("aaaaaaaaaaaaaaaaaaaaa")
        // 执行请求发送前的逻辑
        return config;
    }, function (error) {
        // 处理请求错误
        return Promise.reject(error);
    });

    // 响应拦截器
    axiosInstance.interceptors.response.use(function (response) {
        log.error("ddddddddddddddddddddddd")
        // 处理响应数据
        return response;
    }, function (error) {
        // 处理响应错误
        return Promise.reject(error);
    });

    // 将 Axios 实例注入到 Nuxt 应用中
    nuxtApp.provide('axios', axiosInstance);
});
